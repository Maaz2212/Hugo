import React from 'react';

const HowToUse = () => {
    const steps = [
        {
            number: '01',
            title: 'Form fill up',
            description: 'Get Started by filling up the form above to creates your account.'
        },
        {
            number: '02',
            title: 'Explore Data',
            description: 'Visit the Dashboard to see real-time data and insights in action.'
        },
        {
            number: '03',
            title: 'Test Agent',
            description: 'Use the Send Email feature for dynamic testing of the AI agent.'
        }
    ];

    return (
        <section id="how-to-use" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">How to Use Hugo</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get started in three simple steps.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block z-0" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl text-center">
                                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-200">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowToUse;
