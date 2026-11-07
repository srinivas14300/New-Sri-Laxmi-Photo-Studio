import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { ReviewItem } from '../../types';
import { Star, Check, Trash2 } from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await studioStore.fetchReviews();
      setReviews(studioStore.getReviews());
    };
    loadData();

    const handleUpdate = () => setReviews(studioStore.getReviews());
    window.addEventListener('studio_storage_update', handleUpdate);
    return () => window.removeEventListener('studio_storage_update', handleUpdate);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await studioStore.deleteReview(id);
      setFeedback('Review removed from moderation list.');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Error deleting review');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Client Review Moderation
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Review, verify, and moderate testimonials displayed on the public website.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900 text-base">
                  {rev.parentName}
                </span>
                <span className="text-xs text-stone-500">
                  ({rev.babyName} · {rev.shootType})
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            <p className="text-xs text-stone-700 italic leading-relaxed">
              "{rev.comment}"
            </p>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>{rev.date} · {rev.city}</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Published
                </span>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="p-1 text-stone-400 hover:text-red-700 cursor-pointer"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
