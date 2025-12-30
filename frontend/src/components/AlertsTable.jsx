import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MoreHorizontal, Mail, Zap, User, FileText } from 'lucide-react';

const AlertsTable = ({ data }) => {
    const [expandedId, setExpandedId] = useState(data.length > 0 ? data[0].id : null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getRiskColor = (risk) => {
        switch (risk?.toUpperCase()) {
            case 'HIGH': return 'bg-red-600 text-white';
            case 'MODERATE': return 'bg-yellow-400 text-white'; // White text to match image style usually, or black if too light
            case 'LOW': return 'bg-green-500 text-white';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-11 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-1">Risk</div>
                <div className="col-span-4">Alert Title</div>
                <div className="col-span-2">Affected</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-1">Date</div>
                <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {data.map((alert) => (
                    <div key={alert.id} className="bg-white">
                        {/* Main Row */}
                        <div
                            className={`grid grid-cols-11 gap-4 px-6 py-4 items-center hover:bg-gray-50 cursor-pointer ${expandedId === alert.id ? 'bg-gray-50' : ''}`}
                            onClick={() => toggleExpand(alert.id)}
                        >
                            <div className="col-span-1 flex items-center gap-2">
                                <button className="text-gray-400">
                                    {expandedId === alert.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </button>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getRiskColor(alert.risk)}`}>{alert.risk}</span>
                            </div>
                            <div className="col-span-4">
                                <div className="font-medium text-gray-900 text-sm">{alert.title}</div>
                                <div className="text-xs text-gray-500">{alert.description}</div>
                            </div>
                            <div className="col-span-2 text-sm text-gray-600">{alert.affected}</div>
                            <div className="col-span-2 text-sm text-gray-600">{alert.department}</div>
                            <div className="col-span-1 text-sm text-gray-600">{alert.date}</div>
                            <div className="col-span-1 text-right">
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedId === alert.id && (
                            <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                                <div className="bg-white rounded border border-gray-200 p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

                                    {/* Email Metadata */}
                                    <div className="lg:col-span-1 border-r border-gray-100 pr-4">
                                        <div className="flex items-center gap-2 font-medium text-gray-900 mb-3 text-sm">
                                            <Mail size={16} className="text-gray-500" /> Email Metadata
                                        </div>
                                        <div className="space-y-2 text-xs">
                                            <div className="grid grid-cols-3 gap-1">
                                                <span className="text-gray-500">From:</span>
                                                <span className="col-span-2 font-medium text-gray-800">{alert.email_metadata?.from || 'N/A'}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-1">
                                                <span className="text-gray-500">To:</span>
                                                <span className="col-span-2 text-gray-800">{alert.email_metadata?.to || 'N/A'}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-1">
                                                <span className="text-gray-500">Subject:</span>
                                                <span className="col-span-2 text-gray-800">{alert.email_metadata?.subject || 'N/A'}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-1">
                                                <span className="text-gray-500">Received:</span>
                                                <span className="col-span-2 text-gray-800">{alert.email_metadata?.received || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Analysis */}
                                    <div className="lg:col-span-1 border-r border-gray-100 pr-4">
                                        <div className="flex items-center gap-2 font-medium text-gray-900 mb-3 text-sm">
                                            <Zap size={16} className="text-gray-500" /> AI Analysis
                                        </div>
                                        <ul className="space-y-3 text-xs">
                                            <li className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                                                <span className="text-gray-700">
                                                    <strong>Analysis:</strong> {alert.description}
                                                </span>
                                            </li>
                                            {alert.reasoning?.map((reason, idx) => (
                                                <li key={idx} className="flex gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 mt-1 flex-shrink-0"></div>
                                                    <span className="text-gray-700"><strong>Reasoning:</strong> {reason}</span>
                                                </li>
                                            ))}
                                            {/* Impact (mocked if not structured simply in reasoning or separate) */}
                                            <li className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1 flex-shrink-0"></div>
                                                <span className="text-gray-700"><strong>Impact:</strong> High risk of production stoppage...</span>
                                            </li>
                                            {/* Recommendations */}
                                            {alert.recommendations?.length > 0 && (
                                                <li className="flex gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                                                    <span className="text-gray-700">
                                                        <strong>Recommendations:</strong> {alert.recommendations[0].Description}
                                                    </span>
                                                </li>
                                            )}
                                            <li className="flex gap-2 items-start">
                                                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1 flex-shrink-0"></div>
                                                <div className="flex flex-col w-full">
                                                    <span className="text-gray-700 font-bold">Evidence:</span>
                                                    {alert.evidence_from_operational_data && Object.keys(alert.evidence_from_operational_data).length > 0 ? (
                                                        <div className="mt-2 space-y-3">
                                                            {Object.entries(alert.evidence_from_operational_data).map(([key, value], idx) => (
                                                                <div key={idx} className="bg-gray-50 p-2.5 rounded-md border border-gray-200">
                                                                    <p className="text-gray-700 leading-relaxed mb-1.5">{value}</p>
                                                                    <p className="text-[10px] text-gray-500 font-mono bg-white inline-block px-1.5 py-0.5 rounded border border-gray-200 break-all">
                                                                        {key.replace(/===/g, '').trim()}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500 italic mt-1">No detailed evidence provided.</span>
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Department Assignment & Actions */}
                                    <div className="lg:col-span-1 flex flex-col justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900 mb-3 text-sm">Department Assignment</div>
                                            <div className="mb-4">
                                                <div className="text-xs text-gray-500 mb-1">Primary</div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs overflow-hidden">
                                                        <img src="https://ui-avatars.com/api/?name=Quality+Assurance&background=random" alt="QA" />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-800">Quality Assurance</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Secondary</div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex -space-x-1 overflow-hidden">
                                                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200">
                                                            <img src="https://ui-avatars.com/api/?name=Production&background=random" alt="Prod" />
                                                        </div>
                                                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200">
                                                            <img src="https://ui-avatars.com/api/?name=Procurement&background=random" alt="Proc" />
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-600">Production, Procurement</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4 justify-end">
                                            <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors">
                                                Acknowledge
                                            </button>
                                            <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                                                Assign
                                            </button>
                                            <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors">
                                                Escalate
                                            </button>
                                            <button className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors">
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                <span>Showing {data.length} alerts</span>
                {/* Pagination placeholder */}
                <div className="flex gap-1">
                    <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50" disabled>&lt;</button>
                    <button className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100">&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default AlertsTable;
