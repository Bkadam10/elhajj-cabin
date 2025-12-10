
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Phone, CalendarCheck, Star } from 'lucide-react';

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
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=2000" 
                    alt="Modern Dental Office" 
                    className="w-full h-full object-cover"
                />
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
                <div className="max-w-2xl text-white">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
                            <Star size={14} className="text-accent fill-accent" />
                            <span>#1 Dental Clinic in Meknès</span>
                        </div>
                        
                        <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-[1.1] drop-shadow-sm ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                            {t.title}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed max-w-lg">
                            {t.subtitle}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a 
                                href="#booking" 
                                onClick={(e) => handleScroll(e, '#booking')}
                                className="bg-white text-primary min-w-[180px] px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-xl shadow-black/10 flex items-center justify-center gap-2 group"
                            >
                                <CalendarCheck size={20} className="group-hover:scale-110 transition-transform" />
                                {t.cta_primary}
                            </a>
                            <a 
                                href="tel:+212632872397"
                                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white min-w-[180px] px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all duration-300 font-bold text-lg flex items-center justify-center gap-2"
                            >
                                <Phone size={20} />
                                {t.cta_secondary}
                            </a>
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={0.6}>
                        <div className="mt-12 flex items-center gap-8 text-white/80">
                            <div className="border-l-2 border-accent pl-4">
                                <span className="block text-2xl font-bold text-white">2.5k+</span>
                                <span className="text-sm">Happy Patients</span>
                            </div>
                            <div className="border-l-2 border-accent pl-4">
                                <span className="block text-2xl font-bold text-white">15+</span>
                                <span className="text-sm">Years Experience</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
