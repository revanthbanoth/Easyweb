import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../services/api';

const FAQ = [
    { q: 'How long does it take to deliver my website?', a: 'We deliver fully customized websites within 24 hours of order confirmation.' },
    { q: 'Can I customize the colors and content?', a: 'Absolutely! We personalize every element — brand colors, logo, content, images — to match your business.' },
    { q: 'Is the website mobile-responsive?', a: 'Yes. Every EasyWeb template is fully responsive and tested on all devices and screen sizes.' },
    { q: 'What if I need changes after delivery?', a: 'We offer free revisions for 30 days post-launch. After that, we offer affordable maintenance packages.' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        document.title = 'Contact Us – EasyWeb';
    }, []);

    const handleChange = (e) => {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await submitContactForm(form);
            setSent(true);
        } catch (err) {
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-16 bg-dark-900">
            {/* Hero */}
            <div className="relative bg-dark-800 border-b border-white/10 py-20 overflow-hidden">
                <div className="glow-orb w-80 h-80 bg-primary-700 -top-20 left-1/4 opacity-20" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Get in Touch</p>
                        <h1 className="font-display font-black text-5xl text-white mb-4">
                            Let's <span className="gradient-text">Talk</span>
                        </h1>
                        <p className="text-gray-400 text-lg">Have questions? We'd love to hear from you. Send us a message and we'll respond within 2 hours.</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <h2 className="font-display font-bold text-xl text-white mb-6">Contact Information</h2>
                            {[
                                { icon: Mail, label: 'Email Us', value: 'officialeasyweb@gmail.com', sub: 'We reply within 2 hours' },
                                { icon: Phone, label: 'Call Us', value: '+91 6301094610', sub: 'Mon–Sat, 9am–8pm IST', href: 'tel:6301094610' },
                                { icon: MapPin, label: 'Our Office', value: 'Hyderabad, Telangana', sub: 'India' },
                                { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9am–8pm', sub: 'Sun: 10am–4pm IST' },
                            ].map((item) => (
                                <div key={item.label} className="glass-card-hover p-4 flex items-start gap-4 mb-4">
                                    <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center ring-1 ring-primary-500/30 flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                                        {item.label === 'Email Us' ? (
                                            <a href={`mailto:${item.value}?subject=Contact from Website`} className="text-white font-semibold text-sm hover:text-primary-400 transition-colors">
                                                {item.value}
                                            </a>
                                        ) : item.href ? (
                                            <a href={item.href} className="text-white font-semibold text-sm hover:text-primary-400 transition-colors">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-white font-semibold text-sm">{item.value}</p>
                                        )}
                                        <p className="text-gray-500 text-xs">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {sent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card p-10 text-center h-full flex flex-col items-center justify-center"
                            >
                                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-2 ring-emerald-500/40">
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-white mb-2">Message Sent! 🎉</h3>
                                <p className="text-gray-400 mb-6">Thanks for reaching out! We'll get back to you within 2 hours.</p>
                                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }} className="btn-secondary">
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="w-5 h-5 text-primary-400" />
                                    <h2 className="font-display font-bold text-xl text-white">Send a Message</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2 font-medium">Your Name *</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Rahul Mehta" className="input-field" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2 font-medium">Email *</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="rahul@business.com" className="input-field" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2 font-medium">Phone</label>
                                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 6301094610" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2 font-medium">Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project..." rows={5} className="input-field resize-none" required />
                                </div>
                                {error && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                                        <AlertCircle size={14} /> {error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h2 className="font-display font-bold text-3xl text-white text-center mb-10">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {FAQ.map((item, i) => (
                            <div key={i} className="glass-card overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-semibold text-white text-sm">{item.q}</span>
                                    <motion.span
                                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                                        className="text-primary-400 text-xl font-bold flex-shrink-0 ml-4"
                                    >
                                        +
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{item.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
