import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

const plans = [
    {
        id: 'basic',
        name: 'BASIC',
        price: 4999,
        emi: 450,
        features: [
            '1-page website',
            'Mobile responsive',
            'Contact form',
            '1 revision',
            'Delivery in 24 hours',
            'Basic SEO setup',
            '1 month free support'
        ],
        message: "Hi! I'm interested in the Basic plan.",
        popular: false
    },
    {
        id: 'pro',
        name: 'PRO',
        price: 9999,
        emi: 899,
        features: [
            'Up to 5 pages',
            'Mobile responsive',
            'Contact form + WhatsApp button',
            '3 revisions',
            'Delivery in 24 hours',
            'Advanced SEO setup',
            'Google Maps integration',
            '3 months free support'
        ],
        message: "Hi! I'm interested in the Pro plan.",
        popular: true
    },
    {
        id: 'premium',
        name: 'PREMIUM',
        price: 19999,
        emi: 1799,
        features: [
            'Up to 10 pages',
            'Mobile responsive',
            'Contact form + WhatsApp + Chatbot',
            'Unlimited revisions',
            'Delivery in 24 hours',
            'Full SEO optimization',
            'Google Maps + Analytics setup',
            'Payment gateway integration',
            '6 months free support'
        ],
        message: "Hi! I'm interested in the Premium plan.",
        popular: false
    }
];

export default function PricingPlans({ isPreview = false }) {
    const [isEmi, setIsEmi] = useState(false);

    const handleWhatsAppClick = (message) => {
        window.open(`https://wa.me/916302437621?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="w-full">
            {/* Toggle Switch */}
            <div className="flex justify-center mb-12">
                <div className="bg-dark-800 p-1.5 rounded-2xl flex items-center shadow-inner border border-white/5">
                    <button
                        onClick={() => setIsEmi(false)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${!isEmi ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        One-Time Payment
                    </button>
                    <button
                        onClick={() => setIsEmi(true)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isEmi ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        EMI Available
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className={`relative rounded-3xl p-8 flex flex-col h-full bg-dark-800 border transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-primary-500 shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'border-white/10 hover:border-white/20'}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span className="bg-gradient-to-r from-primary-500 to-neon-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className={`text-xl font-display font-bold mb-4 ${plan.popular ? 'text-primary-400' : 'text-white'}`}>
                                {plan.name}
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display font-black text-white">
                                    ₹{isEmi ? plan.emi.toLocaleString() : plan.price.toLocaleString()}
                                </span>
                                <span className="text-gray-400 text-sm font-medium">
                                    {isEmi ? '/mo' : ''}
                                </span>
                            </div>
                            {isEmi && (
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <Info size={12} /> Approx EMI for 12 months
                                </p>
                            )}
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${plan.popular ? 'bg-primary-500/20 text-primary-400' : 'bg-white/10 text-gray-400'}`}>
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-300 text-sm leading-tight">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleWhatsAppClick(plan.message)}
                            className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-primary-600 to-neon-blue text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                        >
                            Get Started
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Note */}
            <div className="text-center mt-8">
                <p className="text-gray-500 text-sm">All prices inclusive of GST. Custom plans available on request.</p>
            </div>
        </div>
    );
}
