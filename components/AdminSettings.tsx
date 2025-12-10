import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/adminService';
import { ClinicSettings } from '../types';

const AdminSettings: React.FC = () => {
    const [settings, setSettings] = useState<Partial<ClinicSettings>>({});
    const [msg, setMsg] = useState('');

    useEffect(() => { fetchSettings().then(s => s && setSettings(s)); }, []);

    const handleSave = async () => {
        await updateSettings(settings);
        setMsg('Settings saved!');
        setTimeout(() => setMsg(''), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in">
            <h1 className="text-3xl font-serif text-secondary mb-8">Settings</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 space-y-6">
                <div><label className="block text-xs uppercase text-stone-500 mb-1">Clinic Name</label><input className="w-full p-3 border rounded-lg" value={settings.clinic_name || ''} onChange={e => setSettings({...settings, clinic_name: e.target.value})} /></div>
                <div><label className="block text-xs uppercase text-stone-500 mb-1">Phone</label><input className="w-full p-3 border rounded-lg" value={settings.phone || ''} onChange={e => setSettings({...settings, phone: e.target.value})} /></div>
                <div><label className="block text-xs uppercase text-stone-500 mb-1">Address</label><input className="w-full p-3 border rounded-lg" value={settings.address || ''} onChange={e => setSettings({...settings, address: e.target.value})} /></div>
                <button onClick={handleSave} className="w-full bg-primary text-white py-3 rounded-lg font-bold">Save Changes</button>
                {msg && <p className="text-center text-green-600 mt-2">{msg}</p>}
            </div>
        </div>
    );
};
export default AdminSettings;