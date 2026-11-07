import React from 'react';
import { Link } from 'react-router-dom';
import {
  HERO_IMAGE,
  NEWBORN_IMAGE,
  CAKE_SMASH_IMAGE,
  MATERNITY_IMAGE,
  CEREMONY_IMAGE,
  WEDDING_IMAGE
} from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export const PhotoCollectionsSection: React.FC = () => {
  const collections = [
    {
      title: 'The Pure First 14 Days',
      category: 'newborn',
      image: NEWBORN_IMAGE,
      subtitle: 'Delicate swaddles & handcrafted rustic props'
    },
    {
      title: 'First Birthday Splendor',
      category: 'birthday',
      image: CAKE_SMASH_IMAGE,
      subtitle: 'Messy joy, laughter & warm bubble splash'
    },
    {
      title: 'Heritage Rites & Cradle Ceremonies',
      category: 'events',
      image: CEREMONY_IMAGE,
      subtitle: 'Traditional wooden swing cradle & fresh marigolds'
    },
    {
      title: 'Maternal Grace & Couple Heirlooms',
      category: 'maternity',
      image: MATERNITY_IMAGE,
      subtitle: 'Sculpted lighting, flowing chiffon & timeless intimacy'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Curated Series
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300 hover:text-white transition-colors uppercase tracking-wider py-1"
          >
            <span>Explore All Series</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Image-Led Story Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <Link
              key={idx}
              to={`/portfolio/${col.category}`}
              className="group flex flex-col space-y-3 cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900 shadow-lg relative">
                <img
                  src={col.image}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                  {col.title}
                </h3>
                <p className="text-xs text-stone-400 font-light mt-0.5 line-clamp-1">
                  {col.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
