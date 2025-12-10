
import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsapp: React.FC = () => {
    return (
        <a 
            href="https://wa.me/212555123456" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle size={28} />
            <span className="absolute right-full mr-3 bg-white text-dark px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us
            </span>
        </a>
    );
};

export default FloatingWhatsapp;
