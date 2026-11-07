import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studioStore } from '../../services/store';
import { buildWhatsAppLink, STUDIO_CONFIG } from '../../config/studioConfig';
import { MessageCircle, ArrowRight, MapPin, Phone } from 'lucide-react';

export const MinimalEnquiryTransition: React.FC = () => {
  const [headline, setHeadline] = useState('Have a moment worth remembering?');
  const [subtitle, setSubtitle] = useState(
    'Whether you are planning a sacred wedding ceremony, a joyful baby milestone, or an intimate family portrait, we are here to preserve your story.'
  );

  const loadSettings = () => {
    const s = studioStore.getSettings();
    if (s.enquiryHeadline) setHeadline(s.enquiryHeadline);
    if (s.enquirySubtitle) setSubtitle(s.enquirySubtitle);
  };

  useEffect(() => {
    loadSettings();
    window.addEventListener('studio_storage_update', loadSettings);
    return () => window.removeEventListener('studio_storage_update', loadSettings);
  }, []);

  return (
    <section className="py-24 sm:py-32 lg:py-36 bg-[#F6F2EB] border-t border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            {headline}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2 Clear Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={buildWhatsAppLink("Hello New Sri Laxmi Photo Studio! I would like to enquire about photoshoot availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-all duration-200 min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-stone-300 shadow-2xs transition-all duration-200 min-h-[48px]"
          >
            <span>Contact the Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Minimal Studio Location & Phone Note */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 font-light">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-800" />
            <span>Maremmakunta, Wanaparthy</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span>{STUDIO_CONFIG.phoneDisplay}</span>
          </span>
        </div>

      </div>
    </section>
  );
};
