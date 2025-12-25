
import React, { useState, useEffect } from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Star } from 'lucide-react';

interface HeroProps {
    t: Translations['hero'];
    lang: 'fr' | 'ar';
}

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
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center overflow-hidden bg-primary">
            {/* Ultra-Smooth Background Carousel */}
            {HERO_IMAGES.map((img, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 z-0 transition-opacity duration-[3000ms] ease-in-out ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img 
                        src={img} 
                        alt="Dental Excellence" 
                        className={`w-full h-full object-cover transition-transform duration-[15000ms] ease-linear ${
                            index === currentImageIndex ? 'scale-125' : 'scale-100'
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            ))}

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="max-w-4xl">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-accent/15 backdrop-blur-xl border border-accent/40 text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-10 shadow-2xl animate-pulse">
                            <Star size={14} className="fill-accent" />
                            <span>L'Art du Sourire de Luxe</span>
                        </div>
                        
                        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[0.95] text-white tracking-tighter ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                            {t.title.split(' ').map((word, i) => (
                                <span key={i} className={i === 2 ? 'text-accent italic' : ''}>{word} </span>
                            ))}
                        </h1>
                    </ScrollReveal>
                </div>
            </div>

            {/* Aesthetic Slider Nav */}
            <div className="absolute bottom-12 right-12 z-20 flex flex-col gap-6">
                {HERO_IMAGES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`group relative h-10 w-1 transition-all duration-1000 ${
                            idx === currentImageIndex ? 'bg-accent h-16' : 'bg-white/20 hover:bg-white/50'
                        }`}
                    >
                         <span className={`absolute right-full mr-4 text-[10px] font-bold text-white tracking-widest opacity-0 transition-all duration-500 group-hover:opacity-100 ${idx === currentImageIndex ? 'opacity-100' : ''}`}>
                            0{idx + 1}
                         </span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Hero;
