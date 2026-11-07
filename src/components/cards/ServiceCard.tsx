import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../../types';
import { buildWhatsAppLink } from '../../config/studioConfig';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-full min-w-0">
      
      {/* Dominant Image Framing */}
      <Link to={`/services/${service.slug}`} className="relative aspect-[16/11] overflow-hidden bg-stone-100 block">
        <img
          src={service.featuredImage}
          alt={service.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
          <div className="min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-medium block">
              {service.idealAge} · {service.duration}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
              {service.title}
            </h3>
          </div>
        </div>
      </Link>

      {/* Concise Visual Content */}
      <div className="p-5 sm:p-6 space-y-4">
        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-stone-400 block text-[10px] uppercase">Starting Rate</span>
            <span className="font-serif text-base font-bold text-stone-900 tabular-nums">
              ₹{service.startingPrice.toLocaleString('en-IN')}*
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/services/${service.slug}`}
              className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs font-semibold text-stone-700 hover:text-amber-800 hover:bg-stone-50 transition-colors inline-flex items-center gap-1"
            >
              <span className="hidden sm:inline">Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={buildWhatsAppLink(`Hello! I would like to enquire about the "${service.title}" session.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors inline-flex items-center gap-1.5"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
