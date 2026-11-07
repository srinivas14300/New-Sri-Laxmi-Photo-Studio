import React from 'react';

export const StudioLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Unique Lotus & Crescent Baby Photo Studio Emblem */}
    <path d="M12 2C7.5 5.5 5 9 5 13a7 7 0 0 0 14 0c0-4-2.5-7.5-7-11z" />
    <circle cx="12" cy="13" r="3" />
    <path d="M12 10v6" />
    <path d="M9 13h6" />
    <path d="M5 19c2 1.5 4 2 7 2s5-.5 7-2" />
  </svg>
);
