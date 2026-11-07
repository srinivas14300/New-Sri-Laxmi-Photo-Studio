import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { studioStore } from '../../services/store';
import { ServiceCarouselSlide } from '../../types';
import { buildWhatsAppCategoryEnquiry } from '../../config/studioConfig';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const ServicesCarousel: React.FC = () => {
  const [slides, setSlides] = useState<ServiceCarouselSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const [intervalSec, setIntervalSec] = useState(5);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const loadData = useCallback(() => {
    const published = studioStore.getPublishedCarouselSlides();
    setSlides(published);
    const settings = studioStore.getSettings();
    setAutoSlideEnabled(settings.carouselAutoSlide !== false);
    setIntervalSec(settings.carouselIntervalSeconds || 5);
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, [loadData]);

  const total = slides.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Automatic 5s sliding with hover pause
  useEffect(() => {
    if (!autoSlideEnabled || isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, intervalSec * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoSlideEnabled, isPaused, intervalSec, nextSlide, total, currentIndex]);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    setIsPaused(false);
  };

  if (total === 0) {
    return (
      <div className="w-full py-24 bg-stone-900 text-stone-200 text-center px-4">
        <p className="font-serif text-xl">No active carousel slides published.</p>
        <p className="text-xs text-stone-400 mt-2">Publish service slides in the studio admin dashboard.</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      className="relative w-full h-[76vh] sm:h-[84vh] lg:h-[90vh] min-h-[580px] max-h-[960px] bg-stone-950 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Photography Services Showcase Carousel"
    >
      {/* Background Photography Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Slow Subtle Zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center filter brightness-75 contrast-105 transition-transform duration-10000 ease-out motion-reduce:transform-none ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>

            {/* Editorial Dark Gradient Scrim Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* Main Slide Content (Lower Left Editorial Layout) */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Top Kicker Label & Slide Counter */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentSlide.title}</span>
            </div>

            <span className="text-stone-300/80 text-xs font-mono tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Headline - Editorial Serif Typography */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-lg">
            {currentSlide.headline || currentSlide.title}
          </h1>

          {/* Description - Clean Sans-Serif Typography */}
          <p className="text-stone-200 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl drop-shadow-sm">
            {currentSlide.tagline}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              to={currentSlide.routePath}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 min-h-[46px] hover:shadow-amber-400/20 hover:scale-[1.02]"
            >
              <span>{currentSlide.ctaText || `Explore ${currentSlide.title}`}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={buildWhatsAppCategoryEnquiry(currentSlide.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire Availability</span>
            </a>
          </div>

        </div>
      </div>

      {/* Navigation Controls: Previous / Next Chevron Buttons */}
      <div className="absolute inset-y-0 left-3 sm:left-6 flex items-center z-30 pointer-events-none">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous showcase slide"
          className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-3 sm:right-6 flex items-center z-30 pointer-events-none">
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next showcase slide"
          className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Bottom Bar: 5 Clickable Indicators & Status */}
      <div className="absolute bottom-5 sm:bottom-8 inset-x-0 z-30 flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        
        {/* Pagination Indicators */}
        <div className="pointer-events-auto flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>

        {/* Authenticity Badge */}
        {!currentSlide.isIllustrativePlaceholder ? (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 backdrop-blur-md text-[11px] text-emerald-300 border border-emerald-500/30 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Genuine Studio Baby Photography</span>
          </div>
        ) : (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-stone-300 border border-white/10">
            <span>Illustrative Studio Showcase</span>
          </div>
        )}

      </div>
    </section>
  );
};
