
import React from 'react';
import { Translations } from '../types';
import { Facebook, Instagram, Phone, Mail, MapPin, Linkedin } from 'lucide-react';

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
        <footer className="bg-dark text-white pt-24 pb-12 border-t border-gray-800">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center font-serif font-bold text-xl">
                                A
                            </div>
                            <span className="text-2xl font-serif font-bold">Atlas Dental</span>
                        </div>
                        <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                            {t.tagline}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-white">{t.quick_links}</h4>
                        <ul className="space-y-4">
                            <li><button onClick={() => scrollTo('#home')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">Home</button></li>
                            <li><button onClick={() => scrollTo('#about')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">About Us</button></li>
                            <li><button onClick={() => scrollTo('#services')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">Our Services</button></li>
                            <li><button onClick={() => scrollTo('#booking')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm">Book Online</button></li>
                        </ul>
                    </div>

                     {/* Services */}
                     <div>
                        <h4 className="text-lg font-bold mb-8 text-white">Services</h4>
                        <ul className="space-y-4">
                            <li className="text-gray-400 text-sm">General Dentistry</li>
                            <li className="text-gray-400 text-sm">Cosmetic Whitening</li>
                            <li className="text-gray-400 text-sm">Orthodontics</li>
                            <li className="text-gray-400 text-sm">Dental Implants</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 text-white">{t.contact_info}</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-gray-400">
                                <MapPin size={20} className="mt-1 flex-shrink-0 text-secondary" />
                                <span className="text-sm leading-relaxed">{t.address}</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Phone size={20} className="flex-shrink-0 text-secondary" />
                                <span className="text-sm">+212 555 123 456</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Mail size={20} className="flex-shrink-0 text-secondary" />
                                <span className="text-sm">contact@atlasdental.ma</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Atlas Dental Care. {t.rights}</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
