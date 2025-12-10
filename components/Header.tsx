
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, Lock } from 'lucide-react';
import { Language, Translations } from '../types';

interface HeaderProps {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Translations['nav'];
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, t }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: t.home, href: '#home' },
        { label: t.about, href: '#about' },
        { label: t.services, href: '#services' },
        { label: t.contact, href: '#booking' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault(); // CRITICAL: Prevent default browser navigation
        setIsOpen(false);

        if (href === '#admin') {
            window.location.hash = 'admin';
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // Optional: update URL without reload
            window.history.pushState(null, '', href);
        }
    };

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100'
            }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="flex items-center gap-2 group"
                >
                    <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-serif font-bold text-xl group-hover:bg-secondary transition-colors">
                        A
                    </div>
                    <div>
                        <span className="text-xl font-bold text-primary block leading-none font-serif">Atlas</span>
                        <span className="text-xs text-secondary font-medium tracking-widest uppercase">Dental Care</span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                    {navLinks.map((link) => (
                        <a 
                            key={link.label} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium text-dark/80 hover:text-primary transition-all relative py-1 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Admin Access Icon */}
                    <a 
                        href="#admin"
                        className="text-stone-400 hover:text-primary transition-colors p-2"
                        title="Admin Portal"
                        onClick={(e) => handleNavClick(e, '#admin')}
                    >
                        <Lock size={18} />
                    </a>

                    <button 
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className="flex items-center gap-1 text-sm font-medium text-dark/70 hover:text-primary transition-colors"
                    >
                        <Globe size={18} />
                        <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
                    </button>
                    <a 
                        href="#booking"
                        onClick={(e) => handleNavClick(e, '#booking')}
                        className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        {t.book}
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button 
                         onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                         className="text-dark/70 hover:text-primary font-bold"
                    >
                        {lang === 'fr' ? 'AR' : 'FR'}
                    </button>
                    <button 
                        className="text-primary hover:text-secondary transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 space-y-6 transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => (
                    <a 
                        key={link.label} 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-2xl font-serif font-bold text-dark hover:text-primary border-b border-gray-100 pb-4"
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href="#booking"
                    onClick={(e) => handleNavClick(e, '#booking')}
                    className="bg-primary text-white w-full py-4 rounded-xl text-center font-bold text-lg shadow-xl"
                >
                    {t.book}
                </a>
                
                <a 
                    href="#admin"
                    onClick={(e) => handleNavClick(e, '#admin')}
                    className="flex items-center gap-2 text-stone-400 mt-4 justify-center p-3 border rounded-lg"
                >
                    <Lock size={18} />
                    <span>Admin Portal</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
