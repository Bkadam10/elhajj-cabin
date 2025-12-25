
import React, { useState, useEffect } from 'react';
import { generateBulkSlots, fetchSlots, deleteSlot } from '../services/adminService';
import { Slot, SlotGenerationConfig } from '../types';
import { Loader2, Trash2, Calendar, Clock, Plus, Filter, RotateCcw } from 'lucide-react';

const AdminSlots: React.FC = () => {
    const [config, setConfig] = useState<SlotGenerationConfig>({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        weekdays: [1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '17:00',
        durationMinutes: 60,
        breakStart: '12:00',
        breakEnd: '14:00'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [slots, setSlots] = useState<Slot[]>([]);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => { loadSlots(); }, [filterDate]);
    
    const loadSlots = async () => setSlots(await fetchSlots(filterDate));
    
    const handleGenerate = async () => {
        setLoading(true); setMessage('');
        const res = await generateBulkSlots(config);
        setLoading(false);
        setMessage(res.error ? `Erreur: ${res.error}` : `Succès! ${res.count} créneaux générés.`);
        loadSlots();
    };
    
    const handleDelete = async (id: string) => { 
        if (confirm('Supprimer ce créneau ?')) { 
            await deleteSlot(id); 
            loadSlots(); 
        } 
    };
    
    const toggleDay = (id: number) => {
        const d = config.weekdays;
        setConfig({ ...config, weekdays: d.includes(id) ? d.filter(x => x !== id) : [...d, id] });
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight mb-2">Gestion des Horaires</h1>
                    <p className="text-slate-500 font-medium">Générez et gérez les créneaux de consultation du cabinet.</p>
                </div>
                <button onClick={loadSlots} className="p-3 bg-white text-slate-400 hover:text-accent transition-all rounded-2xl shadow-sm border border-slate-100">
                    <RotateCcw size={20} className={loading ? 'animate-spin' : ''}/>
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Generation Card */}
                <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-200/60">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                            <Plus size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Générer en Masse</h3>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Date de Début</label>
                                <input type="date" value={config.startDate} onChange={e => setConfig({...config, startDate: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Date de Fin</label>
                                <input type="date" value={config.endDate} onChange={e => setConfig({...config, endDate: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Jours de Travail</label>
                            <div className="flex gap-3">
                                {[1,2,3,4,5,6,0].map(d => (
                                    <button 
                                        key={d} 
                                        onClick={() => toggleDay(d)} 
                                        className={`w-12 h-12 rounded-xl text-xs font-bold transition-all duration-300 ${
                                            config.weekdays.includes(d) 
                                            ? 'bg-primary text-white shadow-lg' 
                                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                        }`}
                                    >
                                        {['D','L','M','M','J','V','S'][d]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Début</label>
                                <input type="time" value={config.startTime} onChange={e => setConfig({...config, startTime: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Fin</label>
                                <input type="time" value={config.endTime} onChange={e => setConfig({...config, endTime: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Durée</label>
                                <select value={config.durationMinutes} onChange={e => setConfig({...config, durationMinutes: parseInt(e.target.value)})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all">
                                    <option value={30}>30 min</option>
                                    <option value={45}>45 min</option>
                                    <option value={60}>1 heure</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button 
                                onClick={handleGenerate} 
                                disabled={loading} 
                                className="w-full bg-primary text-white py-5 rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-slate-800 transition-all shadow-xl shadow-primary/10 flex justify-center items-center gap-3"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20}/> : (
                                    <>
                                        <Calendar size={18} />
                                        Générer les Créneaux
                                    </>
                                )}
                            </button>
                            {message && <p className={`text-center text-xs font-bold mt-6 tracking-wide ${message.includes('Erreur') ? 'text-rose-500' : 'text-emerald-500'}`}>{message}</p>}
                        </div>
                    </div>
                </div>

                {/* List Card */}
                <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-200/60">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Liste des Créneaux</h3>
                        </div>
                        <div className="relative group">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 focus:outline-none focus:border-accent transition-all"/>
                        </div>
                    </div>

                    <div className="h-[550px] overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                        {slots.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 opacity-50">
                                <Calendar size={48} className="mb-4" />
                                <p className="font-bold uppercase tracking-widest text-[10px]">Aucun créneau</p>
                            </div>
                        ) : (
                            slots.map(s => (
                                <div key={s.id} className="group flex justify-between items-center p-5 bg-slate-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-accent shadow-sm">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{s.slot_date}</div>
                                            <div className="text-xs text-slate-400 font-bold tracking-wider">{s.slot_time}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${s.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                            {s.status === 'Available' ? 'Disponible' : 'Réservé'}
                                        </span>
                                        {s.status === 'Available' && (
                                            <button 
                                                onClick={() => handleDelete(s.id)} 
                                                className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminSlots;
