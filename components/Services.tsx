
import React from 'react';
import { Service, Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { Sparkles, Activity, Smile, ArrowRight } from 'lucide-react';

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

    // Helper to assign random icons since we don't have them in DB yet
    const getIcon = (idx: number) => {
        const icons = [<Sparkles />, <Activity />, <Smile />];
        return icons[idx % icons.length];
    };

    return (
        <section id="services" className="py-24 bg-surface relative">
            <div className="container mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 inline-block relative">
                            {t.title}
                            <div className="h-1 w-20 bg-secondary mx-auto mt-4 rounded-full"></div>
                        </h2>
                        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} delay={index * 0.1}>
                            <div 
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 h-full flex flex-col"
                            >
                                <div className="w-14 h-14 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    {getIcon(index)}
                                </div>
                                
                                <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                                    {lang === 'fr' ? service.title_fr : service.title_ar}
                                </h3>
                                
                                <p className="text-gray-500 leading-relaxed mb-6 flex-grow">
                                    {lang === 'fr' ? service.description_fr : service.description_ar}
                                </p>
                                
                                <button 
                                    onClick={handleServiceClick}
                                    className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest group-hover:gap-3 transition-all"
                                >
                                    {t.book_btn} <ArrowRight size={16} />
                                </button>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
