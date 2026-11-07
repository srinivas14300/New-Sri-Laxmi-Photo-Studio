import {
  PortfolioItem,
  ServiceItem,
  PackageItem,
  FaqItem,
  StudioConfig,
  BookingLeadRecord,
  ShootCategory,
  ServiceCarouselSlide,
  ReviewItem,
  OfferItem,
  SafetyProtocol,
  BeforeAfterItem
} from '@/types';
import {
  PORTFOLIO_DATA as INITIAL_PORTFOLIO,
  SERVICES_DATA as INITIAL_SERVICES,
  PACKAGES_DATA as INITIAL_PACKAGES,
  FAQS_DATA as INITIAL_FAQS,
  BOOKINGS_SEED_DATA as INITIAL_BOOKINGS,
  REVIEWS_DATA as INITIAL_REVIEWS,
  OFFERS_DATA as INITIAL_OFFERS,
  SAFETY_PROTOCOLS as INITIAL_SAFETY,
  BEFORE_AFTER_DATA as INITIAL_BEFORE_AFTER,
  INITIAL_CAROUSEL,
  WEDDING_IMAGE,
  HERO_IMAGE,
  CEREMONY_IMAGE,
  PREWEDDING_IMAGE,
  MATERNITY_IMAGE,
  TODDLER_IMAGE
} from '@/data/mockData';
import { STUDIO_CONFIG as INITIAL_CONFIG } from '@/config/studioConfig';
import { supabase, isSupabaseConfigured, DB_TABLES } from './supabaseClient';

// ==========================================
// HELPERS
// ==========================================
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored) as T;
  } catch (e) {
    console.error(`Error parsing storage key ${key}:`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
  // Notify other components of the change
  window.dispatchEvent(new Event('studio_storage_update'));
}

function isUuid(id: string): boolean {
  if (!id) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export interface ExtendedPortfolioItem extends PortfolioItem {
  isPublished?: boolean;
  displayOrder?: number;
  isIllustrativePlaceholder?: boolean;
  createdAt?: string;
}

export interface ExtendedStudioConfig extends StudioConfig {
  seoTitle?: string;
  seoDescription?: string;
  carouselAutoSlide?: boolean;
  carouselIntervalSeconds?: number;
  enquiryHeadline?: string;
  enquirySubtitle?: string;
  footerDescription?: string;
}

const initialSettings: ExtendedStudioConfig = {
  ...INITIAL_CONFIG,
  seoTitle: 'New Sri Laxmi Photo Studio | Weddings, Events & Baby Photography in Wanaparthy',
  seoDescription: 'Full-service professional photography studio in Wanaparthy. Traditional Telugu weddings, auspicious cradle ceremonies, baby milestones, and archival heirloom albums.',
  carouselAutoSlide: true,
  carouselIntervalSeconds: 5,
  enquiryHeadline: 'Have a moment worth remembering?',
  enquirySubtitle: 'Whether you are planning a sacred wedding ceremony, a joyful baby milestone, or an intimate family portrait, we are here to preserve your story.',
  footerDescription: 'Dedicated full-service photography studio in Wanaparthy, Telangana. Preserving weddings, traditional ceremonies, and timeless family milestones with authentic artistry.'
};

const STORAGE_KEYS = {
  PORTFOLIO: 'sn_studio_portfolio_v3',
  SERVICES: 'sn_studio_services_v3',
  CAROUSEL: 'sn_studio_carousel_v3',
  PACKAGES: 'sn_studio_packages_v3',
  FAQS: 'sn_studio_faqs_v3',
  BOOKINGS: 'sn_studio_bookings_v3',
  SETTINGS: 'sn_studio_settings_v3',
  REVIEWS: 'sn_studio_reviews_v3',
  OFFERS: 'sn_studio_offers_v3',
  SAFETY: 'sn_studio_safety_v3',
  BEFORE_AFTER: 'sn_studio_before_after_v3'
};

export const studioStore = {
  // ==========================================
  // SYNC LOGIC
  // ==========================================
  async syncAll(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    await Promise.allSettled([
      this.fetchPortfolio(),
      this.fetchServices(),
      this.fetchPackages(),
      this.fetchEnquiries(),
      this.fetchFaqs(),
      this.fetchCarousel(),
      this.fetchSettings(),
      this.fetchReviews(),
      this.fetchOffers(),
      this.fetchSafetyProtocols(),
      this.fetchBeforeAfter()
    ]);
  },

  // ==========================================
  // PORTFOLIO CRUD
  // ==========================================
  getPortfolio(): ExtendedPortfolioItem[] {
    const items = getFromStorage<ExtendedPortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
    return items.sort((a, b) => {
      // Prioritize studio work over external illustrative
      if (a.assetSource === 'studio' && b.assetSource !== 'studio') return -1;
      if (a.assetSource !== 'studio' && b.assetSource === 'studio') return 1;
      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });
  },

  async fetchPortfolio(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase
        .from(DB_TABLES.PORTFOLIO)
        .select('*')
        .order('display_order', { ascending: true });
      if (error) {
        console.warn('Portfolio query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: ExtendedPortfolioItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          categoryLabel: item.category_label,
          ageGroup: item.age_group,
          theme: item.theme,
          imageUrl: item.image_url,
          aspectRatio: item.aspect_ratio,
          description: item.description,
          featured: item.featured,
          isPublished: item.is_published,
          displayOrder: item.display_order,
          isIllustrativePlaceholder: item.is_illustrative_placeholder,
          cloudinaryPublicId: item.cloudinary_public_id,
          assetSource: item.asset_source,
          createdAt: item.created_at
        }));
        saveToStorage(STORAGE_KEYS.PORTFOLIO, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching portfolio, using local fallback:', err?.message || err);
    }
  },

  getPublishedPortfolio(category?: ShootCategory | 'all'): ExtendedPortfolioItem[] {
    const dbItems = getFromStorage<ExtendedPortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
    
    const itemsMap = new Map<string, ExtendedPortfolioItem>();
    
    // First populate dbItems from storage
    if (dbItems && dbItems.length > 0) {
      dbItems.forEach(item => {
        if (item.id) {
          itemsMap.set(item.id, item);
        }
      });
    }

    // Always ensure INITIAL_PORTFOLIO supplies fresh valid photography URLs and missing items
    INITIAL_PORTFOLIO.forEach(item => {
      const existing = itemsMap.get(item.id);
      if (!existing || existing.assetSource === 'external_illustrative') {
        itemsMap.set(item.id, {
          ...existing,
          ...item,
          imageUrl: item.imageUrl // Prioritize verified photography URLs
        });
      }
    });

    const all = Array.from(itemsMap.values()).filter(p => p.isPublished !== false);
    let filtered = all;
    if (category && category !== 'all') {
      if (category === 'baby') {
        filtered = all.filter(p => p.category === 'baby' || p.category === 'birthday');
      } else {
        filtered = all.filter(p => p.category === category);
      }
    }

    const seenUrls = new Set<string>();
    const result = filtered.filter(item => {
      const url = (item.imageUrl || '').trim();
      if (!url || seenUrls.has(url)) return false;
      seenUrls.add(url);
      return true;
    });

    return result.sort((a, b) => {
      if (a.assetSource === 'studio' && b.assetSource !== 'studio') return -1;
      if (a.assetSource !== 'studio' && b.assetSource === 'studio') return 1;
      return (a.displayOrder || 0) - (b.displayOrder || 0);
    });
  },

  async addPortfolioItem(item: Omit<ExtendedPortfolioItem, 'id'>): Promise<ExtendedPortfolioItem> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured. Cannot perform production operations.');
    }

    const { data, error } = await supabase
      .from(DB_TABLES.PORTFOLIO)
      .insert({
        title: item.title,
        category: item.category,
        category_label: item.categoryLabel,
        age_group: item.ageGroup,
        theme: item.theme,
        image_url: item.imageUrl,
        aspect_ratio: item.aspectRatio || '4:3',
        description: item.description,
        featured: item.featured || false,
        is_published: true,
        display_order: this.getPortfolio().length + 1,
        is_illustrative_placeholder: item.isIllustrativePlaceholder || false,
        cloudinary_public_id: item.cloudinaryPublicId,
        asset_source: item.assetSource || (item.isIllustrativePlaceholder ? 'external_illustrative' : 'studio')
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding portfolio item:', error);
      throw error;
    }
    
    await this.fetchPortfolio();
    return {
      ...data,
      imageUrl: data.image_url,
      categoryLabel: data.category_label,
      ageGroup: data.age_group,
      aspectRatio: data.aspect_ratio,
      displayOrder: data.display_order,
      isPublished: data.is_published,
      isIllustrativePlaceholder: data.is_illustrative_placeholder,
      cloudinaryPublicId: data.cloudinary_public_id,
      assetSource: data.asset_source,
      createdAt: data.created_at
    };
  },

  async updatePortfolioItem(id: string, updates: Partial<ExtendedPortfolioItem>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }

    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.categoryLabel !== undefined) dbUpdates.category_label = updates.categoryLabel;
    if (updates.ageGroup !== undefined) dbUpdates.age_group = updates.ageGroup;
    if (updates.theme !== undefined) dbUpdates.theme = updates.theme;
    if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;
    if (updates.aspectRatio !== undefined) dbUpdates.aspect_ratio = updates.aspectRatio;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
    if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
    if (updates.displayOrder !== undefined) dbUpdates.display_order = updates.displayOrder;
    if (updates.cloudinaryPublicId !== undefined) dbUpdates.cloudinary_public_id = updates.cloudinaryPublicId;
    if (updates.assetSource !== undefined) dbUpdates.asset_source = updates.assetSource;

    const { error } = await supabase.from(DB_TABLES.PORTFOLIO).update(dbUpdates).eq('id', id);
    if (error) {
      console.error('Error updating portfolio item:', error);
      throw error;
    }
    await this.fetchPortfolio();
    return true;
  },

  async deletePortfolioItem(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }

    const { error } = await supabase.from(DB_TABLES.PORTFOLIO).delete().eq('id', id);
    if (error) {
      console.error('Error deleting portfolio item:', error);
      throw error;
    }
    await this.fetchPortfolio();
    return true;
  },

  async reorderPortfolioItem(id: string, direction: 'up' | 'down'): Promise<boolean> {
    const current = [...this.getPortfolio()];
    const index = current.findIndex(p => p.id === id);
    if (index === -1) return false;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= current.length) return false;

    const temp = current[index];
    current[index] = current[targetIdx];
    current[targetIdx] = temp;

    current.forEach((item, idx) => { item.displayOrder = idx + 1; });

    if (isSupabaseConfigured && supabase) {
      const updates = current
        .filter(item => isUuid(item.id))
        .map(item => ({ id: item.id, display_order: item.displayOrder }));
      
      if (updates.length > 0) {
        const { error } = await supabase.from(DB_TABLES.PORTFOLIO).upsert(updates);
        if (error) {
          console.error('Error reordering portfolio:', error);
          throw error;
        }
      }
      await this.fetchPortfolio();
      return true;
    } else {
      saveToStorage(STORAGE_KEYS.PORTFOLIO, current);
      return true;
    }
  },

  // ==========================================
  // SERVICES CRUD
  // ==========================================
  getServices(): ServiceItem[] {
    const items = getFromStorage<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    return items && items.length > 0 ? items : INITIAL_SERVICES;
  },

  async fetchServices(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.SERVICES).select('*');
      if (error) {
        console.warn('Services query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: ServiceItem[] = data.map((item: any) => ({
          ...item,
          shortDescription: item.short_description,
          fullDescription: item.full_description,
          idealAge: item.ideal_age,
          startingPrice: Number(item.starting_price),
          pricingNote: item.pricing_note,
          featuredImage: item.featured_image,
          galleryImages: item.gallery_images,
          whatStudioProvides: item.what_studio_provides,
          whatParentsBring: item.what_parents_bring
        }));
        saveToStorage(STORAGE_KEYS.SERVICES, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching services, using local fallback:', err?.message || err);
    }
  },

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.getServices().find(s => s.slug === slug);
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }

    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.shortDescription !== undefined) dbUpdates.short_description = updates.shortDescription;
    if (updates.fullDescription !== undefined) dbUpdates.full_description = updates.fullDescription;
    if (updates.idealAge !== undefined) dbUpdates.ideal_age = updates.idealAge;
    if (updates.duration !== undefined) dbUpdates.duration = updates.duration;
    if (updates.outfits !== undefined) dbUpdates.outfits = updates.outfits;
    if (updates.startingPrice !== undefined) dbUpdates.starting_price = updates.startingPrice;
    if (updates.pricingNote !== undefined) dbUpdates.pricing_note = updates.pricingNote;
    if (updates.featuredImage !== undefined) dbUpdates.featured_image = updates.featuredImage;
    if (updates.galleryImages !== undefined) dbUpdates.gallery_images = updates.galleryImages;
    if (updates.features !== undefined) dbUpdates.features = updates.features;
    if (updates.whatStudioProvides !== undefined) dbUpdates.what_studio_provides = updates.whatStudioProvides;
    if (updates.whatParentsBring !== undefined) dbUpdates.what_parents_bring = updates.whatParentsBring;
    if (updates.themes !== undefined) dbUpdates.themes = updates.themes;

    const { error } = await supabase.from(DB_TABLES.SERVICES).update(dbUpdates).eq('id', id);
    if (error) throw error;
    await this.fetchServices();
    return true;
  },

  async addService(item: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    // Minimal implementation for now to satisfy types
    const { error } = await supabase.from(DB_TABLES.SERVICES).insert(item);
    if (error) throw error;
    await this.fetchServices();
    return { ...item, id: 'temp' } as any; 
  },

  // ==========================================
  // PACKAGES CRUD
  // ==========================================
  getPackages(): PackageItem[] {
    const items = getFromStorage<PackageItem[]>(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
    return items && items.length > 0 ? items : INITIAL_PACKAGES;
  },

  async fetchPackages(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.PACKAGES).select('*');
      if (error) {
        console.warn('Packages query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: PackageItem[] = data.map((item: any) => ({
          ...item,
          categoryLabel: item.category_label,
          price: Number(item.price),
          priceNote: item.price_note,
          editedPhotos: item.edited_photos,
          rawPhotosIncluded: item.raw_photos_included,
          outfitChanges: item.outfit_changes,
          propsIncluded: item.props_included,
          isPopular: item.is_popular,
          isCustomQuote: item.is_custom_quote,
          featuredImage: item.featured_image
        }));
        saveToStorage(STORAGE_KEYS.PACKAGES, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching packages, using local fallback:', err?.message || err);
    }
  },

  async addPackage(item: Omit<PackageItem, 'id'>): Promise<PackageItem> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    const { error } = await supabase.from(DB_TABLES.PACKAGES).insert({
      name: item.name,
      category: item.category,
      category_label: item.categoryLabel,
      tagline: item.tagline,
      price: item.price,
      price_note: item.priceNote,
      duration: item.duration,
      edited_photos: item.editedPhotos,
      raw_photos_included: item.rawPhotosIncluded,
      outfit_changes: item.outfitChanges,
      props_included: item.propsIncluded,
      features: item.features,
      is_popular: item.isPopular,
      is_custom_quote: item.isCustomQuote,
      featured_image: item.featuredImage
    });
    if (error) throw error;
    await this.fetchPackages();
    return { ...item, id: 'temp' } as any;
  },

  async updatePackage(id: string, updates: Partial<PackageItem>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.PACKAGES).update(updates).eq('id', id);
    if (error) throw error;
    await this.fetchPackages();
    return true;
  },

  async deletePackage(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.PACKAGES).delete().eq('id', id);
    if (error) throw error;
    await this.fetchPackages();
    return true;
  },

  // ==========================================
  // ENQUIRIES CRUD
  // ==========================================
  getEnquiries(): BookingLeadRecord[] {
    return getFromStorage<BookingLeadRecord[]>(STORAGE_KEYS.BOOKINGS, []);
  },

  async fetchEnquiries(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.ENQUIRIES).select('*').order('received_date', { ascending: false });
      if (error) throw error;
      if (data) {
        const mapped: BookingLeadRecord[] = data.map((item: any) => ({
          id: item.id,
          parentName: item.parent_name,
          phone: item.phone,
          shootType: item.shoot_type,
          shootCategory: item.shoot_category,
          babyAgeOrDueDate: item.baby_age_or_due_date,
          preferredDate: item.preferred_date,
          status: item.status,
          receivedDate: item.received_date,
          source: item.source,
          notes: item.notes,
          packageInterested: item.package_interested
        }));
        saveToStorage(STORAGE_KEYS.BOOKINGS, mapped);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    }
  },

  async addEnquiry(lead: Omit<BookingLeadRecord, 'id' | 'receivedDate'>): Promise<BookingLeadRecord> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    const { error } = await supabase.from(DB_TABLES.ENQUIRIES).insert({
      parent_name: lead.parentName,
      phone: lead.phone,
      shoot_type: lead.shootType,
      shoot_category: lead.shootCategory,
      baby_age_or_due_date: lead.babyAgeOrDueDate,
      preferred_date: lead.preferredDate,
      notes: lead.notes,
      status: lead.status,
      source: lead.source
    });
    if (error) throw error;
    await this.fetchEnquiries();
    return { ...lead, id: 'temp', receivedDate: new Date().toISOString() } as any;
  },

  async updateEnquiryStatus(id: string, status: BookingLeadRecord['status']): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.ENQUIRIES).update({ status }).eq('id', id);
    if (error) throw error;
    await this.fetchEnquiries();
    return true;
  },

  async updateEnquiryNotes(id: string, notes: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.ENQUIRIES).update({ notes }).eq('id', id);
    if (error) throw error;
    await this.fetchEnquiries();
    return true;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.ENQUIRIES).delete().eq('id', id);
    if (error) throw error;
    await this.fetchEnquiries();
    return true;
  },

  // ==========================================
  // FAQS CRUD
  // ==========================================
  getFaqs(): FaqItem[] {
    const items = getFromStorage<FaqItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
    return items && items.length > 0 ? items : INITIAL_FAQS;
  },

  async fetchFaqs(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.FAQS).select('*');
      if (error) {
        console.warn('FAQs query note:', error.message);
        return;
      }
      if (data && data.length > 0) saveToStorage(STORAGE_KEYS.FAQS, data);
    } catch (err: any) {
      console.warn('Network issue fetching FAQs, using local fallback:', err?.message || err);
    }
  },

  async addFaq(faq: Omit<FaqItem, 'id'>): Promise<FaqItem> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    const { error } = await supabase.from(DB_TABLES.FAQS).insert(faq);
    if (error) throw error;
    await this.fetchFaqs();
    return { ...faq, id: 'temp' } as any;
  },

  async updateFaq(id: string, updates: Partial<FaqItem>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.FAQS).update(updates).eq('id', id);
    if (error) throw error;
    await this.fetchFaqs();
    return true;
  },

  async deleteFaq(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.FAQS).delete().eq('id', id);
    if (error) throw error;
    await this.fetchFaqs();
    return true;
  },

  // ==========================================
  // CAROUSEL CRUD
  // ==========================================
  getCarouselSlides(): ServiceCarouselSlide[] {
    const slides = getFromStorage<ServiceCarouselSlide[]>(STORAGE_KEYS.CAROUSEL, INITIAL_CAROUSEL);
    if (!slides || slides.length === 0) return INITIAL_CAROUSEL;
    return slides.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async fetchCarousel(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase
        .from(DB_TABLES.HOMEPAGE_SLIDES)
        .select('*')
        .order('display_order', { ascending: true });
      if (error) {
        console.warn('Carousel query note:', error.message);
        return;
      }

      const REQUIRED_SLIDES: Omit<ServiceCarouselSlide, 'id'>[] = [
        {
          title: 'Wedding Photography',
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
          title: 'Pre-Wedding & Engagement',
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
          title: 'Baby & Newborn Photography',
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
          title: 'Maternity & Family Photography',
          category: 'maternity',
          headline: 'Moments That Become Memories',
          tagline: 'Celebrate motherhood, family bonds and life\'s beautiful milestones.',
          ctaText: 'Explore Maternity Photography',
          imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1920&q=80',
          routePath: '/maternity',
          displayOrder: 4,
          isPublished: true,
          isIllustrativePlaceholder: true
        },
        {
          title: 'Events & Celebrations',
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

      let recordsToUse = data || [];

      // Detect if DB records need repair (missing categories, corrupted titles, invalid images, or fewer than 5 rows)
      const categoriesPresent = new Set(recordsToUse.map(r => r.category));
      const hasCorruptedTitle = recordsToUse.some(r => r.title === 'Weedinh' || r.image_url?.includes('/src/assets'));
      const needsRepair = recordsToUse.length !== 5 || categoriesPresent.size !== 5 || hasCorruptedTitle;

      if (needsRepair) {
        console.log('Repairing public.homepage_slides in Supabase database...');
        const usedIds = new Set<string>();
        const repairedRows: any[] = [];

        for (const targetSpec of REQUIRED_SLIDES) {
          // 1. Find existing record matching category
          let match = recordsToUse.find(r => !usedIds.has(r.id) && r.category === targetSpec.category);

          // 2. If no exact category match, reuse an unassigned existing record (e.g. misspelled 'Weedinh' or duplicate 'wedding')
          if (!match) {
            match = recordsToUse.find(r => !usedIds.has(r.id));
          }

          const dbPayload = {
            title: targetSpec.title,
            category: targetSpec.category,
            tagline: targetSpec.tagline,
            image_url: targetSpec.imageUrl,
            route_path: targetSpec.routePath,
            display_order: targetSpec.displayOrder,
            is_published: true,
            is_illustrative_placeholder: targetSpec.isIllustrativePlaceholder
          };

          if (match && match.id && isUuid(match.id)) {
            usedIds.add(match.id);
            const { data: updated, error: updateErr } = await supabase
              .from(DB_TABLES.HOMEPAGE_SLIDES)
              .update(dbPayload)
              .eq('id', match.id)
              .select()
              .single();

            if (!updateErr && updated) {
              repairedRows.push(updated);
            } else {
              repairedRows.push({ ...match, ...dbPayload });
            }
          } else {
            // Insert missing category record
            const { data: inserted, error: insertErr } = await supabase
              .from(DB_TABLES.HOMEPAGE_SLIDES)
              .insert(dbPayload)
              .select()
              .single();

            if (!insertErr && inserted) {
              usedIds.add(inserted.id);
              repairedRows.push(inserted);
            } else {
              repairedRows.push({ id: `slide-${targetSpec.category}`, ...dbPayload });
            }
          }
        }

        // Clean up any extraneous duplicate rows if present
        const extraRows = recordsToUse.filter(r => !usedIds.has(r.id));
        for (const extra of extraRows) {
          if (isUuid(extra.id)) {
            await supabase.from(DB_TABLES.HOMEPAGE_SLIDES).delete().eq('id', extra.id);
          }
        }

        recordsToUse = repairedRows;
      }

      const mapped: ServiceCarouselSlide[] = recordsToUse.map((item: any) => {
        const fallback = REQUIRED_SLIDES.find(i => i.category === item.category || i.title === item.title) || INITIAL_CAROUSEL[0];
        return {
          id: item.id || `slide-${item.category}`,
          title: item.title || fallback.title,
          category: item.category || fallback.category,
          tagline: item.tagline || fallback.tagline,
          headline: fallback.headline || item.title,
          ctaText: fallback.ctaText || `Explore ${item.title}`,
          imageUrl: item.image_url || fallback.imageUrl,
          routePath: item.route_path || fallback.routePath,
          displayOrder: item.display_order || fallback.displayOrder,
          isPublished: item.is_published !== false,
          isIllustrativePlaceholder: item.is_illustrative_placeholder ?? fallback.isIllustrativePlaceholder
        };
      }).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      saveToStorage(STORAGE_KEYS.CAROUSEL, mapped);
    } catch (err: any) {
      console.warn('Network issue fetching carousel, using local fallback:', err?.message || err);
      saveToStorage(STORAGE_KEYS.CAROUSEL, INITIAL_CAROUSEL);
    }
  },

  async addCarouselSlide(slide: Omit<ServiceCarouselSlide, 'id'>): Promise<ServiceCarouselSlide> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    const { error } = await supabase.from(DB_TABLES.HOMEPAGE_SLIDES).insert({
      title: slide.title,
      category: slide.category,
      tagline: slide.tagline,
      image_url: slide.imageUrl,
      route_path: slide.routePath,
      display_order: this.getCarouselSlides().length + 1,
      is_published: true,
      is_illustrative_placeholder: slide.isIllustrativePlaceholder ?? true
    });
    if (error) throw error;
    await this.fetchCarousel();
    return { ...slide, id: 'temp', displayOrder: 0, isPublished: true };
  },

  async updateCarouselSlide(id: string, updates: Partial<ServiceCarouselSlide>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.tagline !== undefined) dbUpdates.tagline = updates.tagline;
    if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;
    if (updates.routePath !== undefined) dbUpdates.route_path = updates.routePath;
    if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
    if (updates.displayOrder !== undefined) dbUpdates.display_order = updates.displayOrder;
    if (updates.isIllustrativePlaceholder !== undefined) dbUpdates.is_illustrative_placeholder = updates.isIllustrativePlaceholder;
    const { error } = await supabase.from(DB_TABLES.HOMEPAGE_SLIDES).update(dbUpdates).eq('id', id);
    if (error) throw error;
    await this.fetchCarousel();
    return true;
  },

  async deleteCarouselSlide(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.HOMEPAGE_SLIDES).delete().eq('id', id);
    if (error) throw error;
    await this.fetchCarousel();
    return true;
  },

  async reorderCarouselSlide(id: string, direction: 'up' | 'down'): Promise<boolean> {
    const current = [...this.getCarouselSlides()];
    const index = current.findIndex(s => s.id === id);
    if (index === -1) return false;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= current.length) return false;
    const temp = current[index];
    current[index] = current[targetIdx];
    current[targetIdx] = temp;
    current.forEach((item, idx) => { item.displayOrder = idx + 1; });
    
    if (isSupabaseConfigured && supabase) {
       const updates = current
         .filter(item => isUuid(item.id))
         .map(item => ({ id: item.id, display_order: item.displayOrder }));
       
       if (updates.length > 0) {
         const { error } = await supabase.from(DB_TABLES.HOMEPAGE_SLIDES).upsert(updates);
         if (error) throw error;
       }
       await this.fetchCarousel();
       return true;
    } else {
      saveToStorage(STORAGE_KEYS.CAROUSEL, current);
      return true;
    }
  },

  getPublishedCarouselSlides(): ServiceCarouselSlide[] {
    const raw = this.getCarouselSlides().filter(s => s.isPublished !== false);
    
    // Map with fallback details to ensure headline & ctaText are populated for all 5 categories
    const categoriesMap = new Map<string, ServiceCarouselSlide>();
    
    raw.forEach(slide => {
      if (slide.category) {
        const fallback = INITIAL_CAROUSEL.find(i => i.category === slide.category);
        categoriesMap.set(slide.category, {
          ...slide,
          headline: slide.headline || fallback?.headline || slide.title,
          ctaText: slide.ctaText || fallback?.ctaText || `Explore ${slide.title}`,
          imageUrl: (!slide.imageUrl || slide.imageUrl.startsWith('/src/assets') || slide.imageUrl.includes('519741497674') || slide.imageUrl.includes('1610030469983'))
            ? (fallback?.imageUrl || slide.imageUrl)
            : slide.imageUrl
        });
      }
    });

    // Ensure all 5 core categories are represented
    INITIAL_CAROUSEL.forEach((fallback) => {
      if (!categoriesMap.has(fallback.category)) {
        categoriesMap.set(fallback.category, fallback);
      }
    });

    const result = Array.from(categoriesMap.values()).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return result.slice(0, 5);
  },

  // ==========================================
  // SETTINGS CRUD
  // ==========================================
  getSettings(): ExtendedStudioConfig {
    return getFromStorage<ExtendedStudioConfig>(STORAGE_KEYS.SETTINGS, initialSettings);
  },

  async fetchSettings(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.STUDIO_SETTINGS).select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        const mapped: ExtendedStudioConfig = {
          name: data.name,
          shortName: data.short_name,
          tagline: data.tagline,
          description: data.description,
          phone: data.phone,
          phoneDisplay: data.phone_display,
          whatsapp: data.whatsapp,
          email: data.email,
          address: { street: data.street, area: data.area, city: data.city, state: data.state, pincode: data.pincode },
          workingHours: { weekdays: data.weekdays_hours, weekends: data.weekends_hours },
          googleMapsUrl: data.google_maps_url,
          googleMapsEmbed: data.google_maps_embed,
          instagramHandle: data.instagram_handle,
          seoTitle: data.seo_title,
          seoDescription: data.seo_description,
          carouselAutoSlide: data.carousel_auto_slide,
          carouselIntervalSeconds: data.carousel_interval_seconds,
          enquiryHeadline: data.enquiry_headline,
          enquirySubtitle: data.enquiry_subtitle,
          footerDescription: data.footer_description
        };
        saveToStorage(STORAGE_KEYS.SETTINGS, mapped);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  },

  async updateSettings(updates: Partial<ExtendedStudioConfig>): Promise<ExtendedStudioConfig> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.shortName !== undefined) dbUpdates.short_name = updates.shortName;
    if (updates.address) {
      if (updates.address.street !== undefined) dbUpdates.street = updates.address.street;
      if (updates.address.city !== undefined) dbUpdates.city = updates.address.city;
    }
    // Check if settings record exists
    const { count } = await supabase.from(DB_TABLES.STUDIO_SETTINGS).select('*', { count: 'exact', head: true });
    if (count === 0) {
      const { error } = await supabase.from(DB_TABLES.STUDIO_SETTINGS).insert(dbUpdates);
      if (error) throw error;
    } else {
      const { data: first } = await supabase.from(DB_TABLES.STUDIO_SETTINGS).select('id').limit(1).single();
      if (first) {
        const { error } = await supabase.from(DB_TABLES.STUDIO_SETTINGS).update(dbUpdates).eq('id', first.id);
        if (error) throw error;
      }
    }
    await this.fetchSettings();
    return this.getSettings();
  },

  // ==========================================
  // REVIEWS CRUD
  // ==========================================
  getReviews(): ReviewItem[] {
    const items = getFromStorage<ReviewItem[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    return items && items.length > 0 ? items : INITIAL_REVIEWS;
  },

  async fetchReviews(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.REVIEWS).select('*').order('date', { ascending: false });
      if (error) {
        console.warn('Reviews query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: ReviewItem[] = data.map((item: any) => ({
          id: item.id,
          parentName: item.parent_name,
          babyName: item.baby_name,
          babyAgeAtShoot: item.baby_age_at_shoot,
          shootType: item.shoot_type,
          rating: item.rating,
          comment: item.comment,
          date: item.date,
          city: item.city,
          isDemoPlaceholder: item.is_demo_placeholder
        }));
        saveToStorage(STORAGE_KEYS.REVIEWS, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching reviews, using local fallback:', err?.message || err);
    }
  },

  async addReview(review: Omit<ReviewItem, 'id'>): Promise<ReviewItem> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase not configured.');
    }
    const { data, error } = await supabase
      .from(DB_TABLES.REVIEWS)
      .insert({
        parent_name: review.parentName,
        baby_name: review.babyName,
        baby_age_at_shoot: review.babyAgeAtShoot,
        shoot_type: review.shootType,
        rating: review.rating,
        comment: review.comment,
        date: review.date || new Date().toISOString().split('T')[0],
        city: review.city,
        is_demo_placeholder: false
      })
      .select()
      .single();
    
    if (error) throw error;
    await this.fetchReviews();
    return {
      ...data,
      parentName: data.parent_name,
      babyName: data.baby_name,
      babyAgeAtShoot: data.baby_age_at_shoot,
      shootType: data.shoot_type
    };
  },

  async deleteReview(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) {
      throw new Error('Supabase not configured or invalid ID.');
    }
    const { error } = await supabase.from(DB_TABLES.REVIEWS).delete().eq('id', id);
    if (error) throw error;
    await this.fetchReviews();
    return true;
  },

  // ==========================================
  // OFFERS CRUD
  // ==========================================
  getOffers(): OfferItem[] {
    const items = getFromStorage<OfferItem[]>(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    return items && items.length > 0 ? items : INITIAL_OFFERS;
  },

  async fetchOffers(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.OFFERS).select('*');
      if (error) {
        console.warn('Offers query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: OfferItem[] = data.map((item: any) => ({
          ...item,
          discountBadge: item.discount_badge,
          validityNote: item.validity_note,
          targetCategory: item.target_category,
          whatsappMessage: item.whatsapp_message,
          isActive: item.is_active,
          isPlaceholder: item.is_placeholder,
          featuredImage: item.featured_image
        }));
        saveToStorage(STORAGE_KEYS.OFFERS, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching offers, using local fallback:', err?.message || err);
    }
  },

  async updateOfferStatus(id: string, isActive: boolean): Promise<boolean> {
    if (isSupabaseConfigured && supabase && isUuid(id)) {
      const { error } = await supabase.from(DB_TABLES.OFFERS).update({ is_active: isActive }).eq('id', id);
      if (error) throw error;
      await this.fetchOffers();
      return true;
    } else {
      const current = this.getOffers();
      const index = current.findIndex(o => o.id === id);
      if (index === -1) return false;
      current[index] = { ...current[index], isActive };
      saveToStorage(STORAGE_KEYS.OFFERS, current);
      return true;
    }
  },

  // ==========================================
  // SAFETY CRUD
  // ==========================================
  getSafetyProtocols(): SafetyProtocol[] {
    const items = getFromStorage<SafetyProtocol[]>(STORAGE_KEYS.SAFETY, INITIAL_SAFETY);
    return items && items.length > 0 ? items : INITIAL_SAFETY;
  },

  getPublishedSafetyProtocols(): SafetyProtocol[] {
    return this.getSafetyProtocols().filter(s => s.isPublished !== false);
  },

  async fetchSafetyProtocols(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.SAFETY_PROTOCOLS).select('*');
      if (error) {
        console.warn('Safety protocols query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: SafetyProtocol[] = data.map((item: any) => ({
          ...item,
          iconName: item.icon_name,
          isStandardGuideline: item.is_standard_guideline,
          isPublished: item.is_published
        }));
        saveToStorage(STORAGE_KEYS.SAFETY, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching safety protocols, using local fallback:', err?.message || err);
    }
  },

  async addSafetyProtocol(item: Omit<SafetyProtocol, 'id'>): Promise<SafetyProtocol> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured.');
    const { data, error } = await supabase.from(DB_TABLES.SAFETY_PROTOCOLS).insert({
      title: item.title,
      description: item.description,
      icon_name: item.iconName,
      is_standard_guideline: item.isStandardGuideline ?? true,
      is_published: item.isPublished ?? false
    }).select().single();
    if (error) throw error;
    await this.fetchSafetyProtocols();
    return { ...data, iconName: data.icon_name, isPublished: data.is_published } as any;
  },

  async updateSafetyProtocol(id: string, updates: Partial<SafetyProtocol>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) throw new Error('Supabase not configured or invalid ID.');
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.iconName !== undefined) dbUpdates.icon_name = updates.iconName;
    if (updates.isStandardGuideline !== undefined) dbUpdates.is_standard_guideline = updates.isStandardGuideline;
    if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
    const { error } = await supabase.from(DB_TABLES.SAFETY_PROTOCOLS).update(dbUpdates).eq('id', id);
    if (error) throw error;
    await this.fetchSafetyProtocols();
    return true;
  },

  async deleteSafetyProtocol(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) throw new Error('Supabase not configured or invalid ID.');
    const { error } = await supabase.from(DB_TABLES.SAFETY_PROTOCOLS).delete().eq('id', id);
    if (error) throw error;
    await this.fetchSafetyProtocols();
    return true;
  },

  // ==========================================
  // BEFORE/AFTER CRUD
  // ==========================================
  getBeforeAfter(): BeforeAfterItem[] {
    const items = getFromStorage<BeforeAfterItem[]>(STORAGE_KEYS.BEFORE_AFTER, INITIAL_BEFORE_AFTER);
    return items && items.length > 0 ? items : INITIAL_BEFORE_AFTER;
  },

  getPublishedBeforeAfter(): BeforeAfterItem[] {
    return this.getBeforeAfter().filter(ba => ba.isPublished !== false);
  },

  async fetchBeforeAfter(): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { data, error } = await supabase.from(DB_TABLES.BEFORE_AFTER).select('*');
      if (error) {
        console.warn('Before/after query note:', error.message);
        return;
      }
      if (data && data.length > 0) {
        const mapped: BeforeAfterItem[] = data.map((item: any) => ({
          ...item,
          beforeImage: item.before_image,
          afterImage: item.after_image,
          retouchHighlights: item.retouch_highlights,
          isPublished: item.is_published
        }));
        saveToStorage(STORAGE_KEYS.BEFORE_AFTER, mapped);
      }
    } catch (err: any) {
      console.warn('Network issue fetching before/after, using local fallback:', err?.message || err);
    }
  },

  async addBeforeAfter(item: Omit<BeforeAfterItem, 'id'>): Promise<BeforeAfterItem> {
    if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured.');
    const { data, error } = await supabase.from(DB_TABLES.BEFORE_AFTER).insert({
      title: item.title,
      description: item.description,
      before_image: item.beforeImage,
      after_image: item.afterImage,
      retouch_highlights: item.retouchHighlights,
      is_published: item.isPublished ?? false
    }).select().single();
    if (error) throw error;
    await this.fetchBeforeAfter();
    return { ...data, beforeImage: data.before_image, afterImage: data.after_image, retouchHighlights: data.retouch_highlights, isPublished: data.is_published } as any;
  },

  async updateBeforeAfter(id: string, updates: Partial<BeforeAfterItem>): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) throw new Error('Supabase not configured or invalid ID.');
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.beforeImage !== undefined) dbUpdates.before_image = updates.beforeImage;
    if (updates.afterImage !== undefined) dbUpdates.after_image = updates.afterImage;
    if (updates.retouchHighlights !== undefined) dbUpdates.retouch_highlights = updates.retouchHighlights;
    if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
    const { error } = await supabase.from(DB_TABLES.BEFORE_AFTER).update(dbUpdates).eq('id', id);
    if (error) throw error;
    await this.fetchBeforeAfter();
    return true;
  },

  async deleteBeforeAfter(id: string): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase || !isUuid(id)) throw new Error('Supabase not configured or invalid ID.');
    const { error } = await supabase.from(DB_TABLES.BEFORE_AFTER).delete().eq('id', id);
    if (error) throw error;
    await this.fetchBeforeAfter();
    return true;
  },

  resetAll(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    window.dispatchEvent(new Event('studio_storage_update'));
  }
};
