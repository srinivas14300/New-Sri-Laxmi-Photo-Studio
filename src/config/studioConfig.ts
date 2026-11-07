import { StudioConfig } from '../types';

export const STUDIO_CONFIG: StudioConfig = {
  name: 'New Sri Laxmi Baby Photo Studio',
  shortName: 'Sri Laxmi Photo Studio',
  tagline: 'Full-Service Photography Studio | Weddings, Events, Families & Little Miracles',
  description: 'Full-service professional photography studio in Wanaparthy capturing weddings, pre-wedding couple sessions, traditional ceremonies & family events, baby & newborn milestones, fine-art maternity, and portraiture.',
  phone: '+919848022338',
  phoneDisplay: '+91 98480 22338',
  whatsapp: '919848022338',
  email: 'srilaxmiphoto@gmail.com',
  address: {
    street: 'Maremmakunta',
    area: 'Bus Depot Road',
    city: 'Wanaparthy',
    state: 'Telangana',
    pincode: '509103'
  },
  workingHours: {
    weekdays: '9:30 AM - 7:30 PM (Tuesday Closed)',
    weekends: '9:00 AM - 8:30 PM (Prior Appointment Advised)'
  },
  googleMapsUrl: 'https://maps.app.goo.gl/brhwubVHLAASUgJ96?g_st=aw',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7451421298495!2d78.4744!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjgnMjguMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  instagramHandle: '@srilaxmiphoto'
};

/**
 * Builds a valid WhatsApp chat link with an URL-encoded enquiry message
 */
export function buildWhatsAppLink(customMessage?: string): string {
  const defaultMessage = `Hello New Sri Laxmi Photo Studio! I would like to enquire about your photography services and available packages.`;
  const text = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${text}`;
}

/**
 * Category-aware WhatsApp enquiry helper
 */
export function buildWhatsAppCategoryEnquiry(category: string, serviceTitle?: string): string {
  const serviceDetail = serviceTitle ? ` for "${serviceTitle}"` : '';
  const message = `Hello New Sri Laxmi Photo Studio! I am interested in your ${category} photography services${serviceDetail}. Please share details, package options, and available dates.`;
  return buildWhatsAppLink(message);
}

/**
 * Builds a formatted WhatsApp booking request from the enquiry form
 */
export function buildEnquiryWhatsAppMessage(data: {
  parentName?: string;
  clientName?: string;
  phone: string;
  shootCategory?: string;
  shootType: string;
  babyAgeOrDueDate?: string;
  eventDate?: string;
  preferredDate?: string;
  notes?: string;
}): string {
  const name = data.clientName || data.parentName || 'Valued Client';
  const lines = [
    `*📸 New Sri Laxmi Photo Studio - Photography Enquiry*`,
    ``,
    `*Client Name:* ${name}`,
    `*Phone:* ${data.phone}`,
    data.shootCategory ? `*Category:* ${data.shootCategory}` : null,
    `*Service / Shoot Type:* ${data.shootType}`,
    data.babyAgeOrDueDate ? `*Baby Age / Due Date:* ${data.babyAgeOrDueDate}` : null,
    data.eventDate || data.preferredDate ? `*Event / Preferred Date:* ${data.eventDate || data.preferredDate}` : null,
    data.notes ? `*Special Request:* ${data.notes}` : null,
    ``,
    `Sent via Studio Website`
  ].filter(Boolean);

  return `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
