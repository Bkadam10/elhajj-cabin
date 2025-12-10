
import React, { useState, useEffect } from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Phone, CalendarCheck, Star } from 'lucide-react';

interface HeroProps {
    t: Translations['hero'];
    lang: 'fr' | 'ar';
}

// Reverted to Premium Stock Images for the Hero Background
const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1598256989626-60ed088716de?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
];

const Hero: React.FC<HeroProps> = ({ t, lang }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000); // Slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center overflow-hidden bg-primary">
            {/* Horizontal Slider Container */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <div 
                    className="flex h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{ 
                        width: `${HERO_IMAGES.length * 100}%`,
                        transform: `translateX(-${(currentImageIndex * 100) / HERO_IMAGES.length}%)` 
                    }}
                >
                    {HERO_IMAGES.map((img, index) => (
                        <div 
                            key={index}
                            className="relative h-full"
                            style={{ width: `${100 / HERO_IMAGES.length}%` }}
                        >
                            <img 
                                src={img} 
                                alt={`Elhajj Cabinet Premium View ${index + 1}`} 
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/30 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content (Static on top of slider) */}
            <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
                <div className="max-w-3xl text-white">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8 shadow-lg">
                            <Star size={14} className="text-accent fill-accent" />
                            <span className="tracking-wide">#1 Dental Clinic in Meknès</span>
                        </div>
                        
                        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] drop-shadow-lg ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                            {t.title}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <p className="text-lg md:text-2xl text-blue-50 mb-12 font-light leading-relaxed max-w-xl border-l-4 border-accent pl-6">
                            {t.subtitle}
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <a 
                                href="#booking" 
                                onClick={(e) => handleScroll(e, '#booking')}
                                className="bg-white text-primary min-w-[200px] px-8 py-5 rounded-full hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group hover:-translate-y-1"
                            >
                                <CalendarCheck size={22} className="group-hover:scale-110 transition-transform text-secondary" />
                                {t.cta_primary}
                            </a>
                            <a 
                                href="tel:+212632872397"
                                className="bg-white/10 backdrop-blur-md border border-white/30 text-white min-w-[200px] px-8 py-5 rounded-full hover:bg-white/20 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 hover:-translate-y-1"
                            >
                                <Phone size={22} />
                                {t.cta_secondary}
                            </a>
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={0.6}>
                        <div className="mt-16 flex items-center gap-10 text-white/90">
                            <div className="group cursor-default">
                                <span className="block text-4xl font-bold text-white mb-1 group-hover:text-accent transition-colors">2.5k+</span>
                                <span className="text-sm font-medium tracking-wider uppercase text-blue-200">Happy Patients</span>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="group cursor-default">
                                <span className="block text-4xl font-bold text-white mb-1 group-hover:text-accent transition-colors">15+</span>
                                <span className="text-sm font-medium tracking-wider uppercase text-blue-200">Years Experience</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3 z-20">
                {HERO_IMAGES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            idx === currentImageIndex 
                                ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                                : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
