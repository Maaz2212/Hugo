import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import RevealText from '../components/RevealText';

const SendEmail = () => {
    const [formData, setFormData] = useState({
        to_addr: 'warehouse_manager@voltway.co',
        from_addr: 'logistics@supA.com',
        subject: '',
        body: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const templates = [
        {
            name: "Delay Notification",
            subject: "Delay on O5099 – S2 V1 Battery Pack",
            body: "Hi Team,\n\nI'm writing to let you know that Purchase Order **O5099** (S2 V1 Battery Pack) is now delayed.\nDue to a shortage of raw materials, the expected delivery date has shifted from **2025-04-10** to **2025-04-25**.\n\nPlease let me know if this causes major issues."
        },
        {
            name: "Price Update",
            subject: "Price Update for P305 Controller",
            body: "Hello Voltway Team,\n\nEffective **2025-06-01**, the unit price for **P305 Controller** will increase from **$45.00** to **$48.50** due to increased manufacturing costs.\n\nPlease update your systems accordingly."
        }
    ];

    const loadTemplate = (template) => {
        setFormData(prev => ({
            ...prev,
            subject: template.subject,
            body: template.body
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:8000/api/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const data = await response.json();
            setStatus({ type: 'success', message: `Email sent successfully! Saved as ${data.filename}` });
            setFormData(prev => ({ ...prev, subject: '', body: '' }));
        } catch (error) {
            setStatus({ type: 'error', message: 'Error sending email. Is the backend server running?' });
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        <RevealText text="Supplier Email Simulator" />
                    </h1>
                    <p className="mt-2 text-gray-600">Simulate incoming emails from suppliers to test the AI agent's reaction.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Templates Column */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Quick Templates</h3>
                        {templates.map((template, idx) => (
                            <button
                                key={idx}
                                onClick={() => loadTemplate(template)}
                                className="w-full text-left p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all"
                            >
                                <span className="block font-medium text-gray-900">{template.name}</span>
                                <span className="block text-sm text-gray-500 mt-1 truncate">{template.subject}</span>
                            </button>
                        ))}
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">Compose Email</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                        <input
                                            type="email"
                                            name="from_addr"
                                            value={formData.from_addr}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                        <input
                                            type="email"
                                            name="to_addr"
                                            value={formData.to_addr}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Delay on Order #12345"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                                    <textarea
                                        name="body"
                                        rows={8}
                                        value={formData.body}
                                        onChange={handleChange}
                                        required
                                        placeholder="Type your simulated email content here..."
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                                    />
                                </div>

                                {status.message && (
                                    <div className={`p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {status.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                        <span className="text-sm font-medium">{status.message}</span>
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`
                                            flex items-center px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all
                                            ${isSubmitting
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02]'}
                                        `}
                                    >
                                        <Send className="h-5 w-5 mr-2" />
                                        {isSubmitting ? 'Sending...' : 'Simulate Email'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendEmail;
