
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

export interface Translations {
    nav: {
        home: string;
        services: string;
        book: string;
        admin: string;
        about: string;
        contact: string;
    };
    hero: {
        title: string;
        subtitle: string;
        cta: string;
    };
    services: {
        title: string;
        subtitle: string;
    };
    dentists: {
        title: string;
        subtitle?: string;
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
    admin: {
        login: string;
        dashboard: string;
        total_appts: string;
        pending: string;
    };
    footer: {
        rights: string;
        address: string;
    };
}
