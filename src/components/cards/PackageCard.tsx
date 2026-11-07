import React from 'react';
import { PackageItem } from '../../types';
import { buildWhatsAppLink } from '../../config/studioConfig';
import { Check, MessageCircle, Clock, Image, Shirt } from 'lucide-react';

interface PackageCardProps {
  pkg: PackageItem;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between w-full min-w-0 ${
        pkg.isPopular
          ? 'bg-stone-900 text-white shadow-xl ring-2 ring-amber-600/70 lg:-translate-y-2'
          : 'bg-white text-stone-800 border border-stone-200/90 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Optional Top Image Thumbnail */}
      {pkg.featuredImage && (
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-950">
          <img
            src={pkg.featuredImage}
            alt={pkg.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              {pkg.category}
            </span>
          </div>
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {pkg.isPopular && !pkg.featuredImage && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Most Loved Choice
            </span>
          )}

          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
            {pkg.name}
          </h3>
          <p className={`text-xs mt-0.5 line-clamp-1 ${pkg.isPopular ? 'text-stone-300' : 'text-stone-500'}`}>
            {pkg.tagline}
          </p>

          {/* Pricing */}
          <div className="mt-4 pb-4 border-b border-stone-200/40">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold">₹</span>
              <span className="font-serif text-3xl font-bold tracking-tight tabular-nums">
                {pkg.price.toLocaleString('en-IN')}
              </span>
              <span className={`text-[11px] ml-1 ${pkg.isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                / session
              </span>
            </div>
            <p className={`text-[10px] italic mt-0.5 ${pkg.isPopular ? 'text-amber-300/80' : 'text-stone-400'}`}>
              *Indicative studio estimate
            </p>
          </div>

          {/* Compact Specs */}
          <div className={`py-3 border-b flex items-center justify-between text-xs ${
            pkg.isPopular ? 'border-stone-800 text-stone-300' : 'border-stone-100 text-stone-600'
          }`}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{pkg.duration}</span>
            </span>
            <span className="flex items-center gap-1 tabular-nums">
              <Image className="w-3.5 h-3.5 text-amber-500" />
              <span>{pkg.editedPhotos} Retouched</span>
            </span>
            <span className="flex items-center gap-1 tabular-nums">
              <Shirt className="w-3.5 h-3.5 text-amber-500" />
              <span>{pkg.outfitChanges} Outfits</span>
            </span>
          </div>

          {/* Concise Inclusions */}
          <ul className="mt-4 space-y-2 text-xs">
            {pkg.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  pkg.isPopular ? 'text-amber-400' : 'text-emerald-700'
                }`} />
                <span className={`line-clamp-1 ${pkg.isPopular ? 'text-stone-200' : 'text-stone-700'}`}>
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-stone-200/40">
          <a
            href={buildWhatsAppLink(`Hello New Sri Laxmi Photo Studio! I would like to enquire about the "${pkg.name}" (${pkg.categoryLabel || pkg.category}) package (₹${pkg.price.toLocaleString('en-IN')}). Please share availability and customization options.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px] ${
              pkg.isPopular
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
