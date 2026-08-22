import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight,
  MessageCircle,
  Phone,
  Check
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, isRTL, openWhatsApp } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#why-us', label: t.nav.whyUs },
    { href: '#process', label: t.nav.process },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#estimator', label: t.hero.ctaEstimate },
    { href: '#about', label: t.nav.about },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  const languagesList: { code: Language; label: string; flag: string; nativeName: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'ar', label: 'العربية', flag: '🇲🇦', nativeName: 'العربية (RTL)' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="brand-logo"
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-extrabold text-white text-xl tracking-wider">N</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">NOVA</span>
                <span className="font-semibold text-xs tracking-widest text-cyan-400 uppercase">DIGITAL</span>
              </div>
              <span className="text-[10px] text-slate-400 -mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Tangier, MA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-dropdown-button"
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-medium transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase font-semibold">{language}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div
                    id="language-dropdown-menu"
                    className={`absolute ${
                      isRTL ? 'left-0' : 'right-0'
                    } mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150`}
                  >
                    {languagesList.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          language === item.code
                            ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.flag}</span>
                          <span>{item.nativeName}</span>
                        </div>
                        {language === item.code && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick WhatsApp Button */}
            <button
              id="header-whatsapp-btn"
              onClick={() => openWhatsApp()}
              className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-105"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Main CTA */}
            <a
              id="header-consultation-btn"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200"
            >
              <span>{t.nav.consultation}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </a>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher quick buttons */}
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              {(['en', 'fr', 'ar'] as Language[]).map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`px-2 py-1 text-[11px] rounded font-bold uppercase transition-colors ${
                    language === langCode
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {langCode}
                </button>
              ))}
            </div>

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label={t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-x-0 top-[60px] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl p-5 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-4 py-2.5 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+212 652-752297)</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md"
              >
                <span>{t.nav.consultation}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
