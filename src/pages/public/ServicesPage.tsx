import React, { useState } from 'react';
import { SERVICES_DATA, DATA_DISCLAIMER } from '../../data/mockData';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ShootCategory } from '../../types';
import { Info, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ShootCategory>('all');

  const filterTabs: { id: ShootCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'events', label: 'Events & Ceremonies' },
    { id: 'baby', label: 'Baby & Newborn' },
    { id: 'maternity', label: 'Fine Art Maternity' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'photo-products', label: 'Photo Products' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F2EB] to-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Service Photography Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Our Photography Services & Capabilities
          </h1>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            From sacred wedding ceremonies and romantic couple sessions to gentle baby milestones and heirloom living room frames, explore our tailored photography services.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-2 scrollbar-none">
            <div className="flex items-center gap-1.5 p-1.5 bg-stone-200/80 rounded-2xl max-w-full">
              {filterTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-xs font-semibold'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing disclaimer banner */}
          <div className="mt-6 mb-8 max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Studio Pricing Notice:</strong> {DATA_DISCLAIMER.pricing}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
