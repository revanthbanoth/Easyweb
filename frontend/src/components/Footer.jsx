import { Link } from 'react-router-dom';
import { Zap, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-dark-800 border-t border-white/10 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500/10 blur-md rounded-full" />
                                <img
                                    src="/logo.png"
                                    alt="EasyWeb Logo"
                                    className="w-8 h-8 object-contain relative z-10 mix-blend-screen"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                Easy<span className="gradient-text">Web</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Launch your business website in 24 hours with our premium ready-made templates designed for modern businesses.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.instagram.com/easyweb.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500/50 hover:bg-primary-600/10 transition-all"
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="mailto:officialeasyweb@gmail.com?subject=Inquiry regarding EasyWeb Services"
                                className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500/50 hover:bg-primary-600/10 transition-all"
                                title="Compose Email"
                            >
                                <Mail size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {['Templates', 'Features'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Templates' ? '/templates' : '/#features'}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Contact' ? '/contact' : '/#features'}
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail size={14} className="text-primary-400" />
                                <a href="mailto:officialeasyweb@gmail.com?subject=Inquiry regarding EasyWeb Services" className="hover:text-white transition-colors">
                                    officialeasyweb@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Phone size={14} className="text-primary-400" />
                                <a href="tel:6301094610" className="hover:text-white transition-colors">
                                    +91 6301094610
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin size={14} className="text-primary-400" />
                                Hyderabad, India
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} EasyWeb. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
