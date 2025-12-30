export const alertsData = [
  {
  "extracted_event_category": "quality_issue",
  "email_metadata": {
    "from": "qa-team@supA.com",
    "to": "engineering@voltway.co",
    "subject": "URGENT: Quality Alert on S3 V2 Carbon Fiber Frame",
    "date": "2025-04-18 08:05"
  },
  "evidence_from_operational_data": {
    "stock_levels": "Current stock of 59 units is below the minimum stock level of 71.",
    "open_orders": "An open purchase order for 100 units from SupA is expected on 2025-05-07.",
    "dispatch_params": "The reorder quantity is 165, and the reorder interval is 9 days.",
    "supplier_info": "Supplier SupA has a reliability rating of 0.91 and a lead time of 16 days."
  },
  "risk_level": "high",
  "reasoning": [
    "Current stock (59) is below the minimum required stock level (71).",
    "The quality issue affects a critical component (S3 V2 Carbon Fiber Frame).",
    "Potential for significant production delays due to low stock and ongoing quality issues."
  ],
  "impact": {
    "stock_impact": "Stock levels will further deplete without immediate replenishment, potentially falling below operational needs.",
    "orders_affected": "Upcoming orders for the S3 model may be delayed or cancelled if the quality issue cannot be resolved quickly.",
    "cost_estimate": "Costs will increase due to potential expedited shipping, rework, or sourcing from alternative, possibly more expensive, suppliers."
  },
  "recommendations": [
    {
      "description": "Halt all incoming shipments of P323 from SupA until the quality issue is resolved and validated.",
      "owner": "quality_assurance",
      "priority": "high"
    },
    {
      "description": "Expedite inspection and quarantine of existing stock (59 units) to assess the extent of the quality issue.",
      "owner": "warehouse_operations",
      "priority": "high",
      "due_date_hint": "within 24 hours"
    },
    {
      "description": "Evaluate alternative suppliers for P323, considering lead time and reliability, to mitigate potential shortages.",
      "owner": "procurement",
      "priority": "medium",
      "due_date_hint": "within 3 days"
    }
  ],
  "affected_departments": [
    "quality_assurance",
    "supply_chain",
    "procurement",
    "production",
    "engineering"
  ],
  "id": 1,
  "risk": "HIGH"
}
];