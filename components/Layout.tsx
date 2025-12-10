import React from 'react';
import { Language } from '../types';

interface LayoutProps {
    children: React.ReactNode;
    lang: Language;
}

const Layout: React.FC<LayoutProps> = ({ children, lang }) => {
    return (
        <div 
            dir={lang === 'ar' ? 'rtl' : 'ltr'} 
            className={`min-h-screen flex flex-col ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}
        >
            {children}
        </div>
    );
};

export default Layout;