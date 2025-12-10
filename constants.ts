
import { Translations, Service, Dentist } from './types';

export const TIME_SLOTS = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
];

export const TRANSLATIONS: Record<'fr' | 'ar', Translations> = {
    fr: {
        nav: {
            home: "Accueil",
            services: "Soins",
            book: "Rendez-vous",
            admin: "Admin",
            about: "Le Cabinet",
            contact: "Rendez-vous"
        },
        hero: {
            title: "L'Art Dentaire",
            subtitle: "Une approche minimaliste et moderne de la dentisterie au cœur de Casablanca.",
            cta: "Réserver une Consultation"
        },
        services: {
            title: "Nos Services",
            subtitle: "Des soins dentaires complets pour votre sourire."
        },
        dentists: {
            title: "L'Équipe"
        },
        booking: {
            steps: {
                service: "Service",
                datetime: "Date & Heure",
                details: "Vos Infos",
                confirm: "Confirmation"
            },
            labels: {
                select_service: "Choisissez votre soin",
                select_date: "Choisissez une date",
                select_time: "Heures disponibles",
                no_slots: "Aucun créneau disponible pour cette date.",
                name: "Nom Complet",
                phone: "Téléphone",
                email: "Email",
                notes: "Notes (Optionnel)",
                back: "Retour",
                next: "Suivant",
                confirm_btn: "Confirmer le Rendez-vous",
                success_title: "Demande Envoyée",
                success_msg: "Nous avons bien reçu votre demande de rendez-vous. Vous recevrez une confirmation par email sous peu."
            }
        },
        admin: {
            login: "Connexion Admin",
            dashboard: "Tableau de Bord",
            total_appts: "Total Rendez-vous",
            pending: "En Attente"
        },
        footer: {
            rights: "Tous droits réservés.",
            address: "Casablanca, Maroc"
        }
    },
    ar: {
        nav: {
            home: "الرئيسية",
            services: "علاجات",
            book: "حجز موعد",
            admin: "إدارة",
            about: "من نحن",
            contact: "حجز موعد"
        },
        hero: {
            title: "فن طب الأسنان",
            subtitle: "نهج بسيط وحديث لطب الأسنان في قلب الدار البيضاء.",
            cta: "احجز استشارة"
        },
        services: {
            title: "خدماتنا",
            subtitle: "رعاية أسنان شاملة لابتسامتك."
        },
        dentists: {
            title: "الفريق"
        },
        booking: {
            steps: {
                service: "الخدمة",
                datetime: "التاريخ والوقت",
                details: "معلوماتك",
                confirm: "تأكيد"
            },
            labels: {
                select_service: "اختر العلاج",
                select_date: "اختر التاريخ",
                select_time: "الأوقات المتاحة",
                no_slots: "لا توجد مواعيد متاحة في هذا التاريخ.",
                name: "الاسم الكامل",
                phone: "رقم الهاتف",
                email: "البريد الإلكتروني",
                notes: "ملاحظات (اختياري)",
                back: "سابق",
                next: "التالي",
                confirm_btn: "تأكيد الموعد",
                success_title: "تم إرسال الطلب",
                success_msg: "لقد تلقينا طلب موعدك. ستتلقى تأكيدًا عبر البريد الإلكتروني قريبًا."
            }
        },
        admin: {
            login: "دخول المسؤول",
            dashboard: "لوحة التحكم",
            total_appts: "مجموع المواعيد",
            pending: "قيد الانتظار"
        },
        footer: {
            rights: "كل الحقوق محفوظة.",
            address: "الدار البيضاء، المغرب"
        }
    }
};

export const MOCK_SERVICES: Service[] = [
    { id: '1', title_fr: 'Consultation Générale', title_ar: 'استشارة عامة', price: '300 MAD' },
    { id: '2', title_fr: 'Nettoyage & Blanchiment', title_ar: 'تتنظيف وتبييض', price: '800 MAD' },
    { id: '3', title_fr: 'Orthodontie', title_ar: 'تقويم الأسنان', price: 'Sur Devis' },
    { id: '4', title_fr: 'Urgence Dentaire', title_ar: 'طوارئ الأسنان', price: '400 MAD' }
];

export const MOCK_DENTISTS: Dentist[] = [
    {
        id: '1',
        name: 'Dr. Sarah Alami',
        title: 'Chirurgien Dentiste',
        image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=400',
        bio_fr: 'Spécialiste en dentisterie esthétique avec plus de 10 ans d\'expérience.',
        bio_ar: 'أخصائية في طب الأسنان التجميلي بخبرة تزيد عن 10 سنوات.'
    },
    {
        id: '2',
        name: 'Dr. Karim Tazi',
        title: 'Orthodontiste',
        image_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=400',
        bio_fr: 'Expert en orthodontie invisible et traitements modernes.',
        bio_ar: 'خبير في تقويم الأسنان الشفاف والعلاجات الحديثة.'
    },
    {
        id: '3',
        name: 'Dr. Lina Berrada',
        title: 'Parodontologue',
        image_url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=400',
        bio_fr: 'Passionnée par la santé des gencives et la chirurgie implantaire.',
        bio_ar: 'شغوفة بصحة اللثة وجراحة الزراعة.'
    }
];
