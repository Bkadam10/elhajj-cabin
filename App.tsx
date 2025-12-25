
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BookingWizard from './components/BookingWizard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import ScrollReveal from './components/ScrollReveal';
import { TRANSLATIONS } from './constants';
import { fetchServices } from './services/dataService';
import { Service, Language } from './types';

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('fr');
    const [services, setServices] = useState<Service[]>([]);
    const [view, setView] = useState<'home' | 'admin'>('home');
    const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

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

    const handleServiceSelection = (serviceId: string) => {
        setPreselectedServiceId(serviceId);
        const bookingSection = document.querySelector('#booking-section');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (view === 'admin') {
        return <AdminDashboard />;
    }

    return (
        <Layout lang={lang}>
            <Header lang={lang} setLang={setLang} t={t.nav} />
            
            <main>
                <Hero t={t.hero} lang={lang} />
                <About t={t.about} lang={lang} />
                <Services 
                    services={services} 
                    t={t.services} 
                    lang={lang} 
                    onServiceSelect={handleServiceSelection}
                />
                
                <div id="booking-section" className="bg-[#F8F6F4] py-40 relative">
                     <div className="container mx-auto px-6 text-center mb-24">
                        <ScrollReveal>
                            <span className="text-accent font-bold tracking-[0.6em] uppercase text-[10px] mb-8 block">Conciergerie Médicale</span>
                            <h2 className="text-5xl md:text-8xl font-serif font-bold text-primary mb-12 tracking-tighter">Votre Rendez-vous</h2>
                            <div className="w-32 h-px bg-accent/40 mx-auto"></div>
                        </ScrollReveal>
                    </div>
                    <BookingWizard 
                        t={t.booking} 
                        lang={lang} 
                        preselectedServiceId={preselectedServiceId}
                        onResetPreselection={() => setPreselectedServiceId(null)}
                    />
                </div>
            </main>

            <FloatingWhatsapp />
            <Footer t={t.footer} lang={lang} />
        </Layout>
    );
};

export default App;
