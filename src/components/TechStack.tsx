import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { techStackItems } from '../data/agencyData';
import { 
  Code2, 
  Sparkles, 
  Cpu, 
  Smartphone, 
  Server, 
  Palette, 
  TrendingUp 
} from 'lucide-react';

export const TechStack: React.FC = () => {
  const { t } = useLanguage();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'mobile': return <Smartphone className="w-4 h-4 text-blue-400" />;
      case 'ai': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'backend': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'design': return <Palette className="w-4 h-4 text-pink-400" />;
      case 'marketing': return <TrendingUp className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="tech-stack" className="py-20 md:py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.tech.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.tech.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.tech.subtitle}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {techStackItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center justify-center gap-2 group"
            >
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {item.descriptionKey}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
