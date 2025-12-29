import React from 'react';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: 'Lightning Fast',
            description: 'Experience blazing fast performance with our optimized infrastructure.',
            icon: <Zap className="h-8 w-8 text-yellow-500" />,
            color: 'bg-yellow-50'
        },
        {
            title: 'Secure & Reliable',
            description: 'Your data is safe with us. We use enterprise-grade encryption.',
            icon: <Shield className="h-8 w-8 text-green-500" />,
            color: 'bg-green-50'
        },
        {
            title: 'Growth Focused',
            description: 'Tools designed to help you scale your business effectively.',
            icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
            color: 'bg-blue-50'
        }
    ];

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Services</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to succeed in one powerful platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className={`inline-flex items-center justify-center p-3 rounded-xl ${service.color} mb-6 transition-transform group-hover:scale-110`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
