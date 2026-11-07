import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PORTFOLIO_DATA } from '../../data/mockData';
import { PortfolioItem } from '../../types';
import { LightboxModal } from '../common/LightboxModal';
import { Maximize2, ArrowRight } from 'lucide-react';

export const FeaturedMasonryGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const displayItems = PORTFOLIO_DATA.slice(0, 6);

  const handleNext = () => {
    if (!selectedPhoto) return;
    const idx = displayItems.findIndex(i => i.id === selectedPhoto.id);
    if (idx < displayItems.length - 1) setSelectedPhoto(displayItems[idx + 1]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const idx = displayItems.findIndex(i => i.id === selectedPhoto.id);
    if (idx > 0) setSelectedPhoto(displayItems[idx - 1]);
  };

  const currentIndex = selectedPhoto ? displayItems.findIndex(i => i.id === selectedPhoto.id) : -1;

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimalist Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              Selected Works
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Featured Gallery
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-900 hover:text-amber-800 transition-colors uppercase tracking-wider py-1"
          >
            <span>View All Works</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Card 1: Large Wide Hero Portrait (Span 7) */}
          <div
            onClick={() => setSelectedPhoto(displayItems[0])}
            className="sm:col-span-2 lg:col-span-7 group relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={displayItems[0].imageUrl}
              alt={displayItems[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                {displayItems[0].categoryLabel} · {displayItems[0].ageGroup}
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {displayItems[0].title}
                </h3>
                <div className="p-2 rounded-full bg-white/20 text-white backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vertical Portrait (Span 5) */}
          <div
            onClick={() => setSelectedPhoto(displayItems[4])}
            className="sm:col-span-1 lg:col-span-5 group relative aspect-[3/4] sm:aspect-auto lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={displayItems[4].imageUrl}
              alt={displayItems[4].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                {displayItems[4].categoryLabel} · {displayItems[4].ageGroup}
              </span>
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  {displayItems[4].title}
                </h3>
                <div className="p-2 rounded-full bg-white/20 text-white backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Medium (Span 4) */}
          <div
            onClick={() => setSelectedPhoto(displayItems[1])}
            className="sm:col-span-1 lg:col-span-4 group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={displayItems[1].imageUrl}
              alt={displayItems[1].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                {displayItems[1].categoryLabel}
              </span>
              <h3 className="font-serif text-lg font-bold text-white tracking-tight truncate">
                {displayItems[1].title}
              </h3>
            </div>
          </div>

          {/* Card 4: Medium (Span 4) */}
          <div
            onClick={() => setSelectedPhoto(displayItems[2])}
            className="sm:col-span-1 lg:col-span-4 group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={displayItems[2].imageUrl}
              alt={displayItems[2].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                {displayItems[2].categoryLabel}
              </span>
              <h3 className="font-serif text-lg font-bold text-white tracking-tight truncate">
                {displayItems[2].title}
              </h3>
            </div>
          </div>

          {/* Card 5: Medium (Span 4) */}
          <div
            onClick={() => setSelectedPhoto(displayItems[3])}
            className="sm:col-span-1 lg:col-span-4 group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={displayItems[3].imageUrl}
              alt={displayItems[3].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                {displayItems[3].categoryLabel}
              </span>
              <h3 className="font-serif text-lg font-bold text-white tracking-tight truncate">
                {displayItems[3].title}
              </h3>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < displayItems.length - 1}
        hasPrev={currentIndex > 0}
      />
    </section>
  );
};
