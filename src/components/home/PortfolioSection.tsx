import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/mockData';
import { PortfolioItem, ShootCategory } from '../../types';
import { LightboxModal } from '../common/LightboxModal';
import { Maximize2, Sparkles } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ShootCategory>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filterTabs: { id: ShootCategory; label: string }[] = [
    { id: 'all', label: 'All Portfolio' },
    { id: 'newborn', label: 'Newborn Art' },
    { id: 'baby', label: 'Milestones & Sitters' },
    { id: 'birthday', label: 'Cake Smash & 1st B’day' },
    { id: 'maternity', label: 'Maternity Glow' }
  ];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  };

  const currentIndex = selectedItem ? filteredItems.findIndex(i => i.id === selectedItem.id) : -1;

  return (
    <section id="portfolio" className="py-20 bg-[#F6F2EB] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Fine Art Baby Gallery
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Treasured Milestones Captured in Time
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Browse our recent studio sessions. Tap any photograph to view high-resolution details and session inspirations.
          </p>
        </div>

        {/* Functional Category Filter Bar (Interactive segmented control, not pills) */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto py-2">
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-xl max-w-full">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-300/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-stone-900 ${
                idx === 0 ? 'sm:col-span-2 sm:aspect-[16/10]' : 'aspect-[4/3]'
              }`}
            >
              {/* Image with smooth hover zoom */}
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              />

              {/* Measured Scrim Overlay ensuring 4.5:1 text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6">
                
                {/* Clean unboxed metadata with bullet */}
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1.5 uppercase tracking-wider">
                  <span>{item.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.ageGroup}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                      {item.theme}
                    </p>
                  </div>

                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 text-white backdrop-blur-xs transition-colors shrink-0 ml-3">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Gallery footer hint */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-500">
            Have a custom theme or traditional ritual in mind? We customize backdrop colors, floral decor, and cradle props for your family.
          </p>
        </div>

      </div>

      {/* Lightbox modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < filteredItems.length - 1}
        hasPrev={currentIndex > 0}
      />
    </section>
  );
};
