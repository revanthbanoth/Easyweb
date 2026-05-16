import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PricingPlans from '../components/PricingPlans';

const faqs = [
    {
        q: "Is hosting included in the price?",
        a: "Yes! All our plans include free hosting for the first year."
    },
    {
        q: "Can I request changes after delivery?",
        a: "Yes, each plan comes with a set number of revisions. After that, changes are available at a small additional cost."
    },
    {
        q: "Do you provide a custom domain?",
        a: "We help you set up your domain. Domain purchase cost is separate and typically ranges from ₹500–₹1,000/year."
    },
    {
        q: "What if I'm not satisfied?",
        a: "We offer unlimited revisions during the support period until you are 100% happy with your website."
    },
    {
        q: "How does the 24-hour delivery work?",
        a: "Once you confirm your order and share your business details, we deliver your fully working website within 24 hours."
    }
];

export default function Pricing() {
    useEffect(() => {
        document.title = 'Pricing – EasyWeb';
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Pricing Plans</p>
                    <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
                        Simple, Transparent <span className="gradient-text">Pricing</span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Choose the perfect plan for your business. No hidden fees, no surprises.
                    </p>
                </motion.div>
            </div>

            {/* Plans Component */}
            <div className="px-4 sm:px-6 lg:px-8 mb-24">
                <PricingPlans />
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-400">Everything you need to know about our services and billing.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.details
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group glass-card rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-white hover:text-primary-400 transition-colors">
                                {faq.q}
                                <span className="ml-4 flex-shrink-0 bg-white/5 p-2 rounded-full group-open:bg-primary-500/20 group-open:text-primary-400 transition-colors">
                                    <ChevronDown size={16} className="group-open:-rotate-180 transition-transform duration-300" />
                                </span>
                            </summary>
                            <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                {faq.a}
                            </div>
                        </motion.details>
                    ))}
                </div>
            </div>
        </div>
    );
}
