import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, ShoppingCart, Check, Star, Zap } from 'lucide-react';
import { getTemplateById } from '../services/api';

const FEATURES_MAP = {
    Healthcare: ['Appointment Booking System', 'Doctor/Staff Profiles', 'Service Listings', 'Patient Testimonials', 'Contact & Map Integration', 'WhatsApp Chat Button'],
    Fitness: ['Class Schedule Table', 'Trainer Profiles', 'Membership Plans', 'Gallery Section', 'Online Booking', 'Social Media Integration'],
    Restaurant: ['Digital Menu Showcase', 'Online Reservation', 'Chef Profiles', 'Gallery & Ambiance', 'Location & Hours', 'Customer Reviews'],
    Legal: ['Practice Area Pages', 'Attorney Profiles', 'Case Results', 'Consultation Form', 'Blog/Articles Section', 'Client Testimonials'],
    Beauty: ['Service Menu', 'Portfolio Gallery', 'Stylist Profiles', 'Online Booking', 'Before & After Gallery', 'Loyalty Program Info'],
    Education: ['Course Listings', 'Instructor Profiles', 'Enrollment Form', 'Student Testimonials', 'Blog Section', 'Events Calendar'],
    Technology: ['Portfolio Showcase', 'Service Offerings', 'Team Section', 'Client Logos', 'Case Studies', 'Contact Form'],
    'Real Estate': ['Property Listings', 'Agent Profiles', 'Search Filters', 'Virtual Tour Ready', 'Mortgage Calculator', 'Neighborhood Info'],
};

const DEFAULT_FEATURES = ['Fully Responsive Design', 'SEO Optimized Pages', 'Fast Load Speed', 'Contact Form Integration', 'Social Media Links', 'Admin Panel'];

export default function TemplateDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        getTemplateById(id)
            .then((res) => {
                setTemplate(res.data);
                document.title = `${res.data.title} – EasyWeb`;
            })
            .catch(() => setError('Template not found.'))
            .finally(() => setLoading(false));
    }, [id]);

    const features = template ? (FEATURES_MAP[template.category] || DEFAULT_FEATURES) : [];

    if (loading) {
        return (
            <div className="min-h-screen pt-24 bg-dark-900 flex items-center justify-center">
                <div className="glass-card p-10 text-center">
                    <div className="w-12 h-12 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading template...</p>
                </div>
            </div>
        );
    }

    if (error || !template) {
        return (
            <div className="min-h-screen pt-24 bg-dark-900 flex items-center justify-center">
                <div className="glass-card p-10 text-center">
                    <p className="text-5xl mb-4">😕</p>
                    <p className="text-red-300 text-lg mb-4">{error || 'Template not found'}</p>
                    <Link to="/templates" className="btn-primary">Back to Templates</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-16 bg-dark-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Templates
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="rounded-2xl overflow-hidden neon-border">
                            <img
                                src={template.preview_image}
                                alt={template.title}
                                className="w-full object-cover"
                                onError={(e) => {
                                    e.target.src = `https://via.placeholder.com/800x500/1e1b4b/6366f1?text=${encodeURIComponent(template.title)}`;
                                }}
                            />
                        </div>
                        <Link
                            to="/contact"
                            className="flex items-center justify-center gap-2 btn-secondary w-full mt-4"
                        >
                            <MessageSquare size={16} /> Contact Us for Demo
                        </Link>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {/* Category + Rating */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="badge bg-primary-600/20 text-primary-300 border border-primary-500/30">
                                {template.category}
                            </span>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                                <span className="text-sm text-gray-400 ml-1">(4.9)</span>
                            </div>
                        </div>

                        <h1 className="font-display font-black text-4xl text-white mb-4">{template.title}</h1>
                        <p className="text-gray-400 leading-relaxed mb-8">{template.description}</p>

                        {/* Price */}
                        <div className="glass-card p-6 mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                                    <p className="font-display font-black text-5xl gradient-text">₹{Number(template.price).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-emerald-400 text-sm font-semibold">
                                        <Zap size={14} />
                                        Deployment Ready
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1">Final price post-consultation</p>
                                </div>
                            </div>
                            <Link
                                to={`/order?template=${template.id}`}
                                className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4"
                            >
                                <ShoppingCart size={18} /> Request Website
                            </Link>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="font-display font-bold text-white text-lg mb-4">What's Included</h3>
                            <ul className="space-y-3">
                                {features.map((f) => (
                                    <li key={f} className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-primary-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary-500/40">
                                            <Check className="w-3 h-3 text-primary-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
