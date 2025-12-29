import pandas as pd

dispatch_params = pd.read_csv("backend\\data\\dispatch_parameters.csv")
material_master = pd.read_csv("backend\\data\\material_master.csv")
material_orders = pd.read_csv("backend\\data\\material_orders.csv")
sales_orders = pd.read_csv("backend\\data\\sales_orders.csv")
stock_levels = pd.read_csv("backend\\data\\stock_level.csv")
stock_movements = pd.read_csv("backend\\data\\stock_movements.csv")
supplier_info = pd.read_csv("backend\\data\\suppliers.csv")

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


from crewai import Agent, Task, Crew

email_agent = Agent(
    role="Supplier Email Analyst",
    goal="Extract delays, parts, and suppliers from emails",
    backstory="A procurement analyst who reads between the lines",
    llm="ollama/llama3.1",
    verbose=True
)
from crewai import Task
from typing import Optional, Dict, Any
from pydantic import BaseModel

class ExtractedEvent(BaseModel):
    category: str
    confidence: float
    extracted_attributes: Dict[str, Optional[Any]]
email_text = """
From: operations@voltway.co
To: orders@supC.com
Subject: URGENT: Cancel O5021 (Carbon Fiber Frame)
Date: 2025-04-10 08:55

Subject: URGENT: Cancel O5021 (Carbon Fiber Frame)
From: operations@voltway.co
To: orders@supC.com
Date: 2025-04-10 08:55

Hello SupC Team,

Please cancel Purchase Order **O5021** for **Carbon Fiber Frame** (part P303).  
We’ve decided to delay the V1→V2 upgrade rollout, so we no longer need these frames.

Let me know if there are any cancellation fees. If so, please send an updated invoice.

Thanks,  
Jordan Lee  
Warehouse Manager  
Voltway
"""

email_task = Task(
    description=f"""
You are an intelligent procurement event extractor.

You are given:
1. A registry of possible attributes with example values
2. An incoming supplier email

Your job:
- Identify the event category (delay, quality_issue, price_change, cancellation, other)
- Select ONLY the attributes explicitly present in the email
- Extract their values
- Return null for attributes not present
- Do NOT guess or hallucinate

ATTRIBUTE REGISTRY:
{ATTRIBUTE_REGISTRY}

EMAIL:
{email_text}
""",
    agent=email_agent,
    output_json=ExtractedEvent,
    expected_output="A structured procurement event with extracted attributes"
)
import json

result = Crew(
    agents=[email_agent],
    tasks=[email_task]
).kickoff()

email_data = result.to_dict()
# json_str = json.dumps(email_data, indent=2)
if(email_data is not None):
    if('part_id' in email_data['extracted_attributes']):
        part_id = email_data['extracted_attributes']['part_id']
    else:
        part_id = None
    if('model' in email_data['extracted_attributes']):
        model=email_data['extracted_attributes']['model']
    else:
        model=None
    if('successor_parts' in email_data['extracted_attributes']):
        successor_part_id = email_data['extracted_attributes']['successor_parts']
    else:
        successor_part_id = None
    if('supplier' in email_data['extracted_attributes']):
        supplier_id = email_data['extracted_attributes']['supplier']
    else:
        supplier_id = None    
    if('order_id' in email_data['extracted_attributes']):
        production_order_id = email_data['extracted_attributes']['order_id']
    else:
        production_order_id = None
    if('sales_order_id' in email_data['extracted_attributes']):
        sales_order_id = email_data['extracted_attributes']['sales_order_id']
    else:
        sales_order_id = None
else:
    print("No data extracted from email.")
context_blob = build_part_context(
    part_id=part_id,
    model=model,  # derived from material_master.used_in_models
    successor_part_id=successor_part_id,
    production_order_id=production_order_id,
    sales_order_id=sales_order_id,
    supplier_id=supplier_id

)
print(f"type of context blob: {type(context_blob)}")
impact_agent = Agent(
    role="Supply Chain Impact & Action Planner",
    goal="Assess operational impact of supply disruptions and recommend actions",
    backstory="Senior ops lead balancing cost, service level, and inventory",
    llm="ollama/llama3.1",
    verbose=True
)
class ImpactAssessment(BaseModel):
    risk_level: str  # high / moderate / low
    reasoning: list[str]
    impact: dict
    recommendations: list[dict]
    affected_departments: list[str]
impact_task = Task(
    description=f"""
You are a senior supply-chain decision analyst.

INPUT:
1. Extracted event:
{email_data['category']}

Operational data : 
{context_blob}


Your job:
- Assess risk severity based on business impact (NOT event type)
- Explain your reasoning
- Quantify impact where possible
- Recommend concrete actions
- Identify responsible departments

Return structured output.
""",
    agent=impact_agent,
    output_json=ImpactAssessment,
    expected_output="Impact analysis with risk evaluation"
)
Crew(
    agents=[impact_agent],
    tasks=[impact_task]
).kickoff()
