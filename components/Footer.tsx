
import React from 'react';
import { Translations } from '../types';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
    t: Translations['footer'];
    lang: 'fr' | 'ar';
}

const Footer: React.FC<FooterProps> = ({ t, lang }) => {
    const scrollTo = (id: string) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    
                    {/* Col 1: Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center font-serif font-bold text-xl">
                                A
                            </div>
                            <span className="text-2xl font-serif font-bold">Atlas Dental</span>
                        </div>
                        <p className="text-blue-200 mb-6 leading-relaxed max-w-sm">
                            {t.tagline}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-accent">{t.quick_links}</h4>
                        <ul className="space-y-4">
                            <li><button onClick={() => scrollTo('#about')} className="text-blue-200 hover:text-white hover:translate-x-2 transition-all">About Us</button></li>
                            <li><button onClick={() => scrollTo('#services')} className="text-blue-200 hover:text-white hover:translate-x-2 transition-all">Services</button></li>
                            <li><button onClick={() => scrollTo('#booking')} className="text-blue-200 hover:text-white hover:translate-x-2 transition-all">Book Appointment</button></li>
                        </ul>
                    </div>

                    {/* Col 3: Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-accent">{t.contact_info}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-blue-200">
                                <MapPin size={20} className="mt-1 flex-shrink-0 text-secondary" />
                                <span>{t.address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-blue-200">
                                <Phone size={20} className="flex-shrink-0 text-secondary" />
                                <span>+212 555 123 456</span>
                            </li>
                            <li className="flex items-center gap-3 text-blue-200">
                                <Mail size={20} className="flex-shrink-0 text-secondary" />
                                <span>contact@atlasdental.ma</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-8 text-center text-blue-300 text-sm">
                    <p>&copy; {new Date().getFullYear()} Atlas Dental Care. {t.rights}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
