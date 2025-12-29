import React from 'react';

// Text Reveal Animation Component
const RevealText = ({ text, className = "", delayStart = 0 }) => {
    return (
        <span className={`${className}`}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="opacity-0 blur-sm animate-reveal"
                    style={{
                        animation: `reveal 0.5s ease-out forwards`,
                        animationDelay: `${delayStart + (index * 0.05)}s`,
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
};

export default RevealText;
