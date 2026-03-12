import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ShoppingCart, Star } from 'lucide-react';

const categoryColors = {
    Healthcare: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
    Fitness: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300',
    Restaurant: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300',
    Legal: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300',
    Beauty: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300',
    Education: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-300',
    Technology: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-300',
    'Real Estate': 'from-green-500/20 to-lime-500/20 border-green-500/30 text-green-300',
};

export default function TemplateCard({ template, index = 0 }) {
    if (!template) return null;
    const badgeClass = categoryColors[template.category] || 'from-gray-500/20 to-gray-500/20 border-gray-500/30 text-gray-300';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card group overflow-hidden flex flex-col"
        >
            {/* Preview Image */}
            <div className="relative overflow-hidden h-52">
                <img
                    src={template.preview_image?.includes('unsplash.com') 
                        ? `${template.preview_image.split('?')[0]}?w=600&q=80&fm=webp&fit=crop`
                        : template.preview_image
                    }
                    alt={template.title}
                    loading="lazy"
                    decodings="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x450/1e1b4b/6366f1?text=${encodeURIComponent(template.title)}`;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 bg-gradient-to-r ${badgeClass} border rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm`}>
                    {template.category}
                </div>
                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-dark-900/80 backdrop-blur-sm border border-white/10 rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-white font-medium">4.9</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-primary-300 transition-colors">
                    {template.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                    {template.description}
                </p>

                <div className="pt-5 border-t border-white/10 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Starting From</p>
                            <p className="text-2xl font-display font-black gradient-text">₹4,999</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Ready to Use</p>
                            <div className="flex items-center justify-end gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            to="/contact"
                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold py-3 rounded-xl transition-all"
                        >
                            <MessageSquare size={14} />
                            Contact
                        </Link>
                        <Link
                            to={`/order?template=${template.id}`}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                        >
                            <ShoppingCart size={14} />
                            Request
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
