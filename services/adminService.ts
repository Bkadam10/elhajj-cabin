import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { Slot, SlotGenerationConfig, ClinicSettings, Service } from '../types';

// Helper to format time strings (e.g., "09:00" -> "09:00 AM")
const formatTimeDisplay = (time24: string): string => {
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
};

// Generate Slots Algorithm
export const generateBulkSlots = async (config: SlotGenerationConfig): Promise<{ count: number, error?: string }> => {
    if (!isSupabaseConfigured || !supabase) return { count: 0, error: 'DB not configured' };

    const slotsToInsert: Partial<Slot>[] = [];
    const start = new Date(config.startDate);
    const end = new Date(config.endDate);
    
    // Iterate Days
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (!config.weekdays.includes(d.getDay())) continue;

        const dateStr = d.toISOString().split('T')[0];
        
        // Time logic
        let currentMinutes = parseInt(config.startTime.split(':')[0]) * 60 + parseInt(config.startTime.split(':')[1]);
        const endMinutes = parseInt(config.endTime.split(':')[0]) * 60 + parseInt(config.endTime.split(':')[1]);
        
        let breakStartMins = -1;
        let breakEndMins = -1;
        if (config.breakStart && config.breakEnd) {
            breakStartMins = parseInt(config.breakStart.split(':')[0]) * 60 + parseInt(config.breakStart.split(':')[1]);
            breakEndMins = parseInt(config.breakEnd.split(':')[0]) * 60 + parseInt(config.breakEnd.split(':')[1]);
        }

        // Generate time slots for the day
        while (currentMinutes + config.durationMinutes <= endMinutes) {
            // Check break
            const slotEnd = currentMinutes + config.durationMinutes;
            
            // Skip if slot overlaps with break
            const overlapsBreak = (breakStartMins !== -1) && 
                ((currentMinutes >= breakStartMins && currentMinutes < breakEndMins) || 
                 (slotEnd > breakStartMins && slotEnd <= breakEndMins));

            if (!overlapsBreak) {
                // Convert mins back to HH:MM AM/PM
                const h = Math.floor(currentMinutes / 60);
                const m = currentMinutes % 60;
                const time24 = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                
                slotsToInsert.push({
                    slot_date: dateStr,
                    slot_time: formatTimeDisplay(time24),
                    status: 'Available'
                });
            }

            currentMinutes += config.durationMinutes;
        }
    }

    if (slotsToInsert.length === 0) return { count: 0 };

    // Batch insert (ignoring duplicates via ON CONFLICT if Supabase supported it easily, but we used UNIQUE constraint)
    // We'll try to insert and ignore errors for duplicates
    const { error } = await supabase.from('slots').upsert(slotsToInsert, { onConflict: 'slot_date, slot_time', ignoreDuplicates: true });
    
    if (error) return { count: 0, error: error.message };
    return { count: slotsToInsert.length };
};

export const fetchSlots = async (date?: string): Promise<Slot[]> => {
    if (!isSupabaseConfigured || !supabase) return [];
    let query = supabase.from('slots').select('*').order('slot_date').order('slot_time');
    if (date) {
        query = query.eq('slot_date', date);
    }
    const { data } = await query;
    return (data as Slot[]) || [];
};

export const deleteSlot = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    const { error } = await supabase.from('slots').delete().eq('id', id);
    return !error;
};

// Settings
export const fetchSettings = async (): Promise<ClinicSettings | null> => {
    if (!isSupabaseConfigured || !supabase) return null;
    const { data } = await supabase.from('clinic_settings').select('*').single();
    return data as ClinicSettings;
};

export const updateSettings = async (settings: Partial<ClinicSettings>): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    // Assume single row with ID or just update the first one
    const { error } = await supabase.from('clinic_settings').update(settings).neq('id', '00000000-0000-0000-0000-000000000000'); // Update all/any
    return !error;
};

// Services CRUD
export const addService = async (service: Partial<Service>): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    const { error } = await supabase.from('services').insert([service]);
    return !error;
};

export const updateService = async (id: string, service: Partial<Service>): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    const { error } = await supabase.from('services').update(service).eq('id', id);
    return !error;
};

export const deleteService = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
};
