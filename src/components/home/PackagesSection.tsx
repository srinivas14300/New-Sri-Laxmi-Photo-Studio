import React from 'react';
import { PACKAGES_DATA } from '../../data/mockData';
import { buildWhatsAppLink } from '../../config/studioConfig';
import { Check, MessageCircle, Clock, Image, Shirt, Sparkles } from 'lucide-react';

export const PackagesSection: React.FC = () => {
  return (
    <section id="packages" className="py-20 bg-[#F6F2EB] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Honest & Transparent Pricing
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Memories That Last Generations
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            All packages include access to our extensive wardrobe of hand-knitted wraps, floral baskets, designer outfits, and sanitized props with no hidden studio fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 transition-all flex flex-col justify-between relative ${
                pkg.isPopular
                  ? 'bg-stone-900 text-white shadow-xl ring-2 ring-amber-600/60 lg:-translate-y-2'
                  : 'bg-white text-stone-800 border border-stone-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Popular top indicator */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-xs">
                  Most Popular Choice
                </div>
              )}

              <div>
                {/* Category & Title */}
                <div className="space-y-1">
                  <p className={`text-xs uppercase tracking-wider font-semibold ${
                    pkg.isPopular ? 'text-amber-400' : 'text-amber-800'
                  }`}>
                    {pkg.category}
                  </p>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">
                    {pkg.name}
                  </h3>
                  <p className={`text-xs leading-relaxed pt-1 ${
                    pkg.isPopular ? 'text-stone-300' : 'text-stone-500'
                  }`}>
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mt-6 pb-6 border-b border-stone-200/40">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-semibold">₹</span>
                    <span className="font-serif text-4xl font-bold tracking-tight tabular-nums">
                      {pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs ml-1 ${pkg.isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                      / session
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${pkg.isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                    Includes digital delivery + all unedited original captures
                  </p>
                </div>

                {/* Quick specs strip */}
                <div className={`py-4 border-b grid grid-cols-2 gap-3 text-xs ${
                  pkg.isPopular ? 'border-stone-800 text-stone-300' : 'border-stone-100 text-stone-600'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="tabular-nums">{pkg.editedPhotos} Retouched</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="tabular-nums">{pkg.outfitChanges} Outfits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Props Provided</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="mt-6 space-y-3 text-xs">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                        pkg.isPopular ? 'text-amber-400' : 'text-emerald-700'
                      }`} />
                      <span className={pkg.isPopular ? 'text-stone-200' : 'text-stone-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking CTA */}
              <div className="pt-8 mt-6 border-t border-stone-200/40">
                <a
                  href={buildWhatsAppLink(`Hello New Sri Laxmi Baby Photo Studio! I would like to book the "${pkg.name}" package (₹${pkg.price.toLocaleString('en-IN')}). Please let me know available slots.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-sm ${
                    pkg.isPopular
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Special combo offer callout */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-100/60 border border-amber-300/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-amber-950">
              Maternity + Newborn Bump-to-Baby Combo
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              Book both your Maternity and Newborn sessions together to receive a flat 15% combo savings plus a complimentary 12x18 canvas portrait.
            </p>
          </div>
          <a
            href={buildWhatsAppLink("Hello New Sri Laxmi Baby Photo Studio! I am interested in the Maternity + Newborn Bump-to-Baby combo offer.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            Claim Combo Offer
          </a>
        </div>

      </div>
    </section>
  );
};
