import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HighlightsStrip } from '../components/home/HighlightsStrip';
import { ServicesSection } from '../components/home/ServicesSection';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { BeforeAfterShowcase } from '../components/home/BeforeAfterShowcase';
import { PackagesSection } from '../components/home/PackagesSection';
import { SafetyCommitment } from '../components/home/SafetyCommitment';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FaqSection } from '../components/home/FaqSection';
import { LocationContactSection } from '../components/home/LocationContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HighlightsStrip />
      <ServicesSection />
      <PortfolioSection />
      <BeforeAfterShowcase />
      <PackagesSection />
      <SafetyCommitment />
      <TestimonialsSection />
      <FaqSection />
      <LocationContactSection />
    </main>
  );
};
