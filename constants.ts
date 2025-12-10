
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
            about: "À Propos",
            services: "Services",
            book: "Rendez-vous",
            contact: "Contact"
        },
        hero: {
            title: "Bienvenue chez Atlas Dental Care",
            subtitle: "Votre partenaire de confiance pour des soins dentaires d'excellence à Meknès.",
            cta_primary: "Prendre Rendez-vous",
            cta_secondary: "Appelez-nous"
        },
        about: {
            title: "À Propos de Notre Clinique",
            subtitle: "L'excellence au service de votre sourire",
            content: "Chez Atlas Dental Care, nous combinons expertise clinique et technologie de pointe pour offrir une expérience dentaire inégalée. Notre cabinet moderne à Meknès est conçu pour votre confort et votre tranquillité d'esprit.",
            features: {
                f1: { title: "Professionnels Expérimentés", desc: "Une équipe dédiée à votre santé bucco-dentaire." },
                f2: { title: "Technologie Moderne", desc: "Équipements de pointe pour des soins précis." },
                f3: { title: "Prix Abordables", desc: "Des soins de qualité accessibles à tous." },
                f4: { title: "Cadre Apaisant", desc: "Une ambiance relaxante pour réduire l'anxiété." }
            }
        },
        services: {
            title: "Nos Services",
            subtitle: "Solutions complètes pour toute la famille",
            book_btn: "Réserver ce soin"
        },
        dentists: {
            title: "Nos Dentistes"
        },
        cta: {
            title: "Prêt pour votre consultation ?",
            subtitle: "Notre équipe amicale est là pour vous aider à sourire en toute confiance.",
            button: "Réserver Maintenant"
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
        footer: {
            tagline: "Votre sourire est notre priorité.",
            quick_links: "Liens Rapides",
            contact_info: "Coordonnées",
            rights: "Tous droits réservés.",
            address: "Meknès, Maroc"
        }
    },
    ar: {
        nav: {
            home: "الرئيسية",
            about: "من نحن",
            services: "خدماتنا",
            book: "حجز موعد",
            contact: "اتصل بنا"
        },
        hero: {
            title: "مرحبًا بكم في أطلس لطب الأسنان",
            subtitle: "رعايتكم الموثوقة لطب الأسنان في مكناس.",
            cta_primary: "حجز موعد",
            cta_secondary: "اتصل بنا"
        },
        about: {
            title: "عن عيادتنا",
            subtitle: "التميز في خدمة ابتسامتكم",
            content: "في أطلس لطب الأسنان، نجمع بين الخبرة السريرية والتكنولوجيا الحديثة لتقديم تجربة لا مثيل لها. عيادتنا في مكناس مصممة لراحتكم وسلامة بالكم.",
            features: {
                f1: { title: "خبراء متخصصون", desc: "فريق مكرس لصحة فمكم وأسنانكم." },
                f2: { title: "تكنولوجيا حديثة", desc: "معدات متطورة لعلاجات دقيقة." },
                f3: { title: "أسعار مناسبة", desc: "رعاية عالية الجودة في متناول الجميع." },
                f4: { title: "بيئة مريحة", desc: "جو مريح لتقليل القلق والتوتر." }
            }
        },
        services: {
            title: "خدماتنا",
            subtitle: "حلول شاملة لجميع أفراد الأسرة",
            book_btn: "احجز هذه الخدمة"
        },
        dentists: {
            title: "أطباؤنا"
        },
        cta: {
            title: "هل أنت مستعد لموعدك؟",
            subtitle: "فريقنا الودود هنا لمساعدتكم على الابتسام بثقة.",
            button: "احجز الآن"
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
        footer: {
            tagline: "ابتسامتكم هي أولويتنا.",
            quick_links: "روابط سريعة",
            contact_info: "معلومات الاتصال",
            rights: "كل الحقوق محفوظة.",
            address: "مكناس، المغرب"
        }
    }
};

export const MOCK_SERVICES: Service[] = [
    { id: '1', title_fr: 'Consultation Générale', title_ar: 'استشارة عامة', price: '300 MAD', description_fr: 'Examen complet de votre santé bucco-dentaire avec plan de traitement personnalisé.', description_ar: 'فحص شامل لصحة الفم والأسنان مع خطة علاج مخصصة.' },
    { id: '2', title_fr: 'Nettoyage & Blanchiment', title_ar: 'تنظيف وتبييض', price: '800 MAD', description_fr: 'Détartrage professionnel et blanchiment pour un sourire éclatant de santé.', description_ar: 'إزالة الجير بشكل احترافي وتبييض لابتسامة مشرقة وصحية.' },
    { id: '3', title_fr: 'Orthodontie', title_ar: 'تقويم الأسنان', price: 'Sur Devis', description_fr: 'Solutions d\'alignement dentaire modernes pour enfants et adultes.', description_ar: 'حلول حديثة لتقويم الأسنان للأطفال والبالغين.' },
    { id: '4', title_fr: 'Urgence Dentaire', title_ar: 'طوارئ الأسنان', price: '400 MAD', description_fr: 'Prise en charge rapide et efficace pour soulager vos douleurs dentaires.', description_ar: 'رعاية سريعة وفعالة لتخفيف آلام الأسنان.' },
    { id: '5', title_fr: 'Implants Dentaires', title_ar: 'زراعة الأسنان', price: 'Sur Devis', description_fr: 'Remplacement durable et esthétique des dents manquantes.', description_ar: 'استبدال دائم وجمالي للأسنان المفقودة.' },
    { id: '6', title_fr: 'Dentisterie Pédiatrique', title_ar: 'طب أسنان الأطفال', price: '300 MAD', description_fr: 'Soins doux et adaptés pour la santé dentaire de vos enfants.', description_ar: 'رعاية لطيفة ومناسبة لصحة أسنان أطفالكم.' }
];

export const MOCK_DENTISTS: Dentist[] = [];