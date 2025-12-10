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
            contact: "Contact"
        },
        hero: {
            title: "L'Art Dentaire",
            subtitle: "Une approche minimaliste et moderne de la dentisterie au cœur de Meknès.",
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
            address: "Meknès, Maroc"
        }
    },
    ar: {
        nav: {
            home: "الرئيسية",
            services: "علاجات",
            book: "حجز موعد",
            admin: "إدارة",
            about: "عن العيادة",
            contact: "اتصل بنا"
        },
        hero: {
            title: "فن طب الأسنان",
            subtitle: "نهج بسيط وحديث لطب الأسنان في قلب مكناس.",
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
            address: "مكناس، المغرب"
        }
    }
};

export const MOCK_SERVICES: Service[] = [
    { id: '1', title_fr: 'Consultation Générale', title_ar: 'استشارة عامة', price: '300 MAD', description_fr: 'Diagnostic complet et plan de traitement.', description_ar: 'تشخيص شامل وخطة علاج.' },
    { id: '2', title_fr: 'Nettoyage & Blanchiment', title_ar: 'تنظيف وتبييض', price: '800 MAD', description_fr: 'Détartrage et blanchiment pour un sourire éclatant.', description_ar: 'إزالة الجير والتبييض لابتسامة مشرقة.' },
    { id: '3', title_fr: 'Orthodontie', title_ar: 'تقويم الأسنان', price: 'Sur Devis', description_fr: 'Alignement dentaire pour enfants et adultes.', description_ar: 'تقويم الأسنان للأطفال والكبار.' },
    { id: '4', title_fr: 'Urgence Dentaire', title_ar: 'طوارئ الأسنان', price: '400 MAD', description_fr: 'Soulagement immédiat de la douleur.', description_ar: 'تخفيف فوري للألم.' }
];

export const MOCK_DENTISTS: Dentist[] = [];