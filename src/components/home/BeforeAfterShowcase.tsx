import React, { useState, useRef, useCallback, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { BeforeAfterItem } from '../../types';
import { SlidersHorizontal, Sparkles, CheckCircle2 } from 'lucide-react';

export const BeforeAfterShowcase: React.FC = () => {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      await studioStore.fetchBeforeAfter();
      setItems(studioStore.getPublishedBeforeAfter());
    };
    loadData();
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  if (items.length === 0) return null;
  const activeItem = items[0];

  return (
    <section id="before-after" className="py-16 sm:py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Fine Art Finishing Standards
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Delicate & Natural Retouching Philosophy
          </h2>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
            Drag the slider to compare. We respect the natural purity of your baby while gently softening temporary dry skin flakes and evening room warmth without synthetic plastic filters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Interactive Before/After Split Comparison using clip-path */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl select-none cursor-ew-resize bg-stone-900 border border-stone-200 touch-none w-full min-w-0"
              onMouseDown={(e) => {
                isDragging.current = true;
                handleMove(e.clientX);
              }}
              onMouseUp={() => {
                isDragging.current = false;
              }}
              onMouseLeave={() => {
                isDragging.current = false;
              }}
              onMouseMove={handleMouseMove}
              onTouchStart={(e) => {
                isDragging.current = true;
                if (e.touches[0]) handleMove(e.touches[0].clientX);
              }}
              onTouchEnd={() => {
                isDragging.current = false;
              }}
              onTouchMove={handleTouchMove}
            >
              {/* "After" Master Retouched Image (Full base) */}
              <img
                src={activeItem.afterImage}
                alt="Master Retouched Portrait"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* "Before" Raw Camera Capture (Clipped overlay via modern clip-path) */}
              <img
                src={activeItem.beforeImage}
                alt="Raw Camera Capture"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-95 saturate-75 pointer-events-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              />

              {/* Before badge */}
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/70 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs pointer-events-none">
                Raw Capture
              </span>

              {/* After badge */}
              <span className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-amber-950/80 text-amber-200 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs pointer-events-none">
                Master Retouched
              </span>

              {/* Divider Line & Thumb */}
              <div
                className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-stone-900 shadow-md flex items-center justify-center border-2 border-amber-600">
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-700" />
                </div>
              </div>

            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-stone-500 px-1">
              <span>← Drag left to see Retouched</span>
              <span>Drag right to see Raw →</span>
            </div>
          </div>

          {/* Right: Retouching Standards details */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 w-full min-w-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Handcrafted Quality Guarantee</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight break-words">
                {activeItem.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="space-y-3 pt-1">
              {activeItem.retouchHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-stone-700 font-medium break-words">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900/90 leading-relaxed">
              <strong>Studio Note:</strong> Every client receives all raw captures on drive or USB, alongside signature artistic retouched masterworks in print-ready 300 DPI resolution.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
