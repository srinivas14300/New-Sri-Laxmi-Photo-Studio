import React, { useState } from 'react';
import { REVIEWS_DATA, DATA_DISCLAIMER } from '../../data/mockData';
import { ReviewCard } from '../../components/cards/ReviewCard';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../../config/studioConfig';
import { Star, Info, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const [form, setForm] = useState({
    parentName: '',
    babyName: '',
    shootType: 'Newborn Session',
    rating: 5,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.parentName || !form.comment) return;

    // Send formatted feedback via WhatsApp
    const message = `*Parent Feedback Submission - ${STUDIO_CONFIG.name}*\nParent: ${form.parentName}\nBaby: ${form.babyName}\nShoot: ${form.shootType}\nRating: ${form.rating} Stars\nReview: "${form.comment}"`;
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F2EB] to-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Parent Stories
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Customer Feedback & Reviews
          </h1>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Read representative feedback illustrating our gentle studio experience, or submit your own review if you have recently visited us.
          </p>
        </div>
      </section>

      {/* Review Format Disclaimer */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Studio Transparency Note:</strong> {DATA_DISCLAIMER.reviews}
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {REVIEWS_DATA.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Submit Your Review Section */}
      <section className="py-12 bg-[#F6F2EB] border-y border-stone-200/70">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" />
                <span>Share Your Experience</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Leave a Parent Review
              </h2>
              <p className="text-xs text-stone-500">
                Did your little one have a session with us? We cherish your kind words and feedback.
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>Thank you! Your feedback has been formatted and shared with our studio coordinator via WhatsApp.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Parent's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Rao"
                    value={form.parentName}
                    onChange={e => setForm({ ...form, parentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Baby's Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Baby Aarav"
                    value={form.babyName}
                    onChange={e => setForm({ ...form, babyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Session Photographed
                  </label>
                  <select
                    value={form.shootType}
                    onChange={e => setForm({ ...form, shootType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                  >
                    <option>Newborn Session</option>
                    <option>Milestone Sitter Session</option>
                    <option>1st Birthday Cake Smash</option>
                    <option>Maternity Session</option>
                    <option>Family Session</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Rating (Stars)
                  </label>
                  <select
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Your Experience & Comments *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the atmosphere, patience of the team, cleanliness, or how you loved your baby's photos..."
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback to Studio (Opens WhatsApp)</span>
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};
