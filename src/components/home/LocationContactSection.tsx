import React, { useState } from 'react';
import { STUDIO_CONFIG, buildEnquiryWhatsAppMessage } from '../../config/studioConfig';
import { EnquiryFormState } from '../../types';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export const LocationContactSection: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormState>({
    parentName: '',
    phone: '',
    shootType: 'Newborn Session (5-21 Days)',
    babyAgeOrDueDate: '',
    preferredDate: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;

    // Build the WhatsApp message link and open in new tab
    const waUrl = buildEnquiryWhatsAppMessage({
      parentName: formData.parentName,
      phone: formData.phone,
      shootType: formData.shootType,
      babyAgeOrDueDate: formData.babyAgeOrDueDate,
      preferredDate: formData.preferredDate,
      notes: formData.notes
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#F6F2EB] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Visit & Connect
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Book Your Session or Visit Our Studio
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Fill the enquiry form to chat directly with us on WhatsApp, or drop by our studio for an in-person theme preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 tracking-tight mb-2">
                Send Direct WhatsApp Enquiry
              </h3>
              <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                We respond within minutes with slot availability, costume choices, and customized theme options.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">WhatsApp Enquiry Dispatched!</p>
                    <p className="text-emerald-700 mt-0.5">Your message has been formatted and opened in WhatsApp. You can also edit your details below to send another request.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Parent's Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Photography Session *
                    </label>
                    <select
                      value={formData.shootType}
                      onChange={(e) => setFormData({ ...formData, shootType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700 bg-white"
                    >
                      <option>Newborn Session (5-21 Days)</option>
                      <option>Milestone / Sitter (6-10 Months)</option>
                      <option>1st Birthday Cake Smash</option>
                      <option>Fine Art Maternity Session</option>
                      <option>Bump-to-Baby Combo</option>
                      <option>Rice Ceremony / Traditional Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Baby Age or Due Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10 Days / Due May 15"
                      value={formData.babyAgeOrDueDate}
                      onChange={(e) => setFormData({ ...formData, babyAgeOrDueDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Preferred Date / Month
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Special Requests / Themes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us if you prefer wooden moon setup, floral garden, traditional cradle, or specific color schemes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50 focus:border-amber-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send WhatsApp Enquiry Now</span>
                </button>
              </form>
            </div>

            <p className="text-[11px] text-stone-400 mt-4 text-center">
              No payment required at enquiry stage. We discuss themes and verify slots first.
            </p>
          </div>

          {/* Right Column: Studio Information & Google Map */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Quick contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-amber-800 mb-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Direct Studio Call</span>
                </div>
                <a
                  href={`tel:${STUDIO_CONFIG.phone}`}
                  className="font-serif text-lg font-bold text-stone-900 hover:text-amber-800 transition-colors"
                >
                  {STUDIO_CONFIG.phoneDisplay}
                </a>
                <p className="text-xs text-stone-500 mt-1">Available 9:30 AM - 7:30 PM</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Instant Chat</span>
                </div>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg font-bold text-emerald-800 hover:underline"
                >
                  WhatsApp Booking
                </a>
                <p className="text-xs text-stone-500 mt-1">Quick responses from our team</p>
              </div>
            </div>

            {/* Address & Timings Banner */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Studio Location</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                    {STUDIO_CONFIG.address.street}, {STUDIO_CONFIG.address.area}, {STUDIO_CONFIG.address.city}, {STUDIO_CONFIG.address.state} - {STUDIO_CONFIG.address.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Studio Hours</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{STUDIO_CONFIG.workingHours.weekdays}</p>
                  <p className="text-xs text-stone-600">{STUDIO_CONFIG.workingHours.weekends}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Container */}
            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative bg-stone-200">
              <iframe
                title="New Sri Laxmi Baby Photo Studio Location Map"
                src={STUDIO_CONFIG.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
