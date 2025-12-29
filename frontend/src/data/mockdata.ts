export const alertsData = [
    {
        id: 1,
        status: "NEW",
        risk: "HIGH",
        title: "Quality Alert - S3 V2 Frame",
        description: "Critical reports indicate failure during stress testing; potential supplier manufacturing deviation.",
        affected: "S3 V2 (28 units)",
        department: "QA, Production",
        date: "2h ago",
        extracted_event_category: "quality_issue",
        evidence_from_operational_data: {
            "PART ID: P323 Name: S3 V2 Carbon Fiber Frame Type: assembly Used in models: S3_V2 Status: nan Successor: nan Comment: nan":
                "The product affected by the quality issue is a critical component, as it is used in the S3 V2 model and has no successor products.",
            "=== CURRENT STOCK === location quantity_available WH1 59":
                "Currently, there are 59 units of the affected product in stock at warehouse WH1, which may not be sufficient to meet future demand.",
            "=== DISPATCH PARAMETERS === Min stock level: 71 Reorder quantity: 165 Reorder interval (days): 9":
                "The minimum stock level for this product is set to 71 units, but the current stock level is only 59 units. Additionally, the reorder quantity is set to 165 units, which may lead to overstocking if not managed properly.",
        },
        risk_level: "Moderate",
        reasoning: [
            "The quality issue affects a critical component used in a specific model, potentially leading to production disruptions.",
            "Insufficient stock levels and high reorder quantities increase the risk of stockouts or overstocking, impacting service levels and inventory management.",
        ],
        impact: {
            "Potential Stockout/Overstocking": {
                "Quantity at Risk": 59,
                "Potential Impact on Service Level": "High",
            },
            "Production Disruptions": {
                "Frequency of Occurrence": "Medium",
                "Duration of Disruption": "Short-term",
            },
        },
        recommendations: [
            {
                "Action Type": "Inventory Management",
                "Description":
                    "Adjust the reorder quantity and reorder interval to balance stock levels and minimize the risk of stockouts or overstocking.",
                "Target Department": "Supply Chain Operations",
            },
            {
                "Action Type": "Production Planning",
                "Description":
                    "Review production schedules to ensure adequate inventory levels are maintained for critical components, and implement contingency plans for potential disruptions.",
                "Target Department": "Manufacturing",
            },
        ],
        affected_departments: ["Supply Chain Operations", "Manufacturing"],
        email_metadata: {
            from: "Supplier Quality",
            to: "Procurement Team",
            subject: "Critical Quality Issue - S3 V2 Frame",
            received: "Today, 10:30 AM",
        },
    },
    {
        id: 2,
        status: "",
        risk: "MODERATE",
        title: "Delay - O5007 Motor",
        description: "Shipment delayed by 3 days.",
        affected: "O5007 (50 units)",
        department: "Procurement, Logistics",
        date: "Yesterday",
        extracted_event_category: "delay",
        evidence_from_operational_data: {},
        risk_level: "Low",
        reasoning: ["Minor delay with no immediate impact on production line."],
        impact: {},
        recommendations: [],
        affected_departments: ["Procurement"],
        email_metadata: {
            from: "Logistics Partner",
            to: "Logistics",
            subject: "Shipment Delay Notification",
            received: "Yesterday, 04:15 PM",
        },
    },
    {
        id: 3,
        status: "",
        risk: "HIGH",
        title: "Urgent Cancellation",
        description: "Customer cancelled large order.",
        affected: "All Pending Orders (Supplier X)",
        department: "Procurement",
        date: "2 days ago",
        extracted_event_category: "cancellation",
        evidence_from_operational_data: {},
        risk_level: "High",
        reasoning: ["Immediate revenue impact.", "Excess inventory risk."],
        impact: {},
        recommendations: [],
        affected_departments: ["Sales", "Finance"],
        email_metadata: {
            from: "Sales Team",
            to: "Procurement",
            subject: "Urgent Order Cancellation",
            received: "2 days ago, 09:00 AM",
        },
    },
];
