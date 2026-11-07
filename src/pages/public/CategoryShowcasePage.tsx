import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CATEGORIES_GALLERY,
  PORTFOLIO_DATA,
  SERVICES_DATA,
  PACKAGES_DATA,
  WEDDING_IMAGE,
  PREWEDDING_IMAGE,
  CEREMONY_IMAGE,
  HERO_IMAGE,
  MATERNITY_IMAGE,
  TODDLER_IMAGE,
  PRODUCTS_IMAGE
} from '../../data/mockData';
import { studioStore, ExtendedPortfolioItem } from '../../services/store';
import { PortfolioItem, ShootCategory } from '../../types';
import { LightboxModal } from '../../components/common/LightboxModal';
import { PackageCard } from '../../components/cards/PackageCard';
import { buildWhatsAppCategoryEnquiry, buildWhatsAppLink } from '../../config/studioConfig';
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Calendar,
  ShieldCheck,
  Camera,
  Heart
} from 'lucide-react';

interface CategoryConfig {
  slug: string;
  categoryKey: ShootCategory;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  subDisciplines: { title: string; desc: string }[];
  highlights: string[];
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  weddings: {
    slug: 'weddings',
    categoryKey: 'wedding',
    title: 'Wedding Photography & Cinematic Films',
    subtitle: 'Sacred Muhurtham Rites · Candid Romance · Royal Heirloom Albums',
    description: 'We document the grandeur, tender emotions, and sacred traditions of your wedding day. From auspicious Vedic rituals to joyous sangeet celebrations, our specialized wedding crew crafts timeless cinematic memories.',
    heroImage: WEDDING_IMAGE,
    subDisciplines: [
      { title: 'Traditional Wedding Coverage', desc: 'Complete stage rituals, priest mantras, family blessings, and sacred Muhurtham ceremonies.' },
      { title: 'Candid Wedding Photography', desc: 'Unposed laughter, tearful farewells, stolen glances, and natural heartfelt moments.' },
      { title: 'Cinematic Wedding Films', desc: '4K teaser trailers, drone perspectives, and feature-length documentary films with master sound.' },
      { title: 'Couple Portraits', desc: 'Dedicated bridal and groom portrait sessions in wedding finery with royal studio lighting.' },
      { title: 'Handcrafted Silk Photobooks', desc: 'Italian flush-mount albums bound in silk, velvet, or natural leather with archival papers.' }
    ],
    highlights: [
      'Multi-camera traditional & candid crew',
      'Drone aerial cinematography (where allowed)',
      'Complimentary pre-wedding consultation',
      'Archival 40-page luxury silk album included'
    ]
  },
  'pre-wedding': {
    slug: 'pre-wedding',
    categoryKey: 'pre-wedding',
    title: 'Pre-Wedding & Couple Sessions',
    subtitle: 'Scenic Outdoor Romance · Golden Hour Backdrops · Save-the-Date Teasers',
    description: 'Celebrate your unique love story before the wedding celebrations begin. Unhurried, artistic couple photoshoots set against heritage courtyards, sunset lakes, and romantic meadows.',
    heroImage: PREWEDDING_IMAGE,
    subDisciplines: [
      { title: 'Outdoor Scenic Photoshoots', desc: 'Curated heritage sites, lush meadows, and architectural courtyards in golden hour light.' },
      { title: 'Engagement Photography', desc: 'Emotional ring exchange ceremonies, guest candids, and couple celebratory portraits.' },
      { title: 'Romantic Couple Portraits', desc: 'Artistic posing guidance that feels natural, intimate, and effortlessly elegant.' },
      { title: 'Save-the-Date Teasers', desc: 'Short 1-minute 4K video reels perfectly edited for digital invitations and social sharing.' }
    ],
    highlights: [
      'Personalized location scouting and concept moodboard',
      'Multiple outfit changes (traditional & western)',
      '1-Minute 4K Save-the-Date video teaser',
      'Complimentary 16x24 framed reception welcome print'
    ]
  },
  events: {
    slug: 'events',
    categoryKey: 'events',
    title: 'Events & Traditional Ceremonies',
    subtitle: 'Namakaranam · Cradle Ceremonies · Annaprasana · Half-Saree · Birthdays',
    description: 'Preserving the warmth and sanctity of your family’s traditional ceremonies. We capture the sacred rituals, elder blessings, and festive gatherings without intruding on the auspicious flow.',
    heroImage: CEREMONY_IMAGE,
    subDisciplines: [
      { title: 'Namakaranam & Cradle Ceremony', desc: 'Infant cradle decorating, ear-whispering name rites, and multi-generational blessings.' },
      { title: 'Annaprasana (First Rice Feeding)', desc: 'Sacred first solid food ceremony, traditional plate choices, and family celebrations.' },
      { title: '1st Birthday Grand Parties', desc: 'Decor details, cake cutting, family candid portraits, and joyous guest interactions.' },
      { title: 'Half-Saree & Dhoti Ceremonies', desc: 'Youth milestone celebrations, traditional jewellery portraiture, and grand family stages.' },
      { title: 'Cultural Festivals & Functions', desc: 'Housewarmings (Gruhapravesam), silver jubilees, and large family reunions.' }
    ],
    highlights: [
      'Experienced event crew respectful of traditional customs',
      'Candid coverage of children, parents & grandparents',
      'Customized hardcover family event photobook',
      'Quick 48-hour preview delivery for instant sharing'
    ]
  },
  'baby-photography': {
    slug: 'baby-photography',
    categoryKey: 'baby',
    title: 'Baby & Newborn Photography',
    subtitle: 'Sleepy Swaddles (5-21 Days) · Sitter Milestones · 1st Birthday Cake Smash',
    description: 'Our signature baby sanctuary in Wanaparthy offers temperature-controlled comfort, 100+ sanitized handcrafted props, and certified baby-led patience for infants and toddlers.',
    heroImage: HERO_IMAGE,
    subDisciplines: [
      { title: 'Newborn Sessions (5 to 21 Days)', desc: 'Delicate womb-like swaddling, rustic crescent moon setups, and peaceful nests.' },
      { title: 'Sitter Milestones (6 to 10 Months)', desc: 'Tummy time, steady unassisted sitting, bright chuckles, and wooden toy interactions.' },
      { title: '1st Birthday Cake Smash', desc: 'Themed balloon garlands, custom smash cake exploration, and warm bubble tub splash.' },
      { title: 'Toddler & Children Portraits', desc: 'Natural expressions, clean fine art canvas backdrops, and active childhood wonder.' }
    ],
    highlights: [
      'Temperature-regulated (26–28°C) & UV-C sanitized studio',
      'Certified baby spotters and gentle posing techniques',
      'Unhurried feeding, burping, and soothing pauses',
      'Parent and sibling portraits warmly included'
    ]
  },
  maternity: {
    slug: 'maternity',
    categoryKey: 'maternity',
    title: 'Fine Art Maternity & Motherhood',
    subtitle: 'Sculpted Silhouettes · Flowing Designer Gowns · Couple & Sibling Bonds',
    description: 'Celebrate the awe and grace of expectant motherhood. Private dressing suites, flowing chiffon gowns, artistic lighting, and intimate partner portraits honor this monumental chapter.',
    heroImage: MATERNITY_IMAGE,
    subDisciplines: [
      { title: 'Studio Fine Art Silhouettes', desc: 'Sculpted lighting accentuating the beautiful contours of expectant motherhood.' },
      { title: 'Designer Gown Wardrobe', desc: 'Access to flowing silk chiffon, lace robes, and couture maternity drapes.' },
      { title: 'Couple & Partner Portraits', desc: 'Intimate, emotional portraits celebrating the expectant parents together.' },
      { title: 'Mother & Baby Connection', desc: 'Post-birth follow-up sessions capturing maternal tenderness and skin-to-skin warmth.' }
    ],
    highlights: [
      'Private studio suite with complete privacy',
      'Wardrobe access to premium designer maternity gowns',
      'Gentle posing guidance designed for maternal comfort',
      'Bump-to-Baby combo privilege with newborn session'
    ]
  },
  portraits: {
    slug: 'portraits',
    categoryKey: 'portraits',
    title: 'Studio & Family Portraits',
    subtitle: 'Generations · Executive Profiles · Children Heirlooms · Lab Services',
    description: 'Timeless studio portraiture designed to hang proudly in your home for generations. Clean canvas backdrops, balanced studio strobes, and master retouching for individuals and large families.',
    heroImage: TODDLER_IMAGE,
    subDisciplines: [
      { title: 'Generational Family Portraits', desc: 'Gathering grandparents, parents, and children into one proud heirloom frame.' },
      { title: 'Children & Toddler Sessions', desc: 'Candid smiles and childhood innocence preserved in high-resolution clarity.' },
      { title: 'Executive & Artist Profiles', desc: 'Polished studio headshots for LinkedIn, doctor directories, and corporate profiles.' },
      { title: 'Passport & Visa Photography', desc: 'Instant biometric compliant passport and visa photos for all countries.' }
    ],
    highlights: [
      'Accommodates large multi-generational families (up to 15 people)',
      'Archival canvas and wooden framed portraits ready to hang',
      'Instant proofs review on calibrated studio monitors',
      'Digital high-res downloads + printed keepsakes'
    ]
  },
  'photo-services': {
    slug: 'photo-services',
    categoryKey: 'photo-products',
    title: 'Photo Printing, Frames & Albums',
    subtitle: 'Handcrafted Photobooks · Wooden Frames · Acrylic Blocks · Lab Lamination',
    description: 'Archival printing and custom framing services to turn your photographs into tangible family heirlooms. We craft luxury flush-mount albums, Italian teakwood frames, and floating acrylic prints.',
    heroImage: PRODUCTS_IMAGE,
    subDisciplines: [
      { title: 'Handcrafted Silk & Leather Albums', desc: 'Flush-mount layflat pages with archival non-tear paper bound in Italian silk or leatherette.' },
      { title: 'Designer Wooden Frames', desc: 'Natural teakwood, mahogany, and contemporary metallic frames customized to any living room dimension.' },
      { title: 'High-Gloss Acrylic Blocks', desc: 'Frameless modern acrylic photo blocks with ultra-vivid optical clarity for desks and mantels.' },
      { title: 'Photo Restoration & Lamination', desc: 'Expert restoration of vintage heirloom family photos and thermal matte/gloss lamination.' }
    ],
    highlights: [
      'Archival non-fade papers rated for 100+ years',
      'Digital preview layout approval before production',
      'Protective luxury presentation storage boxes',
      'Custom sizing from 6x8 tabletop to 24x36 wall canvases'
    ]
  },
  'photo-products': {
    slug: 'photo-services',
    categoryKey: 'photo-products',
    title: 'Photo Printing, Frames & Albums',
    subtitle: 'Handcrafted Photobooks · Wooden Frames · Acrylic Blocks · Lab Lamination',
    description: 'Archival printing and custom framing services to turn your photographs into tangible family heirlooms. We craft luxury flush-mount albums, Italian teakwood frames, and floating acrylic prints.',
    heroImage: PRODUCTS_IMAGE,
    subDisciplines: [
      { title: 'Handcrafted Silk & Leather Albums', desc: 'Flush-mount layflat pages with archival non-tear paper bound in Italian silk or leatherette.' },
      { title: 'Designer Wooden Frames', desc: 'Natural teakwood, mahogany, and contemporary metallic frames customized to any living room dimension.' },
      { title: 'High-Gloss Acrylic Blocks', desc: 'Frameless modern acrylic photo blocks with ultra-vivid optical clarity for desks and mantels.' },
      { title: 'Photo Restoration & Lamination', desc: 'Expert restoration of vintage heirloom family photos and thermal matte/gloss lamination.' }
    ],
    highlights: [
      'Archival non-fade papers rated for 100+ years',
      'Digital preview layout approval before production',
      'Protective luxury presentation storage boxes',
      'Custom sizing from 6x8 tabletop to 24x36 wall canvases'
    ]
  }
};

export const CategoryShowcasePage: React.FC = () => {
  const location = useLocation();
  const rawSlug = location.pathname.replace(/^\//, '').split('/')[0];
  
  // Normalize alias paths:
  // e.g. /weddings -> weddings, /baby-photography -> baby-photography
  const currentConfig: CategoryConfig = CATEGORY_MAP[rawSlug] || CATEGORY_MAP['weddings'];

  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);
  const [livePortfolio, setLivePortfolio] = useState<ExtendedPortfolioItem[]>([]);

  useEffect(() => {
    setLivePortfolio(studioStore.getPublishedPortfolio());
  }, []);

  // Filter portfolio items for this category
  const relevantPortfolio = livePortfolio.filter(
    item => item.category === currentConfig.categoryKey
  );

  // Filter packages for this category
  const relevantPackages = PACKAGES_DATA.filter(
    pkg => pkg.category === currentConfig.categoryKey ||
      (currentConfig.categoryKey === 'baby' && (pkg.category === 'baby' || pkg.category === 'birthday'))
  );

  // Filter services for this category
  const relevantServices = SERVICES_DATA.filter(
    svc => svc.category === currentConfig.categoryKey ||
      (currentConfig.categoryKey === 'baby' && (svc.category === 'baby' || svc.category === 'newborn'))
  );

  return (
    <div className="w-full bg-[#FAF8F5] pb-24">
      
      {/* 1. Cinematic Category Hero */}
      <section className="relative bg-stone-950 text-white py-16 sm:py-24 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 z-0">
          <img
            src={currentConfig.heroImage}
            alt={currentConfig.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-60 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-black/35" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sri Laxmi Photography Discipline</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {currentConfig.title}
          </h1>

          <p className="font-serif italic text-amber-200 text-sm sm:text-lg max-w-2xl mx-auto">
            {currentConfig.subtitle}
          </p>

          <p className="text-stone-300 text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed pt-1">
            {currentConfig.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={buildWhatsAppCategoryEnquiry(currentConfig.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl shadow-lg transition-all min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl backdrop-blur-md border border-white/30 transition-all min-h-[46px]"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Category Highlights */}
      <section className="py-8 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentConfig.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Visual Portfolio Gallery for this Category */}
      {relevantPortfolio.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                  Selected Work
                </p>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                  Featured Photographs
                </h2>
              </div>
              <Link
                to={`/portfolio/${currentConfig.categoryKey}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-900 hover:text-amber-800 transition-colors uppercase tracking-wider py-1"
              >
                <span>View All In Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantPortfolio.map(photo => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative rounded-2xl overflow-hidden bg-stone-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                    <span className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider">
                      {photo.categoryLabel}
                    </span>
                    <h4 className="font-serif font-bold text-base text-white">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-stone-300 font-light truncate">
                      {photo.theme}
                    </p>
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Category-Specific Packages */}
      {relevantPackages.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                Transparent Investment
              </p>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Packages for {currentConfig.title.split('&')[0]}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Indicative base packages. Contact us on WhatsApp for custom requirements and personalized dates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {relevantPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Category-Aware WhatsApp Callout */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Instant Availability & Quote
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                Planning a {currentConfig.title.split('&')[0]} Session?
              </h3>
              <p className="text-xs sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
                Connect with our lead photographer directly on WhatsApp to check date availability, request portfolio samples, or customize package inclusions.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={buildWhatsAppCategoryEnquiry(currentConfig.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all min-h-[46px]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat for {currentConfig.title.split('&')[0]}</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-white/20 transition-all min-h-[46px]"
              >
                <span>Visit Studio Location</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <LightboxModal
          item={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={() => {
            const idx = relevantPortfolio.findIndex(p => p.id === selectedPhoto.id);
            if (idx >= 0 && idx < relevantPortfolio.length - 1) {
              setSelectedPhoto(relevantPortfolio[idx + 1]);
            }
          }}
          onPrev={() => {
            const idx = relevantPortfolio.findIndex(p => p.id === selectedPhoto.id);
            if (idx > 0) {
              setSelectedPhoto(relevantPortfolio[idx - 1]);
            }
          }}
          hasNext={relevantPortfolio.findIndex(p => p.id === selectedPhoto.id) < relevantPortfolio.length - 1}
          hasPrev={relevantPortfolio.findIndex(p => p.id === selectedPhoto.id) > 0}
        />
      )}

    </div>
  );
};
