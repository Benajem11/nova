import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { faqItems } from '../data/agencyData';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const FAQ: React.FC = () => {
  const { t, isRTL, openWhatsApp } = useLanguage();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.faq.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const question = (t.faq as Record<string, string>)[item.questionKey] || item.questionKey;
            const answer = (t.faq as Record<string, string>)[item.answerKey] || item.answerKey;
            const isOpen = openFaqId === item.id;

            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400 bg-cyan-500/15' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-blue-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-start">
            <h4 className="text-sm font-bold text-white">Have a specific question not covered here?</h4>
            <p className="text-xs text-slate-400">Our consultants in Tangier are happy to answer all inquiries.</p>
          </div>
          <button
            onClick={() => openWhatsApp('مرحباً نوفا ديجيتال، لدي استفسار خاص أرغب في طرحه.')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
