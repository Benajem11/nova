import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { processSteps } from '../data/agencyData';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Layers, 
  ArrowRight,
  Workflow
} from 'lucide-react';

export const OurProcess: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = processSteps[activeStepIndex];
  const activeTitle = (t.process as Record<string, string>)[activeStep.titleKey] || activeStep.titleKey;
  const activeDesc = (t.process as Record<string, string>)[activeStep.descKey] || activeStep.descKey;
  const activeTime = (t.process as Record<string, string>)[activeStep.durationKey] || activeStep.durationKey;

  return (
    <section id="process" className="py-20 md:py-28 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>{t.process.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.process.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* Step Numbers Top Navigation Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {processSteps.map((step, idx) => {
            const stepTitle = (t.process as Record<string, string>)[step.titleKey] || step.titleKey;
            const isSelected = activeStepIndex === idx;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-start p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700 text-slate-400'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg sm:text-xl font-extrabold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {step.number}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    Step {idx + 1}
                  </span>
                </div>
                <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {stepTitle.replace(/^\d+\.\s*/, '')}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Box */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800/90 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Overview & Scope */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Step {activeStep.number}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeTime}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4">
                {activeTitle}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {activeDesc}
              </p>

              {/* Deliverables Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Key Phase Deliverables:</span>
                </h4>
                <div className="space-y-2.5">
                  {activeStep.deliverablesKeys.map((delKey, i) => {
                    const deliverableText = (t.process as Record<string, string>)[delKey] || delKey;
                    return (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{deliverableText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Visual Step Diagram / Quality Seal */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase">NOVA Quality Standard</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Guaranteed
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <span>Transparent Communication</span>
                  <span className="text-cyan-400 font-semibold">Daily/Weekly WhatsApp</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <span>Milestone Approvals</span>
                  <span className="text-cyan-400 font-semibold">100% Client Sign-Off</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <span>Warranty Support</span>
                  <span className="text-emerald-400 font-semibold">Post-Launch Free Care</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    const nextIdx = (activeStepIndex + 1) % processSteps.length;
                    setActiveStepIndex(nextIdx);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Next Step ({processSteps[(activeStepIndex + 1) % processSteps.length].number})</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
