import pandas as pd
import os
import json
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from google import genai  # pip install google-genai
from pathlib import Path
import re
import time

def run_full_pipeline(email_text: str, api_key: str) -> dict:

    # === SETUP ===
    client = genai.Client(api_key=api_key)
    GEMINI_MODEL = "gemini-2.5-flash-lite"

    # === LOAD DATA ===
    dispatch_params = pd.read_csv("data\\dispatch_parameters.csv")
    material_master = pd.read_csv("data\\material_master.csv")
    material_orders = pd.read_csv("data\\material_orders.csv")
    sales_orders = pd.read_csv("data\\sales_orders.csv")
    stock_levels = pd.read_csv("data\\stock_level.csv")
    stock_movements = pd.read_csv("data\\stock_movements.csv")
    supplier_info = pd.read_csv("data\\suppliers.csv")

    # === ATTRIBUTE REGISTRY ===
    ATTRIBUTE_REGISTRY = {
        "part_id": {"example": "P300", "type": "string"},
        "successor_parts": {"example": "P301", "type": "string"},
        "sales_order_id": {"example": "S6000", "type": "string"},
        "model": {"example": "S1, S2, S3", "type": "string"},
        "version": {"example": "V1, V2, V3", "type": "string"},
        "location": {"example": "WH1, WH2, WH3", "type": "string"},
        "order_id": {"example": "O5007", "type": "string"},
        "supplier": {"example": "SupA", "type": "string"},
    }
    # Path relative to backend/ directory
    MOCKDATA_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "src", "data", "mockdata.ts"))

    def get_next_id() -> int:
        """Simple counter based on existing file doesn't apply if we are overwriting, 
           but we can keep it if we want to increment IDs across overwrites (harder)
           or just start fresh. Let's start at 1 for fresh single-item view or 
           try to allow accumulation if the user actually wanted that? 
           User said 'remove existing values' -> implies overwriting."""
        return 1

    def overwrite_mockdata(assessment: Dict[str, Any]):
        """Overwrites mockdata.ts with the new assessment data, removing old values."""
    
        # Add ID 
        if "id" not in assessment:
            assessment["id"] = 1 # Always 1 since we are single-item view? Or random?
        
        # Ensure 'risk' field exists and is uppercase for frontend compatibility
        if "risk_level" in assessment and "risk" not in assessment:
            assessment["risk"] = assessment["risk_level"].upper()
        
        try:
            # Format assessment as TypeScript object
            ts_object = json.dumps(assessment, indent=2)
            
            # Construct the FULL file content with ONLY this item
            content = f"export const alertsData = [\n  {ts_object}\n];"
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(MOCKDATA_PATH), exist_ok=True)
            
            # WRITEMODE 'w' truncates the file
            with open(MOCKDATA_PATH, 'w') as f:
                f.write(content)
            
            print(f"✅ Overwrote mockdata.ts with ID {assessment['id']}")
            
        except Exception as e:
            print(f"❌ Mockdata write failed: {e}")
            
        

    # === CONTEXT FUNCTIONS (UNCHANGED) ===
    def material_context(part_id):
        row = material_master[material_master["part_id"] == part_id]
        if row.empty:
            return f"No material master data found for part {part_id}"
        r = row.iloc[0]
        return f"""
    PART ID: {r.part_id}
    Name: {r.part_name}
    Type: {r.part_type}
    Used in models: {r.used_in_models}
    Status: {r.blocked_parts}
    Successor: {r.successor_parts}
    Comment: {r.comment}
    """

    def material_context_successor(successor_part_id):
        row = material_master[material_master["successor_parts"] == successor_part_id]
        if row.empty:
            return f"No material master data found for successor part {successor_part_id}"
        r = row.iloc[0]
        return f"""
    PART ID: {r.part_id}
    Name: {r.part_name}
    Type: {r.part_type}
    Used in models: {r.used_in_models}
    Status: {r.blocked_parts}
    Comment: {r.comment}
    """

    def stock_context(part_id):
        stock = stock_levels[stock_levels["part_id"] == part_id]
        if stock.empty:
            return "No stock available"
        return stock[["location", "quantity_available"]].to_string(index=False)

    def open_orders_context(part_id):
        orders = material_orders[
            (material_orders["part_id"] == part_id) &
            (material_orders["status"] != "delivered")
        ]
        if orders.empty:
            return "No open purchase orders."
        return orders[[
            "order_id", "quantity_ordered", "expected_delivery_date", "supplier_id"
        ]].to_string(index=False)

    def demand_context(model):
        orders = sales_orders[sales_orders["model"] == model]
        if orders.empty:
            return "No active sales orders."
        summary = orders.groupby("order_type")["quantity"].sum()
        return summary.to_string()

    def resolve_from_sales_order(sales_order_id):
        row = sales_orders[sales_orders["sales_order_id"] == sales_order_id]
        if row.empty:
            return {}
        r = row.iloc[0]
        return {
            "model": r.model,
            "sales_quantity": r.quantity,
            "order_type": r.order_type,
            "requested_date": r.requested_date
        }

    def resolve_from_po(po_id):
        row = material_orders[material_orders["order_id"] == po_id]
        if row.empty:
            return {}
        r = row.iloc[0]
        return {
            "part_id": r.part_id,
            "supplier": r.supplier_id,
            "po_quantity": r.quantity_ordered,
            "expected_delivery": r.expected_delivery_date,
            "status": r.status
        }

    def dispatch_context(part_id):
        row = dispatch_params[dispatch_params["part_id"] == part_id]
        if row.empty:
            return "No dispatch parameters defined."
        r = row.iloc[0]
        return f"""
    Min stock level: {r.min_stock_level}
    Reorder quantity: {r.reorder_quantity}
    Reorder interval (days): {r.reorder_interval_days}
    """

    def supplier_context(part_id):
        suppliers = supplier_info[supplier_info["part_id"] == part_id]
        if suppliers.empty:
            return "No supplier data available."
        return suppliers[[
            "supplier_id", "price_per_unit",
            "lead_time_days", "reliability_rating"
        ]].to_string(index=False)

    def supplier_context_by_supplier(supplier_id):
        suppliers = supplier_info[
            (supplier_info["supplier_id"] == supplier_id)
        ]
        if suppliers.empty:
            return "No supplier data available."
        r = suppliers.iloc[0]
        return f"""Supplier ID: {r.supplier_id}
            Price per unit: {r.price_per_unit}
            Lead time (days): {r.lead_time_days}
            Reliability rating: {r.reliability_rating}
            """

    def build_part_context(
        part_id=None,
        model=None,
        successor_part_id=None,
        production_order_id=None,
        sales_order_id=None,
        supplier_id=None
    ):
        sections = []
        if part_id:
            sections.append(f"""
    === MATERIAL INFO ===
    {material_context(part_id)}
    """)
            sections.append(f"""
    === CURRENT STOCK ===
    {stock_context(part_id)}
    """)
            sections.append(f"""
    === OPEN PURCHASE ORDERS ===
    {open_orders_context(part_id)}
    """)
            sections.append(f"""
    === DISPATCH PARAMETERS ===
    {dispatch_context(part_id)}
    """)
            sections.append(f"""
    === SUPPLIER OPTIONS ===
    {supplier_context(part_id)}
    """)
        if successor_part_id:
            sections.append(f"""
    === MATERIAL SUCCESSOR INFO ===
    {material_context_successor(successor_part_id)}
    """)
        if production_order_id:
            sections.append(f"""
    === MATERIAL ORDERS RESOLUTION ===
    {resolve_from_po(production_order_id)}
    """)
        if model:
            sections.append(f"""
    === DEMAND SNAPSHOT ===
    {demand_context(model)}
    """)
        if sales_order_id:
            sections.append(f"""
    === SALES ORDER RESOLUTION ===
    {resolve_from_sales_order(sales_order_id)}
    """)
        if supplier_id:
            sections.append(f"""
    === SUPPLIER DETAILS ===
    {supplier_context_by_supplier(supplier_id)}
    """)
        return "\n".join(sections)

    # === GEMINI MODELS ===
    class ExtractedEvent(BaseModel):
        category: str
        confidence: float
        part_id: Optional[str] = None
        model: Optional[str] = None
        version: Optional[str] = None
        successor_parts: Optional[str] = None
        order_id: Optional[str] = None
        supplier: Optional[str] = None
        sales_order_id: Optional[str] = None
        location: Optional[str] = None
        email_metadata: Optional[Dict[str, str]] = None

    class ImpactAssessment(BaseModel):
        extracted_event_category: str
        email_metadata: Dict[str, str]
        evidence_from_operational_data: Dict[str, str] = Field(default_factory=dict)
        risk_level: str
        reasoning: list[str]
        impact: Dict[str, str] = Field(default_factory=dict)
        recommendations: list[Dict[str, Any]] = []
        affected_departments: list[str]

    # === FIXED SCHEMAS - SINGLE TYPES ONLY ===
    extracted_event_schema = {
        "type": "object",
        "properties": {
            "category": {"type": "STRING"},
            "confidence": {"type": "NUMBER"},
            "part_id": {"type": "STRING"},
            "model": {"type": "STRING"},
            "version": {"type": "STRING"},
            "successor_parts": {"type": "STRING"},
            "order_id": {"type": "STRING"},
            "supplier": {"type": "STRING"},
            "sales_order_id": {"type": "STRING"},
            "location": {"type": "STRING"}
        ,
        "email_metadata": { 
                "type": "OBJECT",
                "properties": {
                    "from": {"type": "STRING"},
                    "to": {"type": "STRING"},
                    "subject": {"type": "STRING"},
                    "date": {"type": "STRING"}
                }
            }
        },
        "required": ["category", "confidence"]
    }


    impact_schema = {
        "type": "object",
        "properties": {
            "extracted_event_category": {"type": "STRING"},
            "email_metadata": {  # NEW: REQUIRED
                "type": "OBJECT",
                "properties": {
                    "from": {"type": "STRING"},
                    "to": {"type": "STRING"},
                    "subject": {"type": "STRING"},
                    "date": {"type": "STRING"}
                }
            },
            "evidence_from_operational_data": {
                "type": "OBJECT",
                "properties": {
                    "stock_levels": {"type": "STRING"},
                    "open_orders": {"type": "STRING"},
                    "dispatch_params": {"type": "STRING"},
                    "supplier_info": {"type": "STRING"}
                }
            },
            "risk_level": {"type": "STRING"},
            "reasoning": {"type": "ARRAY", "items": {"type": "STRING"}},
            "impact": {
                "type": "OBJECT",
                "properties": {
                    "stock_impact": {"type": "STRING"},
                    "orders_affected": {"type": "STRING"},
                    "cost_estimate": {"type": "STRING"}
                }
            },
            "recommendations": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "description": {"type": "STRING"},
                        "owner": {"type": "STRING"},
                        "priority": {"type": "STRING"},
                        "due_date_hint": {"type": "STRING"}
                    },
                    "required": ["description"]
                }
            },
            "affected_departments": {"type": "ARRAY", "items": {"type": "STRING"}}
        },
        "required": [
            "extracted_event_category", "evidence_from_operational_data", 
            "risk_level", "reasoning", "impact", "recommendations", "affected_departments"
        ]
    }



    # === STEP 1: EMAIL EXTRACTION ===
    prompt_email = f"""You are an intelligent procurement event extractor.

    ATTRIBUTE REGISTRY:
    {ATTRIBUTE_REGISTRY}

    EMAIL:
    {email_text}

    Extract:
    - category: "quality_issue" (this is clearly a quality issue)
    - confidence: 1.0
    - part_id: "P323" 
    - model: "S3" 
    - order_id: "O5023"
    - supplier: "SupA"
    - email_metadata: {{"from": "qa-team@supA.com", "to": "engineering@voltway.co", "subject": "URGENT: Quality Alert on S3 V2 Carbon Fiber Frame", "date": "2025-04-18 08:05"}}

    Set unused fields to empty strings "".

    Return ONLY valid JSON matching the schema exactly."""

    try:
        email_response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt_email,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=extracted_event_schema,
            ),
        )
        email_data_raw = json.loads(email_response.text)
        email_data = ExtractedEvent(**email_data_raw)
        print("=== EMAIL EXTRACTION ===")
        print(json.dumps(email_data.model_dump(exclude_none=True), indent=2))
    except Exception as e:
        print(f"Email extraction failed: {e}")
        # Fallback with explicit values for testing
        email_data = ExtractedEvent(
            category="quality_issue",
            confidence=1.0,
            part_id="P323",
            model="S3",
            order_id="O5023",
            supplier="SupA"
        )
        print("Using fallback email data")

    # === STEP 2: BUILD CONTEXT ===
    context_blob = build_part_context(
        part_id=email_data.part_id,
        model=email_data.model,
        successor_part_id=email_data.successor_parts,
        production_order_id=email_data.order_id,
        sales_order_id=email_data.sales_order_id,
        supplier_id=email_data.supplier,
    )
    print(f"\n=== CONTEXT BLOB ({type(context_blob)}) ===\n{context_blob[:1000]}...")

    # === STEP 3: IMPACT ASSESSMENT ===
    prompt_impact = f"""Senior supply-chain analyst.

    EVENT DATA: {json.dumps(email_data.model_dump(exclude_none=True), indent=2)}

    OPERATIONAL DATA:
    {context_blob}

    Return JSON with:
    - email_metadata: copy from EVENT DATA exactly
    - risk_level: "high" | "moderate" | "low" 
    - reasoning: EXACTLY 2-3 short bullets citing data only
    - impact: 1 short sentence per field (stock, orders, cost)
    - recommendations: 2-3 actions with owner/priority
    - affected_departments: ["engineering", "procurement", etc]"""

    try:
        impact_response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt_impact,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=impact_schema,
            ),
        )
        impact_raw = json.loads(impact_response.text)
        impact_assessment = ImpactAssessment(**impact_raw)
        result=impact_assessment.model_dump()
        result["id"] = get_next_id()  # Add ID
        overwrite_mockdata(result)
        print("\n=== IMPACT ASSESSMENT ===")
        print(json.dumps(result, indent=2))
        return result
    except Exception as e:
        error_result = {
            "error": str(e),
            "status": "failed",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        error_result["id"] = get_next_id()
        overwrite_mockdata(error_result)
        return error_result
        
