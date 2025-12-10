
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
        "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-41.jpg",
        "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-53.jpg",
        "https://pwturwmgzhcbhbwfdecl.supabase.co/storage/v1/object/public/clinic%20images/photo_2025-12-11_06-56-56.jpg"
    ];

    return (
        <section id="about" className="py-32 bg-white relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left: Real Clinic Images (Horizontal Grid) */}
                    <div className="relative">
                        <ScrollReveal>
                            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block md:hidden">Our Clinic</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {clinicImages.map((img, idx) => (
                                    <div key={idx} className="relative rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 group">
                                        <img 
                                            src={img} 
                                            alt={`Elhajj Cabinet Interior ${idx + 1}`} 
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
                                    </div>
                                ))}
                            </div>
                            {/* Decorative Background Element */}
                            <div className="absolute -top-10 -left-10 w-full h-full bg-surface rounded-3xl -z-10 opacity-50"></div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:pl-5">
                        <ScrollReveal delay={0.2}>
                            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Who We Are</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                                {t.title}
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed mb-10">
                                {t.content}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-10">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="group">
                                        <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                            {feature.icon}
                                        </div>
                                        <h4 className="font-bold text-dark text-lg mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
