
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingWizard from './components/BookingWizard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import { TRANSLATIONS } from './constants';
import { fetchServices } from './services/dataService';
import { Service, Language } from './types';

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('fr');
    const [services, setServices] = useState<Service[]>([]);
    const [view, setView] = useState<'home' | 'admin'>('home');

    const t = TRANSLATIONS[lang];

    useEffect(() => {
        const loadData = async () => {
            try {
                const s = await fetchServices();
                setServices(s);
            } catch (error) {
                console.error("Failed to load data", error);
            }
        };
        loadData();

        const handleHashChange = () => {
            if (window.location.hash === '#admin') setView('admin');
            else setView('home');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (view === 'admin') {
        return <AdminDashboard />;
    }

    return (
        <Layout lang={lang}>
            <Header lang={lang} setLang={setLang} t={t.nav} />
            
            <main>
                <Hero t={t.hero} lang={lang} />
                
                {/* Minimal About Section */}
                <section id="about" className="py-24 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="max-w-4xl mx-auto text-center relative z-10">
                            <ScrollReveal>
                                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-4 block">Our Philosophy</span>
                                <h2 className="text-3xl md:text-5xl font-serif text-secondary mb-8 leading-tight">
                                    {t.hero.subtitle}
                                </h2>
                                <p className="text-lg text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                                    We believe dentistry should be calm, transparent, and aesthetically driven. 
                                    Our clinic is designed to be a sanctuary, not just a medical facility.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

                <Services services={services} t={t.services} lang={lang} />
                
                <div className="bg-stone-50 py-10">
                    <div className="container mx-auto px-6 text-center mb-10">
                        <h2 className="text-4xl font-serif text-secondary">{t.booking.steps.details}</h2>
                    </div>
                    <BookingWizard t={t.booking} lang={lang} />
                </div>
            </main>

            <Footer t={t.footer} lang={lang} />
        </Layout>
    );
};

export default App;
