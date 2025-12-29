import React from "react";

const logos = [
    { src: "/client_logo_1_1766961525454.png", alt: "Client 1" },
    { src: "/client_logo_2_1766961542646.png", alt: "Client 2" },
    { src: "/client_logo_3_1766961560064.png", alt: "Client 3" },
    { src: "/client_logo_4_1766961576954.png", alt: "Client 4" },
    { src: "/client_logo_5_1766961597326.png", alt: "Client 5" },
];

const Customers = () => {
    return (
        <section id="customers" className="py-16">
            <div className="mx-auto max-w-5xl rounded-xl bg-gray-50 border border-gray-100 px-6 py-10">
                <div className="text-center mb-8">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Trusted by industry leaders
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                        {[...logos, ...logos].map((logo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center px-10"
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-20 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customers;
