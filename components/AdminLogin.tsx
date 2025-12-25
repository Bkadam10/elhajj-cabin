
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const { error } = await supabase!.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>

            <div className="bg-white p-12 md:p-16 rounded-[48px] shadow-2xl w-full max-w-xl border border-white/60 relative z-10 backdrop-blur-sm">
                {/* Back Button */}
                <button 
                    onClick={() => window.location.hash = ''}
                    className="absolute top-10 left-10 text-slate-400 hover:text-accent transition-all hover:scale-110 flex items-center gap-2 group"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-accent/10">
                        <ArrowLeft size={20} />
                    </div>
                </button>

                <div className="text-center mb-16">
                    <div className="w-20 h-20 bg-primary text-white rounded-[24px] flex items-center justify-center font-serif font-bold text-4xl mx-auto mb-8 shadow-2xl rotate-3">E</div>
                    <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Accès Administratif</h2>
                    <p className="text-slate-400 font-medium mt-4">Cabinet Dentaire Elhajj — Authentification</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-10">
                    <div className="space-y-4">
                        <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Identifiant Email</label>
                        <div className="relative">
                            <input 
                                type="email" 
                                required
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="votre@email.com"
                                className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[24px] focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-bold text-lg placeholder:text-slate-300 transition-all shadow-inner"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 ml-1">Mot de Passe</label>
                        <div className="relative">
                            <input 
                                type="password" 
                                required
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                placeholder="••••••••"
                                className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[24px] focus:outline-none focus:border-accent focus:bg-white text-slate-900 font-bold text-lg placeholder:text-slate-300 transition-all shadow-inner"
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <div className="p-6 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-[24px] text-center text-sm animate-pulse">
                            {error}
                        </div>
                    )}
                    
                    <button 
                        disabled={loading} 
                        className="w-full bg-primary text-white py-6 rounded-[24px] font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-primary/30 flex justify-center items-center gap-4 group overflow-hidden relative"
                    >
                        <span className="relative z-10 flex items-center gap-4">
                            {loading ? <Loader2 size={24} className="animate-spin" /> : (
                                <>
                                    Se Connecter
                                    <ShieldCheck size={24} className="group-hover:rotate-12 transition-transform" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </button>
                </form>

                <p className="text-center mt-12 text-slate-400 text-xs font-medium tracking-wide">
                    Protection SSL 256-bit • Usage Strictement Interne
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
