import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, Zap, CheckCircle, Star, Clock, Shield,
    TrendingUp, Users, Globe, Headphones, ChevronRight,
} from 'lucide-react';
import { getTemplates } from '../services/api';
import TemplateCard from '../components/TemplateCard';

const features = [
    { icon: Clock, title: '24-Hour Kickoff', desc: 'Our team contacts you and starts your project within 24 hours of your request.' },
    { icon: Shield, title: 'Fully Customized', desc: 'We personalize every element with your brand colors, logo, and content.' },
    { icon: TrendingUp, title: 'SEO Optimized', desc: 'Built for search engines from day one. Rank higher and get found online.' },
    { icon: Headphones, title: '30-Day Support', desc: 'Post-launch support for 30 days to fix issues and make tweaks.' },
    { icon: Globe, title: 'Mobile Responsive', desc: 'Every template works perfectly on all screen sizes and devices.' },
    { icon: Users, title: '500+ Happy Clients', desc: 'Trusted by businesses across India to build their online presence.' },
];

const testimonials = [
    {
        name: 'Dr. Priya Sharma',
        role: 'Dental Clinic, Mumbai',
        avatar: 'PS',
        text: 'EasyWeb built my clinic website in less than 24 hours! The design is stunning and my patients love the appointment booking system.',
        rating: 5,
    },
    {
        name: 'Rahul Mehta',
        role: 'FitPro Gym, Pune',
        avatar: 'RM',
        text: 'Incredible quality! My gym website looks like it was built by a top agency. Bookings have increased by 40% since launch.',
        rating: 5,
    },
    {
        name: 'Anita Krishnan',
        role: 'The Spice Table, Bangalore',
        avatar: 'AK',
        text: 'Our restaurant website gets compliments daily. The menu showcase and reservation system works flawlessly.',
        rating: 5,
    },
];

const stats = [
    { value: '500+', label: 'Clients Served' },
    { value: '24hr', label: 'Avg Delivery' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '8+', label: 'Industries' },
];

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

export default function Home() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'EasyWeb – Launch Your Business Website in 24 Hours';
        getTemplates()
            .then((res) => setTemplates((res.data || []).slice(0, 3)))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen">
            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-hero-gradient">
                {/* Glow Orbs */}
                <div className="glow-orb w-[600px] h-[600px] bg-primary-600 -top-40 -left-40" />
                <div className="glow-orb w-[500px] h-[500px] bg-neon-blue top-1/2 -right-40 opacity-10" />
                <div className="glow-orb w-[400px] h-[400px] bg-neon-purple bottom-0 left-1/3 opacity-10" />
                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Landscape Brand Signature */}
                        <div className="flex items-center justify-center gap-6 mb-12 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full scale-125" />
                                <img
                                    src="/logo.png"
                                    alt="EasyWeb Logo"
                                    className="w-16 h-16 md:w-24 md:h-24 object-contain mix-blend-screen relative z-10"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-left border-l border-white/10 pl-6"
                            >
                                <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-widest uppercase mb-1">
                                    Easy<span className="gradient-text">Web</span>
                                </h2>
                                <p className="text-[10px] md:text-xs tracking-[0.3em] text-primary-400 opacity-70 uppercase font-medium">
                                    Build Your Digital Presence
                                </p>
                            </motion.div>
                        </div>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-10"
                        >
                            <Zap className="w-4 h-4 text-neon-blue" />
                            <span className="text-sm text-gray-300">Trusted by 500+ businesses across India</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-display font-black text-5xl md:text-7xl text-white leading-tight mb-6"
                        >
                            Launch Your Business
                            <br />
                            <span className="gradient-text">Website in 24 Hours</span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Premium ready-made websites for clinics, gyms, restaurants and small businesses.
                            Professional design. Expert consultation. Fast deployment.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        >
                            <Link to="/templates" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                                View Templates <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn-secondary flex items-center gap-2 text-base px-8 py-4">
                                Get Started Today
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="glass-card p-4 text-center"
                                >
                                    <p className="text-3xl font-display font-bold gradient-text">{stat.value}</p>
                                    <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section id="features" className="py-24 bg-dark-800 relative overflow-hidden">
                <div className="glow-orb w-96 h-96 bg-primary-700 top-0 right-0 opacity-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div {...fadeUp} viewport={{ once: true }} whileInView={fadeUp.animate} className="text-center mb-16">
                        <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Why EasyWeb?</p>
                        <h2 className="section-title mb-4">Everything You Need to <span className="gradient-text">Win Online</span></h2>
                        <p className="section-subtitle max-w-2xl mx-auto">
                            We handle the tech so you can focus on growing your business.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="glass-card-hover p-6"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-600/30 to-neon-blue/20 rounded-xl flex items-center justify-center mb-4 ring-1 ring-primary-500/20">
                                    <feature.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="font-display font-bold text-white text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POPULAR TEMPLATES ── */}
            <section className="py-24 bg-dark-900 relative overflow-hidden">
                <div className="glow-orb w-96 h-96 bg-neon-blue bottom-0 left-0 opacity-5" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-end justify-between mb-12"
                    >
                        <div>
                            <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Templates</p>
                            <h2 className="section-title">
                                Popular <span className="gradient-text">Templates</span>
                            </h2>
                        </div>
                        <Link to="/templates" className="hidden md:flex items-center gap-2 btn-ghost text-primary-400">
                            View All <ChevronRight size={16} />
                        </Link>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass-card h-80 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates.map((t, i) => (
                                <TemplateCard key={t.id} template={t} index={i} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-10 md:hidden">
                        <Link to="/templates" className="btn-secondary">View All Templates</Link>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-24 bg-dark-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
                        <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                whileHover={{ y: -4 }}
                                className="glass-card-hover p-6"
                            >
                                <div className="flex mb-4">
                                    {[...Array(t.rating)].map((_, idx) => (
                                        <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-neon-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-sm">{t.name}</p>
                                        <p className="text-gray-500 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark-800 to-dark-900" />
                <div className="glow-orb w-96 h-96 bg-primary-600 inset-0 m-auto opacity-20" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-4">Ready to Launch?</p>
                        <h2 className="section-title mb-6">
                            Your Dream Website is <span className="gradient-text">One Click Away</span>
                        </h2>
                        <p className="section-subtitle mb-10 max-w-xl mx-auto">
                            Join 500+ businesses that launched with EasyWeb. No coding needed. No delays.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/templates" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
                                Browse Templates <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn-secondary text-base px-8 py-4">
                                Talk to Us
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                            {['No credit card required', 'Free consultation', '24hr delivery'].map((item) => (
                                <span key={item} className="flex items-center gap-1.5">
                                    <CheckCircle size={14} className="text-primary-400" /> {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
