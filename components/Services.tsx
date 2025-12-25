
import React from 'react';
import { Service, Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Sparkles, Stethoscope, Smile, ArrowRight, ShieldPlus, Activity, HeartPulse } from 'lucide-react';

interface ServicesProps {
    services: Service[];
    t: Translations['services'];
    lang: 'fr' | 'ar';
    onServiceSelect: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ services, t, lang, onServiceSelect }) => {
    const getIcon = (idx: number) => {
        const icons = [
            <Stethoscope strokeWidth={1} />, 
            <Sparkles strokeWidth={1} />, 
            <Smile strokeWidth={1} />,
            <ShieldPlus strokeWidth={1} />,
            <Activity strokeWidth={1} />,
            <HeartPulse strokeWidth={1} />
        ];
        return icons[idx % icons.length];
    };

    return (
        <section id="services" className="py-48 bg-primary relative overflow-hidden">
            {/* Background Texture Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <ScrollReveal className="mb-32">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
                        <div className="max-w-2xl text-left">
                            <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Excellence & Précision</span>
                            <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter leading-[0.9]">
                                {t.title}
                            </h2>
                        </div>
                        <div className="max-w-md">
                            <p className="text-xl text-blue-100/60 font-light leading-relaxed border-l border-white/10 pl-10 italic">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <div 
                                onClick={() => onServiceSelect(service.id)}
                                className="group relative h-[550px] rounded-[60px] overflow-hidden cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-4"
                            >
                                {/* Static Base Background */}
                                <div className="absolute inset-0 bg-white/[0.03] border border-white/10 backdrop-blur-3xl transition-all duration-700 group-hover:bg-white/[0.08] group-hover:border-accent/40"></div>
                                
                                {/* Content Wrapper */}
                                <div className="relative h-full p-12 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-24 h-24 rounded-[30px] border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:bg-accent group-hover:border-accent group-hover:rotate-[15deg]">
                                            {React.cloneElement(getIcon(index) as React.ReactElement, { 
                                                size: 40, 
                                                className: "text-accent transition-all duration-700 group-hover:text-white group-hover:-rotate-[15deg]" 
                                            })}
                                        </div>
                                        <span className="text-white/20 font-serif text-6xl italic transition-all duration-700 group-hover:text-accent/20">0{index + 1}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-white mb-6 group-hover:text-accent transition-colors duration-500 tracking-tight">
                                            {lang === 'fr' ? service.title_fr : service.title_ar}
                                        </h3>
                                        <p className="text-blue-100/40 leading-relaxed font-light text-lg mb-12 transform transition-all duration-700 group-hover:text-blue-100/70">
                                            {lang === 'fr' ? service.description_fr : service.description_ar}
                                        </p>
                                        
                                        {/* Revealable Button */}
                                        <div className="flex items-center gap-6 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                                            <div className="h-px bg-accent w-12"></div>
                                            <span className="text-[11px] font-bold text-accent tracking-[0.4em] uppercase">
                                                {t.book_btn}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Abstract Hover Shadow Glow */}
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
