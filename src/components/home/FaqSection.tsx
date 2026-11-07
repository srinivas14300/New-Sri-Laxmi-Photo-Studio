import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Clear Answers for Parents
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about planning, booking, and enjoying your baby’s studio session.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-stone-50/70 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-stone-100 text-stone-600 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 bg-stone-200' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 bg-stone-100/70 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-bold text-stone-900">Have a specific question about your baby?</h4>
            <p className="text-xs text-stone-600">Our studio coordinator answers directly on WhatsApp within minutes.</p>
          </div>
          <a
            href={buildWhatsAppLink("Hello! I have a question regarding baby shoot preparation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
