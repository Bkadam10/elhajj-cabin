
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { ShieldCheck, Zap, Heart, Award } from 'lucide-react';

interface AboutProps {
    t: Translations['about'];
    lang: 'fr' | 'ar';
}

const About: React.FC<AboutProps> = ({ t, lang }) => {
    const features = [
        { icon: <ShieldCheck size={24} />, title: t.features.f1.title, desc: t.features.f1.desc },
        { icon: <Zap size={24} />, title: t.features.f2.title, desc: t.features.f2.desc },
        { icon: <Award size={24} />, title: t.features.f3.title, desc: t.features.f3.desc },
        { icon: <Heart size={24} />, title: t.features.f4.title, desc: t.features.f4.desc },
    ];

    const clinicImages = [
        { url: "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-41.jpg", label: "Accueil" },
        { url: "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-53.jpg", label: "Cabinet" },
        { url: "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-56.jpg", label: "Soins" }
    ];

    return (
        <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12 mb-16 md:mb-24">
                    <ScrollReveal className="max-w-3xl">
                        <span className="text-accent font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-4 md:mb-6 block">Expertise Elhajj</span>
                        <h2 className="text-3xl md:text-7xl font-serif font-bold text-primary leading-tight md:mb-8">
                            {t.title}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2} className="max-w-md">
                        <p className="text-base md:text-lg text-gray-400 font-light italic leading-relaxed md:border-l-2 md:border-gray-100 md:pl-8">
                            {t.content}
                        </p>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-32">
                        {clinicImages.map((img, idx) => (
                            <div key={idx} className="group relative h-[350px] md:h-[600px] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl">
                                <img src={img.url} alt={img.label} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-8 flex flex-col justify-end">
                                    <h3 className="text-white text-xl md:text-2xl font-serif font-bold">{img.label}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
                    {features.map((feature, idx) => (
                        <ScrollReveal key={idx} delay={0.05 * idx}>
                            <div className="p-8 rounded-[30px] bg-[#FDFCFB] border border-gray-100 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white text-primary rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:bg-accent group-hover:text-white transition-all">
                                    {feature.icon}
                                </div>
                                <h4 className="font-bold text-lg mb-2 tracking-tight">{feature.title}</h4>
                                <p className="text-gray-400 group-hover:text-gray-300 text-xs italic font-light">{feature.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
