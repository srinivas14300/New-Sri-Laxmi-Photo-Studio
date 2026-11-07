import React from 'react';
import { Link } from 'react-router-dom';
import {
  WEDDING_IMAGE,
  PREWEDDING_IMAGE,
  CEREMONY_IMAGE,
  HERO_IMAGE,
  NEWBORN_IMAGE,
  SITTER_IMAGE,
  CAKE_SMASH_IMAGE,
  MATERNITY_IMAGE,
  TODDLER_IMAGE,
  PRODUCTS_IMAGE
} from '../../data/mockData';
import { buildWhatsAppCategoryEnquiry } from '../../config/studioConfig';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const FourPillarsShowcase: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 py-16 sm:py-24 bg-[#FAF8F5]">
      
      {/* ======================================================== */}
      {/* PILLAR 1: WEDDINGS & PRE-WEDDING PHOTOGRAPHY             */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden relative">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Major Studio Discipline</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Weddings & Pre-Wedding Shoots
              </h2>
              <p className="text-stone-300 text-xs sm:text-base font-light leading-relaxed">
                Complete traditional coverage, candid romance, cinematic films, and royal handcrafted silk albums across Telangana and Andhra Pradesh.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/weddings"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl backdrop-blur-md border border-white/25 transition-all"
              >
                <span>Wedding Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={buildWhatsAppCategoryEnquiry("Wedding Photography & Films")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Quote</span>
                <span className="sm:hidden">Enquire</span>
              </a>
            </div>
          </div>

          {/* Large Visual Photography Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            
            {/* Wedding Main Photo (Spans 7 cols) */}
            <div className="lg:col-span-7 group relative aspect-[16/11] rounded-2xl overflow-hidden bg-stone-950">
              <img
                src={WEDDING_IMAGE}
                alt="Traditional Indian Wedding Couple"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 sm:p-7 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Telugu & South Indian Weddings
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Sacred Muhurtham Rites & Candid Emotion
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1 hidden sm:block">
                  From Jeelakarra Bellam to Kanyadaanam, captured with reverence and vivid cultural detail.
                </p>
              </div>
            </div>

            {/* Pre-Wedding Couple Photo (Spans 5 cols) */}
            <div className="lg:col-span-5 group relative aspect-[16/11] lg:aspect-auto rounded-2xl overflow-hidden bg-stone-950 flex flex-col justify-between">
              <img
                src={PREWEDDING_IMAGE}
                alt="Pre-Wedding Couple Shoot at Heritage Courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 sm:p-7 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Scenic Couple Sessions
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Golden Hour Romance & Save-the-Date
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1 hidden sm:block">
                  Romantic heritage courtyards and sunset meadows in cinematic 4K video and photo.
                </p>
              </div>
            </div>

          </div>

          {/* Sub-Disciplines Quick Strip */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Traditional Vedic Rites</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Candid Wedding Storytelling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cinematic 4K Drone Films</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Archival Silk Photobooks</span>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* PILLAR 2: EVENTS & TRADITIONAL CEREMONIES                */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F2EB] rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-sm relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Family Auspicious Milestones</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                Events & Traditional Ceremonies
              </h2>
              <p className="text-stone-600 text-xs sm:text-base font-light leading-relaxed">
                Namakaranam (Naming Ceremony), Cradle Ceremony (Uyyala), Annaprasana, Half-Saree functions, and 1st Birthday family gatherings.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                <span>Ceremony Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={buildWhatsAppCategoryEnquiry("Traditional Ceremonies & Events")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp Booking</span>
                <span className="sm:hidden">Enquire</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Visual Ceremony Hero Photo (Spans 8 cols) */}
            <div className="lg:col-span-8 group relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 shadow-md">
              <img
                src={CEREMONY_IMAGE}
                alt="Traditional Cradle Ceremony and Blessings"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 sm:p-7 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Auspicious Telugu Heritage
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Namakaranam & Cradle Blessing Ceremony
                </h3>
                <p className="text-xs text-stone-200 font-light mt-1">
                  Marigold garlands, traditional silver lamps, and multi-generational family love captured with poise.
                </p>
              </div>
            </div>

            {/* Key Ceremonies Covered List (Spans 4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs space-y-4">
              <h4 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
                Ceremonies We Cover
              </h4>
              <ul className="space-y-3 text-xs text-stone-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                  <span><strong>Namakaranam:</strong> Sacred ear-whispering naming rites and mantras.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                  <span><strong>Cradle Ceremony (Uyyala):</strong> Floral cradle decorations and family blessings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                  <span><strong>Annaprasana:</strong> First rice feeding ceremony and item selections.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                  <span><strong>1st Birthday Celebrations:</strong> Stage decor, cake cutting, and guest candids.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                  <span><strong>Half-Saree / Dhoti Functions:</strong> Coming-of-age family celebrations.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* PILLAR 3: BABY, NEWBORN & MATERNITY                      */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200 shadow-sm relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Specialized Sanctuary</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                Baby, Newborn & Maternity
              </h2>
              <p className="text-stone-600 text-xs sm:text-base font-light leading-relaxed">
                Temperature-controlled studio (26–28°C), 100+ sanitized handcrafted props, sleepy newborn swaddles, sitter milestones, and fine-art maternity silhouettes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/baby-photography"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                <span>Baby Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/maternity"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                <span>Maternity Gowns</span>
              </Link>
            </div>
          </div>

          {/* 4-Image Balanced Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 1. Newborn Moon */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900">
              <img
                src={HERO_IMAGE}
                alt="Newborn sleeping on wooden crescent moon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">5-21 Days</span>
                <h4 className="font-serif font-bold text-base">Newborn Swaddles</h4>
              </div>
            </div>

            {/* 2. Sitter Milestone */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900">
              <img
                src={SITTER_IMAGE}
                alt="6 to 10 month baby sitter milestone"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">6-10 Months</span>
                <h4 className="font-serif font-bold text-base">Sitter Milestones</h4>
              </div>
            </div>

            {/* 3. Cake Smash & Tub Splash */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900">
              <img
                src={CAKE_SMASH_IMAGE}
                alt="1st Birthday Cake Smash and Bubble Tub"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">Turning One</span>
                <h4 className="font-serif font-bold text-base">1st Birthday Smash</h4>
              </div>
            </div>

            {/* 4. Fine Art Maternity */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900">
              <img
                src={MATERNITY_IMAGE}
                alt="Fine Art Maternity with flowing gown"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">28-34 Weeks</span>
                <h4 className="font-serif font-bold text-base">Maternity Glow</h4>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* PILLAR 4: PORTRAITS & PHOTO PRODUCTS (ALBUMS & FRAMES)   */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-xs relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Heirlooms for Your Living Room</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                Portraits & Archival Photo Products
              </h2>
              <p className="text-stone-600 text-xs sm:text-base font-light leading-relaxed">
                Multi-generational family portraits, children milestones, executive studio headshots, handcrafted silk albums, wooden frames, and lamination lab services.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/portraits"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all"
              >
                <span>Portrait Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={buildWhatsAppCategoryEnquiry("Archival Albums & Framing Services")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Custom Album Enquiry</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Photo Products / Albums (Spans 7 cols) */}
            <div className="lg:col-span-7 group relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 shadow-sm">
              <img
                src={PRODUCTS_IMAGE}
                alt="Handcrafted photobooks, framed canvas and acrylic blocks"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 sm:p-7 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Archival Heirlooms
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">
                  Handcrafted Silk Photobooks & Teakwood Frames
                </h3>
                <p className="text-xs text-stone-200 font-light mt-1">
                  Flush-mount layflat pages, non-tear archival paper, floating acrylic blocks, and thermal lamination.
                </p>
              </div>
            </div>

            {/* Studio Portraiture (Spans 5 cols) */}
            <div className="lg:col-span-5 group relative aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden bg-stone-900 shadow-sm flex flex-col justify-between">
              <img
                src={TODDLER_IMAGE}
                alt="Toddler and Child Studio Portraiture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 sm:p-7 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Studio Fine Art
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold">
                  Generations & Children Portraits
                </h3>
                <p className="text-xs text-stone-200 font-light mt-1">
                  Preserve childhood smiles and family unity on museum-grade textured canvas.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
