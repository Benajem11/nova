import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calculator, 
  Sparkles, 
  Check, 
  MessageCircle, 
  Clock, 
  Coins, 
  Layers, 
  ArrowRight,
  Info,
  Send
} from 'lucide-react';

export const InteractiveCostEstimator: React.FC = () => {
  const { t, isRTL, openWhatsApp } = useLanguage();

  const [selectedServices, setSelectedServices] = useState<string[]>(['web-dev']);
  const [selectedTimeline, setSelectedTimeline] = useState<'standard' | 'fast' | 'express'>('standard');
  const [languageScope, setLanguageScope] = useState<number>(2); // default 2 languages (e.g. Arabic + French)

  const availableServiceOptions = [
    { id: 'web-dev', label: t.services.webDevTitle, baseMAD: 2900, baseEUR: 270, icon: '🌐' },
    { id: 'mobile-app', label: t.services.mobileDevTitle, baseMAD: 6500, baseEUR: 600, icon: '📱' },
    { id: 'social-media', label: t.services.socialMediaTitle, baseMAD: 1900, baseEUR: 180, icon: '📢' },
    { id: 'ai-solutions', label: t.services.aiSolutionsTitle, baseMAD: 3500, baseEUR: 320, icon: '🤖' },
    { id: 'translation', label: t.services.translationTitle, baseMAD: 1200, baseEUR: 110, icon: '🗣️' },
    { id: 'branding', label: t.services.brandingTitle, baseMAD: 2200, baseEUR: 200, icon: '🎨' },
    { id: 'marketing', label: t.services.marketingTitle, baseMAD: 2500, baseEUR: 230, icon: '📈' },
    { id: 'automation', label: t.services.automationTitle, baseMAD: 2800, baseEUR: 260, icon: '⚡' },
    { id: 'maintenance', label: t.services.maintenanceTitle, baseMAD: 950, baseEUR: 90, icon: '🛡️' },
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Pricing calculation
  const baseServiceCostMAD = selectedServices.reduce((total, sId) => {
    const item = availableServiceOptions.find(opt => opt.id === sId);
    return total + (item ? item.baseMAD : 0);
  }, 0);

  const baseServiceCostEUR = selectedServices.reduce((total, sId) => {
    const item = availableServiceOptions.find(opt => opt.id === sId);
    return total + (item ? item.baseEUR : 0);
  }, 0);

  // Timeline multiplier
  const timelineMultiplier = selectedTimeline === 'express' ? 1.25 : selectedTimeline === 'fast' ? 1.1 : 1.0;
  
  // Language multiplier (1 = 1.0, 2 = 1.05, 3 = 1.12)
  const languageMultiplier = languageScope === 3 ? 1.12 : languageScope === 2 ? 1.05 : 1.0;

  // Bundle discount if > 3 services selected
  const bundleDiscount = selectedServices.length >= 3 ? 0.88 : 1.0;

  const totalEstimatedMAD = Math.round(baseServiceCostMAD * timelineMultiplier * languageMultiplier * bundleDiscount / 100) * 100;
  const totalEstimatedEUR = Math.round(baseServiceCostEUR * timelineMultiplier * languageMultiplier * bundleDiscount / 10) * 10;

  // Estimated delivery timeframe calculation
  let calculatedTimelineText = '';
  if (selectedTimeline === 'express') {
    calculatedTimelineText = '7 - 10 Days (Express Sprint)';
  } else if (selectedTimeline === 'fast') {
    calculatedTimelineText = '10 - 15 Days (Fast Delivery)';
  } else {
    calculatedTimelineText = selectedServices.length > 2 ? '2 - 3 Weeks' : '1 - 2 Weeks';
  }

  const handleSendEstimateWhatsApp = () => {
    const serviceNames = selectedServices
      .map(sId => availableServiceOptions.find(opt => opt.id === sId)?.label)
      .filter(Boolean)
      .join(', ');

    const msg = isRTL
      ? `مرحباً وكالة نوفا ديجيتال، قمت بإنشاء تقدير أولي لمشروعي عبر الموقع:\n- الخدمات المطلوبة: ${serviceNames}\n- المدة: ${calculatedTimelineText}\n- اللغات: ${languageScope} لغات\n- الميزانية التقديرية: ~ ${totalEstimatedMAD.toLocaleString()} درهم مغربي (${totalEstimatedEUR} €)\nأرغب في الحصول على استشارة لمناقشة التفاصيل.`
      : `Bonjour NOVA Digital, j'ai configuré une estimation de projet sur votre site :\n- Services sélectionnés : ${serviceNames}\n- Délai souhaité : ${calculatedTimelineText}\n- Langues : ${languageScope} langue(s)\n- Budget estimé : ~ ${totalEstimatedMAD.toLocaleString()} MAD (${totalEstimatedEUR} €)\nJe souhaite planifier une consultation gratuite.`;

    openWhatsApp(msg);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.estimator.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.estimator.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.estimator.subtitle}
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Configurator (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 sm:p-8">
            
            {/* Step 1: Select Services */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">1</span>
                  <span>{t.estimator.selectServices}</span>
                </h3>
                <span className="text-[11px] text-cyan-400 font-semibold">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {availableServiceOptions.map((svc) => {
                  const isChecked = selectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className={`text-start p-3 rounded-xl border text-xs font-medium transition-all duration-200 flex items-center justify-between ${
                        isChecked
                          ? 'bg-cyan-500/15 border-cyan-500/60 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{svc.icon}</span>
                        <span className="truncate">{svc.label}</span>
                      </div>
                      {isChecked && (
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedServices.length >= 3 && (
                <div className="mt-3 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>12% Multi-Service Bundle Discount Applied!</span>
                </div>
              )}
            </div>

            {/* Step 2: Desired Timeline */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">2</span>
                <span>{t.estimator.selectTimeline}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard', label: t.estimator.urgencyStandard, badge: 'Normal' },
                  { id: 'fast', label: t.estimator.urgencyFast, badge: '+10%' },
                  { id: 'express', label: t.estimator.urgencyExpress, badge: 'Priority (+25%)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedTimeline(item.id as any)}
                    className={`p-3.5 rounded-xl border text-start transition-all ${
                      selectedTimeline === item.id
                        ? 'bg-cyan-500/15 border-cyan-500/60 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-cyan-400 uppercase mb-1">{item.badge}</div>
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Languages Needed */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">3</span>
                <span>{t.estimator.selectLanguages}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { count: 1, label: t.estimator.lang1 },
                  { count: 2, label: t.estimator.lang2 },
                  { count: 3, label: t.estimator.lang3 },
                ].map((lang) => (
                  <button
                    key={lang.count}
                    type="button"
                    onClick={() => setLanguageScope(lang.count)}
                    className={`p-3.5 rounded-xl border text-start transition-all ${
                      languageScope === lang.count
                        ? 'bg-cyan-500/15 border-cyan-500/60 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{lang.label}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Summary Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {t.estimator.summaryHeading}
              </span>
              <span className="text-[10px] font-bold bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Demo Estimate
              </span>
            </div>

            {/* Estimated Price Display */}
            <div>
              <span className="text-xs text-slate-400 block mb-1">
                {t.estimator.estimatedInvestment}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  {totalEstimatedMAD.toLocaleString()} <span className="text-base text-cyan-400 font-bold">MAD</span>
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  (~ {totalEstimatedEUR} €)
                </span>
              </div>
            </div>

            {/* Timeline & Delivery Scope */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{t.estimator.estimatedTime}:</span>
                <span className="text-cyan-300 font-bold">{calculatedTimelineText}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Languages Setup:</span>
                <span className="text-white font-medium">{languageScope === 3 ? 'Trilingual (AR • FR • EN)' : languageScope === 2 ? 'Bilingual (AR + FR)' : 'Single Language'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Technical Support:</span>
                <span className="text-emerald-400 font-semibold">1-3 Months Included</span>
              </div>
            </div>

            {/* Notice */}
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t.estimator.disclaimerNotice}
            </p>

            {/* WhatsApp 1-Click Send CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSendEstimateWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.estimator.sendToWhatsApp}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const contactEl = document.querySelector('#contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                <span>{t.estimator.sendEmailQuote}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
