import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Home,
    User,
    ChevronLeft,
    ChevronRight,
    Settings,
    LogOut,
    Mail
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/send-email', icon: Mail, label: 'Send Email' },
        { path: '/profile', icon: User, label: 'Profile' }
    ];

    return (
        <div
            className={`
                h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col
                ${isCollapsed ? 'w-20' : 'w-64'}
                fixed left-0 top-0 z-50
            `}
        >
            {/* Logo Section */}
            <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'px-6'}`}>
                <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                    <img
                        src="/logo1.png"
                        alt="Hugo Logo"
                        className="w-8 h-8 object-contain"
                    />
                    {!isCollapsed && (
                        <span className="text-xl font-bold text-white">
                            Hugo
                        </span>
                    )}
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6">
                <ul className="space-y-2 px-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`
                                        flex items-center px-3 py-3 rounded-lg transition-colors group
                                        ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                                        ${isCollapsed ? 'justify-center' : ''}
                                    `}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <item.icon className={`h-5 w-5 ${!isCollapsed && 'mr-3'} flex-shrink-0`} />
                                    {!isCollapsed && (
                                        <span className="font-medium whitespace-nowrap overflow-hidden">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-gray-800">
                <button
                    onClick={toggleSidebar}
                    className={`
                        w-full flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors
                        ${isCollapsed ? 'justify-center' : ''}
                    `}
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <>
                            <ChevronLeft className="h-5 w-5 mr-3" />
                            <span className="font-medium">Collapse</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
