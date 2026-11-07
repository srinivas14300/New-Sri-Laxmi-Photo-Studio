import {
  ServiceItem,
  PortfolioItem,
  PackageItem,
  OfferItem,
  BeforeAfterItem,
  ReviewItem,
  FaqItem,
  SafetyProtocol,
  CategoryMeta,
  ShootCategory,
  ServiceCarouselSlide
} from '../types';

export const HERO_IMAGE = 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955112/1.png';
export const NEWBORN_IMAGE = 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955260/3.png';
export const SITTER_IMAGE = 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/2.png';
export const CAKE_SMASH_IMAGE = 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/4.png';
export const MATERNITY_IMAGE = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1920&q=80';
export const WEDDING_IMAGE = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80';
export const CEREMONY_IMAGE = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80';
export const TODDLER_IMAGE = 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1920&q=80';
export const MOTHER_BABY_IMAGE = 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955258/7.png';
export const PREWEDDING_IMAGE = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80';
export const PRODUCTS_IMAGE = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80';

export const DATA_DISCLAIMER = {
  pricing: "Indicative Pricing: Rates shown are studio estimates. Contact via WhatsApp for an official customized quotation.",
  reviews: "Client Feedback: Verified testimonials are curated by studio management.",
  stats: "Studio Metrics Placeholder: Configurable in Admin Settings."
};

/**
 * Primary Photography Categories Meta
 */
export const CATEGORIES_GALLERY: CategoryMeta[] = [
  {
    id: 'wedding',
    label: 'Weddings',
    shortTitle: 'Wedding Photography',
    heroImage: WEDDING_IMAGE,
    tagline: 'Traditional Rites, Candid Moments & Cinematic Films',
    aspectRatio: '3:4',
    routePath: '/weddings',
    subCategories: ['Traditional Wedding Coverage', 'Candid Wedding Photography', 'Cinematic Wedding Films', 'Couple Portraits', 'Handcrafted Wedding Albums']
  },
  {
    id: 'pre-wedding',
    label: 'Pre-Wedding',
    shortTitle: 'Pre-Wedding & Couples',
    heroImage: PREWEDDING_IMAGE,
    tagline: 'Romantic Outdoor Sessions & Engagements',
    aspectRatio: '4:3',
    routePath: '/pre-wedding',
    subCategories: ['Pre-Wedding Photoshoots', 'Engagement Photography', 'Outdoor Couple Portraits', 'Save the Date Teasers']
  },
  {
    id: 'events',
    label: 'Events & Ceremonies',
    shortTitle: 'Traditional Ceremonies',
    heroImage: CEREMONY_IMAGE,
    tagline: 'Namakaranam, Cradle, Annaprasana & Family Functions',
    aspectRatio: '4:3',
    routePath: '/events',
    subCategories: ['Naming Ceremony (Namakaranam)', 'Cradle Ceremony', '1st Birthday Celebrations', 'Rice Ceremony (Annaprasana)', 'Family Functions & Festivals']
  },
  {
    id: 'newborn',
    label: 'Newborn',
    shortTitle: 'Newborn Sessions',
    heroImage: NEWBORN_IMAGE,
    tagline: 'Delicate Swaddles & First Sleepy Moments (5-21 Days)',
    aspectRatio: '3:4',
    routePath: '/baby-photography',
    subCategories: ['Newborn Swaddle Sessions', 'Artistic Props & Themes', 'Infant-Led Pacing', 'Sanitized Environment']
  },
  {
    id: 'baby',
    label: 'Baby & Child',
    shortTitle: 'Baby & Child Portraits',
    heroImage: HERO_IMAGE,
    tagline: 'Sitter Milestones, Cake Smash & Childhood Wonder',
    aspectRatio: '16:9',
    routePath: '/baby-photography',
    subCategories: ['Sitter Milestones (6-10 Months)', '1st Birthday Cake Smash', 'Toddler Portraits', 'Childhood Heirlooms']
  },
  {
    id: 'maternity',
    label: 'Maternity',
    shortTitle: 'Fine Art Maternity',
    heroImage: MATERNITY_IMAGE,
    tagline: 'Designer Gowns, Golden Silhouettes & Maternal Glow',
    aspectRatio: '3:4',
    routePath: '/maternity',
    subCategories: ['Fine Art Maternity Portraits', 'Silhouette Studio Lighting', 'Mother & Baby Bonds', 'Partner & Family Poses']
  },
  {
    id: 'portraits',
    label: 'Portraits',
    shortTitle: 'Studio & Family Portraits',
    heroImage: TODDLER_IMAGE,
    tagline: 'Generations, Individual Profiles & Studio Heirlooms',
    aspectRatio: '3:4',
    routePath: '/portraits',
    subCategories: ['Generational Family Portraits', 'Children & Toddler Sessions', 'Executive & Individual Profiles', 'Studio Passport Photography']
  },
  {
    id: 'photo-products',
    label: 'Photo Products',
    shortTitle: 'Albums, Frames & Prints',
    heroImage: PRODUCTS_IMAGE,
    tagline: 'Silk Photobooks, Wooden Frames, Acrylic Blocks & Lab Services',
    aspectRatio: '4:3',
    routePath: '/photo-services',
  }
];

/**
 * Editorial Homepage Hero Showcase Carousel (5 Core Categories)
 */
export const INITIAL_CAROUSEL: ServiceCarouselSlide[] = [
  {
    id: 'slide-wedding',
    title: 'WEDDING PHOTOGRAPHY',
    category: 'wedding',
    headline: 'Every Love Story Deserves to Be Remembered',
    tagline: 'Beautifully captured weddings, candid emotions and timeless celebrations.',
    ctaText: 'Explore Wedding Photography',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80',
    routePath: '/weddings',
    displayOrder: 1,
    isPublished: true,
    isIllustrativePlaceholder: true
  },
  {
    id: 'slide-prewedding',
    title: 'PRE-WEDDING & ENGAGEMENT',
    category: 'pre-wedding',
    headline: 'Your Story Begins Here',
    tagline: 'Romantic portraits and unforgettable moments before the big day.',
    ctaText: 'Explore Couple Photography',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80',
    routePath: '/pre-wedding',
    displayOrder: 2,
    isPublished: true,
    isIllustrativePlaceholder: true
  },
  {
    id: 'slide-baby',
    title: 'BABY & NEWBORN PHOTOGRAPHY',
    category: 'baby',
    headline: 'Little Moments. Lifetime Memories.',
    tagline: 'Precious newborn portraits, baby milestones and childhood memories.',
    ctaText: 'Explore Baby Photography',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955112/1.png',
    routePath: '/baby-photography',
    displayOrder: 3,
    isPublished: true,
    isIllustrativePlaceholder: false
  },
  {
    id: 'slide-maternity',
    title: 'MATERNITY & FAMILY PORTRAITS',
    category: 'maternity',
    headline: 'Moments That Become Memories',
    tagline: 'Celebrate motherhood, family bonds and life\'s beautiful milestones.',
    ctaText: 'Explore Portrait Photography',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1920&q=80',
    routePath: '/maternity',
    displayOrder: 4,
    isPublished: true,
    isIllustrativePlaceholder: true
  },
  {
    id: 'slide-events',
    title: 'EVENTS & CELEBRATIONS',
    category: 'events',
    headline: 'Celebrate Every Beautiful Moment',
    tagline: 'Professional photography for birthdays, naming ceremonies and special occasions.',
    ctaText: 'Explore Event Photography',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80',
    routePath: '/events',
    displayOrder: 5,
    isPublished: true,
    isIllustrativePlaceholder: true
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // =========================================================================
  // 1. GENUINE OWNER-PROVIDED BABY PHOTOGRAPHS (16 ORIGINAL CLOUDINARY ASSETS)
  // MUST REMAIN PROTECTED & UNTOUCHED AT ALL TIMES
  // =========================================================================
  {
    id: 'genuine-baby-1',
    title: 'Celestial Cradle Sleep',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '12 Days Old',
    theme: 'Traditional Woven Basket & Silk Drape',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955112/1.png',
    cloudinaryPublicId: '1',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-2',
    title: 'First Curiosities',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '7 Months Old',
    theme: 'Studio Sitter Milestone',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/2.png',
    cloudinaryPublicId: '2',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-3',
    title: 'Lavender Dreams Swaddle',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '10 Days Old',
    theme: 'Fine Art Swaddle & Floral Crown',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955260/3.png',
    cloudinaryPublicId: '3',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-4',
    title: 'Traditional Cradle Joy',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '6 Months Old',
    theme: 'Handcrafted Wood Cradle & Marigolds',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/4.png',
    cloudinaryPublicId: '4',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-5',
    title: 'Little Explorer',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '8 Months Old',
    theme: 'Minimalist Studio Floor Session',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/5.png',
    cloudinaryPublicId: '5',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-6',
    title: 'Midnight Blue Serenity',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '14 Days Old',
    theme: 'Deep Blue Wrap & Moon Prop',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955267/6.png',
    cloudinaryPublicId: '6',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-7',
    title: 'Smiling Sitter',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '9 Months Old',
    theme: 'Natural Oak Bench Portrait',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955258/7.png',
    cloudinaryPublicId: '7',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-8',
    title: 'Rustic Basket Slumber',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '8 Days Old',
    theme: 'Organic Wool Nest & Timber Bowl',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/8.png',
    cloudinaryPublicId: '8',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-9',
    title: 'Innocent Gaze',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '7 Months Old',
    theme: 'Soft Linen Textures',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/9.png',
    cloudinaryPublicId: '9',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-10',
    title: 'Angelic Rest',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '15 Days Old',
    theme: 'Warm Tones & Fuzzy Rug',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955269/10.png',
    cloudinaryPublicId: '10',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-11',
    title: 'Tummy Time Triumph',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '6 Months Old',
    theme: 'Signature Studio Milestone',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955272/11.png',
    cloudinaryPublicId: '11',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-12',
    title: 'Emerald Green Swaddle',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '11 Days Old',
    theme: 'Luxe Velvet Wrap',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955273/12.png',
    cloudinaryPublicId: '12',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-13',
    title: 'Toddler Wonder',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '14 Months Old',
    theme: 'Clean Canvas Backdrop',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955276/13.png',
    cloudinaryPublicId: '13',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-14',
    title: 'Pure Slumber',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '9 Days Old',
    theme: 'Minimalist White Theme',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955288/14.png',
    cloudinaryPublicId: '14',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },
  {
    id: 'genuine-baby-15',
    title: 'Playful Moments',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '10 Months Old',
    theme: 'Studio Toy Interaction',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955283/15.png',
    cloudinaryPublicId: '15',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: false
  },
  {
    id: 'genuine-baby-16',
    title: 'Dusty Rose Newborn',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '12 Days Old',
    theme: 'Signature Swaddle Technique',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955282/16.png',
    cloudinaryPublicId: '16',
    assetSource: 'studio',
    aspectRatio: '3:4',
    featured: true
  },

  // =========================================================================
  // 2. ADDITIONAL NEWBORN SESSIONS (ILLUSTRATIVE ASSETS TO COMPLETE 10+ MINIMUM)
  // =========================================================================
  {
    id: 'port-nb-1',
    title: 'Crescent Moon Dreamer',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '10 Days Old',
    theme: 'Artistic Timber Moon Prop & Star Garland',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955260/3.png',
    aspectRatio: '3:4',
    description: 'Fine art newborn pose nestled safely inside a crescent moon prop with soft ambient warm lights.',
    featured: false,
    assetSource: 'studio'
  },
  {
    id: 'port-nb-2',
    title: 'Organic Wool Nest Slumber',
    category: 'newborn',
    categoryLabel: 'Newborn',
    ageGroup: '8 Days Old',
    theme: 'Hand-Knitted Mohair & Timber Bowl',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/2.png',
    aspectRatio: '3:4',
    description: 'Peaceful infant sleeping pose resting on organic wool textures with muted earthy tones.',
    featured: false,
    assetSource: 'studio'
  },

  // =========================================================================
  // 3. ADDITIONAL BABY & CHILD PORTRAITS
  // =========================================================================
  {
    id: 'port-baby-1',
    title: 'Sitter Milestone Giggle',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '7 Months Old',
    theme: 'Boho Rattan Chair & Canvas Backdrop',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/4.png',
    aspectRatio: '3:4',
    description: 'Candid sitter milestone capture celebrating steady unassisted sitting and joyful giggles.',
    featured: false,
    assetSource: 'studio'
  },
  {
    id: 'port-baby-2',
    title: '1st Birthday Cake Smash Jubilee',
    category: 'baby',
    categoryLabel: 'Baby & Child',
    ageGroup: '12 Months Old',
    theme: 'Organic Balloon Garland & Smash Cake',
    imageUrl: 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955255/5.png',
    aspectRatio: '4:3',
    description: 'First birthday milestone smash cake session with pastel balloons and active toddler play.',
    featured: false,
    assetSource: 'studio'
  },

  // =========================================================================
  // 4. WEDDING PHOTOGRAPHY (10 DISTINCT PROFESSIONAL IMAGES)
  // =========================================================================
  {
    id: 'port-wed-1',
    title: 'The Sacred Vivaha Knot',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Wedding Day',
    theme: 'Traditional Mandapam & Candid Joy',
    imageUrl: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Traditional Telugu wedding ritual captured in vivid detail with authentic mandapam florals.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-2',
    title: 'Royal Mandapam Ceremonies',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Muhurtham',
    theme: 'Gold Floral Mandap & Vedic Rituals',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Sacred wedding mandapam ceremony with golden hues and traditional rites.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-3',
    title: 'Bridal Elegance & Royal Silk',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Bridal Portrait',
    theme: 'Kanjeevaram Sari & Temple Gold Jewelry',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Elegant Indian bride adorned in traditional silk and ancestral temple jewelry.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-4',
    title: 'Varamala Garland Exchange',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Ceremony Rites',
    theme: 'Fresh Jasmine & Rose Garlands',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Candid moment of bride and groom exchanging sacred floral Varamala garlands.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-5',
    title: 'Natural Teakwood Photo Frames & Albums',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Wall Frames',
    theme: 'Handcrafted Wooden Gallery Frames',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Bespoke solid wood photo frames, glass wall gallery prints, and archival silk photobooks.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-6',
    title: 'Golden Hour Mandap Glow',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Evening Reception',
    theme: 'Fairy Light Decor & Warm Hues',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Cinematic lighting illuminating the grand evening wedding mandapam stage.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-7',
    title: 'Groom Regalia & Traditional Crown',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Groom Portrait',
    theme: 'Silk Dhoti & Traditional Turban',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Regal groom portrait capturing traditional attire and anticipatory smile.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-8',
    title: 'Grand Reception Stage Lighting',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Reception Night',
    theme: 'Crystal Chandeliers & Stage Floral Wall',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'High-energy reception stage celebration with family group photographs.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-9',
    title: 'Intimate Henna & Bangles Detail',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Pre-Wedding Rites',
    theme: 'Mehendi Patterns & Glass Bangles',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Macro photography of intricate bridal mehendi henna and traditional glass bangles.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-wed-10',
    title: 'Royal Vivaha Celebrations',
    category: 'wedding',
    categoryLabel: 'Wedding',
    ageGroup: 'Full Wedding Day',
    theme: 'Cinematic Grandeur & Family Blessings',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Panoramic wedding celebration capturing elder blessings and family applause.',
    featured: true,
    assetSource: 'external_illustrative'
  },

  // =========================================================================
  // 5. PRE-WEDDING & COUPLES (10 DISTINCT PROFESSIONAL IMAGES)
  // =========================================================================
  {
    id: 'port-prewed-1',
    title: 'Royal Palace Romance',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Couple Shoot',
    theme: 'Heritage Courtyard at Golden Hour',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Timeless pre-wedding shoot set against traditional palace arches.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-2',
    title: 'Sunset Lake Meadow Whispers',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Engagement Shoot',
    theme: 'Golden Hour Backlight & Scenic Nature',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Romantic outdoor engagement portraits illuminated by warm setting sun.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-3',
    title: 'Engagement Ring Exchange',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Engagement Rites',
    theme: 'Solitaire Ring Macro & Hand-in-Hand',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Close-up emotional photograph of engagement ring placement during ceremony.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-4',
    title: 'Heritage Courtyard Sunset',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Pre-Wedding Shoot',
    theme: 'Carved Stone Pillars & Warm Light',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Sculpted couple posing amidst heritage architectural columns.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-5',
    title: 'Romantic Outdoor Stroll',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Couple Session',
    theme: 'Botanical Garden Pathways',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Relaxed, candid stroll through vibrant botanical gardens.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-6',
    title: 'Lakeside Sunset Embrace',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Pre-Wedding Shoot',
    theme: 'Water Reflection & Silhouette Sky',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Serene silhouette of couple embracing beside calm waters at dusk.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-7',
    title: 'Save-the-Date Teaser Shoot',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Digital Invitations',
    theme: 'Creative Board Prop & Playful Pose',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Playful Save-the-Date portrait for digital video announcements.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-8',
    title: 'Architectural Archway Poses',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Fine Art Couple',
    theme: 'Monolithic Stone Arch & Flowing Gown',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Dramatic architectural framing with flowing red gown in golden light.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-9',
    title: 'Candlelit Evening Romance',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Twilight Session',
    theme: 'Warm Ambient Lanterns & Starlight',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Intimate twilight couple session illuminated by handcrafted brass lanterns.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prewed-10',
    title: 'Joyful Nature Couple Session',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    ageGroup: 'Casual Romance',
    theme: 'Pine Forest & Sunbeams',
    imageUrl: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Candid laughter and natural connection amidst sun-dappled trees.',
    featured: true,
    assetSource: 'external_illustrative'
  },

  // =========================================================================
  // 6. TRADITIONAL CEREMONIES (10 DISTINCT PROFESSIONAL IMAGES)
  // =========================================================================
  {
    id: 'port-event-1',
    title: 'Namakaranam & Cradle Blessing',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Naming Ceremony',
    theme: 'Marigold Florals & Brass Diya Rites',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Auspicious cradle ceremony with authentic cultural traditions.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-2',
    title: 'Festive Family Annaprasana',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Rice Feeding Rite',
    theme: 'Traditional Brass Thali & Elder Blessings',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Joyful traditional celebration capturing elder blessings and family gathering.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-3',
    title: '1st Birthday Balloon Jubilee',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: '1st Birthday',
    theme: 'Pastel Garland & Stage Decor',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Vibrant stage decor and guest interaction at first birthday party.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-4',
    title: 'Traditional Marigold Rites',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Pooja & Mantras',
    theme: 'Yellow Marigolds & Sacred Mango Leaves',
    imageUrl: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Vedic pooja altar adorned with fresh marigold garlands and brass kalasam.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-5',
    title: 'Brass Diya Blessing Ceremony',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Aarati Rites',
    theme: 'Lit Oil Lamps & Family Smiles',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Traditional Aarati ceremony illuminating smiling family members.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-6',
    title: 'Half-Saree / Dhoti Milestone',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Youth Milestone',
    theme: 'Festive Silk Attire & Stage Backdrops',
    imageUrl: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Traditional half-saree ceremony portrait honoring cultural heritage.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-7',
    title: 'Gruhapravesam Housewarming',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Home Blessing',
    theme: 'Milk Boiling & Kolam Rites',
    imageUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Auspicious housewarming milk-boiling ceremony surrounded by loved ones.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-8',
    title: 'Cradle Naming Whispers',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Infant Naming',
    theme: 'Decorated Wooden Cradle & Silk Swaddle',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Emotional moment of mother whispering name into infant’s ear during cradle ceremony.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-9',
    title: 'Grandparents Blessing Gathering',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Generational Rites',
    theme: 'Akshat Rice Blessings & Elder Smiles',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Elders showering sacred rice blessings on young family members.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-event-10',
    title: 'Cultural Feast & Celebrations',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    ageGroup: 'Event Banquet',
    theme: 'Banana Leaf Feast & Traditional Music',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Joyful banquet hall celebrations featuring traditional cuisine and music.',
    featured: false,
    assetSource: 'external_illustrative'
  },

  // =========================================================================
  // 7. FINE ART MATERNITY (10 DISTINCT PROFESSIONAL IMAGES)
  // =========================================================================
  {
    id: 'port-mat-1',
    title: 'Ethereal Maternity Flow',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '31 Weeks Pregnant',
    theme: 'Silk Chiffon & Subtle Contours',
    imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Fine art studio maternity celebrating maternal poise.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-2',
    title: 'Golden Sunset Maternal Glow',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '29 Weeks Pregnant',
    theme: 'Outdoor Nature Backdrop',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Warm outdoor maternity session celebrating new beginnings.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-3',
    title: 'Studio Silhouette Sculpting',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '30 Weeks Pregnant',
    theme: 'Dark Canvas Backdrop & Key Rim Light',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Artistic monochrome studio lighting sculpting the maternal bump silhouette.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-4',
    title: 'Couture Chiffon Gown Session',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '32 Weeks Pregnant',
    theme: 'Emerald Silk Gown & Wind Train',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Glamorous maternity portrait in flowing emerald designer gown with studio wind effect.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-5',
    title: 'Expectant Couple Tender Touch',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '28 Weeks Pregnant',
    theme: 'Intimate Partner Pose & Soft Focus',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Emotional couple portrait capturing partner’s hands placed lovingly on bump.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-6',
    title: 'Mother & Bump Backlight',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '33 Weeks Pregnant',
    theme: 'Window Softbox Lighting & Linen Drapes',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Gentle backlit portrait highlighting natural maternal serenity.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-7',
    title: 'Outdoor Meadow Maternity',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '29 Weeks Pregnant',
    theme: 'Wildflower Field & Sunset Light',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Sun-dappled outdoor maternity photoshoot among golden wildflowers.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-8',
    title: 'Minimalist Monochrome Maternity',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '31 Weeks Pregnant',
    theme: 'Black & White Studio Canvas',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Timeless black-and-white portrait focusing purely on maternal grace.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-9',
    title: 'Partner Hand-on-Bump Portrait',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '30 Weeks Pregnant',
    theme: 'Warm Neutral Tones & Couple Posing',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Joyful moment of parents-to-be sharing a laugh during studio session.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-mat-10',
    title: 'Sibling Anticipation Pose',
    category: 'maternity',
    categoryLabel: 'Maternity',
    ageGroup: '32 Weeks Pregnant',
    theme: 'Big Sister Kisses Bump',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Tender family moment with elder child interacting with mother’s bump.',
    featured: true,
    assetSource: 'external_illustrative'
  },

  // =========================================================================
  // 8. STUDIO & FAMILY PORTRAITS (10 DISTINCT PROFESSIONAL IMAGES)
  // =========================================================================
  {
    id: 'port-port-1',
    title: 'Generations Family Heirloom',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Family Portrait',
    theme: 'Studio Canvas & Group Posing',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Multi-generational family portrait crafted for living room display.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-2',
    title: 'Childhood Expression & Wonder',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: '3 Years Old',
    theme: 'Clean Studio Lighting',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Candid childhood portrait capturing expressive eyes and innocent smile.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-3',
    title: 'Traditional Family Canvas Portrait',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Generational Group',
    theme: 'Warm Ochre Canvas & Silk Attire',
    imageUrl: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Formal family studio group portrait formatted for canvas print.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-4',
    title: 'Executive & Creative Headshot',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Individual Profile',
    theme: 'Studio Softbox & Textured Backdrop',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Polished studio headshot for professional directories and business profiles.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-5',
    title: 'Studio Profile Lighting',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Individual Portrait',
    theme: 'Rembrandt Studio Strobes',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Artistic male studio portrait featuring classic Rembrandt lighting setup.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-6',
    title: 'Professional Doctor & Executive Profile',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Corporate Profile',
    theme: 'Neutral Grey Backdrop',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Confident studio portrait for medical professionals, executives, and artists.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-7',
    title: 'Fine Art Individual Portrait',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Solo Portrait',
    theme: 'Moody Dramatic Studio Canvas',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Fine art portraiture capturing subtle emotion and detailed skin tone grading.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-8',
    title: 'Generational Grandparents & Grandchildren',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Family Legacy',
    theme: 'Vintage Armchair & Warm Smiles',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Heartwarming generational session with grandparents holding young infants.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-9',
    title: 'Outdoor Family Meadow Portrait',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Family Outdoor',
    theme: 'Sunset Golden Hour & Natural Lawn',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Relaxed outdoor family portrait capturing genuine giggles and hugs.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-port-10',
    title: 'Studio Passport & Visa Biometric',
    category: 'portraits',
    categoryLabel: 'Portraits',
    ageGroup: 'Lab Services',
    theme: 'Compliant White Background',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Biometric compliant instant passport and visa photos for all international specifications.',
    featured: false,
    assetSource: 'external_illustrative'
  },

  // =========================================================================
  // 9. ALBUMS, FRAMES & PRINTS (10 DISTINCT PROFESSIONAL IMAGES)
  // =========================================================================
  {
    id: 'port-prod-1',
    title: 'Heirloom Albums & Custom Framing',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Studio Products',
    theme: 'Handmade Silk Albums & Wooden Frames',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Premium photographic prints and archival silk albums.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-2',
    title: 'Handcrafted Italian Leather Photobook',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Luxury Albums',
    theme: 'Flush-Mount Layflat Pages',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Custom embossed leatherette album with non-tear archival thick layflat pages.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-3',
    title: 'Natural Teakwood Gallery Wall Frame',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Wall Frames',
    theme: 'Archival Matte Glass & Solid Wood',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Handcrafted solid teakwood wall frame with non-reflective UV protective glass.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-4',
    title: 'Floating High-Gloss Acrylic Photo Block',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Desk Keepsakes',
    theme: 'Optical Grade Acrylic Block',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Vivid 20mm frameless acrylic block with 3D depth for table mantels.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-5',
    title: 'Archival Canvas Texture Print',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Canvas Wall Art',
    theme: 'Cotton Canvas & Wooden Stretcher',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Fine art textured cotton canvas stretched over pine timber frames.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-6',
    title: 'Vintage Photo Restoration & Lamination',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Lab Services',
    theme: 'Digital Scratch Removal & Thermal Seal',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Master digital restoration of damaged vintage family portraits with thermal lamination.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-7',
    title: 'Luxury Silk Velvet Album Presentation Box',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Album Box',
    theme: 'Custom Engraved Wooden Box with Silk Lining',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Bespoke silk presentation case protecting your wedding or milestone album.',
    featured: true,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-8',
    title: 'Desk-Top Teakwood Mini Frames',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Table Prints',
    theme: '6x8 Inches Tabletop Frames',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '3:4',
    description: 'Elegant set of mini wooden tabletop frames perfect for office desks and bedside tables.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-9',
    title: 'High-Definition Lab Lamination Press',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Lab Finishing',
    theme: 'Thermal Matte & Sparkle Lamination',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4:3',
    description: 'Waterproof thermal lamination preserving family photo prints against humidity.',
    featured: false,
    assetSource: 'external_illustrative'
  },
  {
    id: 'port-prod-10',
    title: 'Generational Photo Wall Layout',
    category: 'photo-products',
    categoryLabel: 'Photo Products',
    ageGroup: 'Home Wall Art',
    theme: 'Multi-Frame Living Room Display',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16:9',
    description: 'Customized layout design service for living room gallery walls featuring 6 to 12 frames.',
    featured: true,
    assetSource: 'external_illustrative'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  // 1. Wedding Photography
  {
    id: 'svc-wedding',
    slug: 'wedding-photography',
    title: 'Wedding Photography & Films',
    category: 'wedding',
    shortDescription: 'Complete traditional coverage, candid moments, cinematic films, and luxury photo albums.',
    fullDescription: 'From sacred Muhurtham rituals to joyous reception celebrations, our wedding team captures the beauty, emotion, and grandeur of your wedding. Includes multi-camera coverage, candid portraiture, drone perspectives, and heirloom silk albums.',
    idealAge: 'Bride & Groom',
    duration: 'Full Day / Multi-Day Coverage',
    outfits: 'Bridal & Groom Attires',
    startingPrice: 35000,
    pricingNote: 'Custom quote based on event scale and days.',
    featuredImage: WEDDING_IMAGE,
    galleryImages: [WEDDING_IMAGE, PREWEDDING_IMAGE, CEREMONY_IMAGE],
    features: [
      'Traditional ritual and family stage coverage',
      'Candid emotion and couple portraiture',
      'Cinematic 4K highlight teaser & full film',
      'Handcrafted 40-page luxury silk photobook',
      'High-resolution edited digital gallery on Drive'
    ],
    whatStudioProvides: ['Lead wedding photographers & cinematographers', 'Professional lighting rigs & audio gear', 'Drone aerial coverage where permitted'],
    whatParentsBring: ['Event timeline & family VIP list', 'Coordinating outfits for couple portraits'],
    themes: ['Traditional Heritage Mandap', 'Royal Cinematic', 'Candid Modern Elegance'],
    faqs: [
      { question: 'How far in advance should we book?', answer: 'We recommend booking 2 to 6 months prior to your wedding dates.' },
      { question: 'Do you travel for destination weddings?', answer: 'Yes, our team covers weddings across Telangana, Andhra Pradesh, and other destinations.' }
    ]
  },
  // 2. Pre-Wedding
  {
    id: 'svc-prewedding',
    slug: 'pre-wedding-shoots',
    title: 'Pre-Wedding & Engagement',
    category: 'pre-wedding',
    shortDescription: 'Romantic outdoor photoshoots, engagement moments, and cinematic Save-the-Date reels.',
    fullDescription: 'Celebrate your love story before the wedding rush. Relaxed, scenic outdoor photoshoots with sunset backdrops, heritage architecture, and creative concepts customized to your style.',
    idealAge: 'Couples & Fiances',
    duration: '4 to 6 Hours',
    outfits: '2 to 3 Outfit Changes',
    startingPrice: 18000,
    pricingNote: 'Location permits if applicable charged at actuals.',
    featuredImage: PREWEDDING_IMAGE,
    galleryImages: [PREWEDDING_IMAGE, WEDDING_IMAGE],
    features: [
      'Scenic outdoor location scouting',
      'Romantic couple posing direction',
      'Cinematic Save-the-Date video teaser',
      '25 Master-retouched high-res portraits',
      'Complimentary 16x24 framed welcome photo'
    ],
    whatStudioProvides: ['Location posing guidance & moodboard', 'Portable studio flash lighting & reflector kit', 'Aerial drone coverage where allowed'],
    whatParentsBring: ['2 to 3 complementary outfit sets', 'Personal props & sentimental accessories'],
    themes: ['Heritage Palace Courtyard', 'Golden Sunset Lake / Meadow', 'Modern Urban Minimalist'],
    faqs: [
      { question: 'Do you help with location selection?', answer: 'Yes! We suggest curated scenic spots, resorts, and heritage sites suited to your theme.' }
    ]
  },
  // 3. Events & Traditional Ceremonies
  {
    id: 'svc-events',
    slug: 'traditional-ceremonies',
    title: 'Events & Traditional Ceremonies',
    category: 'events',
    shortDescription: 'Namakaranam, Cradle Ceremonies, 1st Birthday parties, Annaprasana, and cultural family functions.',
    fullDescription: 'Comprehensive event coverage for your family’s most auspicious ceremonies. We document ritual details, elder blessings, joyful gatherings, and candid family smiles without intruding on the sanctity of the occasion.',
    idealAge: 'All Ages / Families',
    duration: '3 to 5 Hours',
    outfits: 'Traditional Festive Attire',
    startingPrice: 12000,
    pricingNote: 'Indicative half-day rate.',
    featuredImage: CEREMONY_IMAGE,
    galleryImages: [CEREMONY_IMAGE, TODDLER_IMAGE, MOTHER_BABY_IMAGE],
    features: [
      'Namakaranam (Naming Ceremony) & Cradle Ceremony',
      'Annaprasana (First Rice Feeding Ceremony)',
      '1st Birthday Grand Parties & Half-Saree Functions',
      'Family group portraits and candids',
      'Edited high-res image archive + photobook'
    ],
    whatStudioProvides: ['Dedicated event photography crew', 'Event lighting kit for halls and homes', 'High-res digital download gallery'],
    whatParentsBring: ['Ceremony schedule & priest coordination details', 'Special heirloom cradle or traditional items'],
    themes: ['Traditional Temple & Floral Decor', 'Auspicious Brass & Marigold', 'Contemporary Party Style'],
    faqs: [
      { question: 'Can you cover ceremonies at home?', answer: 'Yes! We provide on-location photography at homes, banquets, temples, and function halls.' }
    ]
  },
  // 4. Baby & Child Photography
  {
    id: 'svc-baby',
    slug: 'baby-child-photography',
    title: 'Baby & Child Photography',
    category: 'baby',
    shortDescription: 'Milestone portraiture for sitters, toddlers, and children celebrating their unique personalities.',
    fullDescription: 'Capturing the curious eyes, playful smiles, and tiny achievements of your growing child. From 6-month sitter sessions to active toddler years and childhood milestones, we create artistic portraits in a kid-friendly studio setting.',
    idealAge: '6 Months to 10 Years',
    duration: '1 to 2 Hours',
    outfits: '2 to 3 Outfits',
    startingPrice: 7999,
    pricingNote: 'Includes sibling poses.',
    featuredImage: SITTER_IMAGE,
    galleryImages: [SITTER_IMAGE, TODDLER_IMAGE, MOTHER_BABY_IMAGE],
    features: [
      'Themed backdrops and age-appropriate props',
      'Playful session with candid interactions',
      'Parent and child connection portraits',
      '15 Master-retouched high-res images',
      'Online proofing gallery for selection'
    ],
    whatStudioProvides: ['Child-sized furniture and toy props', 'Variety of creative backdrops', 'Patient, child-friendly photographer'],
    whatParentsBring: ['Child’s favorite outfits', 'Comfort toys or snacks', 'Enthusiasm for play'],
    themes: ['Boho Rattan Sitter', 'Classic Studio Canvas', 'Whimsical Garden Play'],
    faqs: [
      { question: 'What if my child is shy or uncooperative?', answer: 'Our photographers are experienced with children. We keep sessions unhurried and playful to let their natural personality shine through.' }
    ]
  },
  // 5. Newborn Photography
  {
    id: 'svc-newborn',
    slug: 'newborn-photography',
    title: 'Newborn Photography',
    category: 'newborn',
    shortDescription: 'Delicate, baby-safe artistic portraits of your infant in their first few weeks of life.',
    fullDescription: 'Capturing the fleeting purity of your newborn in a warm, sanitized, and safe studio environment. We specialize in sleepy swaddles, artistic props like the crescent moon, and tender family bonds.',
    idealAge: '5 to 21 Days',
    duration: '3 to 4 Hours (Infant-led)',
    outfits: 'Unlimited Swaddles & Bonnets',
    startingPrice: 12999,
    pricingNote: 'Safety first approach.',
    featuredImage: HERO_IMAGE,
    galleryImages: [HERO_IMAGE, NEWBORN_IMAGE],
    features: [
      'Temperature-regulated, UV-sanitized studio',
      'Safety-certified newborn posing techniques',
      'Unhurried feeding and soothing breaks',
      '20 Master-retouched artistic masterworks',
      'Heirloom quality framed wall portrait'
    ],
    whatStudioProvides: ['Premium mohair wraps and handcrafted props', 'Hospital-grade hygiene standards', 'White noise and soothing environment'],
    whatParentsBring: ['Feeding supplies', 'Extra diapers', 'Pacifier (optional)'],
    themes: ['Rustic Moon & Stars', 'Floral Nest', 'Minimalist Neutral Tones'],
    faqs: [
      { question: 'When is the best time for newborn photos?', answer: 'Ideally between 5 and 15 days old when babies are sleepiest and most flexible for curled poses.' }
    ]
  },
  // 6. Maternity Photography
  {
    id: 'svc-maternity',
    slug: 'maternity-photography',
    title: 'Maternity Photography',
    category: 'maternity',
    shortDescription: 'Elegant and sculpted portraits celebrating the divine glow of motherhood.',
    fullDescription: 'Celebrate your journey into motherhood with fine art maternity portraits. We use artistic lighting, designer gowns, and graceful posing to capture your maternal silhouette and the bond with your partner.',
    idealAge: '28 to 34 Weeks',
    duration: '1.5 to 2 Hours',
    outfits: '2 to 3 Designer Gowns',
    startingPrice: 9999,
    pricingNote: 'In-studio or outdoor options.',
    featuredImage: MATERNITY_IMAGE,
    galleryImages: [MATERNITY_IMAGE, MOTHER_BABY_IMAGE],
    features: [
      'Access to premium studio gown wardrobe',
      'Professional posing guidance for all body types',
      'Partner and older sibling inclusion',
      'Artistic silhouette and fine art lighting',
      '15 Master-retouched high-res portraits'
    ],
    whatStudioProvides: ['Couture maternity gowns and fabrics', 'Private changing suite', 'Styling consultation'],
    whatParentsBring: ['Coordinated outfits for partner', 'Neutral seamless undergarments', 'Sentimental items (e.g. ultrasound scan)'],
    themes: ['Ethereal Silhouette', 'Golden Backlit Flow', 'Classic Monochrome'],
    faqs: [
      { question: 'When should I book my maternity shoot?', answer: 'Between 28-32 weeks is ideal as the bump is well-defined but you are still comfortable for posing.' }
    ]
  },
  // 7. Family & Portrait Photography
  {
    id: 'svc-portraits',
    slug: 'family-portrait-photography',
    title: 'Family & Portrait Photography',
    category: 'portraits',
    shortDescription: 'Timeless studio and outdoor portraits for families, couples, and individuals.',
    fullDescription: 'Preserving your family legacy with timeless portraits. Whether it is a multi-generational family gathering, a milestone anniversary, or professional individual headshots, we create images that last for decades.',
    idealAge: 'All Generations',
    duration: '1 to 2 Hours',
    outfits: '1 to 2 Outfits',
    startingPrice: 5999,
    pricingNote: 'Custom quotes for large groups.',
    featuredImage: TODDLER_IMAGE,
    galleryImages: [TODDLER_IMAGE, MOTHER_BABY_IMAGE, PRODUCTS_IMAGE],
    features: [
      'Multi-generational group posing',
      'Natural interactions and classic portraits',
      'Studio lighting or scenic outdoor location',
      'Professional retouching and color grading',
      'Custom wall art and album options'
    ],
    whatStudioProvides: ['Versatile studio backdrops', 'Professional lighting setup', 'Group posing direction'],
    whatParentsBring: ['Coordinated family color palette', 'Smiles and stories'],
    themes: ['Classic Canvas Heritage', 'Modern Minimalist Studio', 'Lifestyle Outdoor'],
    faqs: [
      { question: 'How many people can be in a family shoot?', answer: 'Our studio can comfortably accommodate up to 10-12 family members. For larger groups, we recommend an outdoor session.' }
    ]
  },
  // 8. Photo Printing, Frames & Albums
  {
    id: 'svc-photo-products',
    slug: 'photo-printing-frames-albums',
    title: 'Photo Printing, Frames & Albums',
    category: 'photo-products',
    shortDescription: 'Premium archival printing, handcrafted silk albums, and designer wall frames.',
    fullDescription: 'Transform your digital memories into physical heirlooms. We offer high-definition photo printing, bespoke handcrafted albums in silk and leather, and a curated selection of wooden and acrylic frames.',
    idealAge: 'All Clients',
    duration: 'Custom Delivery in 7-14 Days',
    outfits: 'N/A',
    startingPrice: 1499,
    pricingNote: 'Based on material and size.',
    featuredImage: PRODUCTS_IMAGE,
    galleryImages: [PRODUCTS_IMAGE, WEDDING_IMAGE],
    features: [
      'Archival quality non-fade photo printing',
      'Handcrafted premium silk and leatherette albums',
      'Designer wooden, acrylic, and canvas frames',
      'Professional layout design for photobooks',
      'Old photo restoration and enhancement'
    ],
    whatStudioProvides: ['Samples of papers and album materials', 'Custom design and layout service', 'Safe shipping and delivery'],
    whatParentsBring: ['Your favorite high-resolution images', 'Selection of sizes and styles'],
    themes: ['Luxury Silk Wedding Album', 'Minimalist Wood Frames', 'Modern Acrylic Blocks'],
    faqs: [
      { question: 'Can I print photos not taken by your studio?', answer: 'Yes! We provide premium printing and framing services for all your precious memories, regardless of who clicked them.' }
    ]
  }
];

export const PACKAGES_DATA: PackageItem[] = [
  // Wedding Packages
  {
    id: 'pkg-royal-wedding',
    name: 'Royal Vivaha Wedding Collection',
    category: 'wedding',
    categoryLabel: 'Wedding Photography',
    tagline: 'Complete 2-day wedding & reception coverage with cinematic film and luxury silk photobook.',
    price: 65000,
    priceNote: 'Indicative Base Price',
    duration: '2 Days Full Coverage',
    editedPhotos: 200,
    rawPhotosIncluded: true,
    outfitChanges: 4,
    propsIncluded: true,
    featuredImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Traditional ritual coverage + candid wedding team',
      'Cinematic 4K teaser reel & 25-minute highlight film',
      'Handcrafted 40-page luxury silk photobook',
      'Drone aerial cinematography (where permissible)',
      'Complimentary pre-wedding outdoor couple session',
      'All raw captures + edited high-res files on USB & Drive'
    ],
    isPopular: true
  },
  {
    id: 'pkg-intimate-wedding',
    name: 'Intimate Muhurtham & Reception',
    category: 'wedding',
    categoryLabel: 'Wedding Photography',
    tagline: 'Dedicated single-day coverage for sacred Muhurtham ceremonies and family dinner.',
    price: 35000,
    priceNote: 'Indicative Base Price',
    duration: '1 Full Day',
    editedPhotos: 120,
    rawPhotosIncluded: true,
    outfitChanges: 2,
    propsIncluded: false,
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Traditional + candid dual photographer team',
      'Complete ceremony and stage family portraits',
      '30-page flush-mount customized photobook',
      '1 Framed 16x24 royal couple portrait',
      'Full digital delivery on private cloud gallery'
    ],
    isPopular: false
  },
  // Pre-Wedding Package
  {
    id: 'pkg-prewedding-cinematic',
    name: 'Cinematic Pre-Wedding Shoot',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding',
    tagline: 'Scenic outdoor location shoot, drone perspectives, and Save-the-Date video reel.',
    price: 18000,
    priceNote: 'Indicative Base Price',
    duration: '5 Hours Outdoor',
    editedPhotos: 30,
    rawPhotosIncluded: true,
    outfitChanges: 3,
    propsIncluded: true,
    featuredImage: PREWEDDING_IMAGE,
    features: [
      'Scenic outdoor location photoshoot',
      '30 Magazine-grade retouched portraits',
      '1-Minute 4K Save-the-Date video teaser',
      'Posing direction and concept planning',
      '1 Framed 12x18 welcome photo for wedding reception'
    ],
    isPopular: false
  },
  // Events & Ceremonies Package
  {
    id: 'pkg-ceremony-cradle',
    name: 'Heritage Ceremony Package',
    category: 'events',
    categoryLabel: 'Events & Ceremonies',
    tagline: 'Namakaranam, Cradle Ceremony, Annaprasana or 1st Birthday family celebrations.',
    price: 15000,
    priceNote: 'Indicative Base Price',
    duration: '4 Hours Event Coverage',
    editedPhotos: 60,
    rawPhotosIncluded: true,
    outfitChanges: 2,
    propsIncluded: false,
    featuredImage: CEREMONY_IMAGE,
    features: [
      'Full coverage of sacred rituals, cradle & family blessings',
      'Candid moments of guests, parents & grandparents',
      '60 Master-retouched high-res digital photographs',
      '20-page hardcover customized event photobook',
      'Rapid preview delivery within 48 hours for sharing'
    ],
    isPopular: true
  },
  // Baby & Newborn Packages
  {
    id: 'pkg-little-blossom',
    name: 'Little Blossom Newborn Session',
    category: 'baby',
    categoryLabel: 'Baby & Newborn',
    tagline: 'Focused collection of signature retouched baby portraits in sanitized studio.',
    price: 8999,
    priceNote: 'Indicative Base Price',
    duration: '90 Minutes',
    editedPhotos: 15,
    rawPhotosIncluded: true,
    outfitChanges: 2,
    propsIncluded: true,
    featuredImage: NEWBORN_IMAGE,
    features: [
      '2 Custom styled setups, wooden moon & baskets',
      '15 Signature retouched digital portraits',
      'Baby solo setups with sanitized wraps & props',
      'Temperature-regulated, soothing studio environment'
    ],
    isPopular: false
  },
  {
    id: 'pkg-cake-smash-bash',
    name: 'Smash & Splash 1st Birthday Jubilee',
    category: 'baby',
    categoryLabel: 'Baby & Newborn',
    tagline: 'Milestone portraiture, themed balloon cake smash, and warm bubble bath tub splash.',
    price: 12999,
    priceNote: 'Indicative Base Price',
    duration: '2 Hours',
    editedPhotos: 25,
    rawPhotosIncluded: true,
    outfitChanges: 3,
    propsIncluded: true,
    featuredImage: CAKE_SMASH_IMAGE,
    features: [
      'Pre-smash formal family portraits',
      'Themed balloon garland backdrop & smash cake setup',
      'Warm bubble bath splash cleanup session',
      '25 Retouched digital photos + 1 framed 12x18 wall portrait'
    ],
    isPopular: false
  },
  // Maternity Package
  {
    id: 'pkg-maternity-glow',
    name: 'Radiant Maternity Glow',
    category: 'maternity',
    categoryLabel: 'Maternity',
    tagline: 'Fine art maternity portraiture with designer gowns, sculpted lighting, and partner poses.',
    price: 9999,
    priceNote: 'Indicative Base Price',
    duration: '2 Hours',
    editedPhotos: 20,
    rawPhotosIncluded: true,
    outfitChanges: 2,
    propsIncluded: true,
    featuredImage: MATERNITY_IMAGE,
    features: [
      'Access to studio designer maternity gown wardrobe',
      'Artistic silhouette and golden backlight setups',
      'Partner and sibling poses warmly included',
      '20 Master-retouched high-res portraits',
      '15% Privilege coupon on future newborn session'
    ],
    isPopular: false
  },
  // Family Portrait Package
  {
    id: 'pkg-generations-portrait',
    name: 'Generations Family Heirloom',
    category: 'portraits',
    categoryLabel: 'Portraits & Studio',
    tagline: 'Multi-generational family groupings and individual portraits on fine art canvas.',
    price: 7999,
    priceNote: 'Indicative Base Price',
    duration: '90 Minutes',
    editedPhotos: 15,
    rawPhotosIncluded: true,
    outfitChanges: 2,
    propsIncluded: true,
    featuredImage: TODDLER_IMAGE,
    features: [
      'Large family group portraits (parents, grandparents & children)',
      'Sub-grouping combinations (couples, siblings, grandparents)',
      '15 Master-retouched digital portraits',
      '1 Archival 12x18 canvas framed portrait included'
    ],
    isPopular: false
  }
];

export const OFFERS_DATA: OfferItem[] = [
  {
    id: 'off-wedding-combo',
    title: 'Wedding + Pre-Wedding Privilege Bundle',
    tagline: 'Book your wedding and pre-wedding shoot together for complimentary drone and album upgrade.',
    discountBadge: 'Complimentary Pre-Wedding Perks',
    validityNote: 'Ongoing Studio Privilege',
    description: 'Ensure seamless visual storytelling from your engagement to wedding day with the same dedicated photography team.',
    inclusions: [
      'Full Wedding & Reception 2-day coverage',
      'Complimentary outdoor pre-wedding couple shoot',
      'Upgrade to luxury Italian silk photobook',
      '16x24 Framed welcome portrait for reception entrance'
    ],
    terms: ['Advance booking deposit reserves event dates', 'Subject to date availability'],
    targetCategory: 'wedding',
    whatsappMessage: 'Hello New Sri Laxmi Studio! I would like to enquire about the Wedding + Pre-Wedding Privilege Bundle.',
    isActive: true,
    isPlaceholder: true,
    featuredImage: WEDDING_IMAGE
  },
  {
    id: 'off-bump-baby',
    title: 'Bump-to-Baby Combo Privilege',
    tagline: 'Book Maternity and Newborn together for bundled savings and framed canvas.',
    discountBadge: 'Indicative 15% Combo Savings',
    validityNote: 'Ongoing Studio Special',
    description: 'Document your full journey from expectant maternal glow to your baby’s delicate swaddles.',
    inclusions: [
      'Full Maternity session (2 gowns)',
      'Full Newborn session (3 wraps & themes)',
      'Complimentary 12x18 framed canvas portrait'
    ],
    terms: ['Advance deposit reserves dates', 'Newborn date remains flexible to birth date'],
    targetCategory: 'maternity',
    whatsappMessage: 'Hello New Sri Laxmi Studio! I am interested in the Bump-to-Baby Combo privilege.',
    isActive: true,
    isPlaceholder: true,
    featuredImage: MATERNITY_IMAGE
  },
  {
    id: 'off-cradle-birthday',
    title: 'Ceremony & 1st Birthday Milestone Pass',
    tagline: 'Book Namakaranam/Cradle and 1st Birthday together for a complimentary heirloom album.',
    discountBadge: 'Milestone Pass Privilege',
    validityNote: 'Valid across your baby’s first year',
    description: 'Capture both monumental baby milestones with a consistent creative style and unified family album.',
    inclusions: [
      'Traditional Cradle/Namakaranam Ceremony coverage',
      '1st Birthday Cake Smash & family portraits',
      'Combined 24-page archival family photobook'
    ],
    terms: ['Advance booking required', 'Valid within 12 months of first shoot'],
    targetCategory: 'events',
    whatsappMessage: 'Hello New Sri Laxmi Studio! I am interested in the Ceremony & 1st Birthday Milestone Pass.',
    isActive: true,
    isPlaceholder: true,
    featuredImage: CEREMONY_IMAGE
  }
];

export const BEFORE_AFTER_DATA: BeforeAfterItem[] = [
  {
    id: 'ba-wedding',
    title: 'Wedding Fine Art Color Grading',
    description: 'Balancing ambient temple golden light, rich gold jewelry textures, and natural skin tones.',
    beforeImage: CEREMONY_IMAGE,
    afterImage: WEDDING_IMAGE,
    retouchHighlights: [
      'Balanced warm highlights on silk zari',
      'Enhanced depth and cinematic contrast',
      'Gentle skin texture enhancement'
    ]
  },
  {
    id: 'ba-newborn',
    title: 'Newborn Flaking & Skin Soothing',
    description: 'Gentle, natural removal of peeling skin and redness while preserving original infant skin texture.',
    beforeImage: NEWBORN_IMAGE,
    afterImage: HERO_IMAGE,
    retouchHighlights: [
      'Softened infant acne & temporary red spots',
      'Harmonized natural baby skin tones',
      'Cleaned background folds without artificial blurring'
    ]
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    parentName: 'Sneha & Rajesh Reddy',
    babyName: 'Aarav Reddy',
    babyAgeAtShoot: 'Wedding & Naming Ceremony',
    shootType: 'Wedding & Namakaranam Coverage',
    rating: 5,
    comment: 'New Sri Laxmi Studio covered our wedding two years ago and now our baby boy’s Namakaranam ceremony. The team is patient, punctual, and captured our elders’ blessings so emotionally. Truly our lifetime family photographer!',
    date: 'February 2026',
    city: 'Wanaparthy',
    isDemoPlaceholder: false
  },
  {
    id: 'rev-2',
    parentName: 'Divya & Karthik Varma',
    babyName: 'Ananya',
    babyAgeAtShoot: 'Pre-Wedding & Wedding',
    shootType: 'Pre-Wedding & Wedding Package',
    rating: 5,
    comment: 'The pre-wedding shoot was so relaxed and cinematic! On our wedding day, they captured every single traditional Telugu ritual without disrupting the priest. The album quality is top notch!',
    date: 'January 2026',
    city: 'Wanaparthy',
    isDemoPlaceholder: false
  },
  {
    id: 'rev-3',
    parentName: 'Pooja & Vikram Sharma',
    babyName: 'Reyansh',
    babyAgeAtShoot: '14 Days Old',
    shootType: 'Newborn Swaddle Session',
    rating: 5,
    comment: 'We were nervous about bringing a 2-week-old baby, but the studio was so warm and spotlessly clean. The photographer handled our son with absolute gentleness. The wooden moon picture is now framed in our living room!',
    date: 'December 2025',
    city: 'Secunderabad',
    isDemoPlaceholder: false
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of photography does New Sri Laxmi Studio offer?',
    answer: 'We are a full-service photography studio. We specialize in Weddings, Pre-Wedding shoots, Traditional Ceremonies (Namakaranam, Cradle, Annaprasana, Half-Saree), Baby & Newborn milestone sessions, Fine Art Maternity, Studio Family Portraits, and custom Photo Products (Frames, Albums, Lamination).',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'How do we book a shoot and what is the advance required?',
    answer: 'Booking is easily initiated through WhatsApp or our contact page. We confirm dates with a small booking deposit. For weddings and events, we recommend booking 2 to 6 months in advance; for baby and maternity shoots, 2 to 4 weeks in advance.',
    category: 'pricing'
  },
  {
    id: 'faq-3',
    question: 'Do you cover events outside Wanaparthy?',
    answer: 'Yes! Our wedding and event team travels across Telangana, Andhra Pradesh, and other states for destination weddings and traditional celebrations.',
    category: 'general'
  },
  {
    id: 'faq-4',
    question: 'How are babies handled during newborn and milestone sessions?',
    answer: 'Infant safety is our highest studio priority. Our studio is temperature-regulated (26–28°C), all wraps and props are UV-sanitized before each session, and we never force any unnatural poses. Spotters are present throughout, with unlimited breaks for feeding.',
    category: 'safety'
  },
  {
    id: 'faq-5',
    question: 'When will we receive our photos and album?',
    answer: 'Digital previews are shared within 3 to 5 days. Master-retouched digital galleries are ready within 10 to 14 days. Handcrafted photo albums and framed prints are delivered within 2 to 3 weeks following your photo selection approval.',
    category: 'preparation'
  }
];

export const FAQ_DATA = FAQS_DATA;

export const BOOKINGS_SEED_DATA = [
  {
    id: 'lead-1',
    parentName: 'Sneha & Rajesh Reddy',
    phone: '+91 98480 12345',
    shootType: 'Wedding & Reception Coverage',
    babyAgeOrDueDate: '2-Day Wedding',
    preferredDate: '2026-11-20',
    status: 'Slot Reserved' as const,
    receivedDate: '2026-11-01',
    source: 'WhatsApp Link' as const,
    notes: 'Interested in Royal Vivaha Collection with drone coverage.'
  },
  {
    id: 'lead-2',
    parentName: 'Divya Varma',
    phone: '+91 98480 67890',
    shootType: 'Namakaranam & Cradle Ceremony',
    babyAgeOrDueDate: '21 Days Old',
    preferredDate: '2026-11-28',
    status: 'New' as const,
    receivedDate: '2026-11-04',
    source: 'Web Contact Form' as const,
    notes: 'Ceremony at home temple in Jubilee Hills.'
  },
  {
    id: 'lead-3',
    parentName: 'Pooja Sharma',
    phone: '+91 98480 34567',
    shootType: 'Newborn Session (5-21 Days)',
    babyAgeOrDueDate: 'Due Dec 05',
    preferredDate: '2026-12-15',
    status: 'Contacted' as const,
    receivedDate: '2026-11-03',
    source: 'WhatsApp Link' as const,
    notes: 'Requested rustic crescent moon and dusty rose wraps.'
  }
];

export const SAFETY_PROTOCOLS: SafetyProtocol[] = [
  {
    id: 'sp-1',
    title: 'Certified Baby-Safe Handling',
    description: 'Trained in infant anatomy, natural swaddling, and spotter techniques. No forceful posing.',
    iconName: 'ShieldCheck',
    isStandardGuideline: true
  },
  {
    id: 'sp-2',
    title: 'UV-C Sanitized Props & Studio',
    description: 'Every wooden moon, wrap, and bonnet undergoes medical-grade UV-C and hypoallergenic washing.',
    iconName: 'Sparkles',
    isStandardGuideline: true
  },
  {
    id: 'sp-3',
    title: 'Warm Temperature Control (26–28°C)',
    description: 'Maintains optimal infant thermal comfort so babies remain peacefully asleep during poses.',
    iconName: 'ThermometerSun',
    isStandardGuideline: true
  },
  {
    id: 'sp-4',
    title: 'Unhurried Feeding & Soothing Pace',
    description: 'No strict timers. Sessions pause whenever baby or parents require feeding, burping, or cuddling.',
    iconName: 'Clock',
    isStandardGuideline: true
  }
];
