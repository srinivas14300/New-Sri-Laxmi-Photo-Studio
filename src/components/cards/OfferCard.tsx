import React from 'react';
import { OfferItem } from '../../types';
import { buildWhatsAppLink } from '../../config/studioConfig';
import { Sparkles, MessageCircle, Check, Info } from 'lucide-react';

interface OfferCardProps {
  offer: OfferItem;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden min-w-0 w-full">
      {/* Decorative top ribbon */}
      <div className="bg-amber-100 text-amber-900 border border-amber-300/60 rounded-xl px-3.5 py-1 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 self-start mb-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
        <span>{offer.discountBadge}</span>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 tracking-tight break-words">
            {offer.title}
          </h3>
          <p className="text-xs text-stone-500 font-medium mt-1">
            {offer.validityNote}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {offer.description}
        </p>

        {/* Inclusions */}
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            Special Inclusions:
          </p>
          <ul className="space-y-2 text-xs text-stone-600">
            {offer.inclusions.map((inc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="break-words">{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Terms note */}
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-[11px] text-stone-500 space-y-1">
          <div className="flex items-center gap-1 font-semibold text-stone-700">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Studio Offer Terms:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-1">
            {offer.terms.map((term, tIdx) => (
              <li key={tIdx} className="break-words">{term}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action */}
      <div className="pt-6 mt-6 border-t border-stone-100">
        <a
          href={buildWhatsAppLink(offer.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Claim Offer on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
