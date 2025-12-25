
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
        { icon: <ShieldCheck size={28} />, title: t.features.f1.title, desc: t.features.f1.desc },
        { icon: <Zap size={28} />, title: t.features.f2.title, desc: t.features.f2.desc },
        { icon: <Award size={28} />, title: t.features.f3.title, desc: t.features.f3.desc },
        { icon: <Heart size={28} />, title: t.features.f4.title, desc: t.features.f4.desc },
    ];

    const clinicImages = [
        { url: "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-41.jpg", label: "Zone d'accueil" },
        { url: "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-53.jpg", label: "Cabinet Principal" },
        { url: "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-56.jpg", label: "Espace Soins" }
    ];

    return (
        <section id="about" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
                    <ScrollReveal className="max-w-3xl">
                        <span className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Héritage & Excellence</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-primary leading-[1.1] mb-8">
                            {t.title}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2} className="max-w-md pb-4">
                        <p className="text-lg text-gray-400 font-light italic leading-relaxed border-l-2 border-gray-100 pl-8">
                            "{t.content}"
                        </p>
                    </ScrollReveal>
                </div>

                {/* The Editorial Horizontal Image Row */}
                <ScrollReveal delay={0.3}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {clinicImages.map((img, idx) => (
                            <div 
                                key={idx} 
                                className="group relative h-[600px] overflow-hidden rounded-[40px] shadow-2xl"
                            >
                                <img 
                                    src={img.url} 
                                    alt={img.label} 
                                    className="w-full h-full object-cover transition-transform duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                                    <span className="text-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">Visite Virtuelle</span>
                                    <h3 className="text-white text-2xl font-serif font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-200">{img.label}</h3>
                                    <div className="w-12 h-1 bg-accent mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300 origin-left"></div>
                                </div>
                                {/* Thin elegant border overlay */}
                                <div className="absolute inset-6 border border-white/10 rounded-[30px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Features Grid - Luxury Presentation */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, idx) => (
                        <ScrollReveal key={idx} delay={0.1 * idx}>
                            <div className="group relative p-10 rounded-[40px] bg-[#FDFCFB] hover:bg-primary transition-all duration-700 border border-gray-100 hover:border-primary shadow-sm hover:shadow-2xl hover:-translate-y-4">
                                <div className="w-20 h-20 bg-white shadow-md text-primary rounded-[24px] flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110">
                                    {feature.icon}
                                </div>
                                <h4 className="font-bold text-primary text-xl mb-4 group-hover:text-white transition-colors tracking-tight">{feature.title}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors font-light italic">{feature.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
