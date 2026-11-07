import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { OfferItem } from '../../types';
import { Sparkles, Check, ToggleLeft, ToggleRight, Plus } from 'lucide-react';

export const AdminOffersPage: React.FC = () => {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await studioStore.fetchOffers();
      setOffers(studioStore.getOffers());
    };
    loadData();

    const handleUpdate = () => setOffers(studioStore.getOffers());
    window.addEventListener('studio_storage_update', handleUpdate);
    return () => window.removeEventListener('studio_storage_update', handleUpdate);
  }, []);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await studioStore.updateOfferStatus(id, !currentStatus);
      setFeedback('Offer visibility updated.');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err) {
      console.error('Error updating offer:', err);
      alert('Error updating offer');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Special Offers & Seasonal Promotions
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Toggle seasonal discounts, weekday perks, and ceremony celebration combos.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map(offer => (
          <div
            key={offer.id}
            className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  {offer.discountBadge}
                </span>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                  offer.isActive ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-stone-100 text-stone-500'
                }`}>
                  {offer.isActive ? 'Active on Public Site' : 'Paused'}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-stone-900">
                {offer.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {offer.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Category Target: <strong className="text-stone-700 capitalize">{offer.targetCategory}</strong>
              </span>

              <button
                onClick={() => toggleStatus(offer.id, offer.isActive)}
                className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-950 font-medium cursor-pointer"
              >
                {offer.isActive ? (
                  <>
                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-6 h-6 text-stone-400" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
