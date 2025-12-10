
import React, { useState, useEffect } from 'react';
import { Translations, Service, Appointment } from '../types';
import { fetchServices, fetchAvailableSlots, createAppointment } from '../services/dataService';
import { Calendar, Clock, ChevronRight, ChevronLeft, Check, Loader2 } from 'lucide-react';

interface BookingWizardProps {
    t: Translations['booking'];
    lang: 'fr' | 'ar';
}

const BookingWizard: React.FC<BookingWizardProps> = ({ t, lang }) => {
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
        fetchServices().then(setServices);
    }, []);

    useEffect(() => {
        if (date) {
            setLoadingSlots(true);
            setTime(''); // Reset time when date changes
            fetchAvailableSlots(date).then(slots => {
                setAvailableSlots(slots);
                setLoadingSlots(false);
            });
        }
    }, [date]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

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
            <div className="bg-stone-50 p-12 rounded-2xl text-center border border-stone-100 max-w-2xl mx-auto my-20">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} />
                </div>
                <h3 className="text-3xl font-serif text-secondary mb-4">{t.labels.success_title}</h3>
                <p className="text-stone-500 mb-8">{t.labels.success_msg}</p>
                <button 
                    onClick={() => {
                        setSuccess(false);
                        setStep(1);
                        setFormData({ name: '', email: '', phone: '', notes: '' });
                        setDate('');
                        setTime('');
                        setSelectedService(null);
                    }}
                    className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary pb-1"
                >
                    Book Another
                </button>
            </div>
        );
    }

    return (
        <section id="booking" className="py-24 bg-white">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                
                {/* Progress Bar */}
                <div className="flex justify-between mb-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 -z-10"></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex flex-col items-center bg-white px-2 transition-colors ${step >= s ? 'text-primary' : 'text-stone-300'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 mb-2 ${step >= s ? 'border-primary bg-primary text-white' : 'border-stone-200 bg-white'}`}>
                                {s}
                            </div>
                            <span className="text-xs font-bold tracking-widest uppercase hidden md:block">
                                {s === 1 ? t.steps.service : s === 2 ? t.steps.datetime : t.steps.details}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white min-h-[400px]">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-serif text-center mb-10">{t.labels.select_service}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {services.map((svc) => (
                                    <button
                                        key={svc.id}
                                        onClick={() => setSelectedService(svc)}
                                        className={`p-6 text-left border rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg group ${selectedService?.id === svc.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-stone-200'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif text-xl group-hover:text-primary transition-colors">
                                                {lang === 'fr' ? svc.title_fr : svc.title_ar}
                                            </h3>
                                            {svc.price && <span className="text-xs font-bold bg-stone-100 px-2 py-1 rounded text-stone-600">{svc.price}</span>}
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-10 flex justify-end">
                                <button
                                    onClick={handleNext}
                                    disabled={!selectedService}
                                    className="bg-secondary text-white px-8 py-3 rounded-full disabled:opacity-50 hover:bg-black transition-colors flex items-center gap-2"
                                >
                                    {t.labels.next} <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-serif text-center mb-10">{t.labels.select_date}</h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">{t.labels.select_date}</label>
                                    <input 
                                        type="date" 
                                        value={date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full p-4 border border-stone-200 rounded-xl focus:outline-none focus:border-primary text-lg font-serif"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">{t.labels.select_time}</label>
                                    {!date ? (
                                        <div className="text-stone-400 italic p-4 border border-dashed border-stone-200 rounded-xl text-center">
                                            Please select a date first
                                        </div>
                                    ) : loadingSlots ? (
                                        <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
                                    ) : availableSlots.length === 0 ? (
                                        <div className="text-red-500 p-4 bg-red-50 rounded-xl text-center">{t.labels.no_slots}</div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-3">
                                            {availableSlots.map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setTime(slot)}
                                                    className={`py-3 px-2 text-sm border rounded-lg transition-all ${time === slot ? 'bg-primary text-white border-primary' : 'hover:border-primary hover:text-primary border-stone-200'}`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-10 flex justify-between">
                                <button onClick={handleBack} className="text-stone-500 hover:text-black flex items-center gap-2">
                                    <ChevronLeft size={16} /> {t.labels.back}
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!date || !time}
                                    className="bg-secondary text-white px-8 py-3 rounded-full disabled:opacity-50 hover:bg-black transition-colors flex items-center gap-2"
                                >
                                    {t.labels.next} <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
                            <h2 className="text-3xl font-serif text-center mb-10">{t.labels.details}</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.labels.name}</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-primary transition-colors" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.labels.email}</label>
                                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.labels.phone}</label>
                                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-primary transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">{t.labels.notes}</label>
                                    <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-stone-50 border-b border-stone-300 p-3 focus:outline-none focus:border-primary transition-colors" rows={3} />
                                </div>
                                
                                <div className="bg-primary/5 p-6 rounded-xl mt-6 border border-primary/10">
                                    <h4 className="font-serif text-lg mb-2 text-primary">Summary</h4>
                                    <p className="text-sm text-stone-600">
                                        <strong>{lang === 'fr' ? selectedService?.title_fr : selectedService?.title_ar}</strong><br/>
                                        {date} at {time}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-10 flex justify-between">
                                <button onClick={handleBack} className="text-stone-500 hover:text-black flex items-center gap-2">
                                    <ChevronLeft size={16} /> {t.labels.back}
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !formData.name || !formData.email || !formData.phone}
                                    className="bg-primary text-white px-8 py-3 rounded-full disabled:opacity-50 hover:bg-teal-800 transition-colors flex items-center gap-2 shadow-xl shadow-primary/20"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : t.labels.confirm_btn}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BookingWizard;
