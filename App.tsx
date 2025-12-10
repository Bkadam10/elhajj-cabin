
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Cta from './components/Cta';
import BookingWizard from './components/BookingWizard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
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
                <About t={t.about} lang={lang} />
                <Services services={services} t={t.services} lang={lang} />
                <Cta t={t.cta} lang={lang} />
                
                <div className="bg-surface py-20 relative">
                     <div className="container mx-auto px-6 text-center mb-10">
                        <h2 className="text-4xl font-serif font-bold text-primary">{t.booking.steps.details}</h2>
                    </div>
                    <BookingWizard t={t.booking} lang={lang} />
                </div>
            </main>

            <FloatingWhatsapp />
            <Footer t={t.footer} lang={lang} />
        </Layout>
    );
};

export default App;
