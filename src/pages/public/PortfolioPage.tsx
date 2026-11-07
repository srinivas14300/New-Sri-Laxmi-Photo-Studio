import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studioStore, ExtendedPortfolioItem } from '../../services/store';
import { PortfolioItem, ShootCategory } from '../../types';
import { LightboxModal } from '../../components/common/LightboxModal';
import { Maximize2, Sparkles } from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [allItems, setAllItems] = useState<ExtendedPortfolioItem[]>([]);

  const loadData = () => {
    setAllItems(studioStore.getPublishedPortfolio());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, []);

  const validCategories: ShootCategory[] = [
    'all',
    'wedding',
    'pre-wedding',
    'events',
    'baby',
    'newborn',
    'maternity',
    'portraits',
    'photo-products'
  ];

  const activeCategory: ShootCategory = validCategories.includes(category as ShootCategory)
    ? (category as ShootCategory)
    : 'all';

  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const filterTabs: { id: ShootCategory; label: string; path: string }[] = [
    { id: 'all', label: 'All Photographs', path: '/portfolio' },
    { id: 'wedding', label: 'Weddings', path: '/portfolio/wedding' },
    { id: 'pre-wedding', label: 'Pre-Wedding', path: '/portfolio/pre-wedding' },
    { id: 'events', label: 'Ceremonies & Events', path: '/portfolio/events' },
    { id: 'baby', label: 'Baby & Child', path: '/portfolio/baby' },
    { id: 'newborn', label: 'Newborn', path: '/portfolio/newborn' },
    { id: 'maternity', label: 'Maternity', path: '/portfolio/maternity' },
    { id: 'portraits', label: 'Portraits', path: '/portfolio/portraits' },
    { id: 'photo-products', label: 'Albums & Frames', path: '/portfolio/photo-products' }
  ];

  const filteredItems = activeCategory === 'all'
    ? allItems
    : allItems.filter(item => {
        if (activeCategory === 'baby') {
          return item.category === 'baby' || item.category === 'birthday';
        }
        if (activeCategory === 'newborn') {
          return item.category === 'newborn';
        }
        return item.category === activeCategory;
      });

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedPhoto.id);
    if (currentIndex < filteredItems.length - 1) {
      setSelectedPhoto(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(filteredItems[currentIndex - 1]);
    }
  };

  const currentIndex = selectedPhoto ? filteredItems.findIndex(i => i.id === selectedPhoto.id) : -1;

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      
      {/* Visual Header */}
      <section className="bg-stone-950 text-white py-14 sm:py-20 border-b border-stone-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
            Visual Portfolio
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Master Photography Portfolio
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Weddings, traditional ceremonies, baby milestones, fine art maternity, and family portraits. Tap any photograph for high-resolution view.
          </p>
        </div>
      </section>

      {/* Filter Navigation Tabs */}
      <section className="sticky top-[4.25rem] sm:top-[5rem] z-20 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 py-1 scrollbar-none">
            {filterTabs.map(tab => {
              const isActive = activeCategory === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap shrink-0 min-h-[38px] flex items-center justify-center ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300/80 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Masonry Grid with Varied Image Proportions */}
      <section className="pt-10 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full min-h-[360px] sm:min-h-[420px]"
                >
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-stone-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    />
                  </div>

                  {/* Measured scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
                    <div className="flex items-center justify-between pointer-events-auto">
                      <div className="min-w-0 space-y-1">
                        <span className="text-[11px] uppercase tracking-wider text-amber-300 font-medium block">
                          {item.categoryLabel} · {item.ageGroup}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-stone-300 font-light truncate">
                          {item.theme}
                        </p>
                      </div>
                      <div className="p-2.5 rounded-full bg-white/20 group-hover:bg-amber-600 text-white backdrop-blur-xs transition-colors shrink-0 ml-3">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Transparency Badge ONLY for illustrative work */}
                  {item.assetSource === 'external_illustrative' && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-wider text-stone-300 px-2.5 py-1 rounded-full border border-white/10 pointer-events-none">
                      Illustrative Photography
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <p className="font-serif text-lg font-bold text-stone-800">No photographs under this category currently.</p>
              <Link to="/portfolio" className="text-xs font-semibold text-amber-800 underline">
                View All Works
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < filteredItems.length - 1}
        hasPrev={currentIndex > 0}
      />

    </div>
  );
};
