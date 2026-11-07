import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { buildWhatsAppLink } from '../../config/studioConfig';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!item) return null;

  const enquiryMessage = `Hello New Sri Laxmi Baby Photo Studio! I saw the "${item.title}" (${item.categoryLabel}) photo on your website and would love to enquire about a similar session.`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      {/* Close button with adequate touch target */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors z-30 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
        aria-label="Close preview (ESC)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="fixed left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors z-20 hidden md:flex items-center justify-center cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="fixed right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors z-20 hidden md:flex items-center justify-center cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content Container */}
      <div 
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col md:flex-row bg-stone-900 rounded-2xl overflow-y-auto md:overflow-hidden shadow-2xl border border-stone-800 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image container with zero broken image fallback */}
        <div className="md:w-2/3 bg-black flex items-center justify-center relative min-h-[240px] sm:min-h-[320px] max-h-[55vh] md:max-h-[85vh]">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[55vh] md:max-h-[85vh]"
          />
        </div>

        {/* Shoot details sidebar */}
        <div className="md:w-1/3 p-5 sm:p-7 flex flex-col justify-between bg-stone-900 text-stone-200 border-t md:border-t-0 md:border-l border-stone-800">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium tracking-wide uppercase">
              <span>{item.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{item.ageGroup}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight break-words">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {item.description || `Special themed setup crafted with baby-safe props, gentle natural lighting, and peaceful environment at New Sri Laxmi Baby Photo Studio.`}
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p><strong className="text-stone-300">Theme:</strong> {item.theme}</p>
              <p><strong className="text-stone-300">Props:</strong> Cleaned & Sanitized Studio Props</p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-stone-800 space-y-3">
            <a
              href={buildWhatsAppLink(enquiryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-xs transition-colors min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire This Style on WhatsApp</span>
            </a>
            <p className="text-[11px] text-center text-stone-400">
              Custom props & wraps provided in our studio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
