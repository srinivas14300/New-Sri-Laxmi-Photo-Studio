import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA, DATA_DISCLAIMER } from '../../data/mockData';
import { studioStore } from '../../services/store';
import { buildWhatsAppLink } from '../../config/studioConfig';
import { ArrowLeft, Clock, Shirt, Check, Sparkles, MessageCircle, Info, Calendar, ArrowRight } from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES_DATA.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
          Service Not Found
        </h1>
        <p className="text-sm text-stone-600 mb-6 max-w-md">
          The requested photography service could not be located.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF8F5] pb-20">
      
      {/* Breadcrumb strip */}
      <div className="border-b border-stone-200/80 bg-[#F6F2EB]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services" className="hover:text-stone-900 transition-colors">Services</Link>
          <span aria-hidden="true">/</span>
          <span className="text-stone-900 font-semibold truncate">{service.title}</span>
        </div>
      </div>

      {/* Hero Showcase Split */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
                  Ideal Age: {service.idealAge}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
                  {service.title}
                </h1>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed pt-1">
                  {service.shortDescription}
                </p>
              </div>

              {/* Quick specs card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Duration</span>
                  <div className="flex items-center gap-1.5 font-semibold text-stone-900 mt-0.5">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-400 block text-[11px]">Outfits & Wraps</span>
                  <div className="flex items-center gap-1.5 font-semibold text-stone-900 mt-0.5">
                    <Shirt className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="truncate">{service.outfits}</span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-stone-400 block text-[11px]">Indicative Rate</span>
                  <div className="font-serif text-lg font-bold text-stone-900 mt-0.5 tabular-nums">
                    ₹{service.startingPrice.toLocaleString('en-IN')}*
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={buildWhatsAppLink(`Hello New Sri Laxmi Baby Photo Studio! I would like to book the "${service.title}" session. Please let me know available slots.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire Availability on WhatsApp</span>
                </a>

                <Link
                  to="/packages"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-stone-300 text-stone-800 font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-50 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-stone-600" />
                  <span>View All Packages</span>
                </Link>
              </div>

              <p className="text-[11px] text-stone-400 italic">
                *{DATA_DISCLAIMER.pricing}
              </p>
            </div>

            {/* Right: Featured Photo */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-stone-200 border-4 border-white">
                <img
                  src={service.featuredImage}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Detailed Deep Dive */}
      <section className="py-12 border-t border-stone-200/70 bg-[#F6F2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 8 cols: In-depth Session Content */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Full Description */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  About This Experience
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Inclusions and Props Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* What studio provides */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-amber-800 font-serif font-bold text-lg">
                    <Sparkles className="w-5 h-5 text-amber-700" />
                    <h3>What Studio Provides</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone-600">
                    {service.whatStudioProvides.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What parents bring */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                    <Info className="w-5 h-5 text-amber-700" />
                    <h3>What Parents Bring</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-stone-600">
                    {service.whatParentsBring.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Available Themes */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Signature Themes Available for {service.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.themes.map((theme, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 text-xs font-medium text-stone-800 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-700 shrink-0" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Common Questions About This Session
                  </h3>
                  <div className="space-y-4 divide-y divide-stone-100">
                    {service.faqs.map((faq, fIdx) => (
                      <div key={fIdx} className={fIdx > 0 ? 'pt-4' : ''}>
                        <h4 className="font-semibold text-xs sm:text-sm text-stone-900 mb-1">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right 4 cols: Sticky Booking Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm sticky top-24 space-y-5">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Ready to Book?
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We schedule only one baby shoot at a time to ensure uninterrupted calm and cleanliness.
                </p>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <p className="font-semibold">Advance Reservation Recommended</p>
                  <p className="text-[11px] text-amber-900/90 leading-relaxed">
                    {service.category === 'wedding' || service.category === 'pre-wedding' || service.category === 'events'
                      ? 'Reserve 2 to 6 months in advance to lock your wedding or ceremony dates.'
                      : 'Schedule while expectant or during the first week of birth for baby sessions.'}
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink(`Hello New Sri Laxmi Photo Studio! I would like to enquire about your ${service.title} (${service.category}) services. Please share details and date availability.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 border border-stone-300 text-stone-800 font-semibold text-xs rounded-xl hover:bg-stone-50 transition-colors"
                >
                  <span>Contact Form & Map</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Related Portfolio Highlights */}
      <section className="py-16 sm:py-20 border-t border-stone-200/70 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-amber-800 font-bold">Studio Work</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Recent Highlights</h2>
            </div>
            <Link 
              to={`/portfolio/${service.category}`}
              className="text-xs font-semibold text-amber-900 hover:text-amber-800 flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View Category Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {studioStore.getPublishedPortfolio(service.category).slice(0, 4).map((item) => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-stone-200 aspect-[3/4] shadow-xs">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-white font-serif font-bold text-sm truncate">{item.title}</p>
                  <p className="text-stone-300 text-[10px]">{item.theme}</p>
                </div>
              </div>
            ))}
          </div>

          {studioStore.getPublishedPortfolio(service.category).length === 0 && (
            <div className="py-12 bg-white rounded-2xl border border-stone-200 text-center italic text-stone-400 text-xs">
              Portfolio images for this category will be showcased here soon.
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
