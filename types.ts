
export type Language = 'fr' | 'ar';

export interface Service {
    id: string;
    title_fr: string;
    title_ar: string;
    price?: string;
    description_fr?: string;
    description_ar?: string;
}

export interface Dentist {
    id: string;
    name: string;
    title: string;
    image_url: string;
    bio_fr: string;
    bio_ar: string;
}

export interface Appointment {
    id?: string;
    created_at?: string;
    full_name: string;
    email: string;
    phone: string;
    service_name: string;
    appointment_date: string; // YYYY-MM-DD
    appointment_time: string; // HH:MM AM/PM
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    notes?: string;
}

export interface Slot {
    id: string;
    slot_date: string;
    slot_time: string;
    status: 'Available' | 'Booked' | 'Blocked';
    appointment_id?: string;
}

export interface ClinicSettings {
    id: string;
    clinic_name: string;
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
}

export interface SlotGenerationConfig {
    startDate: string;
    endDate: string;
    weekdays: number[]; // 0=Sunday, 1=Monday...
    startTime: string; // "09:00"
    endTime: string; // "17:00"
    durationMinutes: number;
    breakStart?: string; // "12:00"
    breakEnd?: string; // "14:00"
}

export interface Translations {
    nav: {
        home: string;
        about: string;
        services: string;
        book: string;
        contact: string;
    };
    hero: {
        title: string;
        subtitle: string;
        cta_primary: string;
        cta_secondary: string;
    };
    about: {
        title: string;
        subtitle: string;
        content: string;
        features: {
            f1: { title: string; desc: string; };
            f2: { title: string; desc: string; };
            f3: { title: string; desc: string; };
            f4: { title: string; desc: string; };
        }
    };
    services: {
        title: string;
        subtitle: string;
        book_btn: string;
    };
    dentists: {
        title: string;
    };
    cta: {
        title: string;
        subtitle: string;
        button: string;
    };
    booking: {
        steps: {
            service: string;
            datetime: string;
            details: string;
            confirm: string;
        };
        labels: {
            select_service: string;
            select_date: string;
            select_time: string;
            no_slots: string;
            name: string;
            phone: string;
            email: string;
            notes: string;
            back: string;
            next: string;
            confirm_btn: string;
            success_title: string;
            success_msg: string;
        }
    };
    footer: {
        tagline: string;
        quick_links: string;
        contact_info: string;
        rights: string;
        address: string;
    };
}