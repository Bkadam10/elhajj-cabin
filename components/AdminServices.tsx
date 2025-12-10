import React, { useState, useEffect } from 'react';
import { fetchServices } from '../services/dataService';
import { addService, deleteService } from '../services/adminService';
import { Service } from '../types';
import { Trash2, Plus } from 'lucide-react';

const AdminServices: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newService, setNewService] = useState<Partial<Service>>({ title_fr: '', title_ar: '', price: '' });

    useEffect(() => { load(); }, []);
    const load = async () => setServices(await fetchServices());
    
    const handleAdd = async () => {
        if (!newService.title_fr) return;
        await addService(newService);
        setIsAdding(false);
        load();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete service?')) { await deleteService(id); load(); }
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in">
            <div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-serif text-secondary">Services</h1><button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"><Plus size={18}/> Add Service</button></div>
            
            {isAdding && (
                <div className="bg-white p-6 rounded-xl border border-stone-200 mb-8">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input placeholder="Title (FR)" className="p-2 border rounded" value={newService.title_fr} onChange={e => setNewService({...newService, title_fr: e.target.value})} />
                        <input placeholder="Title (AR)" className="p-2 border rounded" value={newService.title_ar} onChange={e => setNewService({...newService, title_ar: e.target.value})} />
                        <input placeholder="Price" className="p-2 border rounded" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} />
                    </div>
                    <button onClick={handleAdd} className="bg-secondary text-white px-4 py-2 rounded">Save</button>
                </div>
            )}

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                {services.map(s => (
                    <div key={s.id} className="p-4 border-b border-stone-100 flex justify-between items-center last:border-0 hover:bg-stone-50">
                        <div><div className="font-bold text-secondary">{s.title_fr}</div><div className="text-sm text-stone-500">{s.price}</div></div>
                        <button onClick={() => handleDelete(s.id)} className="text-stone-400 hover:text-red-500"><Trash2 size={18}/></button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminServices;