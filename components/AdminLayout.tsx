import React from 'react';
import { supabase } from '../supabaseClient';
import { 
    LayoutDashboard, 
    Calendar, 
    Clock, 
    Settings, 
    Briefcase, 
    LogOut, 
    User
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
    const handleLogout = async () => await supabase!.auth.signOut();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
        { id: 'slots', label: 'Slot Management', icon: <Clock size={20} /> },
        { id: 'services', label: 'Services', icon: <Briefcase size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-stone-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold font-serif">A</div>
                    <span className="font-serif font-bold text-lg">Atlas Admin</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                activeTab === item.id 
                                ? 'bg-primary text-white shadow-lg' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-stone-200 p-4 flex justify-between items-center shadow-sm z-10">
                    <div className="md:hidden font-serif font-bold text-primary">Atlas Admin</div>
                    <div className="flex-1"></div> {/* Spacer */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-secondary">Dr. Admin</div>
                            <div className="text-xs text-stone-400">Dentist & Owner</div>
                        </div>
                        <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 border border-stone-200">
                            <User size={20} />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;