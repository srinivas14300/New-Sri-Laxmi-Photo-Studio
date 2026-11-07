import React from 'react';
import { OFFERS_DATA } from '../../data/mockData';
import { OfferCard } from '../../components/cards/OfferCard';
import { Sparkles, Info, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const OffersPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF8F5] pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F2EB] to-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Promotions & Bundles</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Studio Special Offers
          </h1>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Enjoy bundled privileges when combining maternity with newborn sessions or scheduling on peaceful weekday mornings.
          </p>
        </div>
      </section>

      {/* Offers Notice */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Promotions Note:</strong> Active promotional perks and combo discounts shown below are indicative studio specials. Availability is confirmed directly by our studio coordinator via WhatsApp upon checking slot calendars.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {OFFERS_DATA.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom request prompt */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h3 className="font-serif font-bold text-stone-900 text-lg">
            Have a Specific Date in Mind?
          </h3>
          <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
            Contact us directly on WhatsApp to check if any cancellation slots or special weekend offers are currently open.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("Hello New Sri Laxmi Baby Photo Studio! I would like to check current offers and available shoot dates.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire About Current Promos</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
