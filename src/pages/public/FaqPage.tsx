import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { FaqItem } from '../../types';
import { FaqCard } from '../../components/cards/FaqCard';
import { Search, MessageCircle, HelpCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const FaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>(null);

  const loadData = () => {
    const list = studioStore.getFaqs();
    setFaqs(list);
    if (!openId && list.length > 0) {
      setOpenId(list[0].id);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, []);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General & Scheduling' },
    { id: 'safety', label: 'Baby Safety & Hygiene' },
    { id: 'pricing', label: 'Pricing & Bookings' },
    { id: 'preparation', label: 'Outfits & Preparation' }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#FAF8F5] pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F2EB] to-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Parent Resource Hub
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about preparing for your session, prop safety, session pacing, and package deliverables.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Search bar & Category filter */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g. newborn age, props, siblings, cake)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 shadow-2xs"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {categories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 min-h-[40px] ${
                      isActive
                        ? 'bg-amber-900 text-white shadow-2xs font-semibold'
                        : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200/90'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map(faq => (
              <FaqCard
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
                <p className="text-sm font-semibold text-stone-800">No matching questions found.</p>
                <p className="text-xs text-stone-500">Ask your specific question directly to our studio coordinator on WhatsApp.</p>
              </div>
            )}
          </div>

          {/* WhatsApp Direct Prompt */}
          <div className="p-6 rounded-2xl bg-[#F6F2EB] border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                Have a Unique Question About Your Baby?
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Our coordinator answers queries regarding twins, traditional dates, and props promptly.
              </p>
            </div>
            <a
              href={buildWhatsAppLink("Hello New Sri Laxmi Baby Photo Studio! I have a question regarding a photoshoot.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
