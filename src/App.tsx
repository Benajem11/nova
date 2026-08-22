import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OurProcess } from './components/OurProcess';
import { Portfolio } from './components/Portfolio';
import { InteractiveCostEstimator } from './components/InteractiveCostEstimator';
import { TechStack } from './components/TechStack';
import { AboutAgency } from './components/AboutAgency';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageCircle, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { isRTL, openWhatsApp } = useLanguage();

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Sticky Navigation Header */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Services Overview (All 9 services & detailed modal) */}
        <ServicesOverview />

        {/* 3. Why Choose Us (Tangier, Trilingual, AI, Mobile-first) */}
        <WhyChooseUs />

        {/* 4. Our Process (4-Step Agile Execution) */}
        <OurProcess />

        {/* 5. Portfolio / Case Studies (6 Demo Concepts with interactive modal) */}
        <Portfolio />

        {/* 6. Interactive Project Cost Estimator & WhatsApp Quote Generator */}
        <InteractiveCostEstimator />

        {/* 7. Technologies & Tools We Master */}
        <TechStack />

        {/* 8. About NOVA Digital Agency (Tangier, Morocco) */}
        <AboutAgency />

        {/* 9. Pricing Packages (STARTER, BUSINESS, PREMIUM in MAD/EUR) */}
        <Pricing />

        {/* 10. Frequently Asked Questions */}
        <FAQ />

        {/* 11. Contact Hub (WhatsApp, Phone, Email, Form, Tangier Maps) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Quick Button */}
      <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40`}>
        <button
          type="button"
          onClick={() => openWhatsApp()}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-200 group"
          title="Direct WhatsApp Consultation (+212 652-752297)"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline">WhatsApp (+212 652-752297)</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
