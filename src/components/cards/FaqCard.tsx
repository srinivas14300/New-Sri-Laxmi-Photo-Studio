import React from 'react';
import { FaqItem } from '../../types';
import { ChevronDown } from 'lucide-react';

interface FaqCardProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqCard: React.FC<FaqCardProps> = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all w-full min-w-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 hover:bg-stone-50/70 transition-colors focus:outline-none min-h-[44px]"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-sm sm:text-base font-bold text-stone-900 break-words pr-2">
          {faq.question}
        </span>
        <div className={`p-1.5 rounded-full bg-stone-100 text-stone-600 transition-transform duration-200 shrink-0 ${
          isOpen ? 'rotate-180 bg-stone-200' : ''
        }`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 break-words">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};
