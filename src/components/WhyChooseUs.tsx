import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Compass, 
  Languages, 
  Bot, 
  Clock, 
  Smartphone, 
  Headphones, 
  Sparkles,
  CheckCircle,
  MapPin
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      title: t.whyUs.r1Title,
      desc: t.whyUs.r1Desc,
      tag: 'Tangier Hub',
    },
    {
      icon: <Languages className="w-6 h-6 text-emerald-400" />,
      title: t.whyUs.r2Title,
      desc: t.whyUs.r2Desc,
      tag: 'AR • FR • EN',
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      title: t.whyUs.r3Title,
      desc: t.whyUs.r3Desc,
      tag: 'Smart Workflows',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: t.whyUs.r4Title,
      desc: t.whyUs.r4Desc,
      tag: 'Agile Delivery',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: t.whyUs.r5Title,
      desc: t.whyUs.r5Desc,
      tag: '85%+ Mobile Traffic',
    },
    {
      icon: <Headphones className="w-6 h-6 text-teal-400" />,
      title: t.whyUs.r6Title,
      desc: t.whyUs.r6Desc,
      tag: '24/7 SLA Support',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.whyUs.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.whyUs.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 6 Reasons Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/30 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {reason.icon}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                    {reason.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tangier Tech Strategic Highlight Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Located in Tangier, Morocco (طنجة، المغرب)</h4>
              <p className="text-xs sm:text-sm text-slate-300">Serving clients across Morocco, Europe, and the Middle East with international standards.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-cyan-300">GMT+1 Timezone Support</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

      </div>
    </section>
  );
};
