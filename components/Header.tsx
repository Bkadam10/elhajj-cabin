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
        { label: t.contact, href: '#appointment' },
    ];

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-500 ${
                scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
            }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <a href="#" className={`text-2xl tracking-tighter font-serif font-bold transition-colors ${scrolled ? 'text-primary' : 'text-primary'}`}>
                    Atlas<span className="text-accent">.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10 rtl:space-x-reverse">
                    {navLinks.map((link) => (
                        <a 
                            key={link.label} 
                            href={link.href} 
                            className="text-sm uppercase tracking-widest font-medium text-secondary/80 hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button 
                        onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
                        className="text-xs font-bold border border-secondary/20 px-3 py-1 rounded-full hover:bg-secondary hover:text-white transition-all"
                    >
                        {lang === 'fr' ? 'AR' : 'FR'}
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden text-secondary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center space-y-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.label} 
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif text-secondary hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button 
                        onClick={() => {
                            setLang(lang === 'fr' ? 'ar' : 'fr');
                            setIsOpen(false);
                        }}
                        className="text-sm font-bold border border-secondary px-6 py-2 rounded-full mt-4"
                    >
                        {lang === 'fr' ? 'Switch to Arabic' : 'Passer en Français'}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;