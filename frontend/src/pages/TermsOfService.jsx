import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

                <div className="space-y-6 text-gray-600">
                    <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Service Description</h2>
                        <p>
                            Hugo provides an AI-powered dashboard and agent platform designed to streamline workflows, including email automation and data visualization. We reserve the right to modify, suspend, or discontinue the service at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
                        <p>
                            To access certain features, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Intellectual Property</h2>
                        <p>
                            The service and its original content, features, and functionality are and will remain the exclusive property of Hugo and its licensors. The service is protected by copyright, trademark, and other laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Termination</h2>
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
                        <p>
                            In no event shall Hugo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
