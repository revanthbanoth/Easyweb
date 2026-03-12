import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { getTemplates, createOrder } from '../services/api';

const BUSINESS_CATEGORIES = [
    'Healthcare / Clinic', 'Gym / Fitness', 'Restaurant / Food',
    'Legal / Law Firm', 'Beauty / Salon', 'Education / Academy',
    'Technology / Agency', 'Real Estate', 'Retail / E-commerce',
    'Consulting', 'Other',
];

const initialForm = {
    name: '',
    business_name: '',
    email: '',
    phone: '',
    business_category: '',
    template_id: '',
};

export default function Order() {
    const [searchParams] = useSearchParams();
    const [templates, setTemplates] = useState([]);
    const [form, setForm] = useState({ ...initialForm, template_id: searchParams.get('template') || '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        document.title = 'Request Website – EasyWeb';
        getTemplates()
            .then((res) => setTemplates(res.data || []))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (form.template_id && templates.length) {
            const t = templates.find((t) => String(t.id) === String(form.template_id));
            setSelectedTemplate(t || null);
        }
    }, [form.template_id, templates]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError('');

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                setEmailError('Please enter a valid email address.');
            } else {
                setEmailError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.template_id) {
            setError('Please fill in all required fields.');
            return;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await createOrder(form);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to submit request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-16 bg-dark-900 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-10 max-w-md w-full text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-emerald-500/40"
                    >
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h2 className="font-display font-bold text-2xl text-white mb-3">Request Submitted! 🎉</h2>
                    <p className="text-gray-400 mb-2">
                        Thank you, <span className="text-white font-semibold">{form.name}</span>!
                    </p>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        Your website request has been submitted successfully.
                        Our team will contact you at <span className="text-white font-medium">{form.email}</span> within 24 hours to discuss the details.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link to="/templates" className="btn-primary">
                            Browse More Templates
                        </Link>
                        <Link to="/" className="btn-secondary">
                            Go Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-16 bg-dark-900">
            <div className="relative bg-dark-800 border-b border-white/10 py-16 overflow-hidden">
                <div className="glow-orb w-96 h-96 bg-primary-700 -top-20 right-0 opacity-10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Get Started</p>
                        <h1 className="font-display font-black text-5xl text-white mb-3">
                            Launch Your <span className="gradient-text">Website</span>
                        </h1>
                        <p className="text-gray-400">Fill in your details and we'll contact you within 24 hours to begin your project.</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                            <h2 className="font-display font-bold text-xl text-white mb-2">Your Information</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Dr. Priya Sharma"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Business Name
                                    </label>
                                    <input
                                        type="text"
                                        name="business_name"
                                        value={form.business_name}
                                        onChange={handleChange}
                                        placeholder="Sharma Dental Clinic"
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@business.com"
                                        className={`input-field ${emailError ? 'border-red-500/50 bg-red-500/5' : ''}`}
                                        required
                                    />
                                    {emailError && <p className="text-red-400 text-[10px] mt-1 ml-1">{emailError}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Business Category</label>
                                <div className="relative">
                                    <select
                                        name="business_category"
                                        value={form.business_category}
                                        onChange={handleChange}
                                        className="select-field pr-10 appearance-none"
                                    >
                                        <option value="">Select your industry</option>
                                        {BUSINESS_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Template <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="template_id"
                                        value={form.template_id}
                                        onChange={handleChange}
                                        className="select-field pr-10 appearance-none"
                                        required
                                    >
                                        <option value="">Choose a template</option>
                                        {templates.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.title} – {t.category} (₹4,999)
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                                    >
                                        <AlertCircle size={16} /> {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed shadow-neon"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={18} />
                                        Submit Request
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="glass-card p-6 sticky top-28">
                            <h3 className="font-display font-bold text-white mb-4">Order Summary</h3>

                            {selectedTemplate ? (
                                <>
                                    <img
                                        src={selectedTemplate.preview_image}
                                        alt={selectedTemplate.title}
                                        className="w-full h-32 object-cover rounded-xl mb-4"
                                        onError={(e) => { e.target.src = `https://via.placeholder.com/400x200/1e1b4b/6366f1?text=${encodeURIComponent(selectedTemplate.title)}`; }}
                                    />
                                    <p className="font-semibold text-white mb-1">{selectedTemplate.title}</p>
                                    <p className="text-sm text-gray-400 mb-4">{selectedTemplate.category}</p>
                                    <div className="border-t border-white/10 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Starting Price</span>
                                            <span className="font-display font-bold text-2xl gradient-text">
                                                ₹4,999
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                            Final price will be confirmed after consultation with our team.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Select a template to see order summary</p>
                                </div>
                            )}

                            <div className="mt-6 space-y-2">
                                {['✅ 24-hour delivery', '✅ Free revisions', '✅ 30-day support', '✅ Mobile responsive'].map((item) => (
                                    <p key={item} className="text-xs text-gray-400">{item}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
