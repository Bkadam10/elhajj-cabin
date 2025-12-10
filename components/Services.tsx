
import React from 'react';
import { Service, Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Sparkles, Stethoscope, Smile, ArrowRight, ShieldPlus, Activity, HeartPulse } from 'lucide-react';

interface ServicesProps {
    services: Service[];
    t: Translations['services'];
    lang: 'fr' | 'ar';
}

const Services: React.FC<ServicesProps> = ({ services, t, lang }) => {
    const handleServiceClick = () => {
        const bookingSection = document.querySelector('#booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getIcon = (idx: number) => {
        const icons = [
            <Stethoscope strokeWidth={1.5} />, 
            <Sparkles strokeWidth={1.5} />, 
            <Smile strokeWidth={1.5} />,
            <ShieldPlus strokeWidth={1.5} />,
            <Activity strokeWidth={1.5} />,
            <HeartPulse strokeWidth={1.5} />
        ];
        return icons[idx % icons.length];
    };

    return (
        <section id="services" className="py-32 bg-surface">
            <div className="container mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                            {t.title}
                        </h2>
                        <p className="text-lg text-gray-500">
                            {t.subtitle}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <div 
                                onClick={handleServiceClick}
                                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 cursor-pointer h-full flex flex-col relative overflow-hidden"
                            >
                                {/* Top colored line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:rotate-3">
                                    {React.cloneElement(getIcon(index) as React.ReactElement, { size: 32 })}
                                </div>
                                
                                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors font-serif">
                                    {lang === 'fr' ? service.title_fr : service.title_ar}
                                </h3>
                                
                                <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                                    {lang === 'fr' ? service.description_fr : service.description_ar}
                                </p>
                                
                                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider group-hover:gap-4 transition-all mt-auto">
                                    {t.book_btn} <ArrowRight size={16} />
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
