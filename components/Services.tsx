import React from 'react';
import { Service, Translations } from '../types';
import ScrollReveal from './ScrollReveal';

interface ServicesProps {
    services: Service[];
    t: Translations['services'];
    lang: 'fr' | 'ar';
}

const Services: React.FC<ServicesProps> = ({ services, t, lang }) => {
    return (
        <section id="services" className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-stone-100 pb-8">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-4">{t.title}</h2>
                            <p className="text-stone-500">{t.subtitle}</p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <div className="group cursor-default">
                                <span className="text-xs font-bold text-accent mb-2 block">0{index + 1}</span>
                                <h3 className="text-2xl font-serif text-secondary mb-3 group-hover:text-primary transition-colors">
                                    {lang === 'fr' ? service.title_fr : service.title_ar}
                                </h3>
                                <p className="text-stone-500 leading-relaxed font-light">
                                    {lang === 'fr' ? service.description_fr : service.description_ar}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;