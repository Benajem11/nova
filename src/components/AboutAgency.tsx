import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Compass, 
  Bot, 
  Award,
  CheckCircle2
} from 'lucide-react';

export const AboutAgency: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual & Tangier Hub Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
              
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

              {/* Tangier Hub Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  N
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">NOVA Digital Agency</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Tangier City Center, Morocco</span>
                  </p>
                </div>
              </div>

              {/* Agency Principles */}
              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Gateway of Two Continents</span>
                  </div>
                  <p className="text-slate-400">
                    Located in Tangier at the crossroads of Africa and Europe, combining global design standards with local market understanding.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span>AI-Empowered Architecture</span>
                  </div>
                  <p className="text-slate-400">
                    Leveraging modern AI pipelines to automate customer capture, CRM sync, and operational bottlenecks.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Built for Long-Term Growth</span>
                  </div>
                  <p className="text-slate-400">
                    Clean, modular code built on TypeScript and React with high-security standards and zero lock-in.
                  </p>
                </div>
              </div>

              {/* Coordinates Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>LAT: 35.7725° N</span>
                <span>LON: 5.8039° W</span>
              </div>

            </div>
          </div>

          {/* Right Narrative Story (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {t.about.title}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            {/* Core Values 3-Block Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{t.about.val1Title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{t.about.val1Desc}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{t.about.val2Title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{t.about.val2Desc}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{t.about.val3Title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{t.about.val3Desc}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
