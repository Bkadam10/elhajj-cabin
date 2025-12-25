
import { Menu, X, Globe, Lock, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: t.home, href: '#home' },
        { label: t.about, href: '#about' },
        { label: t.services, href: '#services' },
        { label: t.contact, href: '#booking-section' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsOpen(false);
        e.preventDefault();
        
        // Handle normal section scrolling
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Robust hash navigation for Admin view
    const goToAdmin = () => {
        setIsOpen(false);
        window.location.hash = 'admin';
    };

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-700 ${
                scrolled 
                ? 'bg-white/80 backdrop-blur-2xl py-3 border-b border-gray-100 shadow-xl' 
                : 'bg-transparent py-8 border-b border-transparent'
            }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="flex items-center gap-4 group"
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl transition-all duration-500 group-hover:rotate-[10deg] ${scrolled ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary'}`}>
                        E
                    </div>
                    <div className="hidden sm:block">
                        <span className={`text-2xl font-bold block leading-none font-serif tracking-tight transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white'}`}>Elhajj</span>
                        <span className={`text-[11px] font-bold tracking-[0.4em] uppercase transition-colors duration-500 ${scrolled ? 'text-accent' : 'text-accent/80'}`}>Cabinet</span>
                    </div>
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a 
                            key={link.label} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-500 relative group py-2 ${scrolled ? 'text-gray-600 hover:text-primary' : 'text-white/80 hover:text-white'}`}
                        >
                            {link.label}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-700 group-hover:w-full ${scrolled ? 'bg-accent' : 'bg-accent'}`}></span>
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-4 pr-6 border-r border-gray-100/10">
                        <button 
                            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                            className={`flex items-center gap-2 text-[11px] font-bold transition-all duration-500 uppercase tracking-[0.3em] ${scrolled ? 'text-gray-500 hover:text-primary' : 'text-white/70 hover:text-white'}`}
                        >
                            <Globe size={16} className="text-accent" />
                            <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
                        </button>

                        {/* Programmatic Admin Trigger */}
                        <button 
                            onClick={goToAdmin}
                            className={`p-2 transition-all duration-500 rounded-lg hover:bg-accent/10 ${scrolled ? 'text-gray-300 hover:text-accent' : 'text-white/20 hover:text-accent'}`}
                            title="Administration"
                        >
                            <Lock size={16} />
                        </button>
                    </div>
                    
                    <a 
                        href="#booking-section"
                        onClick={(e) => handleNavClick(e, '#booking-section')}
                        className={`px-10 py-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl hover:-translate-y-1.5 flex items-center gap-3 ${
                            scrolled 
                            ? 'bg-primary text-white hover:bg-secondary' 
                            : 'bg-white text-primary hover:bg-accent hover:text-white'
                        }`}
                    >
                        {t.book}
                        <ArrowRight size={16} />
                    </a>
                </div>

                <div className="md:hidden flex items-center gap-6">
                    <button 
                        className={`p-2 transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Premium Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-primary/98 backdrop-blur-3xl z-40 flex flex-col justify-center items-center space-y-12 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                {navLinks.map((link, idx) => (
                    <a 
                        key={link.label} 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-5xl font-serif font-bold text-white/50 hover:text-white transition-all duration-500 tracking-tighter transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                        {link.label}
                    </a>
                ))}
                
                <div className="flex flex-col items-center gap-8 mt-12">
                    <button 
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className="text-accent text-xl font-bold uppercase tracking-widest"
                    >
                        {lang === 'fr' ? 'Switch to Arabic' : 'تغيير للفرنسية'}
                    </button>
                    
                    <button 
                        onClick={goToAdmin}
                        className="flex items-center gap-3 text-white/30 hover:text-white transition-colors uppercase tracking-[0.4em] text-[10px] font-bold"
                    >
                        <Lock size={14} />
                        Gestion Cabinet
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
