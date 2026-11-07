import React from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../../config/studioConfig';
import {
  HERO_IMAGE,
  NEWBORN_IMAGE,
  SITTER_IMAGE,
  CEREMONY_IMAGE,
  MOTHER_BABY_IMAGE,
  WEDDING_IMAGE,
  PRODUCTS_IMAGE
} from '../../data/mockData';
import { ShieldCheck, Heart, Sparkles, MessageCircle, ArrowRight, Camera, Film } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pillars = [
    { icon: Camera, title: 'Weddings & Ceremonies', desc: 'Expertise in traditional Telugu rituals, candid emotions, and cinematic 4K drone films.' },
    { icon: ShieldCheck, title: 'Infant Safety First', desc: 'Temperature-regulated baby studio (26–28°C), UV-sanitized props & certified spotters.' },
    { icon: Sparkles, title: 'Archival Photo Products', desc: 'Handcrafted Italian silk albums, teakwood frames, acrylic blocks & lab lamination.' },
    { icon: Heart, title: 'Lifetime Family Trust', desc: 'From pre-wedding shoots to your baby’s cradle ceremony and 1st birthday celebrations.' }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      
      {/* Visual Header */}
      <section className="bg-stone-950 text-white py-16 sm:py-24 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Studio Story</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Crafted for Life’s Sacred Milestones
          </h1>
          <p className="text-stone-300 text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            From grand Telugu weddings and auspicious family ceremonies to serene newborn swaddles and timeless living room frames, New Sri Laxmi Studio preserves your family's greatest chapters.
          </p>
        </div>
      </section>

      {/* Visual Dominant Gallery Split */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Mosaic (Spans 7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-stone-900">
                <img
                  src={WEDDING_IMAGE}
                  alt="Wedding Couple Ceremony"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-stone-900 mt-6 sm:mt-8">
                <img
                  src={HERO_IMAGE}
                  alt="Newborn studio portrait on wooden moon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Concise Story (Spans 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                  Full-Service Excellence
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
                  Reverence. Artistry. Authenticity.
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Every milestone in life deserves focused artistry. Our studio houses a specialized team for weddings and traditional events on-location, alongside a peaceful, temperature-warmed baby sanctuary and a professional archival framing lab in Wanaparthy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pillars.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5">
                      <Icon className="w-4 h-4 text-amber-700" />
                      <h3 className="font-serif font-bold text-stone-900 text-xs sm:text-sm">{p.title}</h3>
                      <p className="text-[11px] text-stone-500 leading-normal">{p.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={buildWhatsAppLink("Hello! I would like to enquire about your photography services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-stone-300 text-stone-800 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-50 transition-colors"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Panoramic Studio & Archival Frame */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-stone-900 shadow-xl">
            <img
              src={PRODUCTS_IMAGE}
              alt="Archival photobooks, framed prints and lab services"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white max-w-2xl">
                <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  Complete Archival Print & Framing Lab
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold mt-1">
                  Built to Last for Generations
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                  We don’t stop at digital files. From Italian silk flush-mount wedding photobooks to hand-finished teakwood living room frames, your photographs are printed on museum-grade non-tear papers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
