
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Appointment } from '../types';
import { fetchAllAppointments } from '../services/dataService';
import { Users, Clock, CheckCircle, Calendar } from 'lucide-react';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminAppointments from './AdminAppointments';
import AdminSlots from './AdminSlots';
import AdminServices from './AdminServices';
import AdminSettings from './AdminSettings';

const AdminDashboard: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, today: 0 });
    const [recentAppts, setRecentAppts] = useState<Appointment[]>([]);

    useEffect(() => {
        supabase?.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });
        
        const { data: { subscription } } = supabase?.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        }) || { data: { subscription: null } };
        
        return () => subscription?.unsubscribe();
    }, []);

    useEffect(() => {
        if (session && activeTab === 'dashboard') loadStats();
    }, [session, activeTab]);

    const loadStats = async () => {
        const data = await fetchAllAppointments();
        const todayStr = new Date().toISOString().split('T')[0];
        setStats({
            total: data.length,
            pending: data.filter(a => a.status === 'Pending').length,
            confirmed: data.filter(a => a.status === 'Confirmed').length,
            today: data.filter(a => a.appointment_date === todayStr).length
        });
        setRecentAppts(data.slice(0, 5));
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-stone-50 text-primary">Loading...</div>;
    
    if (!session) return <AdminLogin />;

    const renderContent = () => {
        switch(activeTab) {
            case 'appointments': return <AdminAppointments />;
            case 'slots': return <AdminSlots />;
            case 'services': return <AdminServices />;
            case 'settings': return <AdminSettings />;
            default: return (
                <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                    <h1 className="text-3xl font-serif text-secondary mb-8">Dashboard Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-blue-500"><Calendar size={24} /></div>
                            <div><p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Total</p><p className="text-3xl font-serif font-bold text-secondary">{stats.total}</p></div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-amber-500"><Clock size={24} /></div>
                            <div><p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Pending</p><p className="text-3xl font-serif font-bold text-secondary">{stats.pending}</p></div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-green-500"><CheckCircle size={24} /></div>
                            <div><p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Confirmed</p><p className="text-3xl font-serif font-bold text-secondary">{stats.confirmed}</p></div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-purple-500"><Users size={24} /></div>
                            <div><p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Today</p><p className="text-3xl font-serif font-bold text-secondary">{stats.today}</p></div>
                        </div>
                    </div>
                    {/* Recent Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                        <div className="p-6 border-b border-stone-100"><h3 className="font-bold text-lg text-secondary">Recent Appointments</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-stone-50">
                                    <tr><th className="p-4 text-left text-xs font-bold uppercase text-stone-500">Patient</th><th className="p-4 text-left text-xs font-bold uppercase text-stone-500">Date</th><th className="p-4 text-left text-xs font-bold uppercase text-stone-500">Status</th></tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {recentAppts.map(a => (
                                        <tr key={a.id} className="hover:bg-stone-50/50">
                                            <td className="p-4 font-medium text-secondary">{a.full_name}</td>
                                            <td className="p-4 text-stone-600">{a.appointment_date} {a.appointment_time}</td>
                                            <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${a.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>{a.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>{renderContent()}</AdminLayout>;
};

export default AdminDashboard;
