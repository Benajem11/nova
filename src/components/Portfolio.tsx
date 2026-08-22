import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioProjects } from '../data/agencyData';
import { PortfolioItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  Smartphone, 
  Globe, 
  Bot, 
  Palette,
  Eye,
  Info
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'web' | 'mobile' | 'ai' | 'branding'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filterTabs = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'web', label: t.portfolio.filterWeb },
    { id: 'mobile', label: t.portfolio.filterMobile },
    { id: 'ai', label: t.portfolio.filterAi },
    { id: 'branding', label: t.portfolio.filterBranding },
  ];

  const filteredProjects = portfolioProjects.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'web') return p.id === 'medina-flavors' || p.id === 'atlas-horizon' || p.id === 'gentlemans-lounge';
    if (selectedFilter === 'mobile') return p.id === 'soukexpress';
    if (selectedFilter === 'ai') return p.id === 'novapulse-ai';
    if (selectedFilter === 'branding') return p.id === 'riad-noor';
    return true;
  });

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.portfolio.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.portfolio.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
            {t.portfolio.subtitle}
          </p>

          {/* Transparency Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-start">
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{t.portfolio.disclaimer}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const title = project.title[language] || project.title.en;
            const category = project.category[language] || project.category.en;
            const clientType = project.clientType[language] || project.clientType.en;
            const tagline = project.tagline[language] || project.tagline.en;

            return (
              <div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                className="group rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                {/* Image Container with Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/90 text-slate-950 shadow">
                      {project.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/90 text-cyan-300 border border-slate-700/80 backdrop-blur-md">
                      {category}
                    </span>
                  </div>

                  {/* Quick Action Eye Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg inline-flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.portfolio.livePreview}</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      {clientType}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {tagline}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 border border-slate-800 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>{t.portfolio.viewProject}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <span className="text-[11px] text-slate-500 font-mono">
                      Tangier Concept
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
