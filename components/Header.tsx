
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock, ArrowRight } from 'lucide-react';
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
        setIsOpen(false);
        // Special handling for Admin link to allow hash change
        if (href === '#admin') {
             return;
        }
        
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-500 border-b ${
                scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-3' 
                : 'bg-transparent border-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Logo */}
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="flex items-center gap-3 group"
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-xl transition-colors duration-300 ${scrolled ? 'bg-primary text-white' : 'bg-white text-primary shadow-lg'}`}>
                        A
                    </div>
                    <div>
                        <span className={`text-xl font-bold block leading-none font-serif tracking-tight transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white drop-shadow-sm'}`}>Atlas</span>
                        <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-gray-200 drop-shadow-sm'}`}>Dental Care</span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.label} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`text-sm font-semibold tracking-wide transition-all duration-300 relative group py-2 ${scrolled ? 'text-gray-600 hover:text-primary' : 'text-white/90 hover:text-white'}`}
                        >
                            {link.label}
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-primary' : 'bg-white'}`}></span>
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-5">
                    {/* Admin Link */}
                    <a 
                        href="#admin"
                        className={`transition-colors p-2 hover:rotate-12 duration-300 ${scrolled ? 'text-gray-400 hover:text-primary' : 'text-white/70 hover:text-white'}`}
                        title="Dentist Login"
                        onClick={(e) => handleNavClick(e, '#admin')}
                    >
                        <Lock size={16} />
                    </a>

                    <div className={`h-6 w-px ${scrolled ? 'bg-gray-200' : 'bg-white/20'}`}></div>

                    <button 
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className={`flex items-center gap-2 text-xs font-bold transition-colors uppercase tracking-wider ${scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-white/80'}`}
                    >
                        <Globe size={16} />
                        <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
                    </button>
                    
                    <a 
                        href="#booking"
                        onClick={(e) => handleNavClick(e, '#booking')}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:-translate-y-0.5 flex items-center gap-2 ${
                            scrolled 
                            ? 'bg-primary text-white hover:bg-primary/90' 
                            : 'bg-white text-primary hover:bg-gray-100'
                        }`}
                    >
                        {t.book}
                        <ArrowRight size={14} />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button 
                         onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                         className={`font-bold text-sm ${scrolled ? 'text-primary' : 'text-white'}`}
                    >
                        {lang === 'fr' ? 'AR' : 'FR'}
                    </button>
                    <button 
                        className={`transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 flex flex-col justify-center px-8 space-y-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                {navLinks.map((link) => (
                    <a 
                        key={link.label} 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-3xl font-serif font-bold text-primary hover:text-secondary transition-colors"
                    >
                        {link.label}
                    </a>
                ))}
                <div className="w-12 h-1 bg-gray-100 rounded-full"></div>
                <a
                    href="#booking"
                    onClick={(e) => handleNavClick(e, '#booking')}
                    className="bg-primary text-white w-full py-4 rounded-2xl text-center font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                    {t.book}
                </a>
                
                <a 
                    href="#admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-gray-400 justify-center text-sm font-medium"
                >
                    <Lock size={14} />
                    <span>Admin Portal</span>
                </a>
            </div>
        </header>
    );
};

export default Header;
