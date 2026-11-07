import React from 'react';
import { ReviewItem } from '../../types';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between min-w-0 w-full">
      <div className="space-y-4">
        {/* Rating stars & format indicator */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          {review.isDemoPlaceholder && (
            <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 uppercase tracking-wider">
              Sample Feedback Format
            </span>
          )}
        </div>

        {/* Comment quote */}
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic break-words">
          "{review.comment}"
        </p>
      </div>

      {/* Attributable details */}
      <div className="pt-5 mt-5 border-t border-stone-100">
        <p className="font-serif font-bold text-sm sm:text-base text-stone-900 truncate">
          {review.parentName}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mt-0.5">
          <span className="font-medium text-amber-900">{review.babyName}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{review.shootType}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-1.5">
          <span>{review.date}</span>
          <span aria-hidden="true">·</span>
          <span>{review.city}</span>
        </div>
      </div>
    </div>
  );
};
