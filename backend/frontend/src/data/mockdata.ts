// Auto-generated mock data for frontend
    // Generated: 2025-12-30 11:26:25


export const alertsData =[{
  "extracted_event_category": "contract_amendment",
  "email_metadata": {
    "from": "contracts@fleet-giant.com",
    "to": "contracts@voltway.co",
    "subject": "Amendment to Framework Contract FC-#S60034",
    "date": "2025-03-25 11:17"
  },
  "evidence_from_operational_data": {
    "stock_levels": "No specific stock level data for affected parts is available.",
    "open_orders": "605 existing fleet framework orders are identified.",
    "dispatch_params": "No specific dispatch parameter changes are noted.",
    "supplier_info": "No detailed supplier data beyond the name 'Fleet Giant' is available."
  },
  "risk_level": "moderate",
  "reasoning": [
    "A contract amendment for FC-#S60034 has been received from supplier Fleet Giant.",
    "There are 605 active fleet framework orders that are likely governed by this contract.",
    "The specific terms of the amendment are currently unknown, creating uncertainty for these orders."
  ],
  "impact": {
    "stock_impact": "Potential delays or changes in part availability could affect inventory levels.",
    "orders_affected": "605 fleet framework orders are potentially subject to new terms or conditions.",
    "cost_estimate": "The amendment might alter pricing, leading to increased or decreased procurement costs."
  },
  "recommendations": [
    {
      "description": "Review the detailed terms of the contract amendment for FC-#S60034.",
      "owner": "Procurement",
      "priority": "High",
      "due_date_hint": "Within 2 business days"
    },
    {
      "description": "Communicate with Fleet Giant to clarify any ambiguities and understand the full impact of the amendment.",
      "owner": "Procurement/Legal",
      "priority": "High",
      "due_date_hint": "Within 3 business days"
    },
    {
      "description": "Assess internal systems and upcoming orders to determine operational adjustments needed due to the amendment.",
      "owner": "Operations/Sales",
      "priority": "Moderate",
      "due_date_hint": "Within 5 business days"
    }
  ],
  "affected_departments": [
    "Procurement",
    "Legal",
    "Operations",
    "Sales"
  ],
  "id": 1
},
  {
  "extracted_event_category": "quality_issue",
  "email_metadata": {
    "from": "qa-team@supA.com",
    "to": "engineering@voltway.co",
    "subject": "URGENT: Quality Alert on S3 V2 Carbon Fiber Frame",
    "date": "2025-04-18 08:05"
  },
  "evidence_from_operational_data": {
    "stock_levels": "WH1: 59 units available",
    "open_orders": "O5042: 100 units ordered from SupA, expected 2025-05-07",
    "dispatch_params": "Min stock level: 71, Reorder quantity: 165, Reorder interval (days): 9",
    "supplier_info": "SupA: Price per unit 51.81, Lead time 6 days, Reliability rating 0.9"
  },
  "risk_level": "high",
  "reasoning": [
    "An urgent quality alert has been issued for P323 (S3 V2 Carbon Fiber Frame) from supplier SupA.",
    "Current stock of P323 (59 units) is below the minimum stock level (71 units).",
    "An open purchase order (O5042) for 100 units from the same supplier (SupA) is pending delivery."
  ],
  "impact": {
    "stock_impact": "Current stock is below the minimum required, and future supply from the affected supplier is at risk.",
    "orders_affected": "Significant delays are likely for orders dependent on the S3 V2 Carbon Fiber Frame.",
    "cost_estimate": "Expedited shipping, potential rework, and lost sales will lead to increased costs."
  },
  "recommendations": [
    {
      "description": "Engage immediately with SupA's QA team to understand the defect's nature, scope, and impact on current open orders.",
      "owner": "Engineering/Procurement",
      "priority": "High",
      "due_date_hint": "Immediately"
    },
    {
      "description": "Evaluate alternative suppliers (e.g., SupB) for an urgent order of P323 to mitigate immediate stock shortages.",
      "owner": "Procurement",
      "priority": "High",
      "due_date_hint": "Within 24 hours"
    },
    {
      "description": "Implement a temporary hold or review on S3_V2 production pending resolution or alternative supply of P323.",
      "owner": "Production",
      "priority": "High",
      "due_date_hint": "Immediately"
    }
  ],
  "affected_departments": [
    "Engineering",
    "Procurement",
    "Production",
    "Sales"
  ],
  "id": 2
},

  {
  "extracted_event_category": "price_update",
  "email_metadata": {
    "from": "sales@supB.com",
    "to": "purchasing@voltway.co",
    "subject": "Price Update for Li-Po 48V 12Ah Battery Pack",
    "date": "2025-04-05 14:02"
  },
  "evidence_from_operational_data": {
    "stock_levels": "WH2: 257 units (Min stock: 41)",
    "open_orders": "No open purchase orders.",
    "dispatch_params": "Min stock level: 41, Reorder quantity: 146, Reorder interval: 13 days.",
    "supplier_info": "SupB: Price 37.99, Lead time 14 days, Reliability 0.79. Alternative SupC: Price 27.21, Lead time 11 days, Reliability 0.92."
  },
  "risk_level": "moderate",
  "reasoning": [
    "The email subject refers to a \"Li-Po 48V 12Ah Battery Pack\", but the event's part ID (P302) and material info identify it as \"S1 V1 Analog Controller ZX\", indicating a critical discrepancy.",
    "The current price from SupB for P302 is 37.99 per unit, which is significantly higher than SupC's offering of 27.21 per unit.",
    "There are no open purchase orders for P302, providing flexibility to reassess sourcing without immediate disruption."
  ],
  "impact": {
    "stock_impact": "Current stock of 257 units for P302 is sufficient, exceeding the minimum level of 41 units.",
    "orders_affected": "No open purchase orders are currently affected by this price notification.",
    "cost_estimate": "A potential cost saving of approximately $10.78 per unit could be realized by switching from SupB to SupC for P302."
  },
  "recommendations": [
    {
      "description": "Clarify the discrepancy between the email subject's product description and the part_id P302 to ensure correct item identification.",
      "owner": "Purchasing",
      "priority": "High",
      "due_date_hint": "Immediate"
    },
    {
      "description": "Conduct a thorough cost-benefit analysis for switching P302 sourcing from SupB to SupC, considering the price difference and reliability ratings.",
      "owner": "Procurement",
      "priority": "High",
      "due_date_hint": "1 week"
    },
    {
      "description": "Review and adjust reorder quantities and intervals for P302, taking into account potential new supplier lead times and cost efficiencies.",
      "owner": "Inventory Management",
      "priority": "Medium",
      "due_date_hint": "2 weeks"
    }
  ],
  "affected_departments": [
    "Procurement",
    "Supply Chain",
    "Inventory Management",
    "Quality Assurance"
  ],
  "id": 3
},

  {
  "error": "429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/usage?tab=rate-limit. \\n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-2.5-flash\\nPlease retry in 13.117710874s.', 'status': 'RESOURCE_EXHAUSTED', 'details': [{'@type': 'type.googleapis.com/google.rpc.Help', 'links': [{'description': 'Learn more about Gemini API quotas', 'url': 'https://ai.google.dev/gemini-api/docs/rate-limits'}]}, {'@type': 'type.googleapis.com/google.rpc.QuotaFailure', 'violations': [{'quotaMetric': 'generativelanguage.googleapis.com/generate_content_free_tier_requests', 'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier', 'quotaDimensions': {'location': 'global', 'model': 'gemini-2.5-flash'}, 'quotaValue': '20'}]}, {'@type': 'type.googleapis.com/google.rpc.RetryInfo', 'retryDelay': '13s'}]}}",
  "status": "failed",
  "timestamp": "2025-12-30 12:01:47",
  "id": 4
},

  {
  "extracted_event_category": "cancellation",
  "email_metadata": {
    "from": "operations@voltway.co",
    "to": "orders@supC.com",
    "subject": "URGENT: Cancel O5021 (Carbon Fiber Frame)",
    "date": "2025-04-10 08:55"
  },
  "evidence_from_operational_data": {
    "stock_levels": "Current stock for P303 is 289 units in WH1.",
    "open_orders": "An open purchase order O5067 for 94 units from SupC is expected on 2025-04-28.",
    "dispatch_params": "Min stock level is 79, reorder quantity is 124.",
    "supplier_info": "Supplier SupC has a price of 136.45, lead time of 8 days, and a reliability rating of 0.86."
  },
  "risk_level": "moderate",
  "reasoning": [
    "The cancellation impacts an open order for part P303.",
    "Current stock levels are above the minimum but the cancellation may affect future replenishment.",
    "SupC is a reliable supplier with a good lead time."
  ],
  "impact": {
    "stock_impact": "Current stock is sufficient, but future orders may be impacted.",
    "orders_affected": "The cancellation of order O5021 needs to be confirmed, and its impact on future supply assessed.",
    "cost_estimate": "No immediate cost impact identified, but reordering may incur different pricing."
  },
  "recommendations": [
    {
      "description": "Confirm cancellation of O5021 with supplier SupC.",
      "owner": "procurement",
      "priority": "high"
    },
    {
      "description": "Review open purchase order O5067 in light of the cancellation and adjust if necessary.",
      "owner": "procurement",
      "priority": "medium"
    },
    {
      "description": "Monitor stock levels for P303 closely following the cancellation.",
      "owner": "supply chain",
      "priority": "medium",
      "due_date_hint": "immediate"
    }
  ],
  "affected_departments": [
    "procurement",
    "supply chain",
    "operations"
  ],
  "id": 5
},

  {
  "extracted_event_category": "price_increase",
  "email_metadata": {
    "from": "sales@supB.com",
    "to": "purchasing@voltway.co",
    "subject": "Price Update for Li-Po 48V 12Ah Battery Pack",
    "date": "2025-12-30 12:40"
  },
  "evidence_from_operational_data": {
    "stock_levels": "Current stock for P302 is 257 units.",
    "open_orders": "There are no open purchase orders for P302.",
    "dispatch_params": "Min stock level is 41, reorder quantity is 146, and reorder interval is 13 days.",
    "supplier_info": "Supplier SupB has a price of 37.99, lead time of 14 days, and reliability rating of 0.79. Alternative suppliers are SupA at 99.82 with 10 days lead time and 0.98 reliability, and SupC at 27.21 with 11 days lead time and 0.92 reliability."
  },
  "risk_level": "high",
  "reasoning": [
    "Significant price increase from SupB for part P302.",
    "SupB's reliability rating (0.79) is lower than alternatives.",
    "No current open purchase orders to absorb the price change."
  ],
  "impact": {
    "stock_impact": "Current stock levels are sufficient for immediate needs but future orders will be impacted by increased cost.",
    "orders_affected": "No immediate impact on open orders as there are none, but future purchase orders will be affected.",
    "cost_estimate": "The cost increase for future orders is substantial due to the price hike from SupB."
  },
  "recommendations": [
    {
      "description": "Evaluate the price increase from SupB and compare with alternative suppliers.",
      "owner": "procurement",
      "priority": "high"
    },
    {
      "description": "Consider switching to a more reliable and cost-effective supplier like SupC if quality is comparable.",
      "owner": "procurement",
      "priority": "high"
    },
    {
      "description": "Place a reorder for P302 before the price increase takes full effect if feasible.",
      "owner": "procurement",
      "priority": "medium",
      "due_date_hint": "within 1-2 days"
    }
  ],
  "affected_departments": [
    "procurement",
    "finance",
    "supply chain"
  ],
  "id": 6
},
];
    