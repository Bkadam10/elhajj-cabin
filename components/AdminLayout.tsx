
import React from 'react';
import { supabase } from '../supabaseClient';
import { 
    LayoutDashboard, 
    Calendar, 
    Clock, 
    Settings, 
    Briefcase, 
    LogOut, 
    User,
    ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
    const handleLogout = async () => await supabase!.auth.signOut();

    const menuItems = [
        { id: 'dashboard', label: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
        { id: 'appointments', label: 'Rendez-vous', icon: <Calendar size={20} /> },
        { id: 'slots', label: 'Gestion Horaires', icon: <Clock size={20} /> },
        { id: 'services', label: 'Services & Soins', icon: <Briefcase size={20} /> },
        { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-accent selection:text-white">
            {/* Sidebar */}
            <aside className="w-80 bg-[#0F172A] text-white flex-shrink-0 hidden lg:flex flex-col shadow-2xl relative z-20">
                <div className="p-10 mb-6 flex flex-col items-center border-b border-white/5">
                    <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center font-bold font-serif text-3xl shadow-lg mb-6 rotate-3">E</div>
                    <span className="font-serif font-bold text-xl tracking-tight">Elhajj Management</span>
                    <span className="text-[10px] font-bold text-accent tracking-[0.4em] uppercase mt-2">Elite Dental Clinic</span>
                </div>
                
                <nav className="flex-1 px-6 space-y-3 overflow-y-auto py-4">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 group ${
                                activeTab === item.id 
                                ? 'bg-white/10 text-accent shadow-inner' 
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`${activeTab === item.id ? 'text-accent' : 'text-slate-500 group-hover:text-white'} transition-colors`}>
                                    {item.icon}
                                </span>
                                <span className="font-bold text-sm tracking-wide">{item.label}</span>
                            </div>
                            {activeTab === item.id && <ChevronRight size={14} className="text-accent" />}
                        </button>
                    ))}
                </nav>

                <div className="p-8 border-t border-white/5">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-4 text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all font-bold text-sm tracking-wide"
                    >
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 p-6 flex justify-between items-center z-10">
                    <div className="lg:hidden flex items-center gap-3">
                         <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold font-serif">E</div>
                         <span className="font-serif font-bold text-primary">Elhajj Admin</span>
                    </div>
                    <div className="hidden lg:block">
                         <h2 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">Gestionnaire de Cabinet</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-slate-900">Dr. Elhajj</div>
                            <div className="text-[10px] font-bold text-accent uppercase tracking-widest">Administrateur</div>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                            <User size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-8 lg:p-12 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
