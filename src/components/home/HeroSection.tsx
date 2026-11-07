import React from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../../config/studioConfig';
import { HERO_IMAGE } from '../../data/mockData';
import { MessageCircle, Calendar, Sparkles, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F2EB] to-[#FAF8F5] pt-8 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-stone-200/60 w-full min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 lg:pr-6 min-w-0">
            
            {/* Clean unboxed kicker with typographic separator */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-amber-900/80 truncate">
              <span>{STUDIO_CONFIG.shortName}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">Baby Portraiture Studio</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-5xl/tight font-bold text-stone-900 tracking-tight break-words" style={{ textWrap: 'balance' }}>
              Capturing the Purest First Chapters of Your Little Miracle.
            </h1>

            {/* Lead Copy */}
            <p className="text-xs sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              From sleepy newborn swaddles to joyful 1st birthday cake smashes. We offer a soothing, temperature-controlled studio environment with patient, baby-led handling and handpicked props.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={buildWhatsAppLink("Hello New Sri Laxmi Baby Photo Studio! I would like to book a photoshoot for my baby.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-md transition-all min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>WhatsApp Instant Booking</span>
              </a>

              <Link
                to="/packages"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold rounded-xl border border-stone-300 shadow-2xs hover:border-stone-400 transition-all min-h-[44px]"
              >
                <Calendar className="w-4 h-4 text-stone-600 shrink-0" />
                <span>View Packages & Pricing</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-5 border-t border-stone-300/70 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">Clean, Sanitized Props</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="truncate">Handcrafted Outfits</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1 min-w-0">
                <span className="font-semibold text-stone-900 shrink-0">Warm Studio</span>
                <span className="truncate text-stone-500">(26–28°C)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Studio Portrait Showcase */}
          <div className="lg:col-span-5 flex items-center min-w-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white/80 bg-stone-200">
              <img
                src={HERO_IMAGE}
                alt="Newborn baby resting peacefully in wooden crescent moon prop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  Signature Moon Nest
                </p>
                <p className="font-serif text-base sm:text-lg font-bold">
                  Newborn Fine Art Collection
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
