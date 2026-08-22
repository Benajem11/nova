import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { agencyContact } from '../data/translations';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ArrowRight,
  Globe,
  Share2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t, isRTL, openWhatsApp, openPhoneCall, openEmail } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'webDevTitle',
    budget: '5000-10000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleSendFormViaWhatsApp = () => {
    const serviceName = (t.services as Record<string, string>)[formData.service] || formData.service;
    const msg = isRTL
      ? `طلب استشارة جديد من موقع NOVA Digital:\n- الاسم: ${formData.name}\n- الهاتف: ${formData.phone}\n- البريد: ${formData.email || 'غير محدد'}\n- الخدمة المطلوبة: ${serviceName}\n- الميزانية: ${formData.budget} درهم\n- تفاصيل المشروع: ${formData.message || 'لا توجد تفاصيل إضافية'}`
      : `Nouvelle demande de consultation NOVA Digital :\n- Nom : ${formData.name}\n- Téléphone : ${formData.phone}\n- Email : ${formData.email || 'Non spécifié'}\n- Service : ${serviceName}\n- Budget : ${formData.budget} MAD\n- Détails : ${formData.message || 'Aucun détail'}`;
    
    openWhatsApp(msg);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Tangier Map Placeholder (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Action Direct Channel Cards */}
            <div className="space-y-3">
              
              {/* WhatsApp Card */}
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="w-full p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-start flex items-center justify-between group shadow-sm hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {t.contact.whatsappLabel}
                    </div>
                    <div className="text-sm font-extrabold text-white">
                      +212 652-752297
                    </div>
                    <div className="text-[11px] text-emerald-300/80">
                      {t.contact.whatsappSub}
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-emerald-400 ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
              </button>

              {/* Phone Call Card */}
              <button
                type="button"
                onClick={openPhoneCall}
                className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all text-start flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.phoneLabel}
                    </div>
                    <div className="text-sm font-bold text-white">
                      +212 652-752297
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Direct voice consultation
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-cyan-400 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              {/* Email Card */}
              <button
                type="button"
                onClick={() => openEmail()}
                className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-all text-start flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.emailLabel}
                    </div>
                    <div className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                      {agencyContact.email}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Formal project inquiries
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-blue-400 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

            </div>

            {/* Office & Operating Hours Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{t.contact.locationLabel}</span>
                  <span className="text-slate-400">{agencyContact.address[language] || agencyContact.address.en}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-800/80">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">{t.contact.hoursLabel}</span>
                  <span className="text-slate-400">{agencyContact.workingHours[language] || agencyContact.workingHours.en}</span>
                </div>
              </div>
            </div>

            {/* Styled Google Maps Location Placeholder Card */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative group">
              {/* Styled Vector Map Background */}
              <div className="h-44 w-full bg-slate-950 bg-dot-pattern flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Tangier Map Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="p-2.5 rounded-full bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold text-white bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-700 mt-1 shadow">
                    Tangier, Morocco
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Tangier City Center Hub</div>
                  <div className="text-[10px] text-slate-400 font-mono">{t.contact.mapCoordinates}</div>
                </div>
                <a
                  href="https://maps.google.com/?q=Tangier+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t.contact.openInMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-white mb-1">
                {t.contact.formHeading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {t.contact.formSub}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  {t.contact.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  {t.contact.successDesc}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendFormViaWhatsApp}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        service: 'webDevTitle',
                        budget: '5000-10000',
                        message: '',
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.nameLabel} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.emailInputLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Service Select Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.phoneInputLabel} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.serviceSelectLabel}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="webDevTitle">{t.services.webDevTitle}</option>
                      <option value="mobileDevTitle">{t.services.mobileDevTitle}</option>
                      <option value="socialMediaTitle">{t.services.socialMediaTitle}</option>
                      <option value="aiSolutionsTitle">{t.services.aiSolutionsTitle}</option>
                      <option value="translationTitle">{t.services.translationTitle}</option>
                      <option value="brandingTitle">{t.services.brandingTitle}</option>
                      <option value="marketingTitle">{t.services.marketingTitle}</option>
                      <option value="automationTitle">{t.services.automationTitle}</option>
                      <option value="maintenanceTitle">{t.services.maintenanceTitle}</option>
                    </select>
                  </div>
                </div>

                {/* Approximate Budget */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.budgetLabel}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2000-5000">2,000 - 5,000 MAD (~ 200 - 500 €)</option>
                    <option value="5000-10000">5,000 - 10,000 MAD (~ 500 - 1,000 €)</option>
                    <option value="10000-25000">10,000 - 25,000 MAD (~ 1,000 - 2,500 €)</option>
                    <option value="25000+">25,000+ MAD (Enterprise Custom Scope)</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                {/* Form Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.contact.submitting : t.contact.submitButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendFormViaWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
