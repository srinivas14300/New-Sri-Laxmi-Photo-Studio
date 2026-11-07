import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { SafetyProtocol } from '../../types';
import { ShieldCheck, ThermometerSun, HeartHandshake, Clock } from 'lucide-react';

export const SafetyCommitment: React.FC = () => {
  const [protocols, setProtocols] = useState<SafetyProtocol[]>([]);

  useEffect(() => {
    const loadData = async () => {
      await studioStore.fetchSafetyProtocols();
      setProtocols(studioStore.getPublishedSafetyProtocols());
    };
    loadData();
  }, []);

  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    ThermometerSun,
    HeartHandshake,
    Clock
  };

  if (protocols.length === 0) return null;

  return (
    <section id="safety" className="py-16 sm:py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Our Highest Priority
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            The Baby Comfort & Safety Guideline
          </h2>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
            Your baby's comfort, hygiene, and physical safety will never be compromised for a photograph. Every session follows calm, infant-led guidelines.
          </p>
        </div>

        {/* Protocol Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {protocols.map((protocol) => {
            const Icon = iconMap[protocol.iconName] || ShieldCheck;
            return (
              <div
                key={protocol.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/60">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                    {protocol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {protocol.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Studio Guideline</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
