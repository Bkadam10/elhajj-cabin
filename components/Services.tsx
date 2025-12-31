
import React from 'react';
import { Service, Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Sparkles, Stethoscope, Smile, ShieldPlus, Activity, HeartPulse } from 'lucide-react';

interface ServicesProps {
    services: Service[];
    t: Translations['services'];
    lang: 'fr' | 'ar';
    onServiceSelect: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ services, t, lang, onServiceSelect }) => {
    const getIcon = (idx: number) => {
        const icons = [<Stethoscope strokeWidth={1} />, <Sparkles strokeWidth={1} />, <Smile strokeWidth={1} />, <ShieldPlus strokeWidth={1} />, <Activity strokeWidth={1} />, <HeartPulse strokeWidth={1} />];
        return icons[idx % icons.length];
    };

    return (
        <section id="services" className="py-24 md:py-48 bg-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-white blur-[100px] md:blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <ScrollReveal className="mb-16 md:mb-32">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-12">
                        <div className="max-w-2xl text-left">
                            <span className="text-accent font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-4 md:mb-8 block">Excellence & Précision</span>
                            <h2 className="text-4xl md:text-8xl font-serif font-bold text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                                {t.title}
                            </h2>
                        </div>
                        <div className="max-w-md hidden md:block">
                            <p className="text-xl text-blue-100/60 font-light leading-relaxed border-l border-white/10 pl-10 italic">
                                {t.subtitle}
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.05}>
                            <div 
                                onClick={() => onServiceSelect(service.id)}
                                className="group relative min-h-[350px] md:h-[550px] rounded-[40px] md:rounded-[60px] overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-2 shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-white/[0.03] border border-white/10 backdrop-blur-3xl group-hover:bg-white/[0.08] transition-all duration-700"></div>
                                <div className="relative h-full p-8 md:p-12 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[30px] border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-700">
                                            {React.cloneElement(getIcon(index) as React.ReactElement, { 
                                                size: 32, className: "text-accent group-hover:text-white" 
                                            })}
                                        </div>
                                        <span className="text-white/10 font-serif text-4xl md:text-6xl italic">0{index + 1}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 md:mb-6 group-hover:text-accent transition-colors tracking-tight">
                                            {lang === 'fr' ? service.title_fr : service.title_ar}
                                        </h3>
                                        <p className="text-blue-100/40 leading-relaxed font-light text-sm md:text-lg mb-8 md:mb-12">
                                            {lang === 'fr' ? service.description_fr : service.description_ar}
                                        </p>
                                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                            <div className="h-px bg-accent w-8"></div>
                                            <span className="text-[9px] font-bold text-accent tracking-[0.3em] uppercase">RÉSERVER</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
