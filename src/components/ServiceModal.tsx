import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Code2, 
  Layers, 
  Check, 
  Sparkles,
  Globe,
  Smartphone,
  Share2,
  Bot,
  Languages,
  Palette,
  TrendingUp,
  Workflow,
  ShieldCheck
} from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const { t, isRTL, openWhatsApp } = useLanguage();

  if (!service) return null;

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

  const title = (t.services as Record<string, string>)[service.titleKey] || service.titleKey;
  const desc = (t.services as Record<string, string>)[service.descKey] || service.descKey;

  const handleInquireWhatsApp = () => {
    const msg = isRTL
      ? `مرحباً نوفا ديجيتال، أرغب في الاستفسار عن خدمة: ${title}.`
      : `Bonjour NOVA Digital, je souhaite des informations concernant le service : ${title}.`;
    openWhatsApp(msg);
  };

  return (
    <div
      id="service-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            {getServiceIcon(service.icon)}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {service.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
          {desc}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Key Capabilities</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.featuresKeys.map((fKey, i) => {
              const featText = (t.services as Record<string, string>)[fKey] || fKey;
              return (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{featText}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.services.deliverablesHeading}</span>
          </h4>
          <div className="space-y-2">
            {service.deliverablesKeys.map((dKey, i) => {
              const delivText = (t.services as Record<string, string>)[dKey] || dKey;
              return (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{delivText}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {t.services.techStackHeading}
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={handleInquireWhatsApp}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Inquiry</span>
          </button>
          
          <button
            onClick={() => {
              onClose();
              const contactEl = document.querySelector('#contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors"
          >
            {t.services.requestService}
          </button>
        </div>
      </div>
    </div>
  );
};
