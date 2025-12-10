import React, { useState, useEffect } from 'react';
import { generateBulkSlots, fetchSlots, deleteSlot } from '../services/adminService';
import { Slot, SlotGenerationConfig } from '../types';
import { Loader2, Trash2 } from 'lucide-react';

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
        setMessage(res.error ? `Error: ${res.error}` : `Success! Generated ${res.count} slots.`);
        loadSlots();
    };
    const handleDelete = async (id: string) => { if (confirm('Delete slot?')) { await deleteSlot(id); loadSlots(); } };
    const toggleDay = (id: number) => {
        const d = config.weekdays;
        setConfig({ ...config, weekdays: d.includes(id) ? d.filter(x => x !== id) : [...d, id] });
    };

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            <h1 className="text-3xl font-serif text-secondary mb-8">Slot Management</h1>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <h3 className="font-bold text-lg mb-4">Generate Slots</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs uppercase text-stone-500">Start Date</label><input type="date" value={config.startDate} onChange={e => setConfig({...config, startDate: e.target.value})} className="w-full p-2 border rounded" /></div>
                            <div><label className="text-xs uppercase text-stone-500">End Date</label><input type="date" value={config.endDate} onChange={e => setConfig({...config, endDate: e.target.value})} className="w-full p-2 border rounded" /></div>
                        </div>
                        <div><label className="text-xs uppercase text-stone-500 mb-2 block">Days</label><div className="flex gap-2">{[1,2,3,4,5,6,0].map(d => (
                            <button key={d} onClick={() => toggleDay(d)} className={`w-8 h-8 rounded-full text-xs font-bold ${config.weekdays.includes(d) ? 'bg-primary text-white' : 'bg-stone-100'}`}>{['S','M','T','W','T','F','S'][d]}</button>
                        ))}</div></div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="text-xs uppercase text-stone-500">Start Time</label><input type="time" value={config.startTime} onChange={e => setConfig({...config, startTime: e.target.value})} className="w-full p-2 border rounded" /></div>
                            <div><label className="text-xs uppercase text-stone-500">End Time</label><input type="time" value={config.endTime} onChange={e => setConfig({...config, endTime: e.target.value})} className="w-full p-2 border rounded" /></div>
                            <div><label className="text-xs uppercase text-stone-500">Duration</label><select value={config.durationMinutes} onChange={e => setConfig({...config, durationMinutes: parseInt(e.target.value)})} className="w-full p-2 border rounded"><option value={30}>30m</option><option value={45}>45m</option><option value={60}>60m</option></select></div>
                        </div>
                        <button onClick={handleGenerate} disabled={loading} className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-black transition-colors">{loading ? <Loader2 className="animate-spin mx-auto"/> : 'Generate Slots'}</button>
                        {message && <p className="text-center text-sm font-bold text-primary">{message}</p>}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                    <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">Existing Slots</h3><input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="p-1 border rounded text-sm"/></div>
                    <div className="h-96 overflow-y-auto space-y-2">
                        {slots.map(s => (
                            <div key={s.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-100">
                                <div><div className="font-bold text-secondary">{s.slot_date}</div><div className="text-xs text-stone-500">{s.slot_time}</div></div>
                                <div className="flex items-center gap-3"><span className={`text-xs px-2 py-1 rounded-full ${s.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>{s.status === 'Available' && <button onClick={() => handleDelete(s.id)} className="text-stone-400 hover:text-red-500"><Trash2 size={16}/></button>}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminSlots;