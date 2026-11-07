import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const WhatsAppFloat: React.FC = () => {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-5 right-5 z-40">
      <a
        href={buildWhatsAppLink("Hello! I would like to enquire about baby photo packages at New Sri Laxmi Baby Photo Studio.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
};
