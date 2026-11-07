export interface StudioConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
  };
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  googleMapsUrl: string;
  googleMapsEmbed: string;
  instagramHandle?: string;
}

export type ShootCategory =
  | 'all'
  | 'wedding'
  | 'pre-wedding'
  | 'events'
  | 'baby'
  | 'newborn'
  | 'maternity'
  | 'birthday'
  | 'portraits'
  | 'photo-products';

export interface CategoryMeta {
  id: ShootCategory;
  label: string;
  shortTitle: string;
  heroImage: string;
  tagline: string;
  aspectRatio: string;
  routePath?: string;
  subCategories?: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: ShootCategory;
  shortDescription: string;
  fullDescription: string;
  idealAge: string;
  duration: string;
  outfits: string;
  startingPrice: number;
  pricingNote?: string;
  featuredImage: string;
  galleryImages: string[];
  features: string[];
  whatStudioProvides: string[];
  whatParentsBring: string[];
  themes: string[];
  faqs: { question: string; answer: string }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ShootCategory;
  categoryLabel: string;
  ageGroup: string;
  theme: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  assetSource?: 'studio' | 'external_illustrative';
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1';
  description?: string;
  featured?: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  category: ShootCategory | string;
  categoryLabel?: string;
  tagline: string;
  price: number;
  priceNote?: string;
  duration: string;
  editedPhotos: number;
  rawPhotosIncluded: boolean;
  outfitChanges: number;
  propsIncluded: boolean;
  features: string[];
  isPopular?: boolean;
  isCustomQuote?: boolean;
  featuredImage?: string;
}

export interface ServiceCarouselSlide {
  id: string;
  title: string;
  category: ShootCategory | string;
  headline?: string;
  tagline: string;
  ctaText?: string;
  imageUrl: string;
  routePath: string;
  displayOrder: number;
  isPublished: boolean;
  isIllustrativePlaceholder?: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  tagline: string;
  discountBadge: string;
  validityNote: string;
  description: string;
  inclusions: string[];
  terms: string[];
  targetCategory: string;
  whatsappMessage: string;
  isActive: boolean;
  isPlaceholder?: boolean;
  featuredImage?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  retouchHighlights: string[];
  isPublished?: boolean;
}

export interface ReviewItem {
  id: string;
  parentName: string;
  babyName: string;
  babyAgeAtShoot: string;
  shootType: string;
  rating: number;
  comment: string;
  date: string;
  city: string;
  isDemoPlaceholder?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'safety' | 'pricing' | 'preparation';
}

export interface SafetyProtocol {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isStandardGuideline?: boolean;
  isPublished?: boolean;
}

export interface EnquiryFormState {
  parentName: string;
  phone: string;
  shootType: string;
  babyAgeOrDueDate: string;
  preferredDate: string;
  notes: string;
}

export interface BookingLeadRecord {
  id: string;
  parentName: string;
  phone: string;
  shootType: string;
  shootCategory?: string;
  babyAgeOrDueDate: string;
  preferredDate: string;
  status: 'New' | 'Contacted' | 'Slot Reserved' | 'Shoot Completed' | 'Archived';
  receivedDate: string;
  source: 'WhatsApp Link' | 'Web Contact Form';
  notes: string;
  packageInterested?: string;
}
