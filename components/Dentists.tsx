import React from 'react';
import { Dentist, Translations } from '../types';
import ScrollReveal from './ScrollReveal';

interface DentistsProps {
    dentists: Dentist[];
    t: Translations['dentists'];
    lang: 'fr' | 'ar';
}

const Dentists: React.FC<DentistsProps> = ({ dentists, t, lang }) => {
    return (
        <section className="py-32 bg-stone-50">
            <div className="container mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-serif text-secondary mb-3">{t.title}</h2>
                        <div className="w-12 h-0.5 bg-accent mx-auto"></div>
                    </div>
                </ScrollReveal>

                <div className="flex flex-wrap justify-center gap-12">
                    {dentists.map((dentist, index) => (
                        <ScrollReveal key={dentist.id} delay={index * 0.2}>
                            <div className="w-full max-w-xs text-center group">
                                <div className="aspect-[3/4] overflow-hidden rounded-full mx-auto w-48 h-48 mb-6 relative">
                                    <img 
                                        src={dentist.image_url} 
                                        alt={dentist.name} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-xl font-serif text-secondary mb-1">{dentist.name}</h3>
                                <p className="text-xs uppercase tracking-widest text-primary mb-3">{dentist.title}</p>
                                <p className="text-sm text-stone-500 font-light px-4">
                                    {lang === 'fr' ? dentist.bio_fr : dentist.bio_ar}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dentists;