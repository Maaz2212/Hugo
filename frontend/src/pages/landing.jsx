import React from 'react';

import Hero from '../components/Hero';
import Services from '../components/Services';
import Customers from '../components/Customers';
import HowToUse from '../components/HowToUse';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white">

            <main>
                <Hero />
                <Services />
                <HowToUse />
                <Customers />
            </main>

            <footer className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Hugo. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
