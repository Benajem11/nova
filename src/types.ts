export type Language = 'en' | 'fr' | 'ar';

export type ServiceCategory = 'development' | 'ai-automation' | 'creative-marketing' | 'support';

export interface ServiceItem {
  id: string;
  icon: string;
  category: ServiceCategory;
  titleKey: string;
  descKey: string;
  badgeKey?: string;
  featuresKeys: string[];
  deliverablesKeys: string[];
  techStack: string[];
}

export interface PortfolioItem {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  clientType: Record<Language, string>;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  badge: 'Demo Project' | 'Concept';
  image: string;
  tags: string[];
  features: Record<Language, string[]>;
  metrics: { label: Record<Language, string>; value: string }[];
  livePreviewType: 'restaurant' | 'real-estate' | 'barbershop' | 'ai-tool' | 'mobile-app' | 'brand-identity';
}

export interface ProcessStep {
  number: string;
  titleKey: string;
  descKey: string;
  deliverablesKeys: string[];
  durationKey: string;
}

export interface PricingPlan {
  id: 'starter' | 'business' | 'premium';
  nameKey: string;
  taglineKey: string;
  targetKey: string;
  priceMAD: number;
  priceEUR: number;
  featured?: boolean;
  featuresKeys: string[];
  includedServiceKeys: string[];
  turnaroundKey: string;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'web-mobile' | 'ai-automation' | 'pricing';
  questionKey: string;
  answerKey: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'mobile' | 'ai' | 'backend' | 'design' | 'marketing';
  descriptionKey: string;
}

export interface ContactDetails {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    en: string;
    fr: string;
    ar: string;
  };
  city: {
    en: string;
    fr: string;
    ar: string;
  };
  workingHours: {
    en: string;
    fr: string;
    ar: string;
  };
}

export interface EstimateOptions {
  serviceTypes: string[];
  timeline: string;
  projectScope: string;
  languagesCount: number;
  budgetRange: string;
}
