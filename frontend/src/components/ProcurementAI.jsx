import React from 'react';

const ProcurementAI = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Table/Dashboard Preview */}
                    <div className="relative">
                        {/* Decorative background blur */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-3xl blur-3xl opacity-30" />

                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* Mini Table Header */}
                            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-500 uppercase">
                                    <div>Company</div>
                                    <div>Category</div>
                                    <div>Location</div>
                                    <div>Status</div>
                                </div>
                            </div>

                            {/* Mini Table Rows */}
                            <div className="divide-y divide-gray-100">
                                <div className="px-6 py-4 grid grid-cols-4 gap-4 items-center text-sm hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">A</div>
                                        <span className="font-medium text-gray-900">4521387 - Plastic Injection in Culture</span>
                                    </div>
                                    <div className="text-gray-600">Molded</div>
                                    <div className="text-gray-600">No Assigned</div>
                                    <div><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Registered</span></div>
                                </div>

                                <div className="px-6 py-4 grid grid-cols-4 gap-4 items-center text-sm hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs font-bold">S</div>
                                        <span className="font-medium text-gray-900">9123456 - Coffee</span>
                                    </div>
                                    <div className="text-gray-600">Molded</div>
                                    <div className="text-gray-600">Registered</div>
                                    <div><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Registered</span></div>
                                </div>

                                <div className="px-6 py-4 grid grid-cols-4 gap-4 items-center text-sm bg-blue-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-purple-600 text-xs font-bold">Z</div>
                                        <span className="font-medium text-gray-900">2311388 - Automotive Supplier</span>
                                    </div>
                                    <div className="text-gray-600">Molded</div>
                                    <div className="text-gray-600">Qualified</div>
                                    <div><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">QUALIFIED</span></div>
                                </div>
                            </div>

                            {/* VAT Breakdown Section */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <h4 className="text-xs font-semibold text-gray-700 mb-3">VAT breakdown</h4>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">No VAT</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">5%</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">8%</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">10%</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">21%</span>
                                        <span className="font-medium text-gray-900">$0.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating checklist card */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-48">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700">Purchasing list</span>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300" checked readOnly />
                                        <span className="text-gray-600">1302 - Calculate reference</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300" checked readOnly />
                                        <span className="text-gray-600">1303 - Calculate rewards</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-gray-600">1302 - Manual</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Generative AI for procurement teams
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Our generative AI <span className="font-semibold text-gray-900">captures, enriches, and makes data accessible</span> with
                            line-item precision—enabling any user to easily identify price discrepancies, fragmented spend, and other procurement-related KPIs.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Everything is easily accessible through a user-friendly chat interface built on secure, proprietary technology.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcurementAI;
