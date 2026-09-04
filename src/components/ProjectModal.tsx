import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PortfolioItem } from '../types';
import { 
  X, 
  Sparkles, 
  ExternalLink, 
  MessageCircle, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Calendar,
  Phone,
  Utensils,
  Home,
  Scissors,
  Bot,
  Smartphone,
  Palette,
  Send
} from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language, t, isRTL, openWhatsApp } = useLanguage();
  const [activeMockupTab, setActiveMockupTab] = useState<'overview' | 'interactive'>('overview');

  // Interactive state for restaurant demo mockup
  const [restaurantGuests, setRestaurantGuests] = useState('2');
  const [restaurantTime, setRestaurantTime] = useState('20:00');
  const [restaurantBooked, setRestaurantBooked] = useState(false);

  // Interactive state for AI Copilot demo mockup
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    { 
      role: 'ai', 
      text: language === 'ar' 
        ? 'مرحباً! أنا المساعد الذكي لمؤسستك في طنجة. كيف أساعدك اليوم في تلخيص المبيعات أو حجز المواعيد؟'
        : language === 'fr'
        ? 'Bonjour ! Je suis l’assistant IA pour votre entreprise à Tanger. Que puis-je faire pour vous aujourd’hui ?'
        : 'Hello! I am the AI Copilot for your business in Tangier. How can I assist with your customer workflows today?' 
    }
  ]);
  const [aiInput, setAiInput] = useState('');

  // Interactive state for Real Estate demo
  const [propertyCurrency, setPropertyCurrency] = useState<'MAD' | 'EUR'>('MAD');

  if (!project) return null;

  const title = project.title[language] || project.title.en;
  const category = project.category[language] || project.category.en;
  const clientType = project.clientType[language] || project.clientType.en;
  const description = project.description[language] || project.description.en;
  const features = project.features[language] || project.features.en;

  const liveUrl = project.demoUrl === 'self'
    ? (typeof window !== 'undefined' ? window.location.href : '#')
    : project.demoUrl;

  const handleInquireProject = () => {
    const msg = isRTL
      ? `مرحباً نوفا ديجيتال، شاهدت نموذج (${title}) وأرغب في مناقشة مشروع مماثل لنشاطي التجاري.`
      : `Bonjour NOVA Digital, j'ai découvert le projet démo (${title}) et je souhaite discuter d'un projet similaire pour mon entreprise.`;
    openWhatsApp(msg);
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiInput('');
    setAiMessages(prev => [...prev, { role: 'user', text: userText }]);
    setTimeout(() => {
      setAiMessages(prev => [
        ...prev, 
        { 
          role: 'ai', 
          text: language === 'ar'
            ? `تم تحليل طلبك ("${userText}") بنجاح! تم حفظ البيانات في نظام الـ CRM وإرسال تنبيه عبر الواتساب.`
            : language === 'fr'
            ? `Votre demande ("${userText}") a été analysée avec succès ! Les données sont enregistrées dans le CRM avec notification WhatsApp.`
            : `Your request ("${userText}") was processed! Logged in CRM and automated WhatsApp notification triggered.`
        }
      ]);
    }, 600);
  };

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {project.badge}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t.portfolio.viewLiveDemo}</span>
            </a>

            <button
              onClick={() => setActiveMockupTab(activeMockupTab === 'overview' ? 'interactive' : 'overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeMockupTab === 'interactive'
                  ? 'bg-slate-700 text-cyan-300'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {activeMockupTab === 'interactive' ? 'Overview' : 'Interactive Prototype'}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main Title & Client Sector */}
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              {clientType}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-1">
              {title}
            </h3>
          </div>

          {/* Tab 1: Overview */}
          {activeMockupTab === 'overview' ? (
            <>
              {/* Image Banner */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video max-h-72 w-full group">
                <img
                  src={project.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg backdrop-blur-md border border-slate-700">
                    Tangier, Morocco Concept
                  </span>
                  <span className="bg-cyan-500/90 text-slate-950 font-bold px-3 py-1.5 rounded-lg backdrop-blur-md">
                    100% Fully Responsive
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {description}
              </p>

              {/* Key Highlights / Metrics Row */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((metric, i) => {
                  const label = metric.label[language] || metric.label.en;
                  return (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <div className="text-base sm:text-xl font-extrabold text-cyan-400">{metric.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Key Project Features</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {t.portfolio.techUsed}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Tab 2: Interactive In-Modal Simulator */
            <div className="rounded-xl bg-slate-950 p-5 sm:p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Interactive Prototype Mode</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Demo ID: {project.id}</span>
              </div>

              {/* Project Type 1: Restaurant Simulator */}
              {project.livePreviewType === 'restaurant' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-amber-400" />
                      <span>Medina Flavors Instant Table Reservation</span>
                    </h5>
                    <p className="text-xs text-slate-400 mb-4">
                      Simulate the customer booking workflow with direct WhatsApp integration.
                    </p>

                    {restaurantBooked ? (
                      <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                        ✓ Table reserved for {restaurantGuests} guests at {restaurantTime}! WhatsApp confirmation dispatched.
                        <button
                          onClick={() => setRestaurantBooked(false)}
                          className="block mt-2 text-xs font-bold underline text-white"
                        >
                          Book another test table
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Guests</label>
                          <select
                            value={restaurantGuests}
                            onChange={(e) => setRestaurantGuests(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            <option value="1">1 Person</option>
                            <option value="2">2 People (Romantic Table)</option>
                            <option value="4">4 People (Family Table)</option>
                            <option value="6+">6+ People (Group)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Time Slot</label>
                          <select
                            value={restaurantTime}
                            onChange={(e) => setRestaurantTime(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          >
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00 (Prime Dinner)</option>
                            <option value="21:30">21:30</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => setRestaurantBooked(true)}
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                          >
                            Simulate Booking
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Project Type 2: Real Estate Simulator */}
              {project.livePreviewType === 'real-estate' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Home className="w-4 h-4 text-cyan-400" />
                        <span>Tangier Seaside Luxury Villa Listing</span>
                      </h5>
                      <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                        <button
                          onClick={() => setPropertyCurrency('MAD')}
                          className={`px-2 py-0.5 rounded ${propertyCurrency === 'MAD' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                        >
                          MAD
                        </button>
                        <button
                          onClick={() => setPropertyCurrency('EUR')}
                          className={`px-2 py-0.5 rounded ${propertyCurrency === 'EUR' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                        >
                          EUR
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Villa Malabata Bay - 450 m²</div>
                        <div className="text-[11px] text-slate-400">5 Suites • Private Infinity Pool • Sea View</div>
                      </div>
                      <div className="text-end">
                        <div className="text-sm font-extrabold text-cyan-400">
                          {propertyCurrency === 'MAD' ? '6,800,000 MAD' : '€ 630,000'}
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          Direct Owner Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Type 3: AI Copilot Simulator */}
              {project.livePreviewType === 'ai-tool' && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col h-64 justify-between">
                  <div className="overflow-y-auto space-y-2 pr-1">
                    {aiMessages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
                            m.role === 'user'
                              ? 'bg-cyan-500 text-slate-950 font-medium'
                              : 'bg-slate-950 text-slate-200 border border-slate-800'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendAiMessage} className="flex gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Type a test message (e.g. Can you summarize today's orders?)"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {/* Other types generic interactive card */}
              {(project.livePreviewType === 'barbershop' || project.livePreviewType === 'mobile-app' || project.livePreviewType === 'brand-identity') && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                  <div className="text-sm font-bold text-white">Full Interactive Component Active</div>
                  <p className="text-xs text-slate-400">
                    Configured for high-speed delivery with mobile-first viewport optimization and direct booking logic.
                  </p>
                  <button
                    onClick={handleInquireProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    <span>Request Custom Demo Deployment</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-start">
            <span className="font-semibold text-slate-300">Inspired by this concept?</span> We can customize a tailor-made version for your business.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{t.portfolio.viewLiveDemo}</span>
            </a>

            <button
              onClick={handleInquireProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Similar Project</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
