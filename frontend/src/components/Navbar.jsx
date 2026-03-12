import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Templates', path: '/templates' },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();


    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setMenuOpen(false), [location]);


    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/10 shadow-glass'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img
                                src="/logo.png"
                                alt="EasyWeb Logo"
                                className="w-8 h-8 object-contain relative z-10 mix-blend-screen"
                                onError={(e) => {
                                    // Fallback if logo.png not found
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <span className="font-display font-bold text-lg md:text-xl text-white">
                            Easy<span className="gradient-text">Web</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-0.5 md:gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onMouseEnter={() => {
                                    if (link.path === '/templates') {
                                        import('../services/api').then(({ getTemplates }) => getTemplates());
                                    }
                                }}
                                className={`px-2 md:px-4 py-2 rounded-lg text-[11px] md:text-sm transition-colors ${link.label === 'Home' ? 'hidden md:block' : ''
                                    } ${location.pathname === link.path
                                        ? 'text-white bg-white/10'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center">
                        <Link to="/templates" className="btn-primary text-xs md:text-sm px-5 md:px-7 py-2 md:py-3 font-bold whitespace-nowrap shadow-neon-blue/10">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
