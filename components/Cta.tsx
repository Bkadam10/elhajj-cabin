
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';

interface CtaProps {
    t: Translations['cta'];
    lang: 'fr' | 'ar';
}

const Cta: React.FC<CtaProps> = ({ t, lang }) => {
    const handleScroll = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-primary to-teal-700 relative overflow-hidden text-white">
            {/* Decorative Patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <ScrollReveal>
                    <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                        {t.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
                        {t.subtitle}
                    </p>
                    <button 
                        onClick={() => handleScroll('#booking')}
                        className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                        {t.button}
                    </button>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Cta;
