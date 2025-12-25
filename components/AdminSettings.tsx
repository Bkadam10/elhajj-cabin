
import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/adminService';
import { ClinicSettings } from '../types';
// Fix: Added Loader2 to imports from lucide-react
import { Settings, Save, MapPin, Phone, Building2, CheckCircle2, Loader2 } from 'lucide-react';

const AdminSettings: React.FC = () => {
    const [settings, setSettings] = useState<Partial<ClinicSettings>>({});
    const [msg, setMsg] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchSettings().then(s => s && setSettings(s)); }, []);

    const handleSave = async () => {
        setSaving(true);
        await updateSettings(settings);
        setSaving(false);
        setMsg('Paramètres enregistrés avec succès!');
        setTimeout(() => setMsg(''), 4000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight mb-2">Paramètres du Cabinet</h1>
                    <p className="text-slate-500 font-medium">Configurez les informations publiques et de contact de votre clinique.</p>
                </div>
            </div>

            <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-200/60 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="relative z-10 space-y-12">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Nom de la Clinique</label>
                            <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={20} />
                                <input 
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-bold transition-all" 
                                    value={settings.clinic_name || ''} 
                                    onChange={e => setSettings({...settings, clinic_name: e.target.value})} 
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Numéro de Contact</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={20} />
                                <input 
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-bold transition-all" 
                                    value={settings.phone || ''} 
                                    onChange={e => setSettings({...settings, phone: e.target.value})} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 ml-1">Adresse Professionnelle</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-5 text-slate-300 group-focus-within:text-accent transition-colors" size={20} />
                            <textarea 
                                rows={3}
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-bold transition-all resize-none" 
                                value={settings.address || ''} 
                                onChange={e => setSettings({...settings, address: e.target.value})} 
                            />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                        <button 
                            onClick={handleSave} 
                            disabled={saving}
                            className="w-full sm:w-auto px-12 py-5 bg-primary text-white rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-slate-800 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 group"
                        >
                            {/* Fix: Loader2 is now correctly imported from lucide-react */}
                            {saving ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    <Save size={18} className="group-hover:scale-110 transition-transform" />
                                    Enregistrer les Modifications
                                </>
                            )}
                        </button>
                        
                        {msg && (
                            <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle2 size={18} />
                                <span className="text-sm font-bold tracking-wide">{msg}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="mt-12 p-8 bg-slate-50 rounded-[32px] border border-slate-200/60 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                    <Settings size={28} strokeWidth={1.5} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">Maintenance du Système</h4>
                    <p className="text-sm text-slate-400 font-medium">Les changements effectués ici affecteront le pied de page et les informations de contact sur tout le site.</p>
                </div>
            </div>
        </div>
    );
};
export default AdminSettings;
