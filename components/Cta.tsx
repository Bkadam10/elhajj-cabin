
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Calendar } from 'lucide-react';

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
        <section className="py-28 bg-primary relative overflow-hidden text-white">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-10">
                 <img 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000" 
                    alt="Background" 
                    className="w-full h-full object-cover grayscale"
                />
            </div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <ScrollReveal>
                    <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                        {t.title}
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        {t.subtitle}
                    </p>
                    <button 
                        onClick={() => handleScroll('#booking')}
                        className="bg-white text-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                        <Calendar size={20} />
                        {t.button}
                    </button>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Cta;
