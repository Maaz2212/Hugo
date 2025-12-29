import React, { useState, useEffect } from 'react';

import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        joinedAt: ''
    });

    useEffect(() => {
        // Load user data from localStorage
        const name = localStorage.getItem('userName') || 'Guest User';
        const email = localStorage.getItem('userEmail') || 'guest@example.com';
        const joinedAt = localStorage.getItem('userJoinedAt') || new Date().toISOString();

        setUserData({ name, email, joinedAt });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="pt-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="px-6 py-8 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <h3 className="text-2xl font-bold text-white">User Profile</h3>
                        <p className="mt-2 text-blue-100">Your personal information</p>
                    </div>

                    <div className="px-6 py-8 sm:p-8">
                        <dl className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                                        <User className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{userData.name}</dd>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{userData.email}</dd>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 text-purple-600">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <dt className="text-sm font-medium text-gray-500">Joined On</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{formatDate(userData.joinedAt)}</dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
