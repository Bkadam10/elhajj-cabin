import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
        e.preventDefault();
        setIsOpen(false);
        
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
                scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-stone-100' : 'bg-transparent py-8'
            }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')}
                    className={`text-2xl tracking-tighter font-serif font-bold transition-colors ${scrolled ? 'text-primary' : 'text-primary'}`}
                >
                    Atlas<span className="text-accent">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10 rtl:space-x-reverse">
                    {navLinks.map((link) => (
                        <a 
                            key={link.label} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm uppercase tracking-widest font-medium text-secondary/70 hover:text-primary transition-all duration-300 hover:tracking-[0.15em]"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button 
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className="text-xs font-bold border border-secondary/20 px-4 py-1.5 rounded-full hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    >
                        {lang === 'fr' ? 'AR' : 'FR'}
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-secondary hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => (
                    <a 
                        key={link.label} 
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-3xl font-serif text-secondary hover:text-primary transition-colors"
                    >
                        {link.label}
                    </a>
                ))}
                <button 
                    onClick={() => {
                        setLang(lang === 'fr' ? 'ar' : 'fr');
                        setIsOpen(false);
                    }}
                    className="text-sm font-bold border border-secondary px-8 py-3 rounded-full mt-4 hover:bg-secondary hover:text-white transition-all"
                >
                    {lang === 'fr' ? 'العربية' : 'Français'}
                </button>
            </div>
        </header>
    );
};

export default Header;