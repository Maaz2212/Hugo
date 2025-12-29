import React from 'react';
import OverviewWidget from '../components/OverviewWidget';
import AlertsChart from '../components/AlertsChart';
import AlertsTable from '../components/AlertsTable';
import { alertsData } from '../data/mockdata';
import RevealText from '../components/RevealText';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        <RevealText text="Dashboard Visual Mockup & Quick Reference" />
                    </h1>
                    <p className="text-gray-500 mb-8">Visual Design Preview</p>

                    {/* Top Row: Overview and Chart */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-8">
                        {/* Left Column: Overview Widgets */}
                        <div className="flex-1">
                            <OverviewWidget data={alertsData} />
                            {/* Chart is shown below widgets in the image flow, or effectively taking full width in middle section */}
                            {/* Actually in the image, widgets act as the top row, then a chart section below it, then table. 
                                 Wait, the image shows:
                                 Row 1: 3 Cards (High, Mod, Low)
                                 Row 2: Doughnut Chart (Full width card?)
                                 Row 3: Table
                             */}
                            <AlertsChart data={alertsData} />
                        </div>
                    </div>

                    {/* Bottom Row: Table */}
                    <div className="mb-8">
                        <AlertsTable data={alertsData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
