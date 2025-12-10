
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { MOCK_SERVICES, TIME_SLOTS, MOCK_DENTISTS } from '../constants';
import { Service, Appointment, Dentist, Slot } from '../types';

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
        // NEW LOGIC: Query the 'slots' table directly
        // We only want slots that are "Available"
        const { data, error } = await supabase
            .from('slots')
            .select('slot_time')
            .eq('slot_date', date)
            .eq('status', 'Available')
            .order('slot_time');

        if (error) {
            console.error("Error fetching slots", error);
            return [];
        }

        // Return just the time strings
        return data.map((row: any) => row.slot_time);
    }

    // Mock logic fallback
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([]);
        }, 500);
    });
};

export const createAppointment = async (appt: Appointment): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
        // USE RPC to safely book slot
        const { error } = await supabase.rpc('book_appointment_rpc', {
            p_full_name: appt.full_name,
            p_email: appt.email,
            p_phone: appt.phone,
            p_service_name: appt.service_name,
            p_date: appt.appointment_date,
            p_time: appt.appointment_time,
            p_notes: appt.notes
        });

        if (error) {
            console.error("Booking failed:", error.message);
            alert("This slot is no longer available. Please choose another.");
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
