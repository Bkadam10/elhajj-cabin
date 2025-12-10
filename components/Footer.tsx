import React from 'react';
import { Translations } from '../types';

interface FooterProps {
    t: Translations['footer'];
    lang: 'fr' | 'ar';
}

const Footer: React.FC<FooterProps> = ({ t, lang }) => {
    return (
        <footer className="bg-white py-12 border-t border-stone-100">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="text-2xl font-serif font-bold text-primary">
                    Atlas<span className="text-accent">.</span>
                </div>
                
                <div className="text-sm text-stone-500 font-light text-center md:text-right">
                    <p>{t.address}</p>
                    <p className="mt-2">&copy; 2024 Atlas Dental. {t.rights}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;