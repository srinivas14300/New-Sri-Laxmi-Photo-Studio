import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../../config/studioConfig';
import { studioStore } from '../../services/store';
import { StudioLogo } from './StudioLogo';
import { Phone, MapPin, MessageCircle, ExternalLink, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [customDescription, setCustomDescription] = useState<string>('');

  useEffect(() => {
    const s = studioStore.getSettings();
    if (s.footerDescription) {
      setCustomDescription(s.footerDescription);
    }
  }, []);

  const studioDescription =
    customDescription ||
    'Dedicated full-service photography studio in Wanaparthy, Telangana. Preserving weddings, traditional ceremonies, and timeless family milestones with authentic artistry.';

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Four Column Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Studio (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 text-white flex items-center justify-center shrink-0">
                <StudioLogo className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                {STUDIO_CONFIG.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm font-light">
              {studioDescription}
            </p>

            <div className="pt-1">
              <a
                href={buildWhatsAppLink("Hello New Sri Laxmi Photo Studio! I would like to enquire about a photoshoot.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border border-stone-700"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Column 2: Explore (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors block py-0.5">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors block py-0.5">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors block py-0.5">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors block py-0.5">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Photography (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Our Photography
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <Link to="/weddings" className="hover:text-white transition-colors block py-0.5">
                  Weddings
                </Link>
              </li>
              <li>
                <Link to="/pre-wedding" className="hover:text-white transition-colors block py-0.5">
                  Pre-Wedding
                </Link>
              </li>
              <li>
                <Link to="/baby-photography" className="hover:text-white transition-colors block py-0.5">
                  Baby & Child
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors block py-0.5">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/maternity" className="hover:text-white transition-colors block py-0.5">
                  Maternity
                </Link>
              </li>
              <li>
                <Link to="/portraits" className="hover:text-white transition-colors block py-0.5">
                  Family & Portraits
                </Link>
              </li>
              <li>
                <Link to="/photo-services" className="hover:text-white transition-colors block py-0.5">
                  Photo Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Contact
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${STUDIO_CONFIG.phone}`} className="hover:text-white transition-colors font-medium">
                  {STUDIO_CONFIG.phoneDisplay}
                </a>
              </p>

              <p className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-white shrink-0" />
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-stone-300 transition-colors"
                >
                  WhatsApp: +91 98480 22338
                </a>
              </p>

              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  {STUDIO_CONFIG.address.street}, {STUDIO_CONFIG.address.area}, {STUDIO_CONFIG.address.city}, {STUDIO_CONFIG.address.state} - {STUDIO_CONFIG.address.pincode}
                </span>
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <a
                href={STUDIO_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {STUDIO_CONFIG.instagramHandle && (
                <>
                  <span className="text-stone-600">•</span>
                  <a
                    href={`https://instagram.com/${STUDIO_CONFIG.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{STUDIO_CONFIG.instagramHandle}</span>
                  </a>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Thin bottom separator and simple copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            <Link to="/admin/login" className="hover:text-stone-300 transition-colors">©</Link> {currentYear} {STUDIO_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Wanaparthy, Telangana</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
