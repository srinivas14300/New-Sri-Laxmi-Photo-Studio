import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES_GALLERY } from '../../data/mockData';
import { ArrowUpRight } from 'lucide-react';

export const CategoryVisualGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F6F2EB] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Curated Genres
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Photography Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xs sm:text-right">
            Tap any genre to explore dedicated portfolios.
          </p>
        </div>

        {/* 7-Category Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {CATEGORIES_GALLERY.map((cat, idx) => {
            // Span math to create a dynamic editorial rhythm
            let colSpan = 'lg:col-span-4';
            if (idx === 0) colSpan = 'lg:col-span-6'; // Newborn large
            else if (idx === 1) colSpan = 'lg:col-span-6'; // Baby large
            else if (idx === 2) colSpan = 'lg:col-span-4'; // Maternity
            else if (idx === 3) colSpan = 'lg:col-span-4'; // Birthday
            else if (idx === 4) colSpan = 'lg:col-span-4'; // Wedding
            else if (idx === 5) colSpan = 'lg:col-span-6'; // Events
            else if (idx === 6) colSpan = 'lg:col-span-6'; // Portraits

            return (
              <Link
                key={cat.id}
                to={cat.routePath || `/portfolio/${cat.id}`}
                className={`${colSpan} group relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-stone-900 block`}
              >
                <img
                  src={cat.heroImage}
                  alt={cat.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Dark gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 sm:p-6 transition-opacity">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-stone-300 line-clamp-1 mt-0.5 font-light">
                        {cat.tagline}
                      </p>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-full bg-white/15 group-hover:bg-amber-600 text-white backdrop-blur-xs transition-colors shrink-0 ml-3">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
