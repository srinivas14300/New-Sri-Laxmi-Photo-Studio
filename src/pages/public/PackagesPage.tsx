import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { PackageItem } from '../../types';
import { DATA_DISCLAIMER } from '../../data/mockData';
import { PackageCard } from '../../components/cards/PackageCard';
import { buildWhatsAppLink, buildWhatsAppCategoryEnquiry } from '../../config/studioConfig';
import { Info, Check, MessageCircle, HelpCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const loadData = () => {
    setPackages(studioStore.getPackages());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Packages' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'pre-wedding', label: 'Pre-Wedding' },
    { id: 'events', label: 'Events & Ceremonies' },
    { id: 'baby', label: 'Baby & Newborn' },
    { id: 'maternity', label: 'Maternity' },
    { id: 'portraits', label: 'Portraits' }
  ];

  const filteredPackages = selectedCategory === 'all'
    ? packages
    : packages.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F2EB] to-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Studio Investment</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Photography Packages & Inclusions
          </h1>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Choose the ideal collection for your wedding, traditional ceremony, baby milestone, or family portrait. Every package features transparent inclusions, high-res digital delivery, and archival keepsakes.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pt-8">
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

          {/* Pricing Disclaimer Alert */}
          <div className="mt-6 max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Studio Pricing Transparency:</strong> {DATA_DISCLAIMER.pricing}
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote WhatsApp Callout */}
      <section className="py-12 bg-[#F6F2EB] border-y border-stone-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Need a Multi-Day or Custom Event Package?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Every wedding and family ceremony is unique. We gladly customize photography hours, crew size, albums, and drone coverage to match your exact schedule and budget.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppCategoryEnquiry("Custom Photography Package")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss Custom Package on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
