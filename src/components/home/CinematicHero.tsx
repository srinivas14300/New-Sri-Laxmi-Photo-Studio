import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG, buildWhatsAppCategoryEnquiry } from '../../config/studioConfig';
import {
  WEDDING_IMAGE,
  CEREMONY_IMAGE,
  PREWEDDING_IMAGE,
  HERO_IMAGE
} from '../../data/mockData';
import { MessageCircle, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  categoryLabel: string;
  pillTitle: string;
  headlineMain: string;
  headlineItalic: string;
  subtext: string;
  image: string;
  routePath: string;
  whatsappTopic: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'weddings',
    categoryLabel: 'Weddings & Celebrations',
    pillTitle: 'Weddings',
    headlineMain: 'Sacred Rituals.',
    headlineItalic: 'Timeless Royal Romance.',
    subtext: 'Complete traditional Muhurtham coverage, candid moments, cinematic films, and luxury handcrafted silk albums.',
    image: WEDDING_IMAGE,
    routePath: '/weddings',
    whatsappTopic: 'Wedding Photography & Films'
  },
  {
    id: 'events',
    categoryLabel: 'Traditional Ceremonies',
    pillTitle: 'Events & Ceremonies',
    headlineMain: 'Heritage Festivities.',
    headlineItalic: 'Auspicious Family Blessings.',
    subtext: 'Namakaranam, Cradle Ceremonies, 1st Birthday parties, Annaprasana, and cultural family functions documented with warmth.',
    image: CEREMONY_IMAGE,
    routePath: '/events',
    whatsappTopic: 'Traditional Ceremonies & Events'
  },
  {
    id: 'pre-wedding',
    categoryLabel: 'Pre-Wedding & Couples',
    pillTitle: 'Pre-Wedding',
    headlineMain: 'Golden Hour Poise.',
    headlineItalic: 'Cinematic Love Stories.',
    subtext: 'Scenic outdoor couple photoshoots, romantic sunset backdrops, drone perspectives, and Save-the-Date video teasers.',
    image: PREWEDDING_IMAGE,
    routePath: '/pre-wedding',
    whatsappTopic: 'Pre-Wedding Couple Shoot'
  },
  {
    id: 'baby-maternity',
    categoryLabel: 'Baby, Newborn & Maternity',
    pillTitle: 'Baby & Maternity',
    headlineMain: 'Pure Emotion.',
    headlineItalic: 'Delicate Earliest Chapters.',
    subtext: 'Safe, temperature-controlled newborn swaddles (5-21 days), sitter milestones, cake smash, and fine art maternity portraits.',
    image: HERO_IMAGE,
    routePath: '/baby-photography',
    whatsappTopic: 'Baby & Newborn Photography'
  }
];

export const CinematicHero: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-end">
      
      {/* Background imagery with crossfade transitions */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.headlineMain}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-65 contrast-105"
            />
            {/* Cinematic Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-black/30" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/35 to-stone-950/80" />
          </div>
        ))}
      </div>

      {/* Hero Content Lockup */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-14 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 w-full flex flex-col justify-between flex-1">
        
        {/* Editorial Title & Lead */}
        <div className="max-w-3xl space-y-4 my-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs uppercase tracking-widest text-amber-300 font-semibold drop-shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Full-Service Photography Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            {currentSlide.headlineMain} <br />
            <span className="italic font-normal text-amber-100">
              {currentSlide.headlineItalic}
            </span>
          </h1>

          <p className="text-stone-200 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed drop-shadow-sm pt-1">
            {currentSlide.subtext}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <a
              href={buildWhatsAppCategoryEnquiry(currentSlide.whatsappTopic)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Booking for {currentSlide.pillTitle}</span>
            </a>

            <Link
              to={currentSlide.routePath}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl backdrop-blur-md border border-white/30 transition-all min-h-[48px]"
            >
              <span>Explore {currentSlide.pillTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Visual Category Selector Tabs Strip */}
        <div className="pt-8 border-t border-white/15">
          <p className="text-[11px] uppercase tracking-widest text-stone-300 font-medium mb-3">
            Explore Studio Disciplines:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`text-left p-3 rounded-xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white/20 backdrop-blur-md border-amber-300 text-white shadow-md'
                      : 'bg-black/35 backdrop-blur-xs border-white/10 text-stone-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                      0{idx + 1}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                  </div>
                  <p className="font-serif font-bold text-xs sm:text-sm text-white mt-1 truncate">
                    {slide.pillTitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
