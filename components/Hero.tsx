
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { ChevronDown, Phone } from 'lucide-react';

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
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000" 
                    alt="Modern Dental Office" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay - Dark Blue/Teal Mix */}
                <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <ScrollReveal>
                    <h1 className={`text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-md ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                        {t.title}
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                        {t.subtitle}
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="#booking" 
                            onClick={(e) => handleScroll(e, '#booking')}
                            className="bg-secondary text-white min-w-[200px] px-8 py-4 rounded-full hover:bg-teal-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:-translate-y-1"
                        >
                            {t.cta_primary}
                        </a>
                        <a 
                            href="tel:+212555123456"
                            className="bg-transparent border-2 border-white text-white min-w-[200px] px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
                        >
                            <Phone size={20} />
                            {t.cta_secondary}
                        </a>
                    </div>
                </ScrollReveal>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white/80">
                <ChevronDown size={32} />
            </div>
        </section>
    );
};

export default Hero;
