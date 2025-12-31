
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

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });

    useEffect(() => {
        fetchServices().then(data => {
            setServices(data);
            if (preselectedServiceId) {
                const found = data.find(s => s.id === preselectedServiceId);
                if (found) {
                    setSelectedService(found);
                    setStep(2);
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
        const result = await createAppointment({
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service_name: lang === 'fr' ? selectedService.title_fr : selectedService.title_ar,
            appointment_date: date,
            appointment_time: time,
            notes: formData.notes,
            status: 'Pending'
        });
        setSubmitting(false);
        if (result) setSuccess(true);
    };

    if (success) {
        return (
            <div className="bg-white p-8 md:p-20 rounded-[40px] md:rounded-[80px] text-center border border-accent/20 max-w-4xl mx-auto shadow-2xl animate-in fade-in zoom-in duration-1000">
                <div className="w-20 h-20 md:w-32 md:h-32 bg-accent/5 text-accent rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/30 relative">
                    <Check size={40} strokeWidth={1} className="md:hidden" />
                    <Check size={64} strokeWidth={1} className="hidden md:block" />
                </div>
                <h3 className="text-3xl md:text-7xl font-serif text-primary mb-6 tracking-tighter">Confirmé</h3>
                <p className="text-lg md:text-2xl text-gray-400 mb-10 font-light italic leading-relaxed">"{t.labels.success_msg}"</p>
                <button 
                    onClick={() => {
                        setSuccess(false); setStep(1); setDate(''); setTime(''); setSelectedService(null); onResetPreselection();
                    }}
                    className="px-12 py-5 rounded-full bg-primary text-white font-bold tracking-[0.3em] uppercase text-[10px] shadow-xl"
                >
                    Fermer
                </button>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-5 max-w-6xl">
            {/* Liquid Stepper - Rescaled for Mobile */}
            <div className="flex justify-between items-center mb-12 md:mb-32 relative max-w-md md:max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10"></div>
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-3 md:gap-6 relative">
                        <div className={`w-12 h-12 md:w-20 md:h-20 rounded-[35%] flex items-center justify-center transition-all duration-1000 border ${
                            step >= s 
                            ? 'bg-primary border-primary text-white shadow-xl scale-110' 
                            : 'bg-white border-gray-100 text-gray-300'
                        } ${step === s ? 'rotate-[15deg] md:rotate-[20deg]' : ''}`}>
                            <div className={step === s ? '-rotate-[15deg] md:-rotate-[20deg]' : ''}>
                                {s === 1 && <Sparkles size={18} className="md:w-7 md:h-7" />}
                                {s === 2 && <Calendar size={18} className="md:w-7 md:h-7" />}
                                {s === 3 && <User size={18} className="md:w-7 md:h-7" />}
                            </div>
                        </div>
                        <span className={`text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase absolute -bottom-8 md:-bottom-12 whitespace-nowrap ${step >= s ? 'text-primary' : 'text-gray-300'}`}>
                            {s === 1 ? t.steps.service : s === 2 ? t.steps.datetime : t.steps.details}
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-[40px] md:rounded-[80px] shadow-2xl overflow-hidden transition-all duration-1000">
                <div className="p-6 md:p-24">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <h2 className="text-3xl md:text-6xl font-serif font-bold text-primary tracking-tighter mb-10 md:mb-20">{t.labels.select_service}</h2>
                            <div className="grid md:grid-cols-2 gap-4 md:gap-12">
                                {services.map((svc) => (
                                    <button
                                        key={svc.id}
                                        onClick={() => setSelectedService(svc)}
                                        className={`p-6 md:p-12 text-left rounded-[30px] md:rounded-[50px] border transition-all duration-700 ${
                                            selectedService?.id === svc.id 
                                            ? 'border-accent bg-accent/[0.03]' 
                                            : 'border-gray-50 bg-[#FCFBFA] hover:border-accent/30'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className={`font-serif text-xl md:text-3xl font-bold ${selectedService?.id === svc.id ? 'text-primary' : 'text-gray-400'}`}>
                                                {lang === 'fr' ? svc.title_fr : svc.title_ar}
                                            </h3>
                                        </div>
                                        <p className="text-gray-400 text-sm md:text-base italic leading-relaxed">
                                            {lang === 'fr' ? svc.description_fr : svc.description_ar}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-10 duration-700">
                            <h2 className="text-3xl md:text-6xl font-serif font-bold text-primary tracking-tighter mb-10">{t.labels.select_date}</h2>
                            <div className="grid lg:grid-cols-2 gap-10 md:gap-32">
                                <div>
                                    <label className="block text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">1. Choisir le Jour</label>
                                    <input 
                                        type="date" value={date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full p-6 md:p-10 border border-gray-100 rounded-[24px] md:rounded-[40px] focus:outline-none focus:border-accent text-xl md:text-3xl font-serif bg-[#FCFBFA]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6">2. Choisir l'Heure</label>
                                    {!date ? (
                                        <div className="p-10 border-2 border-dashed border-gray-100 rounded-[30px] text-center text-gray-300 italic">Choisir une date...</div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {availableSlots.map(slot => (
                                                <button
                                                    key={slot} onClick={() => setTime(slot)}
                                                    className={`p-4 md:p-8 text-[10px] md:text-xs font-bold tracking-widest border rounded-[20px] transition-all ${
                                                        time === slot ? 'bg-primary border-primary text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'
                                                    }`}
                                                >
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
                        <div className="animate-in fade-in slide-in-from-right-10 duration-700">
                            <h2 className="text-3xl md:text-6xl font-serif font-bold text-primary tracking-tighter mb-10 md:mb-16">Coordonnées</h2>
                            <div className="grid lg:grid-cols-5 gap-10 md:gap-24">
                                <div className="lg:col-span-3 space-y-10">
                                    <div className="border-b border-gray-100 pb-4">
                                        <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-2">{t.labels.name}</label>
                                        <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Votre Nom" className="w-full bg-transparent focus:outline-none text-2xl md:text-4xl font-serif" />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-10">
                                        <div className="border-b border-gray-100 pb-4">
                                            <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-2">Email</label>
                                            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full bg-transparent focus:outline-none text-lg md:text-xl font-serif" />
                                        </div>
                                        <div className="border-b border-gray-100 pb-4">
                                            <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-2">Tél</label>
                                            <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Téléphone" className="w-full bg-transparent focus:outline-none text-lg md:text-xl font-serif" />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="bg-primary p-8 md:p-12 rounded-[30px] md:rounded-[60px] text-white">
                                        <span className="text-[9px] font-bold tracking-widest text-accent mb-8 block uppercase">Résumé</span>
                                        <div className="space-y-6">
                                            <div className="flex justify-between border-b border-white/5 pb-4">
                                                <span className="text-[9px] uppercase text-white/30">Service</span>
                                                <span className="font-bold text-xs">{lang === 'fr' ? selectedService?.title_fr : selectedService?.title_ar}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[9px] uppercase text-white/30">Date / Heure</span>
                                                <span className="font-bold text-xs">{date} • {time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-8 md:px-24 md:py-16 bg-[#FDFCFB] border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                    {step > 1 ? (
                        <button onClick={handleBack} className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                            <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center"><ChevronLeft size={16} /></div>
                            Retour
                        </button>
                    ) : <div className="hidden sm:block"></div>}

                    <button
                        onClick={step === 3 ? handleSubmit : handleNext}
                        disabled={(step === 1 && !selectedService) || (step === 2 && (!date || !time)) || (step === 3 && (submitting || !formData.name || !formData.phone))}
                        className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-full font-bold text-[11px] tracking-widest uppercase shadow-xl flex items-center justify-center gap-4 disabled:opacity-30"
                    >
                        {submitting ? <Loader2 className="animate-spin" size={18} /> : (
                            <>
                                {step === 3 ? t.labels.confirm_btn : t.labels.next}
                                <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BookingWizard;
