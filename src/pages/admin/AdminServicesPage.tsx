import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { ServiceItem, ServiceCarouselSlide, ShootCategory } from '../../types';
import {
  Layers,
  Check,
  Edit2,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  ExternalLink,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  WEDDING_IMAGE,
  HERO_IMAGE,
  CEREMONY_IMAGE,
  PREWEDDING_IMAGE,
  MATERNITY_IMAGE,
  TODDLER_IMAGE,
  PRODUCTS_IMAGE,
  NEWBORN_IMAGE,
  SITTER_IMAGE,
  CAKE_SMASH_IMAGE
} from '../../data/mockData';

const STUDIO_ASSET_OPTIONS = [
  { label: 'Wedding Couple Mandapam', url: WEDDING_IMAGE },
  { label: 'Baby Crescent Moon', url: HERO_IMAGE },
  { label: 'Traditional Ceremony', url: CEREMONY_IMAGE },
  { label: 'Pre-Wedding Heritage', url: PREWEDDING_IMAGE },
  { label: 'Maternity Fine Art', url: MATERNITY_IMAGE },
  { label: 'Toddler & Family Studio', url: TODDLER_IMAGE },
  { label: 'Newborn Swaddle Wrap', url: NEWBORN_IMAGE },
  { label: 'Sitter Wooden Tub', url: SITTER_IMAGE },
  { label: 'Cake Smash Celebration', url: CAKE_SMASH_IMAGE },
  { label: 'Albums & Photobooks', url: PRODUCTS_IMAGE }
];

export const AdminServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'carousel' | 'services'>('carousel');
  const [slides, setSlides] = useState<ServiceCarouselSlide[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Carousel Modal State
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<ServiceCarouselSlide | null>(null);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideCategory, setSlideCategory] = useState<ShootCategory>('wedding');
  const [slideHeadline, setSlideHeadline] = useState('');
  const [slideTagline, setSlideTagline] = useState('');
  const [slideCtaText, setSlideCtaText] = useState('');
  const [slideImageUrl, setSlideImageUrl] = useState(WEDDING_IMAGE);
  const [slideRoutePath, setSlideRoutePath] = useState('/weddings');
  const [slideIsPlaceholder, setSlideIsPlaceholder] = useState(true);

  // Services Edit State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDuration, setEditDuration] = useState<string>('');

  const loadData = async () => {
    await Promise.all([
      studioStore.fetchCarousel(),
      studioStore.fetchServices()
    ]);
    setSlides(studioStore.getCarouselSlides());
    setServices(studioStore.getServices());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, []);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  // Carousel Handlers
  const handleOpenAddSlide = () => {
    setEditingSlide(null);
    setSlideTitle('');
    setSlideCategory('wedding');
    setSlideHeadline('');
    setSlideTagline('');
    setSlideCtaText('');
    setSlideImageUrl(WEDDING_IMAGE);
    setSlideRoutePath('/weddings');
    setSlideIsPlaceholder(true);
    setShowSlideModal(true);
  };

  const handleOpenEditSlide = (slide: ServiceCarouselSlide) => {
    setEditingSlide(slide);
    setSlideTitle(slide.title);
    setSlideCategory(slide.category as ShootCategory);
    setSlideHeadline(slide.headline || '');
    setSlideTagline(slide.tagline);
    setSlideCtaText(slide.ctaText || '');
    setSlideImageUrl(slide.imageUrl);
    setSlideRoutePath(slide.routePath);
    setSlideIsPlaceholder(slide.isIllustrativePlaceholder ?? true);
    setShowSlideModal(true);
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideTitle.trim()) return;

    try {
      if (editingSlide) {
        await studioStore.updateCarouselSlide(editingSlide.id, {
          title: slideTitle,
          category: slideCategory,
          headline: slideHeadline,
          tagline: slideTagline,
          ctaText: slideCtaText,
          imageUrl: slideImageUrl,
          routePath: slideRoutePath,
          isIllustrativePlaceholder: slideIsPlaceholder
        });
        showNotification(`Updated carousel slide: "${slideTitle}"`);
      } else {
        await studioStore.addCarouselSlide({
          title: slideTitle,
          category: slideCategory,
          headline: slideHeadline,
          tagline: slideTagline,
          ctaText: slideCtaText,
          imageUrl: slideImageUrl,
          routePath: slideRoutePath,
          displayOrder: slides.length + 1,
          isPublished: true,
          isIllustrativePlaceholder: slideIsPlaceholder
        });
        showNotification(`Added new carousel slide: "${slideTitle}"`);
      }

      setShowSlideModal(false);
      loadData();
    } catch (err: any) {
      alert(`Error saving slide: ${err.message}`);
    }
  };

  const handleTogglePublishSlide = async (id: string, current: boolean) => {
    try {
      await studioStore.updateCarouselSlide(id, { isPublished: !current });
      showNotification(!current ? 'Slide published to homepage' : 'Slide hidden from homepage');
      loadData();
    } catch (err: any) {
      alert(`Error updating publication status: ${err.message}`);
    }
  };

  const handleDeleteSlide = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await studioStore.deleteCarouselSlide(id);
        showNotification(`Deleted slide: "${title}"`);
        loadData();
      } catch (err: any) {
        alert(`Error deleting slide: ${err.message}`);
      }
    }
  };

  const handleMoveSlide = async (id: string, direction: 'up' | 'down') => {
    try {
      await studioStore.reorderCarouselSlide(id, direction);
      loadData();
    } catch (err: any) {
      alert(`Error reordering slides: ${err.message}`);
    }
  };

  // Service Edit Handlers
  const startEditService = (s: ServiceItem) => {
    setEditingServiceId(s.id);
    setEditPrice(s.startingPrice);
    setEditDuration(s.duration);
  };

  const saveEditService = async (id: string) => {
    try {
      await studioStore.updateService(id, {
        startingPrice: editPrice,
        duration: editDuration
      });
      setEditingServiceId(null);
      showNotification('Service details updated and saved.');
      loadData();
    } catch (err: any) {
      alert(`Error updating service: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Services & Homepage Carousel
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage the cinematic homepage photography services carousel and customize service details.
          </p>
        </div>

        {activeTab === 'carousel' && (
          <button
            onClick={handleOpenAddSlide}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Carousel Slide</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('carousel')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'carousel'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Homepage Carousel Slides ({slides.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'services'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Service Inclusions & Pricing ({services.length})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: HOMEPAGE CAROUSEL MANAGEMENT                          */}
      {/* ============================================================ */}
      {activeTab === 'carousel' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-center justify-between flex-wrap gap-2">
            <span>
              <strong>Editorial Carousel Notice:</strong> These slides appear in the main cinematic carousel at the top of the homepage in the exact order below. You can move slides up/down, edit text, or replace images.
            </span>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:underline"
            >
              <span>View Live Homepage</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-semibold">
                    <th className="p-4 w-14">Order</th>
                    <th className="p-4 w-28">Preview</th>
                    <th className="p-4">Category Title & Tagline</th>
                    <th className="p-4">Target Route</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {slides.map((slide, idx) => (
                    <tr key={slide.id} className="hover:bg-stone-50/60 transition-colors">
                      {/* Order Controls */}
                      <td className="p-4">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveSlide(slide.id, 'up')}
                            className="p-1 rounded text-stone-400 hover:text-stone-900 disabled:opacity-20 transition-colors cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-stone-700">{idx + 1}</span>
                          <button
                            type="button"
                            disabled={idx === slides.length - 1}
                            onClick={() => handleMoveSlide(slide.id, 'down')}
                            className="p-1 rounded text-stone-400 hover:text-stone-900 disabled:opacity-20 transition-colors cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Image Preview */}
                      <td className="p-4">
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-stone-900 relative shadow-2xs">
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Title & Tagline */}
                      <td className="p-4">
                        <span className="font-serif font-bold text-sm text-stone-900 block">
                          {slide.title}
                        </span>
                        <p className="text-xs text-stone-500 font-light line-clamp-1 mt-0.5">
                          {slide.tagline}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="capitalize text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                            {slide.category}
                          </span>
                          {slide.isIllustrativePlaceholder && (
                            <span className="text-[10px] text-amber-800 font-medium">
                              (Illustrative Placeholder)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Route Path */}
                      <td className="p-4 font-mono text-[11px] text-stone-600">
                        <Link
                          to={slide.routePath}
                          target="_blank"
                          className="hover:text-amber-800 hover:underline flex items-center gap-1"
                        >
                          <span>{slide.routePath}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400" />
                        </Link>
                      </td>

                      {/* Publish Status */}
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublishSlide(slide.id, slide.isPublished !== false)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer ${
                            slide.isPublished !== false
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {slide.isPublished !== false ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-600" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-stone-400" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditSlide(slide)}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                            title="Edit Slide"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSlide(slide.id, slide.title)}
                            className="p-1.5 rounded-lg border border-stone-200 bg-white text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: SERVICE INCLUSIONS & PRICING TABLE                    */}
      {/* ============================================================ */}
      {activeTab === 'services' && (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-500">
                  <th className="p-4 font-semibold">Service Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Ideal Age / Subject</th>
                  <th className="p-4 font-semibold">Duration</th>
                  <th className="p-4 font-semibold">Starting Price</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {services.map(svc => (
                  <tr key={svc.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-4">
                      <span className="font-semibold text-stone-900 block">{svc.title}</span>
                      <Link
                        to={`/services/${svc.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-900 font-mono mt-0.5"
                      >
                        <span>/services/{svc.slug}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </td>
                    <td className="p-4 capitalize text-stone-600 font-medium">{svc.category}</td>
                    <td className="p-4 text-stone-700">{svc.idealAge}</td>
                    <td className="p-4 text-stone-700">
                      {editingServiceId === svc.id ? (
                        <input
                          type="text"
                          value={editDuration}
                          onChange={e => setEditDuration(e.target.value)}
                          className="px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 w-28"
                        />
                      ) : (
                        svc.duration
                      )}
                    </td>
                    <td className="p-4 tabular-nums">
                      {editingServiceId === svc.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-stone-400">₹</span>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={e => setEditPrice(Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                          />
                        </div>
                      ) : (
                        `₹${svc.startingPrice.toLocaleString('en-IN')}`
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {editingServiceId === svc.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => saveEditService(svc.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingServiceId(null)}
                            className="p-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditService(svc)}
                          className="p-1.5 border border-stone-200 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* CAROUSEL SLIDE MODAL (ADD / EDIT)                            */}
      {/* ============================================================ */}
      {showSlideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                {editingSlide ? 'Edit Carousel Slide' : 'Add Photography Carousel Slide'}
              </h3>
              <button
                onClick={() => setShowSlideModal(false)}
                className="text-stone-400 hover:text-stone-900 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Category Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding Photography"
                  value={slideTitle}
                  onChange={e => setSlideTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Discipline Category *
                  </label>
                  <select
                    value={slideCategory}
                    onChange={e => setSlideCategory(e.target.value as ShootCategory)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="baby">Baby & Child</option>
                    <option value="events">Events & Ceremonies</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="maternity">Maternity</option>
                    <option value="portraits">Family & Portraits</option>
                    <option value="photo-products">Photo Products</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Target Route *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/weddings"
                    value={slideRoutePath}
                    onChange={e => setSlideRoutePath(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Tagline / Caption *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short, evocative description (1-2 sentences)"
                  value={slideTagline}
                  onChange={e => setSlideTagline(e.target.value)}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              {/* Image Selection */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Slide Photograph *
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Image URL or choose below"
                      value={slideImageUrl}
                      onChange={e => setSlideImageUrl(e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs font-mono"
                    />
                  </div>

                  {/* Sample Asset Selector */}
                  <div className="p-2.5 bg-stone-100 rounded-xl space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">
                      Or Choose Studio Library Asset:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto">
                      {STUDIO_ASSET_OPTIONS.map((opt, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSlideImageUrl(opt.url)}
                          className={`text-left p-1.5 rounded-lg border text-[11px] truncate cursor-pointer transition-colors ${
                            slideImageUrl === opt.url
                              ? 'bg-amber-100 border-amber-400 font-semibold text-amber-950'
                              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="slidePlaceholder"
                  checked={slideIsPlaceholder}
                  onChange={e => setSlideIsPlaceholder(e.target.checked)}
                  className="rounded text-amber-800"
                />
                <label htmlFor="slidePlaceholder" className="text-xs text-stone-600 cursor-pointer">
                  Identify as illustrative studio showcase placeholder
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowSlideModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl"
                >
                  {editingSlide ? 'Save Changes' : 'Create Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
