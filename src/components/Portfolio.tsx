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
  Globe, 
  Info,
  Eye,
  CheckCircle2
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'web' | 'hospitality' | 'realEstate' | 'agency'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filterTabs = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'web', label: t.portfolio.filterWeb },
    { id: 'hospitality', label: t.portfolio.filterHospitality },
    { id: 'realEstate', label: t.portfolio.filterRealEstate },
    { id: 'agency', label: t.portfolio.filterAgency },
  ];

  const filteredProjects = portfolioProjects.filter((p) => {
    if (selectedFilter === 'all' || selectedFilter === 'web') return true;
    if (selectedFilter === 'hospitality') return p.id === 'dar-tanger';
    if (selectedFilter === 'realEstate') return p.id === 'tangier-properties';
    if (selectedFilter === 'agency') return p.id === 'nova-digital';
    return true;
  });

  const getDemoUrl = (project: PortfolioItem): string => {
    if (project.demoUrl === 'self') {
      if (typeof window !== 'undefined') {
        return window.location.href;
      }
      return '#';
    }
    return project.demoUrl;
  };

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
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-start max-w-2xl mx-auto">
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
            const liveUrl = getDemoUrl(project);

            return (
              <div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
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
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow">
                      {project.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/95 text-cyan-300 border border-slate-700/80 backdrop-blur-md">
                      {category}
                    </span>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs p-4">
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg inline-flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.portfolio.viewLiveDemo}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-xs shadow-lg inline-flex items-center gap-1.5 border border-slate-700 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t.portfolio.projectDetails}</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                        {clientType}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 whitespace-nowrap">
                        {t.portfolio.demoLabel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {tagline}
                    </p>

                    {/* Tech & Feature Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950 border border-slate-800 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                      {/* View Live Demo Primary CTA */}
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="whitespace-nowrap">{t.portfolio.viewLiveDemo}</span>
                      </a>

                      {/* View Details Secondary CTA */}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                        <span className="whitespace-nowrap">{t.portfolio.projectDetails}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Live Preview Ready</span>
                      </span>
                      <span className="font-mono text-slate-500">
                        Tangier, Morocco
                      </span>
                    </div>
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
