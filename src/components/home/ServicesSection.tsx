import React from 'react';
import { SERVICES_DATA } from '../../data/mockData';
import { buildWhatsAppLink } from '../../config/studioConfig';
import { Clock, Calendar, Check, MessageCircle, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Bespoke Portrait Sessions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Tailored Experiences for Every Stage of Wonder
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every session is conducted with patient devotion, sanitized wraps and props, and personalized themes designed around your baby's comfort.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image banner with overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={svc.featuredImage}
                  alt={svc.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                      Ideal Age: {svc.idealAge}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
                      {svc.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  {/* Clean unboxed session metadata */}
                  <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500">
                    <span className="flex items-center gap-1.5 font-medium text-stone-700">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{svc.duration}</span>
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span>{svc.outfits}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      Starts at ₹{svc.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="mt-5 space-y-2.5 text-xs text-stone-600">
                    {svc.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                  <a
                    href="#packages"
                    className="text-xs font-semibold text-stone-800 hover:text-amber-800 transition-colors inline-flex items-center gap-1"
                  >
                    <span>View Package Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={buildWhatsAppLink(`Hello New Sri Laxmi Baby Photo Studio! I would like to enquire about the "${svc.title}" session.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
