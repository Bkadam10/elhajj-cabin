
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
        <footer className="bg-dark text-white pt-20 pb-12 border-t border-gray-800">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white text-primary rounded-lg flex items-center justify-center font-serif font-bold text-xl">
                                E
                            </div>
                            <span className="text-2xl font-serif font-bold">Elhajj Cabinet</span>
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

                    {/* Contact & Map */}
                    <div className="flex flex-col h-full">
                        <h4 className="text-lg font-bold mb-8 text-white">{t.contact_info}</h4>
                        <ul className="space-y-6 mb-8">
                            <li className="flex items-start gap-4 text-gray-400">
                                <MapPin size={20} className="mt-1 flex-shrink-0 text-secondary" />
                                <span className="text-sm leading-relaxed">{t.address}</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Phone size={20} className="flex-shrink-0 text-secondary" />
                                <span className="text-sm">+212 632-872397</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Mail size={20} className="flex-shrink-0 text-secondary" />
                                <span className="text-sm">contact@elhajjcabinet.ma</span>
                            </li>
                        </ul>
                        {/* Map Container */}
                        <div className="w-full h-40 rounded-xl overflow-hidden shadow-lg border border-gray-700 mt-auto">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.2562483864756!2d-5.579138924788536!3d33.86910202795856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05b2220eeeb83%3A0xcb8c2d86a58b20d9!2sWestern%20Union!5e0!3m2!1sen!2sma!4v1710000000000!5m2!1sen!2sma" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Elhajj Cabinet Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Elhajj Cabinet. {t.rights}</p>
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
