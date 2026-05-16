import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTemplates } from '../services/api';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Templates', path: '/templates' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll background
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
                scrolled
                    ? 'bg-dark-900 border-b border-white/10 shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 md:h-16 flex-nowrap whitespace-nowrap">
                    
                    {/* LEFT: Logo */}
                    <Link to="/" className="flex items-center gap-1.5 md:gap-3 group shrink-0">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img
                                src="/logo.png"
                                alt="EasyWeb Logo"
                                className="w-5 h-5 md:w-8 md:h-8 object-contain relative z-10 mix-blend-screen"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        <span className="font-display font-bold text-sm md:text-xl text-white">
                            Easy<span className="gradient-text">Web</span>
                        </span>
                    </Link>

                    {/* CENTER: Navigation Links */}
                    <div className="flex items-center justify-center flex-1 mx-1 md:mx-8 gap-1.5 sm:gap-3 md:gap-6 shrink">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onMouseEnter={() => {
                                    if (link.path === '/templates') getTemplates();
                                }}
                                className={`text-[10px] sm:text-xs md:text-sm font-medium transition-colors px-1 sm:px-2 md:px-0 py-1 ${
                                    location.pathname === link.path
                                        ? 'text-white border-b border-primary-500 md:border-b-2 md:pb-1'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT: CTA */}
                    <div className="flex items-center shrink-0">
                        <Link 
                            to="/templates" 
                            className="btn-primary text-[10px] md:text-sm px-3 py-1.5 md:px-6 md:py-2.5 font-bold shadow-neon-blue/10 rounded-md md:rounded-xl"
                        >
                            Get Started
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}
