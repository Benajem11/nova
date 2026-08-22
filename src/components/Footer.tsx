import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { agencyContact } from '../data/translations';
import { Language } from '../types';
import { 
  Globe, 
  ArrowUp, 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Heart,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setLanguage, t, isRTL, openWhatsApp, openPhoneCall, openEmail } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Agency Brand & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                N
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white">NOVA</span>
                  <span className="font-semibold text-xs tracking-widest text-cyan-400 uppercase">DIGITAL</span>
                </div>
                <span className="text-[10px] text-slate-400">Tangier, Morocco</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutShort}
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-medium italic">
              "{t.footer.tagline}"
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-2 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300">{t.nav.language}:</span>
              {(['en', 'fr', 'ar'] as Language[]).map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold uppercase transition-colors ${
                    language === langCode
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {langCode === 'ar' ? 'العربية' : langCode === 'fr' ? 'Français' : 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              {['#services', '#why-us', '#process', '#portfolio', '#estimator', '#about', '#pricing', '#faq', '#contact'].map((href, idx) => {
                const labels: Record<string, string> = {
                  '#services': t.nav.services,
                  '#why-us': t.nav.whyUs,
                  '#process': t.nav.process,
                  '#portfolio': t.nav.portfolio,
                  '#estimator': t.hero.ctaEstimate,
                  '#about': t.nav.about,
                  '#pricing': t.nav.pricing,
                  '#faq': t.nav.faq,
                  '#contact': t.nav.contact,
                };
                return (
                  <li key={idx}>
                    <button
                      onClick={() => scrollToSection(href)}
                      className="hover:text-cyan-400 transition-colors text-start"
                    >
                      {labels[href]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.webDevTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.mobileDevTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.aiSolutionsTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.brandingTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.marketingTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.translationTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.automationTitle}</button></li>
              <li><button onClick={() => scrollToSection('#services')} className="hover:text-cyan-400 transition-colors">{t.services.maintenanceTitle}</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => openWhatsApp()}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp: +212 652-752297</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openPhoneCall}
                  className="flex items-center gap-2 hover:text-cyan-400"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span>Tel: +212 652-752297</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openEmail()}
                  className="flex items-center gap-2 hover:text-cyan-400 truncate max-w-full"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="truncate">{agencyContact.email}</span>
                </button>
              </li>
              <li className="flex items-start gap-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500 mt-0.5" />
                <span>{agencyContact.address[language] || agencyContact.address.en}</span>
              </li>
            </ul>

            {/* Social Links Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors" aria-label="LinkedIn">
                <span className="text-xs font-bold">in</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-400 border border-slate-800 transition-colors" aria-label="Instagram">
                <span className="text-xs font-bold">IG</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-blue-400 border border-slate-800 transition-colors" aria-label="Facebook">
                <span className="text-xs font-bold">FB</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors" aria-label="GitHub">
                <span className="text-xs font-bold">GH</span>
              </a>
            </div>
          </div>

        </div>

        {/* Demo Disclaimer & Copyright Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2 text-slate-400 text-center md:text-start">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="max-w-xl">{t.footer.demoDisclaimer}</p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span>© {new Date().getFullYear()} NOVA Digital</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              title={t.footer.backToTop}
              aria-label={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
