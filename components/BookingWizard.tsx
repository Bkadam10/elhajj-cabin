
import React, { useState, useEffect } from 'react';
import { Translations, Service, Appointment } from '../types';
import { fetchServices, fetchAvailableSlots, createAppointment } from '../services/dataService';
import { Calendar, Clock, ChevronRight, ChevronLeft, Check, Loader2, Sparkles, User, Mail, Phone, MessageSquare } from 'lucide-react';

interface BookingWizardProps {
    t: Translations['booking'];
    lang: 'fr' | 'ar';
    preselectedServiceId: string | null;
    onResetPreselection: () => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ t, lang, preselectedServiceId, onResetPreselection }) => {
    const [step, setStep] = useState(1);
    const [services, setServices] = useState<Service[]>([]);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form State
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        fetchServices().then(data => {
            setServices(data);
            // Handle preselection if coming from Services section
            if (preselectedServiceId) {
                const found = data.find(s => s.id === preselectedServiceId);
                if (found) {
                    setSelectedService(found);
                    setStep(2); // Jump directly to date selection
                }
            }
        });
    }, [preselectedServiceId]);

    useEffect(() => {
        if (date) {
            setLoadingSlots(true);
            setTime('');
            fetchAvailableSlots(date).then(slots => {
                setAvailableSlots(slots);
                setLoadingSlots(false);
            });
        }
    }, [date]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => {
        if (step === 2 && preselectedServiceId) {
            onResetPreselection();
            setStep(1);
        } else {
            setStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!selectedService || !date || !time) return;

        setSubmitting(true);
        const appointment: Appointment = {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service_name: lang === 'fr' ? selectedService.title_fr : selectedService.title_ar,
            appointment_date: date,
            appointment_time: time,
            notes: formData.notes,
            status: 'Pending'
        };

        const result = await createAppointment(appointment);
        setSubmitting(false);
        if (result) {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <div className="bg-white p-20 rounded-[80px] text-center border border-accent/20 max-w-4xl mx-auto shadow-[0_50px_100px_rgba(0,0,0,0.08)] animate-in fade-in zoom-in duration-1000">
                <div className="w-32 h-32 bg-accent/5 text-accent rounded-full flex items-center justify-center mx-auto mb-12 border border-accent/30 relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-accent/10"></div>
                    <Check size={64} strokeWidth={1} />
                </div>
                <h3 className="text-5xl md:text-7xl font-serif text-primary mb-8 tracking-tighter">C'est Confirmé</h3>
                <p className="text-2xl text-gray-400 mb-16 font-light max-w-2xl mx-auto leading-relaxed italic">
                    "{t.labels.success_msg}"
                </p>
                <button 
                    onClick={() => {
                        setSuccess(false);
                        setStep(1);
                        setFormData({ name: '', email: '', phone: '', notes: '' });
                        setDate('');
                        setTime('');
                        setSelectedService(null);
                        onResetPreselection();
                    }}
                    className="group relative px-16 py-6 rounded-full bg-primary text-white font-bold tracking-[0.4em] uppercase text-xs overflow-hidden transition-all duration-700 hover:shadow-2xl"
                >
                    <span className="relative z-10">Retour à l'accueil</span>
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                </button>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-6 max-w-6xl">
            {/* Liquid Stepper */}
            <div className="flex justify-between items-center mb-32 relative max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -z-10"></div>
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-6 relative group">
                        <div className={`w-20 h-20 rounded-[35%] flex items-center justify-center transition-all duration-1000 border ${
                            step >= s 
                            ? 'bg-primary border-primary text-white shadow-2xl scale-110' 
                            : 'bg-white border-gray-100 text-gray-300 group-hover:border-accent group-hover:text-accent'
                        } ${step === s ? 'rotate-[20deg]' : ''}`}>
                            <div className={step === s ? '-rotate-[20deg] transition-all duration-700' : ''}>
                                {s === 1 && <Sparkles size={28} strokeWidth={1.5} />}
                                {s === 2 && <Calendar size={28} strokeWidth={1.5} />}
                                {s === 3 && <User size={28} strokeWidth={1.5} />}
                            </div>
                        </div>
                        <span className={`text-[10px] font-bold tracking-[0.5em] uppercase absolute -bottom-12 whitespace-nowrap transition-all duration-700 ${step >= s ? 'text-primary' : 'text-gray-300'}`}>
                            {s === 1 ? t.steps.service : s === 2 ? t.steps.datetime : t.steps.details}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-[80px] shadow-[0_60px_150px_rgba(15,47,87,0.04)] overflow-hidden flex flex-col transition-all duration-1000">
                
                <div className="flex-grow p-12 md:p-24">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-20 duration-1000">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary tracking-tighter">{t.labels.select_service}</h2>
                                <div className="h-px bg-accent/20 flex-grow mx-10 hidden md:block"></div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                                {services.map((svc) => (
                                    <button
                                        key={svc.id}
                                        onClick={() => setSelectedService(svc)}
                                        className={`group relative p-12 text-left rounded-[50px] border transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between min-h-[220px] ${
                                            selectedService?.id === svc.id 
                                            ? 'border-accent bg-accent/[0.03] ring-[20px] ring-accent/[0.02]' 
                                            : 'border-gray-50 bg-[#FCFBFA] hover:border-accent/30 hover:bg-white hover:shadow-2xl hover:-translate-y-4'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <h3 className={`font-serif text-3xl font-bold transition-all duration-700 ${selectedService?.id === svc.id ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                                                    {lang === 'fr' ? svc.title_fr : svc.title_ar}
                                                </h3>
                                                {svc.price && (
                                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase bg-white border border-gray-100 px-4 py-2 rounded-full text-accent shadow-sm">
                                                        {svc.price}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-400 font-light text-base italic leading-relaxed max-w-sm">
                                                {lang === 'fr' ? svc.description_fr : svc.description_ar}
                                            </p>
                                        </div>
                                        
                                        <div className={`mt-10 flex items-center gap-4 transition-all duration-700 ${selectedService?.id === svc.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                                                <Check size={20} strokeWidth={2.5} />
                                            </div>
                                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">Soin Sélectionné</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-20 duration-1000 h-full">
                             <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary tracking-tighter">{t.labels.select_date}</h2>
                                <div className="h-px bg-accent/20 flex-grow mx-10 hidden md:block"></div>
                            </div>
                            
                            <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">
                                <div className="space-y-12">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-8">1. Choisissez le Jour</label>
                                        <div className="relative group">
                                            <input 
                                                type="date" 
                                                value={date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full p-10 border border-gray-100 rounded-[40px] focus:outline-none focus:border-accent focus:ring-[30px] focus:ring-accent/[0.03] text-3xl font-serif bg-[#FCFBFA] transition-all duration-700 group-hover:shadow-xl cursor-pointer"
                                            />
                                            <Calendar className="absolute right-10 top-1/2 -translate-y-1/2 text-accent/30 pointer-events-none group-focus-within:text-accent group-hover:scale-110 transition-all" size={32} />
                                        </div>
                                    </div>
                                    <div className="p-10 rounded-[40px] bg-accent/[0.02] border border-accent/10">
                                        <p className="text-sm text-gray-400 font-light italic leading-relaxed">
                                            "Nous vous recommandons de réserver au moins 48 heures à l'avance pour garantir la disponibilité de nos praticiens."
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-8">2. Choisissez l'Heure</label>
                                    {!date ? (
                                        <div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-100 rounded-[60px] p-12 text-center bg-[#FCFBFA]">
                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-50">
                                                <Clock className="text-accent/20" size={32} />
                                            </div>
                                            <p className="text-gray-300 font-serif italic text-lg">En attente d'une date...</p>
                                        </div>
                                    ) : loadingSlots ? (
                                        <div className="flex flex-col items-center justify-center h-[400px]"><Loader2 className="animate-spin text-accent" size={60} strokeWidth={1} /></div>
                                    ) : availableSlots.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-[400px] text-center p-12 bg-red-50/20 rounded-[60px] border border-red-50">
                                            <p className="text-red-900/40 font-bold uppercase tracking-widest text-[10px] mb-4">Journée Complète</p>
                                            <p className="text-red-800/60 italic font-serif text-xl">{t.labels.no_slots}</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-6 h-[400px] overflow-y-auto pr-6 custom-scrollbar">
                                            {availableSlots.map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setTime(slot)}
                                                    className={`p-8 text-sm font-bold tracking-[0.3em] border rounded-[30px] transition-all duration-700 uppercase flex items-center justify-center gap-4 ${
                                                        time === slot 
                                                        ? 'bg-primary border-primary text-white shadow-2xl translate-y-[-8px]' 
                                                        : 'bg-white border-gray-100 text-gray-400 hover:border-accent hover:text-accent hover:bg-accent/[0.03]'
                                                    }`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${time === slot ? 'bg-accent animate-ping' : 'bg-gray-200'}`}></div>
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-20 duration-1000">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary tracking-tighter">Votre Concierge</h2>
                                <div className="h-px bg-accent/20 flex-grow mx-10 hidden md:block"></div>
                            </div>
                            
                            <div className="grid lg:grid-cols-5 gap-24">
                                <div className="lg:col-span-3 space-y-16">
                                    <div className="relative group">
                                        <label className="block text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 transition-all duration-500 group-focus-within:text-primary">{t.labels.name}</label>
                                        <div className="flex items-center gap-8 border-b-2 border-gray-100 group-focus-within:border-primary transition-all duration-700 pb-6">
                                            <User size={24} className="text-gray-200 group-focus-within:text-primary transition-colors" />
                                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Votre Identité" className="w-full bg-transparent focus:outline-none text-4xl font-serif placeholder:text-gray-100" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                                        <div className="relative group">
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 group-focus-within:text-primary">{t.labels.email}</label>
                                            <div className="flex items-center gap-6 border-b-2 border-gray-100 group-focus-within:border-primary transition-all duration-700 pb-6">
                                                <Mail size={22} className="text-gray-200 group-focus-within:text-primary transition-colors" />
                                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@cabinet.ma" className="w-full bg-transparent focus:outline-none text-xl font-serif placeholder:text-gray-100" />
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <label className="block text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 group-focus-within:text-primary">{t.labels.phone}</label>
                                            <div className="flex items-center gap-6 border-b-2 border-gray-100 group-focus-within:border-primary transition-all duration-700 pb-6">
                                                <Phone size={22} className="text-gray-200 group-focus-within:text-primary transition-colors" />
                                                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+212 ..." className="w-full bg-transparent focus:outline-none text-xl font-serif placeholder:text-gray-100" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="block text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-6 group-focus-within:text-primary">{t.labels.notes}</label>
                                        <div className="flex items-start gap-6 border-b-2 border-gray-100 group-focus-within:border-primary transition-all duration-700 pb-6">
                                            <MessageSquare size={22} className="text-gray-200 group-focus-within:text-primary transition-colors mt-2" />
                                            <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Précisez vos besoins..." className="w-full bg-transparent focus:outline-none text-xl font-serif placeholder:text-gray-100 min-h-[120px] resize-none" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="lg:col-span-2">
                                    <div className="bg-primary p-12 rounded-[60px] text-white sticky top-10 shadow-[0_40px_100px_rgba(15,47,87,0.3)] border border-white/5 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                                        
                                        <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-accent mb-12 block">Résumé</span>
                                        <h4 className="text-4xl font-serif font-bold mb-12 border-b border-white/10 pb-10 tracking-tighter">Carte Patient</h4>
                                        
                                        <div className="space-y-10">
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Service</span>
                                                <span className="text-right font-bold text-accent text-lg max-w-[200px]">{lang === 'fr' ? selectedService?.title_fr : selectedService?.title_ar}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Date</span>
                                                <span className="font-bold text-lg">{date}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Heure</span>
                                                <span className="font-bold text-lg">{time}</span>
                                            </div>
                                        </div>

                                        <div className="mt-16 pt-16 border-t border-dashed border-white/10">
                                            <div className="flex items-center gap-4 text-accent mb-4">
                                                <Sparkles size={20} />
                                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Investissement Santé</span>
                                            </div>
                                            <div className="text-5xl font-serif font-bold text-white">
                                                {selectedService?.price || 'Sur Devis'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Aesthetic Footer Controls */}
                <div className="px-12 py-12 md:px-24 md:py-16 bg-[#FDFCFB] border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-10">
                    {step > 1 ? (
                        <button 
                            onClick={handleBack} 
                            className="group flex items-center gap-6 text-gray-400 hover:text-primary transition-all duration-700 font-bold uppercase tracking-[0.5em] text-[10px]"
                        >
                            <div className="w-16 h-16 rounded-[40%] border border-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-700 group-hover:scale-110">
                                <ChevronLeft size={24} />
                            </div>
                            {t.labels.back}
                        </button>
                    ) : <div className="hidden sm:block"></div>}

                    <button
                        onClick={step === 3 ? handleSubmit : handleNext}
                        disabled={
                            (step === 1 && !selectedService) || 
                            (step === 2 && (!date || !time)) ||
                            (step === 3 && (submitting || !formData.name || !formData.phone))
                        }
                        className="group relative bg-primary text-white px-20 py-8 rounded-full font-bold text-[13px] tracking-[0.5em] uppercase shadow-2xl shadow-primary/20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:shadow-primary/40 flex items-center justify-center gap-6 overflow-hidden disabled:opacity-30 disabled:translate-y-0 disabled:shadow-none min-w-[320px]"
                    >
                        <span className="relative z-10 flex items-center gap-6">
                            {submitting ? <Loader2 className="animate-spin" size={24} /> : (
                                <>
                                    {step === 3 ? t.labels.confirm_btn : t.labels.next}
                                    <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform duration-700" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BookingWizard;
