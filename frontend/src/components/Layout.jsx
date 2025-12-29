import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const getPageTitle = (pathname) => {
        switch (pathname) {
            case '/': return 'Home';
            case '/dashboard': return 'Dashboard';
            case '/profile': return 'Profile';
            case '/send-email': return 'Send Email';
            case '/privacy-policy': return 'Privacy Policy';
            case '/terms-of-service': return 'Terms of Service';
            default: return 'Page';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

            <main
                className={`
                    flex-1 transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'ml-20' : 'ml-64'}
                `}
            >
                {/* Breadcrumb Navigation */}
                <div className="px-8 py-6 text-lg font-bold text-black">
                    Hugo <span className="mx-2">→</span> {getPageTitle(location.pathname)}
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
