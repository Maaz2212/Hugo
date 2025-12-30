import React from 'react';

const OverviewWidget = ({ data }) => {
    // Helper to normalize risk level from data which might use 'risk' or 'risk_level'
    const getRisk = (item) => {
        const r = item.risk || item.risk_level;
        return r ? r.toUpperCase() : 'UNKNOWN';
    };

    const highRiskCount = data.filter(item => getRisk(item) === 'HIGH').length;
    const moderateRiskCount = data.filter(item => getRisk(item) === 'MODERATE').length;
    const lowRiskCount = data.filter(item => getRisk(item) === 'LOW').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* High Risk Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded mb-4">
                        HIGH RISK
                    </span>
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-bold text-red-600">{highRiskCount}</span>
                        <span className="text-xl text-gray-500 mb-1">alerts</span>
                    </div>
                </div>
                <div className="text-right text-red-500 font-medium text-sm mt-2">
                    ↑ +1 new
                </div>
            </div>

            {/* Moderate Risk Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                    <span className="inline-block px-3 py-1 bg-yellow-400 text-white text-xs font-bold rounded mb-4">
                        MODERATE RISK
                    </span>
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-bold text-yellow-400">{moderateRiskCount}</span>
                        <span className="text-xl text-gray-500 mb-1">alerts</span>
                    </div>
                </div>
            </div>

            {/* Low Risk Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col justify-between">
                <div>
                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded mb-4">
                        LOW RISK
                    </span>
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-bold text-green-500">{lowRiskCount}</span>
                        <span className="text-xl text-gray-500 mb-1">alerts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewWidget;
