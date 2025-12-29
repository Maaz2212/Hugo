import React from 'react';

const AlertsChart = ({ data }) => {
    // Simplified counts for the visual
    const total = 10; // For demo matching the image "Total Alerts: 10"
    // Logic to compute angles would go here, but for "mockup" fidelity to the image, we can static or semi-static it.
    // Ideally, use data length.
    const realTotal = data.length || 10;

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center justify-center relative min-h-[300px]">
            <div className="relative w-64 h-64">
                {/* Simple CSS/SVG Doughnut implementation */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="10" fill="none" />

                    {/* Segments - manual dasharrays for mockup look to match 40%, 30%, 30% */}
                    {/* Circumference = 2 * pi * 40 ≈ 251 */}
                    {/* 40% = 100.5, 30% = 75.4 */}

                    {/* Yellow Segment (40%) */}
                    <circle
                        cx="50" cy="50" r="40"
                        stroke="#fbbf24" strokeWidth="10" fill="none"
                        strokeDasharray="100.5 151"
                        strokeDashoffset="0"
                    />

                    {/* Red Segment (30%) */}
                    <circle
                        cx="50" cy="50" r="40"
                        stroke="#dc2626" strokeWidth="10" fill="none"
                        strokeDasharray="75.4 176"
                        strokeDashoffset="-100.5"
                    />

                    {/* Green Segment (30%) */}
                    <circle
                        cx="50" cy="50" r="40"
                        stroke="#22c55e" strokeWidth="10" fill="none"
                        strokeDasharray="75.4 176"
                        strokeDashoffset="-176"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-gray-500 text-lg font-medium">Total <br /> Alerts: {realTotal}</span>
                </div>

                {/* Labels positioned absolutely around - keeping it simple for now or adding if critical */}
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-white px-2 py-1 text-xs font-bold text-green-600 shadow rounded">30%</div>
                <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 bg-white px-2 py-1 text-xs font-bold text-red-600 shadow rounded">30%</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 bg-white px-2 py-1 text-xs font-bold text-yellow-500 shadow rounded">40%</div>
            </div>
        </div>
    );
};

export default AlertsChart;
