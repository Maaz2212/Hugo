import React from 'react';


const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder cards */}
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                            {/* Icon placeholder */}
                                            <div className="h-6 w-6" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                                <dd>
                                                    <div className="text-lg font-medium text-gray-900">71,897</div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-700 hover:text-blue-900">
                                            View all
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                        <div className="border-t border-gray-200">
                            <p className="py-4 text-gray-500">No recent activity to show.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
