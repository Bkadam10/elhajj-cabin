
import React from 'react';
import { Translations } from '../types';
import ScrollReveal from './ScrollReveal';
import { ShieldCheck, Zap, Heart, Wallet } from 'lucide-react';

interface AboutProps {
    t: Translations['about'];
    lang: 'fr' | 'ar';
}

const About: React.FC<AboutProps> = ({ t, lang }) => {
    const features = [
        { icon: <ShieldCheck size={32} />, title: t.features.f1.title, desc: t.features.f1.desc },
        { icon: <Zap size={32} />, title: t.features.f2.title, desc: t.features.f2.desc },
        { icon: <Wallet size={32} />, title: t.features.f3.title, desc: t.features.f3.desc },
        { icon: <Heart size={32} />, title: t.features.f4.title, desc: t.features.f4.desc },
    ];

    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    
                    {/* Left: Text Content */}
                    <div className="lg:w-1/2">
                        <ScrollReveal>
                            <div className="mb-8">
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 relative inline-block">
                                    {t.title}
                                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-accent rounded-full"></span>
                                </h2>
                                <h3 className="text-xl text-secondary font-medium mt-4 mb-6">
                                    {t.subtitle}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {t.content}
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="grid sm:grid-cols-2 gap-6 mt-12">
                            {features.map((feature, idx) => (
                                <ScrollReveal key={idx} delay={idx * 0.1}>
                                    <div className="bg-surface p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                            {feature.icon}
                                        </div>
                                        <h4 className="font-bold text-dark text-lg mb-2">{feature.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="lg:w-1/2 relative">
                        <ScrollReveal delay={0.3}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                                    alt="Clinic Interior" 
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-xl z-0"></div>
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-xl z-0"></div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
