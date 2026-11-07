import React from 'react';
import { Camera, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const HighlightsStrip: React.FC = () => {
  const highlights = [
    {
      icon: Camera,
      badge: 'Dedicated',
      label: 'Specialized Baby Studio',
      detail: 'Tailored specifically for infants & toddlers'
    },
    {
      icon: HeartHandshake,
      badge: 'Baby-Led',
      label: 'Patient Session Pacing',
      detail: 'Unhurried intervals for feeds & cuddles'
    },
    {
      icon: Sparkles,
      badge: 'Curated',
      label: 'Wardrobe & Props Provided',
      detail: 'Handcrafted wraps, bonnets & wooden props'
    },
    {
      icon: ShieldCheck,
      badge: 'Protected',
      label: 'Hygiene & Spotter Safety',
      detail: 'Cleaned fabrics & supported infant poses'
    }
  ];

  return (
    <section className="bg-stone-900 text-stone-100 py-8 sm:py-10 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col space-y-1 p-2 sm:p-0">
                <div className="flex items-center gap-2 text-amber-400">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-stone-100">
                  {item.label}
                </p>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
