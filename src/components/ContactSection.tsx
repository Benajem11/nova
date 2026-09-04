import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  FileText,
  Calendar,
  Building2,
  DollarSign,
  Layers,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { language, t, isRTL, openWhatsApp, openPhoneCall, openEmail } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    mainService: 'webDevTitle',
    additionalServices: [] as string[],
    budget: '5000-10000',
    description: '',
    hasWebsite: 'no' as 'yes' | 'no',
    startTime: 'within-2-weeks',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const mainServiceOptions = [
    { key: 'webDevTitle', label: t.services.webDevTitle },
    { key: 'mobileDevTitle', label: t.services.mobileDevTitle },
    { key: 'socialMediaTitle', label: t.services.socialMediaTitle },
    { key: 'aiSolutionsTitle', label: t.services.aiSolutionsTitle },
    { key: 'translationTitle', label: t.services.translationTitle },
    { key: 'brandingTitle', label: t.services.brandingTitle },
  ];

  const additionalServiceOptions = [
    { key: 'brandingTitle', label: t.services.brandingTitle },
    { key: 'socialMediaTitle', label: t.services.socialMediaTitle },
    { key: 'translationTitle', label: t.services.translationTitle },
    { key: 'aiSolutionsTitle', label: t.services.aiSolutionsTitle },
    { key: 'maintenanceTitle', label: t.services.maintenanceTitle },
    { key: 'automationTitle', label: t.services.automationTitle },
  ];

  const budgetOptions = [
    { value: '3000-5000', label: '3,000 - 5,000 MAD (~ 300 - 500 €) • Starter / Landing Page' },
    { value: '5000-10000', label: '5,000 - 10,000 MAD (~ 500 - 1,000 €) • Business Website / Growth' },
    { value: '10000-25000', label: '10,000 - 25,000 MAD (~ 1,000 - 2,500 €) • Custom Platform / App' },
    { value: '25000-50000', label: '25,000 - 50,000 MAD (~ 2,500 - 5,000 €) • Full Ecosystem / AI Workflows' },
    { value: '50000+', label: '50,000+ MAD (~ 5,000+ €) • Enterprise Scope / Sur devis' },
  ];

  const startTimeOptions = [
    { value: 'immediately', label: t.contact.startImmediate },
    { value: 'within-2-weeks', label: t.contact.startTwoWeeks },
    { value: 'within-month', label: t.contact.startMonth },
    { value: 'planning-phase', label: t.contact.startPlanning },
  ];

  const toggleAdditionalService = (serviceKey: string) => {
    setFormData((prev) => {
      const exists = prev.additionalServices.includes(serviceKey);
      if (exists) {
        return {
          ...prev,
          additionalServices: prev.additionalServices.filter((s) => s !== serviceKey),
        };
      } else {
        return {
          ...prev,
          additionalServices: [...prev.additionalServices, serviceKey],
        };
      }
    });
  };

  const getMainServiceName = () => {
    return (t.services as Record<string, string>)[formData.mainService] || formData.mainService;
  };

  const getAdditionalServicesNames = () => {
    if (formData.additionalServices.length === 0) return isRTL ? 'لا يوجد' : 'None';
    return formData.additionalServices
      .map((k) => (t.services as Record<string, string>)[k] || k)
      .join(', ');
  };

  const getStartTimeLabel = () => {
    const found = startTimeOptions.find((o) => o.value === formData.startTime);
    return found ? found.label : formData.startTime;
  };

  const generateWhatsAppMessage = () => {
    const mainSvc = getMainServiceName();
    const addSvcs = getAdditionalServicesNames();
    const websiteStatus = formData.hasWebsite === 'yes' ? t.contact.hasWebsiteYes : t.contact.hasWebsiteNo;
    const startTiming = getStartTimeLabel();

    if (isRTL) {
      return `*طلب عرض سعر جديد — وكالة NOVA Digital طنجة*
──────────────────────
• *الاسم الكامل:* ${formData.fullName}
• *رقم الهاتف / الواتساب:* ${formData.phone}
• *البريد الإلكتروني:* ${formData.email || 'غير محدد'}
• *اسم الشركة / المشروع:* ${formData.company || 'غير محدد'}
• *الخدمة الرئيسية:* ${mainSvc}
• *خدمات إضافية:* ${addSvcs}
• *الميزانية التقريبية:* ${formData.budget} MAD
• *هل تمتلك موقعاً حالياً:* ${websiteStatus}
• *الموعد المفضل للبدء:* ${startTiming}
• *وصف المشروع:* ${formData.description}
• *ملاحظات إضافية:* ${formData.additionalNotes || 'لا توجد ملاحظات إضافية'}
──────────────────────
تم إرسال هذا الطلب عبر موقع nova-digital.ma`;
    }

    return `*Demande de Devis de Projet — Agence NOVA Digital Tanger*
──────────────────────
• *Nom complet :* ${formData.fullName}
• *Téléphone / WhatsApp :* ${formData.phone}
• *Email :* ${formData.email || 'Non spécifié'}
• *Entreprise / Marque :* ${formData.company || 'Non spécifié'}
• *Service principal :* ${mainSvc}
• *Services additionnels :* ${addSvcs}
• *Budget approximatif :* ${formData.budget} MAD
• *Site web existant :* ${websiteStatus}
• *Délai de démarrage :* ${startTiming}
• *Description du projet :* ${formData.description}
• *Notes complémentaires :* ${formData.additionalNotes || 'Aucune'}
──────────────────────
Demande générée depuis le site nova-digital.ma`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.fullName.trim()) {
      setValidationError(isRTL ? 'يرجى إدخال الاسم الكامل.' : 'Veuillez renseigner votre nom complet.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError(isRTL ? 'يرجى إدخال رقم الهاتف أو الواتساب.' : 'Veuillez renseigner votre numéro de téléphone ou WhatsApp.');
      return;
    }
    if (!formData.description.trim()) {
      setValidationError(isRTL ? 'يرجى كتابة وصف موجز للمشروع.' : 'Veuillez décrire brièvement votre projet.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleOpenWhatsAppDirectly = () => {
    const msg = generateWhatsAppMessage();
    openWhatsApp(msg);
  };

  const handleCopySummary = () => {
    const msg = generateWhatsAppMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.contact.quoteBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.contact.quoteHeading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.contact.formSub}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Agency Channels & Tangier Location (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Direct Card */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => openWhatsApp()}
                className="w-full p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-start flex items-center justify-between group shadow-sm hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
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
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.phoneLabel}
                    </div>
                    <div className="text-sm font-bold text-white">
                      +212 652-752297
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Direct line • Tangier, Morocco
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-slate-400 ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
              </button>

              {/* Email Card */}
              <button
                type="button"
                onClick={openEmail}
                className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all text-start flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.emailLabel}
                    </div>
                    <div className="text-sm font-bold text-white">
                      contact@nova-digital.ma
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Detailed brief & RFPs
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-slate-400 ${isRTL ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
              </button>
            </div>

            {/* Tangier Agency Address & Hours */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.contact.locationLabel}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Boulevard Pasteur, Centre Ville, Tangier 90000, Morocco
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    {t.contact.mapCoordinates}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-800/80">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.contact.hoursLabel}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Monday - Friday: 09:00 - 18:30 (GMT+1)
                  </div>
                  <div className="text-xs text-slate-300">
                    Saturday: 10:00 - 14:00 (On Appointment)
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Policy Card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Our Quotation Commitment</span>
              </div>
              <p className="leading-relaxed">
                Every project quotation is tailored with transparent deliverable milestones, realistic timeframe estimates, and zero hidden charges.
              </p>
            </div>

          </div>

          {/* Right Column: 11-Field Professional Quotation Request Form (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl relative">
            
            {/* Form Top Title */}
            <div className="mb-6 pb-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {t.contact.quoteHeading}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete the 11 project specifications below for a bespoke estimate.
                </p>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                Step 1 of 1
              </span>
            </div>

            {/* Error Message if Any */}
            {validationError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* SUCCESS STATE */}
            {submitted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {t.contact.successTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                    {t.contact.successDesc}
                  </p>
                </div>

                {/* Submitted Summary Overview Card */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-start text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="font-bold text-cyan-400 pb-1.5 border-b border-slate-800 flex items-center justify-between">
                    <span>Quotation Overview</span>
                    <span className="text-[11px] text-slate-400 font-mono">NOVA-QT-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Client / Contact:</span>
                      <span className="font-medium text-white">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">WhatsApp / Phone:</span>
                      <span className="font-medium text-emerald-400 font-mono">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Main Service:</span>
                      <span className="font-medium text-white">{getMainServiceName()}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Budget Range:</span>
                      <span className="font-medium text-cyan-300">{formData.budget} MAD</span>
                    </div>
                  </div>
                  {formData.company && (
                    <div className="pt-1 text-slate-300">
                      <span className="text-slate-400 block text-[10px]">Company / Business:</span>
                      <span>{formData.company}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* WhatsApp Primary CTA */}
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirectly}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.continueWhatsAppButton}</span>
                  </button>

                  {/* Copy Summary CTA */}
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Quote Details'}</span>
                  </button>

                  {/* Reset Form CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        company: '',
                        mainService: 'webDevTitle',
                        additionalServices: [],
                        budget: '5000-10000',
                        description: '',
                        hasWebsite: 'no',
                        startTime: 'within-2-weeks',
                        additionalNotes: '',
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    Submit Another Quote
                  </button>
                </div>
              </div>
            ) : (
              /* THE 11-FIELD FORM */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Full Name & 2. WhatsApp/Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      1. {t.contact.nameLabel} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      2. {t.contact.phoneInputLabel} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Email & 4. Company Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      3. {t.contact.emailInputLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      4. {t.contact.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t.contact.companyPlaceholder}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 5. Main Service Required */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    5. {t.contact.mainServiceLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    value={formData.mainService}
                    onChange={(e) => setFormData({ ...formData, mainService: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    {mainServiceOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Additional Services (Multi-select Chips) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    6. {t.contact.additionalServicesLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {additionalServiceOptions.map((svc) => {
                      const isSelected = formData.additionalServices.includes(svc.key);
                      return (
                        <button
                          type="button"
                          key={svc.key}
                          onClick={() => toggleAdditionalService(svc.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-xs'
                              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-300'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{svc.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Approximate Budget Range */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    7. {t.contact.budgetLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    {budgetOptions.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Project Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    8. {t.contact.messageLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                {/* 9. Has Website & 10. Preferred Start Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 9. Do they currently have a website? */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      9. {t.contact.hasWebsiteLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasWebsite: 'yes' })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.hasWebsite === 'yes'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                        }`}
                      >
                        {isRTL ? 'نعم، لدي موقع' : 'Yes (Existing)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, hasWebsite: 'no' })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.hasWebsite === 'no'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                        }`}
                      >
                        {isRTL ? 'لا، مشروع جديد' : 'No (New Project)'}
                      </button>
                    </div>
                  </div>

                  {/* 10. Preferred Start Time */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      10. {t.contact.startTimeLabel}
                    </label>
                    <select
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      {startTimeOptions.map((st) => (
                        <option key={st.value} value={st.value}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 11. Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    11. {t.contact.notesLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder={t.contact.notesPlaceholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Form Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.contact.submitting : t.contact.submitQuoteButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirectly}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.continueWhatsAppButton}</span>
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
