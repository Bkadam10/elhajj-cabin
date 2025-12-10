import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { fetchAllAppointments, updateAppointmentStatus } from '../services/dataService';
import { Search, Check, X, CheckCircle, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const AdminAppointments: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filtered, setFiltered] = useState<Appointment[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => { loadAppointments(); }, []);

    useEffect(() => {
        let res = appointments;
        if (search) {
            const low = search.toLowerCase();
            res = res.filter(a => a.full_name.toLowerCase().includes(low) || a.phone.includes(low) || a.email.toLowerCase().includes(low));
        }
        if (statusFilter !== 'All') res = res.filter(a => a.status === statusFilter);
        if (dateFilter) res = res.filter(a => a.appointment_date === dateFilter);
        setFiltered(res);
    }, [search, statusFilter, dateFilter, appointments]);

    const loadAppointments = async () => { setAppointments(await fetchAllAppointments()); };

    const handleStatus = async (id: string, status: string) => {
        if (!confirm(`Are you sure you want to change status to ${status}?`)) return;
        await updateAppointmentStatus(id, status);
        loadAppointments();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this appointment permanently?")) return;
        await supabase?.from('appointments').delete().eq('id', id);
        loadAppointments();
    };

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            <h1 className="text-3xl font-serif text-secondary mb-8">Appointments Management</h1>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-3 text-stone-400" size={18} />
                    <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="p-2 border border-stone-200 rounded-lg bg-white">
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="p-2 border border-stone-200 rounded-lg bg-white" />
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50 text-stone-500 text-xs font-bold uppercase tracking-wider">
                            <tr><th className="p-4 text-left">Patient</th><th className="p-4 text-left">Service</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th><th className="p-4 text-right">Actions</th></tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filtered.map(appt => (
                                <tr key={appt.id} className="hover:bg-stone-50/50">
                                    <td className="p-4"><div className="font-bold text-secondary">{appt.full_name}</div><div className="text-xs text-stone-400">{appt.phone}</div></td>
                                    <td className="p-4"><div className="text-sm font-medium">{appt.service_name}</div></td>
                                    <td className="p-4"><div className="text-sm font-medium">{appt.appointment_date}</div><div className="text-xs text-stone-500 bg-stone-100 inline-block px-2 py-0.5 rounded mt-1">{appt.appointment_time}</div></td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>{appt.status}</span></td>
                                    <td className="p-4 text-right space-x-2">
                                        <button onClick={() => handleDelete(appt.id!)} className="p-2 text-stone-400 hover:text-red-500"><Trash2 size={18} /></button>
                                        {appt.status === 'Pending' && <button onClick={() => handleStatus(appt.id!, 'Confirmed')} className="p-2 text-green-600"><Check size={18} /></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default AdminAppointments;