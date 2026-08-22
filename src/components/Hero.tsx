import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Bot, 
  CheckCircle2, 
  Globe2, 
  Zap, 
  ArrowUpRight,
  Calculator,
  ShieldCheck,
  Building2,
  TrendingUp
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, isRTL, openWhatsApp } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex items-center bg-grid-pattern"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            {/* Location & Agency Badge */}
            <div
              id="hero-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm shadow-cyan-500/10 hover:border-cyan-500/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-main-heading"
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6"
            >
              <span>{t.hero.titleStart} </span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p
              id="hero-tagline"
              className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10">
              {/* Primary CTA: Free Consultation */}
              <button
                id="hero-cta-consultation"
                onClick={() => scrollToSection('#contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{t.hero.ctaConsultation}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              {/* Secondary CTA: View Our Services */}
              <button
                id="hero-cta-services"
                onClick={() => scrollToSection('#services')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 text-slate-200 font-semibold text-sm sm:text-base transition-all duration-200"
              >
                <span>{t.hero.ctaServices}</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </button>

              {/* Tertiary CTA: Calculate Project Cost */}
              <button
                id="hero-cta-estimator"
                onClick={() => scrollToSection('#estimator')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-medium transition-colors"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>{t.hero.ctaEstimate}</span>
              </button>
            </div>

            {/* Target Audience Trust Proof */}
            <div className="pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">{t.hero.trustedBy}:</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Small Businesses</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Startups & Tech</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Entrepreneurs</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Organizations</span>
              </div>
            </div>

          </div>

          {/* Agency Dashboard Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glassmorphic Main Showcase Box */}
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/70 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Header Mockup Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs text-slate-400 font-mono ml-2">nova-digital.ma</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Tangier Hub Active
                  </span>
                </div>

                {/* Core Agency Modules Grid */}
                <div className="space-y-3">
                  
                  {/* Module 1: Web & E-Commerce */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Next.js & Responsive Web</h4>
                        <p className="text-[11px] text-slate-400">Trilingual (AR • FR • EN) + Fast SEO</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                      100% RTL/LTR
                    </span>
                  </div>

                  {/* Module 2: AI & Business Automation */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">AI WhatsApp & Lead Copilot</h4>
                        <p className="text-[11px] text-slate-400">24/7 Smart Customer Response</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-1 rounded">
                      Auto CRM
                    </span>
                  </div>

                  {/* Module 3: Growth & Branding */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Branding & Meta / SEO Strategy</h4>
                        <p className="text-[11px] text-slate-400">High-converting visual identity</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded">
                      Tangier & MENA
                    </span>
                  </div>

                </div>

                {/* Live Stats Row */}
                <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-950/40">
                    <div className="text-sm font-extrabold text-white">99.9%</div>
                    <div className="text-[10px] text-slate-400">Uptime SLA</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/40">
                    <div className="text-sm font-extrabold text-cyan-400">&lt; 1.0s</div>
                    <div className="text-[10px] text-slate-400">Load Speed</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/40">
                    <div className="text-sm font-extrabold text-emerald-400">24/7</div>
                    <div className="text-[10px] text-slate-400">Support</div>
                  </div>
                </div>

                {/* Instant Quote Direct Bar */}
                <div className="mt-3 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 p-3 rounded-xl border border-cyan-500/20 flex items-center justify-between">
                  <div className="text-start">
                    <div className="text-xs font-bold text-white">Ready to start?</div>
                    <div className="text-[10px] text-cyan-300">Free consultation in Tangier & Online</div>
                  </div>
                  <button
                    onClick={() => openWhatsApp()}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-colors"
                  >
                    WhatsApp Chat
                  </button>
                </div>

              </div>

              {/* Floating Floating Accent Badge */}
              <div className={`absolute -bottom-4 ${isRTL ? '-left-4' : '-right-4'} bg-slate-900 border border-slate-700/80 p-3 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-md hidden sm:flex`}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Trilingual Native</div>
                  <div className="text-[10px] text-slate-400">العربية • Français • English</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
