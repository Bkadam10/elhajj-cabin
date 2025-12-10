
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { MOCK_SERVICES, TIME_SLOTS, MOCK_DENTISTS } from '../constants';
import { Service, Appointment, Dentist } from '../types';

export const fetchServices = async (): Promise<Service[]> => {
    if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('services').select('*');
        if (!error && data && data.length > 0) return data as Service[];
    }
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_SERVICES), 300));
};

export const fetchDentists = async (): Promise<Dentist[]> => {
    if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('dentists').select('*');
        if (!error && data && data.length > 0) return data as Dentist[];
    }
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DENTISTS), 300));
};

export const fetchAvailableSlots = async (date: string): Promise<string[]> => {
    if (isSupabaseConfigured && supabase) {
        // Use the secure RPC function we created in SQL
        // This prevents the frontend from needing direct read access to the appointments table
        const { data, error } = await supabase.rpc('get_booked_slots', { check_date: date });

        if (error) {
            console.error("Error fetching slots", error);
            // If error (e.g., RPC doesn't exist yet), fall back to showing all slots
            // In production, you might want to show error or no slots
            return TIME_SLOTS;
        }

        // data returned from RPC is an array of objects: [{ "booked_time": "10:00 AM" }, ...]
        const bookedTimes = (data as any[]).map((row: any) => row.booked_time);
        
        // Return only slots that are NOT in bookedTimes
        return TIME_SLOTS.filter(slot => !bookedTimes.includes(slot));
    }

    // Mock logic for demo mode
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(TIME_SLOTS.filter(() => Math.random() > 0.3));
        }, 500);
    });
};

export const createAppointment = async (appt: Appointment): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('appointments').insert([{
            full_name: appt.full_name,
            email: appt.email,
            phone: appt.phone,
            service_name: appt.service_name,
            appointment_date: appt.appointment_date,
            appointment_time: appt.appointment_time,
            notes: appt.notes,
            status: 'Pending'
        }]);

        if (error) {
            console.error("Booking failed:", error.message);
            // Check for unique violation (double booking race condition)
            if (error.code === '23505') { 
                alert("Sorry, this time slot was just booked by someone else. Please choose another time.");
            }
            return false;
        }
        return true;
    }
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};

// Admin Functions
export const fetchAllAppointments = async (): Promise<Appointment[]> => {
    if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('appointment_date', { ascending: false });
        if (!error && data) return data as Appointment[];
    }
    return [];
};

export const updateAppointmentStatus = async (id: string, status: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
            .from('appointments')
            .update({ status })
            .eq('id', id);
        return !error;
    }
    return true;
};
