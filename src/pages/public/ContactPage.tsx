import React, { useState } from 'react';
import { STUDIO_CONFIG, buildEnquiryWhatsAppMessage, buildWhatsAppLink } from '../../config/studioConfig';
import { EnquiryFormState } from '../../types';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormState>({
    parentName: '',
    phone: '',
    shootType: 'Newborn Session (5-21 Days)',
    babyAgeOrDueDate: '',
    preferredDate: '',
    notes: ''
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.parentName.trim()) {
      setErrorMsg('Please enter parent name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone/WhatsApp number.');
      return;
    }

    // Build the formatted WhatsApp message
    const waUrl = buildEnquiryWhatsAppMessage({
      parentName: formData.parentName.trim(),
      phone: formData.phone.trim(),
      shootType: formData.shootType,
      babyAgeOrDueDate: formData.babyAgeOrDueDate.trim(),
      preferredDate: formData.preferredDate,
      notes: formData.notes.trim()
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6F2EB] to-[#FAF8F5] py-16 sm:py-20 border-b border-stone-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Get in Touch
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Contact & Studio Location
          </h1>
          <p className="text-stone-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            We are excited to welcome you and your little one. Reach out via WhatsApp, phone, or visit our studio by prior appointment.
          </p>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left 6 cols: WhatsApp Enquiry Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="space-y-1 mb-6">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
                    Send Shoot Enquiry
                  </h2>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Fill the details below to format your booking request.
                  </p>
                </div>

                {/* Explicit functional transparency banner */}
                <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-[11px] text-amber-950 leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>Form Submission Behavior:</strong> Submitting this form formats your details and opens WhatsApp directly to chat with our studio coordinator. It does not save to an external database or require online payment at this stage.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">WhatsApp Chat Opened!</p>
                      <p className="text-emerald-700 mt-0.5">Your enquiry has been dispatched. Our team will verify date availability and costume options shortly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Client / Parent Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sneha Reddy"
                        value={formData.parentName}
                        onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98480 12345"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Photography Discipline / Shoot Type *
                      </label>
                      <select
                        value={formData.shootType}
                        onChange={e => setFormData({ ...formData, shootType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                      >
                        <option>Wedding Photography & Films (Muhurtham / Reception)</option>
                        <option>Pre-Wedding & Outdoor Couple Shoot</option>
                        <option>Traditional Ceremony (Namakaranam / Cradle Ceremony)</option>
                        <option>Annaprasana / Rice Ceremony</option>
                        <option>1st Birthday Grand Party / Function</option>
                        <option>Newborn Studio Session (5-21 Days)</option>
                        <option>Baby Milestone & Sitter Session (6-10 Months)</option>
                        <option>1st Birthday Cake Smash & Tub Splash</option>
                        <option>Fine Art Maternity Session</option>
                        <option>Studio Family & Multi-Generation Portrait</option>
                        <option>Custom Photo Album, Frames & Lab Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Baby Age / Event Details (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10 Days Old / Cradle Ceremony / 2-Day Wedding"
                        value={formData.babyAgeOrDueDate}
                        onChange={e => setFormData({ ...formData, babyAgeOrDueDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Preferred Shoot Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Special Requests / Color Preferences
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your favorite props, sibling details, or theme ideas..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp Chat</span>
                  </button>
                </form>
              </div>

              <div className="pt-4 text-center">
                <p className="text-[11px] text-stone-400">
                  Prefer direct phone call? Ring us at <a href={`tel:${STUDIO_CONFIG.phone}`} className="underline text-stone-700">{STUDIO_CONFIG.phoneDisplay}</a>
                </p>
              </div>
            </div>

            {/* Right 6 cols: Studio Contact Details & Google Map */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-800 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Studio Phone</span>
                  </div>
                  <a
                    href={`tel:${STUDIO_CONFIG.phone}`}
                    className="font-serif text-lg font-bold text-stone-900 hover:text-amber-800 transition-colors block truncate"
                  >
                    {STUDIO_CONFIG.phoneDisplay}
                  </a>
                  <p className="text-xs text-stone-500 mt-1">Available 9:30 AM - 7:30 PM</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 text-emerald-700 mb-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">WhatsApp Fast Response</span>
                  </div>
                  <a
                    href={`https://wa.me/${STUDIO_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-lg font-bold text-emerald-800 hover:underline block truncate"
                  >
                    Chat Directly
                  </a>
                  <p className="text-xs text-stone-500 mt-1">Direct assistant consultation</p>
                </div>
              </div>

              {/* Address card */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base">Studio Address</h3>
                    <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                      {STUDIO_CONFIG.address.street}, {STUDIO_CONFIG.address.area}, {STUDIO_CONFIG.address.city}, {STUDIO_CONFIG.address.state} - {STUDIO_CONFIG.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                  <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base">Studio Operating Hours</h3>
                    <p className="text-xs text-stone-600 mt-0.5">{STUDIO_CONFIG.workingHours.weekdays}</p>
                    <p className="text-xs text-stone-600">{STUDIO_CONFIG.workingHours.weekends}</p>
                    <p className="text-[11px] text-amber-900 font-medium mt-1">
                      *Prior appointment required for studio warmup & sanitization
                    </p>
                  </div>
                </div>
              </div>

              {/* Responsive Google Maps embed */}
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative bg-stone-200">
                <iframe
                  title="New Sri Laxmi Baby Photo Studio Location"
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

    </div>
  );
};
