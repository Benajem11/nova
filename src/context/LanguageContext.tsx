import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations, agencyContact } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  isRTL: boolean;
  openWhatsApp: (customMessage?: string) => void;
  openPhoneCall: () => void;
  openEmail: (subject?: string, body?: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nova_language') as Language;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      return saved;
    }
    return 'en';
  });

  const isRTL = language === 'ar';

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('nova_language', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    if (isRTL) {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language, isRTL]);

  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = language === 'ar'
      ? 'مرحباً وكالة نوفا ديجيتال، أرغب في الحصول على استشارة مجانية حول مشروعي الرقمي.'
      : language === 'fr'
      ? 'Bonjour NOVA Digital, je souhaite obtenir une consultation gratuite concernant mon projet digital.'
      : 'Hello NOVA Digital, I would like to get a free consultation for my digital project.';
    
    const message = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/212652752297?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const openPhoneCall = () => {
    window.location.href = 'tel:+212652752297';
  };

  const openEmail = (subject?: string, body?: string) => {
    const defaultSubject = language === 'ar'
      ? 'طلب استشارة - وكالة نوفا ديجيتال'
      : language === 'fr'
      ? 'Demande de consultation - NOVA Digital'
      : 'Project Consultation Request - NOVA Digital';

    const defaultBody = language === 'ar'
      ? 'مرحباً، أود الاستفسار حول خدماتكم الرقمية في طنجة.'
      : language === 'fr'
      ? 'Bonjour, je souhaite me renseigner sur vos services digitaux à Tanger.'
      : 'Hello, I would like to inquire about your digital services in Tangier.';

    const sub = encodeURIComponent(subject || defaultSubject);
    const text = encodeURIComponent(body || defaultBody);
    window.location.href = `mailto:${agencyContact.email}?subject=${sub}&body=${text}`;
  };

  const currentTranslations = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslations,
        isRTL,
        openWhatsApp,
        openPhoneCall,
        openEmail,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
