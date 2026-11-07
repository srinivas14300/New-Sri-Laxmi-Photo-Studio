import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { studioStore, ExtendedPortfolioItem } from '../../services/store';
import { LightboxModal } from '../common/LightboxModal';
import { PortfolioItem } from '../../types';
import { ArrowRight, Maximize2, Image as ImageIcon } from 'lucide-react';

export const PhotographyWorkGallery: React.FC = () => {
  const [items, setItems] = useState<ExtendedPortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<PortfolioItem | null>(null);

  const loadData = useCallback(() => {
    setItems(studioStore.getPublishedPortfolio());
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, [loadData]);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'baby', label: 'Baby & Child' },
    { id: 'events', label: 'Ceremonies' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'maternity', label: 'Maternity' },
    { id: 'portraits', label: 'Portraits' }
  ];

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'baby') {
      return item.category === 'baby' || item.category === 'newborn' || item.category === 'birthday';
    }
    return item.category === selectedCategory;
  });

  // Display top 16 photos in an asymmetric editorial pattern
  const displayPhotos = filteredItems.slice(0, 16);

  const handleNextPhoto = () => {
    if (!lightboxPhoto) return;
    const idx = displayPhotos.findIndex(i => i.id === lightboxPhoto.id);
    if (idx < displayPhotos.length - 1) {
      setLightboxPhoto(displayPhotos[idx + 1]);
    } else {
      setLightboxPhoto(displayPhotos[0]);
    }
  };

  const handlePrevPhoto = () => {
    if (!lightboxPhoto) return;
    const idx = displayPhotos.findIndex(i => i.id === lightboxPhoto.id);
    if (idx > 0) {
      setLightboxPhoto(displayPhotos[idx - 1]);
    } else {
      setLightboxPhoto(displayPhotos[displayPhotos.length - 1]);
    }
  };

  const currentIndex = lightboxPhoto ? displayPhotos.findIndex(i => i.id === lightboxPhoto.id) : -1;

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAF8F5] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
              Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Our Photography Work
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {displayPhotos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <ImageIcon className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-stone-800">No published photographs</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Photographs will appear here once published from the studio admin panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayPhotos.map((photo) => {
              return (
                <div
                  key={photo.id}
                  onClick={() => setLightboxPhoto(photo)}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-900 cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col h-full min-h-[360px] sm:min-h-[420px]"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-stone-900">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
                    />
                  </div>

                  {/* Minimal Editorial Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
                    <div className="flex items-end justify-between gap-3 pointer-events-auto">
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block">
                          {photo.categoryLabel}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-snug truncate">
                          {photo.title}
                        </h3>
                        <p className="text-xs text-stone-300 font-light truncate">
                          {photo.theme}
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center shrink-0">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Illustrative placeholder flag if marked */}
                  {photo.isIllustrativePlaceholder && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[9px] uppercase tracking-wider text-stone-300 px-2.5 py-1 rounded-full border border-white/10 pointer-events-none">
                      Sample Work
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Action to Full Portfolio */}
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-sm"
          >
            <span>View Full Photography Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        hasNext={displayPhotos.length > 1}
        hasPrev={displayPhotos.length > 1}
      />
    </section>
  );
};
