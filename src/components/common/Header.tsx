import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../../config/studioConfig';
import { CATEGORIES_GALLERY } from '../../data/mockData';
import { StudioLogo } from './StudioLogo';
import { MessageCircle, Menu, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isPortfolioRoute = 
    location.pathname.startsWith('/portfolio') ||
    location.pathname === '/weddings' ||
    location.pathname === '/pre-wedding' ||
    location.pathname === '/events' ||
    location.pathname === '/baby-photography' ||
    location.pathname === '/maternity' ||
    location.pathname === '/portraits' ||
    location.pathname === '/photo-services';

  const isServicesRoute = 
    location.pathname.startsWith('/services') ||
    location.pathname === '/weddings' ||
    location.pathname === '/pre-wedding' ||
    location.pathname === '/events' ||
    location.pathname === '/baby-photography' ||
    location.pathname === '/maternity' ||
    location.pathname === '/portraits' ||
    location.pathname === '/photo-services';

  // Track scroll position for dynamic glass transformation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Handle hover debounce for mega-menu
  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setServicesDropdownOpen(false);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  };

  // Handle hover debounce for services dropdown
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setMegaMenuOpen(false);
    setServicesDropdownOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMegaMenuOpen(false);
      setServicesDropdownOpen(false);
    }
  };

  // Dark translucent glass pill ONLY at the top of the homepage over dark hero.
  // Everywhere else (after scroll or on inner pages) uses the floating ivory/glass pill.
  const isDarkPill = isHomePage && !isScrolled;

  const pillContainerStyles = isDarkPill
    ? 'bg-stone-950/75 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/40 text-white'
    : 'bg-[#FAF8F5]/92 backdrop-blur-xl border border-stone-300/80 shadow-xl shadow-stone-900/10 text-stone-900';

  const wordmarkStyles = isDarkPill
    ? 'text-white group-hover:text-amber-200'
    : 'text-stone-900 group-hover:text-amber-900';

  const logoBadgeStyles = isDarkPill
    ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
    : 'bg-amber-100 border-amber-300 text-amber-900';

  return (
    <div 
      className="fixed top-3 sm:top-5 inset-x-0 z-50 pointer-events-none flex justify-center px-3 sm:px-6 lg:px-8"
      onKeyDown={handleKeyDown}
    >
      <div 
        className={`pointer-events-auto w-full max-w-7xl mx-auto rounded-full transition-all duration-300 ease-out px-3.5 sm:px-5 lg:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 ${pillContainerStyles}`}
      >
        
        {/* ========================================================= */}
        {/* ZONE 1 (LEFT): Studio Wordmark & Branding                 */}
        {/* ========================================================= */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0 select-none"
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${logoBadgeStyles}`}>
              <StudioLogo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className={`font-serif text-xs sm:text-sm font-bold tracking-tight transition-colors hidden sm:inline truncate max-w-[120px] ${wordmarkStyles}`}>
              {STUDIO_CONFIG.shortName}
            </span>
          </Link>

        </div>

        {/* ========================================================= */}
        {/* ZONE 2 (CENTER): Desktop Navigation                      */}
        {/* Visible on lg+ viewports (1024px, 1280px, 1440px+)       */}
        {/* ========================================================= */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-2 text-xs xl:text-[13px] font-medium tracking-wide">
          
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => `
              relative px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap
              ${isDarkPill
                ? isActive
                  ? 'text-amber-300 font-semibold bg-white/10 shadow-2xs'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
                : isActive
                  ? 'text-amber-950 font-bold bg-amber-900/10 shadow-2xs'
                  : 'text-stone-750 hover:text-stone-950 hover:bg-stone-200/60'
              }
            `}
          >
            <span>Home</span>
            <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
              location.pathname === '/'
                ? isDarkPill ? 'bg-amber-400 scale-x-100' : 'bg-amber-800 scale-x-100'
                : 'scale-x-0'
            }`} />
          </NavLink>

          {/* Services with Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <button
              type="button"
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              className={`
                relative px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer
                ${isDarkPill
                  ? isServicesRoute
                    ? 'text-amber-300 font-semibold bg-white/10 shadow-2xs'
                    : 'text-stone-200 hover:text-white hover:bg-white/10'
                  : isServicesRoute
                    ? 'text-amber-950 font-bold bg-amber-900/10 shadow-2xs'
                    : 'text-stone-750 hover:text-stone-950 hover:bg-stone-200/60'
                }
              `}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-amber-500' : isDarkPill ? 'text-stone-300' : 'text-stone-500'
                }`}
              />
              <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
                isServicesRoute
                  ? isDarkPill ? 'bg-amber-400 scale-x-100' : 'bg-amber-800 scale-x-100'
                  : 'scale-x-0'
              }`} />
            </button>

            {/* Services Dropdown Panel */}
            <div
              className={`absolute left-0 top-full pt-3 w-72 transition-all duration-200 z-50 ${
                servicesDropdownOpen
                  ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                  : 'opacity-0 -translate-y-2 invisible pointer-events-none'
              }`}
            >
              <div className="bg-[#FAF8F5]/98 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl border border-stone-200/90 text-stone-900 space-y-1">
                <div className="px-3 py-2 border-b border-stone-200/80 mb-1">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                    Photography Disciplines
                  </p>
                </div>

                {CATEGORIES_GALLERY.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.routePath || `/portfolio/${cat.id}`}
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-800 hover:bg-stone-200/60 hover:text-amber-950 transition-colors"
                  >
                    <span>{cat.shortTitle}</span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                  </Link>
                ))}

                <div className="pt-1.5 border-t border-stone-200/80 mt-1 flex flex-col gap-1">
                  <Link
                    to="/services"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-amber-900 hover:bg-amber-50 transition-colors"
                  >
                    <span>All Services & Inclusions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/packages"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-medium text-stone-600 hover:bg-stone-100 transition-colors"
                  >
                    <span>Pricing Packages</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio with Mega-Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <button
              type="button"
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              aria-expanded={megaMenuOpen}
              aria-haspopup="true"
              className={`
                relative px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer
                ${isDarkPill
                  ? isPortfolioRoute
                    ? 'text-amber-300 font-semibold bg-white/10 shadow-2xs'
                    : 'text-stone-200 hover:text-white hover:bg-white/10'
                  : isPortfolioRoute
                    ? 'text-amber-950 font-bold bg-amber-900/10 shadow-2xs'
                    : 'text-stone-750 hover:text-stone-950 hover:bg-stone-200/60'
                }
              `}
            >
              <span>Portfolio</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  megaMenuOpen ? 'rotate-180 text-amber-500' : isDarkPill ? 'text-stone-300' : 'text-stone-500'
                }`}
              />
              <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
                isPortfolioRoute
                  ? isDarkPill ? 'bg-amber-400 scale-x-100' : 'bg-amber-800 scale-x-100'
                  : 'scale-x-0'
              }`} />
            </button>

            {/* Interactive Mega-Menu Dropdown Panel */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[760px] xl:w-[840px] transition-all duration-200 z-50 ${
                megaMenuOpen
                  ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                  : 'opacity-0 -translate-y-2 invisible pointer-events-none'
              }`}
            >
              <div className="bg-[#FAF8F5]/98 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-stone-200/90 text-stone-900 overflow-hidden">
                
                {/* Header in mega-menu */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-800" />
                    <span className="font-serif font-bold text-sm text-stone-900 tracking-tight">
                      Explore by Photography Discipline
                    </span>
                  </div>
                  <Link
                    to="/portfolio"
                    onClick={() => setMegaMenuOpen(false)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-800 transition-colors uppercase tracking-wider"
                  >
                    <span>View All Works</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 7 Visual Category Grid */}
                <div className="grid grid-cols-4 gap-3.5">
                  {CATEGORIES_GALLERY.map((cat) => (
                    <Link
                      key={cat.id}
                      to={cat.routePath || `/portfolio/${cat.id}`}
                      onClick={() => setMegaMenuOpen(false)}
                      className="group flex flex-col space-y-2 p-2 rounded-2xl hover:bg-stone-100/90 transition-all duration-200"
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 shadow-2xs">
                        <img
                          src={cat.heroImage}
                          alt={cat.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        <span className="absolute bottom-2 left-2 text-[10px] uppercase font-bold tracking-wider text-white">
                          {cat.label}
                        </span>
                      </div>

                      <div className="px-0.5">
                        <p className="font-serif font-bold text-xs text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                          {cat.shortTitle}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate font-light">
                          {cat.tagline}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* 8th Slot: Complete Portfolio Card */}
                  <Link
                    to="/portfolio"
                    onClick={() => setMegaMenuOpen(false)}
                    className="group flex flex-col justify-between p-3.5 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 text-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold block">
                        Full Archive
                      </span>
                      <h4 className="font-serif font-bold text-sm text-white group-hover:text-amber-200 transition-colors">
                        All Portfolio
                      </h4>
                      <p className="text-[10px] text-stone-300 font-light leading-relaxed">
                        Filterable gallery with high-res Lightbox view.
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-amber-300 font-medium">
                      <span>Browse All</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) => `
              relative px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap
              ${isDarkPill
                ? isActive
                  ? 'text-amber-300 font-semibold bg-white/10 shadow-2xs'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
                : isActive
                  ? 'text-amber-950 font-bold bg-amber-900/10 shadow-2xs'
                  : 'text-stone-750 hover:text-stone-950 hover:bg-stone-200/60'
              }
            `}
          >
            <span>About</span>
            <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
              location.pathname === '/about'
                ? isDarkPill ? 'bg-amber-400 scale-x-100' : 'bg-amber-800 scale-x-100'
                : 'scale-x-0'
            }`} />
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) => `
              relative px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap
              ${isDarkPill
                ? isActive
                  ? 'text-amber-300 font-semibold bg-white/10 shadow-2xs'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
                : isActive
                  ? 'text-amber-950 font-bold bg-amber-900/10 shadow-2xs'
                  : 'text-stone-750 hover:text-stone-950 hover:bg-stone-200/60'
              }
            `}
          >
            <span>Contact</span>
            <span className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-all duration-200 ${
              location.pathname === '/contact'
                ? isDarkPill ? 'bg-amber-400 scale-x-100' : 'bg-amber-800 scale-x-100'
                : 'scale-x-0'
            }`} />
          </NavLink>

        </nav>

        {/* ========================================================= */}
        {/* ZONE 3 (RIGHT): Enquire Now WhatsApp Button + Mobile Menu */}
        {/* ========================================================= */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={buildWhatsAppLink("Hello New Sri Laxmi Photo Studio! I would like to enquire about photoshoot availability.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap shrink-0 min-h-[36px] sm:min-h-[38px] cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12" />
            <span>Enquire Now</span>
          </a>

          {/* Mobile Drawer Trigger (Visible below md / 768px) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={`md:hidden p-2 rounded-full transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center focus:outline-none cursor-pointer ${
              isDarkPill
                ? 'text-white hover:bg-white/20'
                : 'text-stone-800 hover:bg-stone-200/70'
            }`}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
