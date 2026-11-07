import React from 'react';
import { PortfolioItem } from '../../types';
import { Maximize2 } from 'lucide-react';

interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: (item: PortfolioItem) => void;
  aspectClass?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(item)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 bg-stone-900 w-full min-w-0 h-full min-h-[350px] sm:min-h-[410px] flex flex-col"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-stone-900">
        <img
          src={item.imageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
        />
      </div>

      {/* Measured scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
        <div className="flex items-center gap-2 text-[11px] text-amber-300 font-medium mb-1 uppercase tracking-wider">
          <span>{item.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{item.ageGroup}</span>
        </div>

        <div className="flex items-center justify-between gap-3 pointer-events-auto">
          <div className="min-w-0">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight truncate">
              {item.title}
            </h3>
            <p className="text-xs text-stone-300 truncate mt-0.5 font-light">
              {item.theme}
            </p>
          </div>

          <div className="p-2.5 rounded-full bg-white/20 group-hover:bg-amber-600 text-white backdrop-blur-xs transition-colors shrink-0">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
