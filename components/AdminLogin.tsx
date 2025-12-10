
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Loader2, ArrowLeft } from 'lucide-react';

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
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-100 relative">
                {/* Back Button */}
                <a 
                    href="#home"
                    onClick={() => window.location.hash = ''}
                    className="absolute top-6 left-6 text-stone-400 hover:text-primary transition-colors"
                    title="Back to Home"
                >
                    <ArrowLeft size={24} />
                </a>

                <div className="text-center mb-8 mt-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-serif font-bold text-xl mx-auto mb-4">A</div>
                    <h2 className="text-2xl font-serif text-secondary">Admin Login</h2>
                    <p className="text-stone-400 text-sm mt-2">Atlas Dental Care Management</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Email</label>
                        <input 
                            type="email" 
                            required
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                    
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}
                    
                    <button 
                        disabled={loading} 
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-teal-800 transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
