import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../../config/studioConfig';
import { CATEGORIES_GALLERY } from '../../data/mockData';
import { X, MessageCircle, Phone, MapPin, Clock, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const [portfolioExpanded, setPortfolioExpanded] = useState(true);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const primaryNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-sm sm:max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200/80 bg-white/70 backdrop-blur-xs flex items-center justify-between shrink-0">
          <div>
            <Link 
              to="/" 
              onClick={onClose}
              className="font-serif font-bold text-base sm:text-lg text-stone-900 tracking-tight block truncate max-w-[220px]"
            >
              {STUDIO_CONFIG.shortName}
            </Link>
            <p className="text-[10px] text-amber-900 tracking-wider uppercase font-semibold">
              Baby & Family Photography
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-stone-500 hover:text-stone-950 hover:bg-stone-100 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          
          {/* Visual Portfolio Showcase Section */}
          <div className="bg-white/80 rounded-2xl p-4 border border-stone-200/70 shadow-2xs">
            <button
              type="button"
              onClick={() => setPortfolioExpanded(!portfolioExpanded)}
              className="w-full flex items-center justify-between py-1 text-left min-h-[44px] cursor-pointer"
              aria-expanded={portfolioExpanded}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-800 shrink-0" />
                <span className="font-serif font-bold text-sm text-stone-900 tracking-tight">
                  Portfolio Disciplines
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                  portfolioExpanded ? 'rotate-180 text-amber-800' : ''
                }`}
              />
            </button>

            {portfolioExpanded && (
              <div className="mt-3 pt-3 border-t border-stone-100 space-y-3">
                {/* 7 visual discipline thumbnails */}
                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORIES_GALLERY.map((cat) => (
                    <Link
                      key={cat.id}
                      to={cat.routePath || `/portfolio/${cat.id}`}
                      onClick={onClose}
                      className="group flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF8F5] hover:bg-amber-50/60 border border-stone-200/50 hover:border-amber-200 transition-all min-h-[44px]"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-stone-900 relative">
                        <img
                          src={cat.heroImage}
                          alt={cat.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-semibold text-xs text-stone-900 group-hover:text-amber-900 truncate">
                          {cat.label}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">
                          Explore
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/portfolio"
                  onClick={onClose}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors min-h-[44px]"
                >
                  <span>View Complete Portfolio (All Works)</span>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </Link>
              </div>
            )}
          </div>

          {/* Primary Navigation Links */}
          <nav className="flex flex-col divide-y divide-stone-200/60">
            {primaryNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `py-3.5 text-sm font-medium transition-colors flex items-center justify-between min-h-[48px] ${
                    isActive
                      ? 'text-amber-900 font-bold pl-3 border-l-2 border-amber-800 bg-amber-50/40 rounded-r-lg'
                      : 'text-stone-700 hover:text-stone-950 hover:pl-1'
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </NavLink>
            ))}
          </nav>

        </div>

        {/* Drawer Footer with Actions & Quick Info */}
        <div className="p-5 border-t border-stone-200/80 bg-white/80 backdrop-blur-xs space-y-3 shrink-0">
          <a
            href={buildWhatsAppLink("Hello New Sri Laxmi Baby Photo Studio! I would like to enquire about photoshoot packages and availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${STUDIO_CONFIG.phone}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-stone-300 text-stone-800 font-medium text-xs rounded-xl hover:bg-stone-100 transition-colors min-h-[44px]"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {STUDIO_CONFIG.phoneDisplay}</span>
          </a>

          <div className="text-[11px] text-stone-500 space-y-1 pt-1">
            <p className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{STUDIO_CONFIG.address.area}, {STUDIO_CONFIG.address.city}</span>
            </p>
            <p className="flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{STUDIO_CONFIG.workingHours.weekdays}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
