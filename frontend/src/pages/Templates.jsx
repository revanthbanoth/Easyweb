import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getTemplates } from '../services/api';
import TemplateCard from '../components/TemplateCard';

const CATEGORIES = ['All', 'Healthcare', 'Fitness', 'Restaurant', 'Legal', 'Beauty', 'Education', 'Technology', 'Real Estate'];

export default function Templates() {
    const [templates, setTemplates] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('default');
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Templates – EasyWeb';
        getTemplates()
            .then((res) => {
                setTemplates(res.data || []);
                setFiltered(res.data || []);
            })
            .catch(() => setError('Failed to load templates. Please try again.'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = [...templates];
        if (category !== 'All') result = result.filter((t) => t.category === category);
        if (search.trim()) result = result.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase()));
        if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (sort === 'name') result.sort((a, b) => a.title.localeCompare(b.title));
        setFiltered(result);
    }, [category, search, sort, templates]);

    return (
        <div className="min-h-screen pt-16 bg-dark-900">
            {/* Header */}
            <div className="relative bg-dark-800 border-b border-white/10 py-20 overflow-hidden">
                <div className="glow-orb w-96 h-96 bg-primary-700 -top-20 left-1/2 -translate-x-1/2 opacity-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <p className="text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Collection</p>
                        <h1 className="font-display font-black text-5xl text-white mb-4">
                            Premium <span className="gradient-text">Website Templates</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Choose from our curated collection of industry-specific website templates, built for impact.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Filters */}
            <div className="sticky top-16 z-30 bg-dark-900/90 backdrop-blur-xl border-b border-white/10 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:gap-4 lg:items-center">
                        {/* Search & Sort - Row on mobile */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-1">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name or industry..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="input-field pl-10 text-sm py-3"
                                />
                            </div>

                            {/* Sort */}
                            <div className="relative flex sm:w-48">
                                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="select-field text-sm pl-10 pr-4 py-3 w-full"
                                >
                                    <option value="default">Sort: Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name">Name: A–Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Category pills - Scrollable on mobile */}
                        <div className="flex-1 w-full overflow-hidden">
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all snap-start ${category === cat
                                            ? 'bg-primary-600 border-primary-500 text-white shadow-neon'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-primary-500/50 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Results count */}
                {!loading && (
                    <p className="text-gray-500 text-sm mb-6">
                        Showing <span className="text-white font-semibold">{filtered.length}</span> template{filtered.length !== 1 ? 's' : ''}
                    </p>
                )}

                {error && (
                    <div className="glass-card border-red-500/30 bg-red-500/10 p-6 text-center text-red-300 mb-8">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="glass-card overflow-hidden flex flex-col h-[480px]">
                                <div className="h-52 bg-white/5 animate-pulse" />
                                <div className="p-5 flex-1 space-y-4">
                                    <div className="h-7 w-3/4 bg-white/5 rounded-lg animate-pulse" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                                        <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                                    </div>
                                    <div className="pt-6 border-t border-white/10 mt-auto">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="h-8 w-24 bg-white/5 rounded-lg animate-pulse" />
                                            <div className="h-8 w-16 bg-white/5 rounded-lg animate-pulse" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="h-11 bg-white/5 rounded-xl animate-pulse" />
                                            <div className="h-11 bg-white/5 rounded-xl animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-6xl mb-4">🔍</p>
                        <h3 className="font-display font-bold text-white text-xl mb-2">No templates found</h3>
                        <p className="text-gray-400">Try a different category or search term.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((t, i) => (
                            <TemplateCard key={t.id} template={t} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
