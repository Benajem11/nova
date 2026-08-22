import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { servicesData } from '../data/agencyData';
import { ServiceItem, ServiceCategory } from '../types';
import { ServiceModal } from './ServiceModal';
import { 
  Globe, 
  Smartphone, 
  Share2, 
  Bot, 
  Languages, 
  Palette, 
  TrendingUp, 
  Workflow, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ServicesOverview: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-blue-400" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-pink-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-purple-400" />;
      case 'Languages': return <Languages className="w-6 h-6 text-emerald-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-sky-400" />;
      case 'Workflow': return <Workflow className="w-6 h-6 text-indigo-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-teal-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  const filterTabs: { id: 'all' | ServiceCategory; label: string }[] = [
    { id: 'all', label: t.services.filterAll },
    { id: 'development', label: t.services.filterDev },
    { id: 'ai-automation', label: t.services.filterAi },
    { id: 'creative-marketing', label: t.services.filterMarketing },
    { id: 'support', label: t.services.filterSupport },
  ];

  return (
    <section id="services" className="py-20 md:py-28 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid (All 9 services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const title = (t.services as Record<string, string>)[service.titleKey] || service.titleKey;
            const desc = (t.services as Record<string, string>)[service.descKey] || service.descKey;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/60 group-hover:border-cyan-500/40 transition-colors">
                      {getServiceIcon(service.icon)}
                    </div>
                    {service.badgeKey && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {service.badgeKey}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                    {desc}
                  </p>

                  {/* Key Features Bullet List */}
                  <ul className="space-y-2 mb-6">
                    {service.featuresKeys.slice(0, 3).map((fKey, i) => {
                      const feat = (t.services as Record<string, string>)[fKey] || fKey;
                      return (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Bottom Action & Tech tags */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {service.techStack.slice(0, 2).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 border border-slate-800 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-0.5"
                    >
                      <span>{t.services.learnMore}</span>
                      <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Detail View */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};
