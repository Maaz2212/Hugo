import pandas as pd

dispatch_params = pd.read_csv("backend\\data\\dispatch_parameters.csv")
material_master = pd.read_csv("backend\\data\\material_master.csv")
material_orders = pd.read_csv("backend\\data\\material_orders.csv")
sales_orders = pd.read_csv("backend\\data\\sales_orders.csv")
stock_levels = pd.read_csv("backend\\data\\stock_level.csv")
stock_movements = pd.read_csv("backend\\data\\stock_movements.csv")
supplier_info = pd.read_csv("backend\\data\\suppliers.csv")

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
        "order_id", "quantity", "expected_delivery_date", "supplier"
    ]].to_string(index=False)

def demand_context(model):
    orders = sales_orders[sales_orders["model"] == model]

    if orders.empty:
        return "No active sales orders."

    summary = orders.groupby("order_type")["quantity"].sum()
    return summary.to_string()

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

def build_part_context(part_id, model):
    return f"""
=== MATERIAL INFO ===
{material_context(part_id)}

=== CURRENT STOCK ===
{stock_context(part_id)}

=== OPEN PURCHASE ORDERS ===
{open_orders_context(part_id)}

=== DEMAND SNAPSHOT ===
{demand_context(model)}

=== DISPATCH PARAMETERS ===
{dispatch_context(part_id)}

=== SUPPLIER OPTIONS ===
{supplier_context(part_id)}
"""

from crewai import Agent, Task, Crew

email_agent = Agent(
    role="Supplier Email Analyst",
    goal="Extract delays, parts, and suppliers from emails",
    backstory="A procurement analyst who reads between the lines",
    llm="ollama/llama3.1",
    verbose=True
)
from crewai import Task
from enum import Enum
from pydantic import BaseModel, Field
class ModelCode(str, Enum):
    S1 = "S1"
    S2 = "S2"
    S3 = "S3"
    # add more if needed
class SupplierDelayEvent(BaseModel):
    part_id: str
    delay_days: int
    supplier: str
    purchase_order_id: str
    model: ModelCode = Field(
        ...,
        description="Short model code only (e.g. S1, S2, S3), not full product name"
    )
email_text = """
From: logistics@supA.com
To: warehouse_manager@voltway.co
Subject: Delay on O5007 – S1 V1 500W Brushless Motor
Date: 2025-03-18 09:24

Hi Team,

I’m writing to let you know that Purchase Order **O5007** (S1 V1 500W Brushless Motor, part P300) is now delayed.  
Our production line experienced a tooling issue last week, so the expected delivery date has shifted from **2025-03-20** to **2025-04-05**.

We apologize for the inconvenience—this is the first time we’ve had a delay of this length.  
Please let me know if you need any interim stock or partial shipment.

Best,  
Ana Torres  
Supply Chain Coordinator  
SupA"""

email_task = Task(
     description=f"""
You are a Supplier Email Analyst.

Extract a supplier delay event from the email below.

Rules for the model field:
- The model must be the short platform code only (e.g. S1, S2, S3).
- If the email contains a longer product name like "S1 V1 500W Brushless Motor",
  extract only the short code (e.g. "S1").
EMAIL:
{email_text}
""",
    agent=email_agent,
    expected_output="Structured supplier delay event in JSON format.",
output_json=SupplierDelayEvent

)
import json

email_result = Crew(
    agents=[email_agent],
    tasks=[email_task]
).kickoff()
print(type(email_result))

email_data = email_result.to_dict()
# json_str = json.dumps(email_data, indent=2)
part_id = email_data["part_id"]
model=email_data['model']
print(f"the type of email data after changing to dict: {type(email_data)}")
context_blob = build_part_context(
    part_id=part_id,
    model=model  # derived from material_master.used_in_models
)
print(f"type of context blob: {type(context_blob)}")
impact_agent = Agent(
    role="Supply Chain Impact & Action Planner",
    goal="Assess operational impact of supply disruptions and recommend actions",
    backstory="Senior ops lead balancing cost, service level, and inventory",
    llm="ollama/llama3.1",
    verbose=True
)
impact_task = Task(
    description=f"""
A supplier delay has been reported.

Operational data : 
{context_blob}


Delay details:
Part ID: {email_data['part_id']}
Delay: {email_data['delay_days']} days
Supplier: {email_data['supplier']}
PO: {email_data['purchase_order_id']}

Using the operational data below:
1. Assess production impact
2. Identify any orders or contracts at risk
3. Recommend concrete next actions

Return a concise, structured response.
""",
    agent=impact_agent,
    expected_output="""
A concise operational summary including:
- Production impact (models and quantities affected)
- Orders or contracts at risk
- Recommended actions (cancel, expedite, reallocate, notify)
"""
)
Crew(
    agents=[impact_agent],
    tasks=[impact_task]
).kickoff()
