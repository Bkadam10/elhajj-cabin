
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Appointment } from '../types';
import { fetchAllAppointments, updateAppointmentStatus } from '../services/dataService';
import { LogOut, Check, X, CheckCircle, RefreshCcw } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        supabase?.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) loadAppointments();
        });

        const { data: { subscription } } = supabase?.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) loadAppointments();
        }) || { data: { subscription: null } };

        return () => subscription?.unsubscribe();
    }, []);

    const loadAppointments = async () => {
        setLoading(true);
        const data = await fetchAllAppointments();
        setAppointments(data);
        setLoading(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');
        const { error } = await supabase!.auth.signInWithPassword({ email, password });
        if (error) setLoginError(error.message);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase!.auth.signOut();
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        await updateAppointmentStatus(id, status);
        loadAppointments();
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-stone-100">
                    <h2 className="text-2xl font-serif text-center mb-6 text-primary">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                className="w-full p-3 border border-stone-200 rounded focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                className="w-full p-3 border border-stone-200 rounded focus:outline-none focus:border-primary"
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                        <button disabled={loading} className="w-full bg-secondary text-white py-3 rounded hover:bg-black transition-colors">
                            {loading ? '...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-serif text-secondary">Dashboard</h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm">
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                        <h3 className="text-stone-500 text-sm uppercase tracking-widest mb-2">Total</h3>
                        <p className="text-4xl font-serif text-secondary">{appointments.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                        <h3 className="text-stone-500 text-sm uppercase tracking-widest mb-2">Pending</h3>
                        <p className="text-4xl font-serif text-accent">{appointments.filter(a => a.status === 'Pending').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                        <h3 className="text-stone-500 text-sm uppercase tracking-widest mb-2">Confirmed Today</h3>
                        <p className="text-4xl font-serif text-primary">
                            {appointments.filter(a => a.appointment_date === new Date().toISOString().split('T')[0] && a.status === 'Confirmed').length}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                        <h2 className="font-serif text-xl">Recent Appointments</h2>
                        <button onClick={loadAppointments} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                            <RefreshCcw size={16} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-stone-50 text-left">
                                <tr>
                                    <th className="p-4 text-xs font-bold uppercase text-stone-500 tracking-wider">Date & Time</th>
                                    <th className="p-4 text-xs font-bold uppercase text-stone-500 tracking-wider">Patient</th>
                                    <th className="p-4 text-xs font-bold uppercase text-stone-500 tracking-wider">Service</th>
                                    <th className="p-4 text-xs font-bold uppercase text-stone-500 tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-bold uppercase text-stone-500 tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {appointments.map((appt) => (
                                    <tr key={appt.id} className="hover:bg-stone-50/50 transition-colors">
                                        <td className="p-4 whitespace-nowrap">
                                            <div className="font-medium text-secondary">{appt.appointment_date}</div>
                                            <div className="text-sm text-stone-400">{appt.appointment_time}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-secondary">{appt.full_name}</div>
                                            <div className="text-xs text-stone-400">{appt.phone}</div>
                                            <div className="text-xs text-stone-400">{appt.email}</div>
                                        </td>
                                        <td className="p-4 text-sm text-stone-600">
                                            {appt.service_name}
                                            {appt.notes && (
                                                <div className="mt-1 text-xs text-stone-400 italic truncate max-w-[150px]">
                                                    "{appt.notes}"
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                                                  appt.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                                  appt.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                  'bg-yellow-100 text-yellow-800'}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="p-4 space-x-2">
                                            {appt.status !== 'Confirmed' && appt.status !== 'Cancelled' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(appt.id!, 'Confirmed')}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" 
                                                    title="Confirm"
                                                >
                                                    <Check size={16} />
                                                </button>
                                            )}
                                            {appt.status !== 'Cancelled' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(appt.id!, 'Cancelled')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" 
                                                    title="Cancel"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                            {appt.status === 'Confirmed' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(appt.id!, 'Completed')}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" 
                                                    title="Mark Complete"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {appointments.length === 0 && (
                            <div className="p-8 text-center text-stone-400 italic">No appointments found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
