
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
    t: Translations['hero'];
    lang: 'fr' | 'ar';
}

const Hero: React.FC<HeroProps> = ({ t, lang }) => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Soft, abstract background */}
            <div className="absolute inset-0 bg-[#F5F5F0]">
                {/* Minimal aesthetic image centered but subtle */}
                <div className="absolute right-0 top-0 w-full h-full md:w-1/2 opacity-10 md:opacity-100">
                     <img 
                        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000" 
                        alt="Aesthetic Dental" 
                        className="w-full h-full object-cover grayscale-[20%]"
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0]/20 to-transparent rtl:bg-gradient-to-l"></div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-2xl">
                    <ScrollReveal>
                        <span className="block text-accent uppercase tracking-[0.2em] text-sm mb-4 font-bold">
                            Meknes, Morocco
                        </span>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={0.2}>
                        <h1 className={`text-5xl md:text-7xl font-serif text-secondary mb-8 leading-[1.1] ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {t.title}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <p className="text-lg text-slate-500 mb-10 max-w-md leading-relaxed">
                            {t.subtitle}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.6}>
                        <div className="flex gap-6 items-center">
                            <a 
                                href="#booking" 
                                onClick={(e) => handleScroll(e, '#booking')}
                                className="bg-primary text-white px-8 py-3 rounded-full hover:bg-teal-800 transition-all duration-300 text-sm tracking-wide uppercase shadow-lg shadow-teal-900/10"
                            >
                                {t.cta}
                            </a>
                            <a 
                                href="#contact"
                                onClick={(e) => handleScroll(e, '#booking')}
                                className="text-secondary hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5 cursor-pointer"
                            >
                                +212 555 123 456
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
