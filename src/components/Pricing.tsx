import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { pricingPlans } from '../data/agencyData';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Coins, 
  Clock, 
  Info,
  Layers
} from 'lucide-react';

export const Pricing: React.FC = () => {
  const { t, isRTL, openWhatsApp } = useLanguage();
  const [currency, setCurrency] = useState<'MAD' | 'EUR'>('MAD');

  const handleSelectPackage = (packageName: string) => {
    const msg = isRTL
      ? `مرحباً نوفا ديجيتال، أنا مهتم بـ (${packageName}) وأرغب في مناقشة تفاصيل المشروع.`
      : `Bonjour NOVA Digital, je suis intéressé par le forfait (${packageName}) et je souhaite échanger sur mon projet.`;
    openWhatsApp(msg);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
            {t.pricing.subtitle}
          </p>

          {/* Currency Toggle & Demo Badge */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setCurrency('MAD')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === 'MAD'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MAD (درهم)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('EUR')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currency === 'EUR'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EUR (€)
              </button>
            </div>

            <span className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 font-medium">
              {t.pricing.demoPricingBadge}
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const planName = (t.pricing as Record<string, string>)[plan.nameKey] || plan.nameKey;
            const planTag = (t.pricing as Record<string, string>)[plan.taglineKey] || plan.taglineKey;
            const planTarget = (t.pricing as Record<string, string>)[plan.targetKey] || plan.targetKey;
            const planTime = (t.pricing as Record<string, string>)[plan.turnaroundKey] || plan.turnaroundKey;

            const isFeatured = plan.featured;
            const price = currency === 'MAD'
              ? `${plan.priceMAD.toLocaleString()} MAD`
              : `€ ${plan.priceEUR.toLocaleString()}`;

            return (
              <div
                key={plan.id}
                id={`pricing-plan-${plan.id}`}
                className={`relative rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-slate-900 border-2 border-cyan-500/80 shadow-2xl shadow-cyan-500/10 lg:-translate-y-2'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Pill */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                    {t.pricing.popularBadge}
                  </div>
                )}

                <div>
                  {/* Title & Tagline */}
                  <div className="mb-6">
                    <h3 className="text-xl font-extrabold text-white mb-2">
                      {planName}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {planTag}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      {t.pricing.startingFrom}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white">
                        {price}
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-cyan-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{planTime}</span>
                    </div>
                  </div>

                  {/* Target Audience Note */}
                  <div className="text-xs text-slate-300 mb-6 p-3 rounded-lg bg-slate-900 border border-slate-800 italic">
                    {planTarget}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What’s Included:
                    </h4>
                    {plan.featuresKeys.map((fKey, idx) => {
                      const featText = (t.pricing as Record<string, string>)[fKey] || fKey;
                      return (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{featText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(planName)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isFeatured
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{t.pricing.selectPlan}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Custom Scope Footer Strip */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 max-w-2xl mx-auto">
          <h4 className="text-sm font-bold text-white mb-1">{t.pricing.customQuote}</h4>
          <p className="text-xs text-slate-400 mb-4">
            We configure tailor-made scopes for corporate platforms, custom mobile applications, and heavy automation architectures.
          </p>
          <button
            onClick={() => {
              const contactEl = document.querySelector('#contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
          >
            {t.pricing.contactForCustom} →
          </button>
        </div>

      </div>
    </section>
  );
};
