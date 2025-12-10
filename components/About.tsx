
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

    return (
        <section id="about" className="py-32 bg-white relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Images */}
                    <div className="relative">
                        <ScrollReveal>
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                                    alt="Dental Clinic Interior" 
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Accent Image */}
                            <div className="absolute -bottom-10 -right-10 w-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 hidden md:block">
                                <img 
                                    src="https://images.unsplash.com/photo-1588776814546-1ffcf4722e99?auto=format&fit=crop&q=80&w=600" 
                                    alt="Happy Patient" 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {/* Decorative Pattern */}
                            <div className="absolute -top-10 -left-10 w-full h-full bg-surface rounded-3xl -z-10"></div>
                        </ScrollReveal>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:pl-10 mt-10 lg:mt-0">
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
