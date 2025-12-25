
import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { fetchAllAppointments, updateAppointmentStatus } from '../services/dataService';
import { Search, Check, X, Trash2, Calendar, Clock, Filter, User, MoreHorizontal, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { supabase } from '../supabaseClient';

const AdminAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filtered, setFiltered] = useState<Appointment[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadAppointments(); }, []);

    useEffect(() => {
        let res = appointments;
        if (search) {
            const low = search.toLowerCase();
            res = res.filter(a => 
                a.full_name.toLowerCase().includes(low) || 
                a.phone.includes(low) || 
                a.email.toLowerCase().includes(low)
            );
        }
        if (statusFilter !== 'All') res = res.filter(a => a.status === statusFilter);
        if (dateFilter) res = res.filter(a => a.appointment_date === dateFilter);
        setFiltered(res);
    }, [search, statusFilter, dateFilter, appointments]);

    const loadAppointments = async () => { 
        setLoading(true);
        const data = await fetchAllAppointments();
        setAppointments(data);
        setLoading(false);
    };

    const handleStatus = async (id: string, status: string) => {
        setLoading(true);
        const success = await updateAppointmentStatus(id, status);
        if (success) {
            await loadAppointments();
        } else {
            alert("Erreur lors de la mise à jour du statut.");
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer définitivement ce rendez-vous ?")) return;
        setLoading(true);
        const { error } = await supabase?.from('appointments').delete().eq('id', id) || { error: null };
        if (error) alert(error.message);
        await loadAppointments();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'Completed': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-tight mb-2">Gestion des Rendez-vous</h1>
                    <p className="text-slate-500 font-medium">Consultez et gérez les demandes de vos patients en temps réel.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <button onClick={loadAppointments} className="p-3 text-slate-400 hover:text-accent transition-colors"><RotateCcw size={20} className={loading ? 'animate-spin' : ''}/></button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200/60 mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
                <div className="lg:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Recherche Patient</label>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Nom, email ou téléphone..." 
                            value={search} 
                            onChange={e => setSearch(e.target.value)} 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Statut</label>
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                        <select 
                            value={statusFilter} 
                            onChange={e => setStatusFilter(e.target.value)} 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium appearance-none transition-all cursor-pointer"
                        >
                            <option value="All">Tous les Statuts</option>
                            <option value="Pending">En attente</option>
                            <option value="Confirmed">Confirmé</option>
                            <option value="Completed">Terminé</option>
                            <option value="Cancelled">Annulé</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Filtrer par Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                        <input 
                            type="date" 
                            value={dateFilter} 
                            onChange={e => setDateFilter(e.target.value)} 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-medium transition-all" 
                        />
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-6 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Patient</th>
                                <th className="p-6 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Soin Demandé</th>
                                <th className="p-6 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Date & Heure</th>
                                <th className="p-6 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut</th>
                                <th className="p-6 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                                <Search size={40} />
                                            </div>
                                            <p className="text-slate-400 font-medium">Aucun rendez-vous trouvé.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(appt => (
                                    <tr key={appt.id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent font-bold text-lg border border-accent/10">
                                                    {appt.full_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{appt.full_name}</div>
                                                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                        <User size={12} /> {appt.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
                                                {appt.service_name}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <Calendar size={14} className="text-accent" />
                                                    {appt.appointment_date}
                                                </div>
                                                <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                                                    <Clock size={14} />
                                                    {appt.appointment_time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold border ${getStatusColor(appt.status)}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full bg-current`}></div>
                                                {appt.status === 'Pending' ? 'En attente' : 
                                                 appt.status === 'Confirmed' ? 'Confirmé' : 
                                                 appt.status === 'Completed' ? 'Terminé' : 'Annulé'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {appt.status !== 'Confirmed' && (
                                                    <button 
                                                        onClick={() => handleStatus(appt.id!, 'Confirmed')} 
                                                        className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors"
                                                        title="Confirmer"
                                                    >
                                                        <CheckCircle2 size={18} />
                                                    </button>
                                                )}
                                                {appt.status !== 'Cancelled' && (
                                                    <button 
                                                        onClick={() => handleStatus(appt.id!, 'Cancelled')} 
                                                        className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                                        title="Annuler"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(appt.id!)} 
                                                    className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default AdminAppointments;
