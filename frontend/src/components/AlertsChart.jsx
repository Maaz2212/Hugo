import React, { useMemo } from 'react';

const AlertsChart = ({ data }) => {
    const chartData = useMemo(() => {
        const total = data.length;
        if (total === 0) return { total: 0, segments: [] };

        const counts = {
            HIGH: data.filter(d => d.risk === 'HIGH').length,
            MODERATE: data.filter(d => d.risk === 'MODERATE').length,
            LOW: data.filter(d => d.risk === 'LOW').length,
        };

        const radius = 40;
        const circumference = 2 * Math.PI * radius; // ~251.327

        let currentOffset = 0;
        const segments = [];

        // Order: HIGH (Red), MODERATE (Yellow), LOW (Green)
        // or whatever order looks best. Let's do High -> Mod -> Low
        const order = [
            { key: 'HIGH', color: '#dc2626', labelColor: 'text-red-600' },
            { key: 'MODERATE', color: '#fbbf24', labelColor: 'text-yellow-500' },
            { key: 'LOW', color: '#22c55e', labelColor: 'text-green-600' }
        ];

        order.forEach(({ key, color, labelColor }) => {
            const count = counts[key];
            if (count > 0) {
                const percentage = count / total;
                const dashArray = percentage * circumference;
                // stroke-dasharray: length of dash, length of gap
                // gap should be circumference - dashArray (or just full circumference to hide rest)

                segments.push({
                    key,
                    color,
                    labelColor,
                    strokeDasharray: `${dashArray} ${circumference}`,
                    strokeDashoffset: -currentOffset, // Negative to rotate clockwise (or depends on coord system)
                    percentage: Math.round(percentage * 100)
                });

                currentOffset += dashArray;
            }
        });

        return { total, segments };
    }, [data]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center justify-center relative min-h-[300px]">
            <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="10" fill="none" />

                    {chartData.segments.map((segment, idx) => (
                        <circle
                            key={segment.key}
                            cx="50" cy="50" r="40"
                            stroke={segment.color}
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray={segment.strokeDasharray}
                            strokeDashoffset={segment.strokeDashoffset}
                            className="transition-all duration-500 ease-out"
                        />
                    ))}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-gray-500 text-lg font-medium">Total <br /> Alerts: {chartData.total}</span>
                </div>

                {/* Dynamic Labels - Simplified positioning for now (Corners + Bottom) */}
                {/* Visual approximation of positions based on segments is hard without complex trig math in CSS. 
                    We will stick to the previous layout of legend/labels but dynamic values. */}

                {/* Manually placed labels for now, checking if segment exists */}
                {chartData.segments.map(seg => {
                    // Simple hardcoded positions based on type for the mockup feel
                    let posClass = "";
                    if (seg.key === 'HIGH') posClass = "top-0 right-0 transform translate-x-2 -translate-y-2";
                    if (seg.key === 'MODERATE') posClass = "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4";
                    if (seg.key === 'LOW') posClass = "top-0 left-0 transform -translate-x-2 -translate-y-2";

                    return (
                        <div key={seg.key} className={`absolute ${posClass} bg-white px-2 py-1 text-xs font-bold ${seg.labelColor} shadow rounded border border-gray-100`}>
                            {seg.percentage}%
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AlertsChart;
