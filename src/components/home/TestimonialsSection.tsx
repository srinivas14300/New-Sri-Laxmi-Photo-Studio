import React from 'react';
import { REVIEWS_DATA } from '../../data/mockData';
import { Star, Quote, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#F6F2EB] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Parent Voices & Experiences
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Trusted by Over 3,500 Families
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Read what moms and dads share about their peaceful, heartfelt experience at New Sri Laxmi Baby Photo Studio.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Attributable metadata */}
              <div className="pt-6 mt-6 border-t border-stone-100">
                <p className="font-serif font-bold text-base text-stone-900">
                  {rev.parentName}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                  <span className="font-medium text-amber-900">{rev.babyName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.shootType}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-2">
                  <span>{rev.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.city}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust badge row */}
        <div className="mt-12 text-center text-xs text-stone-600 flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>4.9 / 5 Average Rating across Google Reviews & Parent Direct Feedback</span>
        </div>

      </div>
    </section>
  );
};
