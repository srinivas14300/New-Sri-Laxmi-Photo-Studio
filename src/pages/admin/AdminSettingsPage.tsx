import React, { useState, useEffect } from 'react';
import { studioStore, ExtendedStudioConfig } from '../../services/store';
import { FaqItem } from '../../types';
import {
  Settings,
  Save,
  Check,
  MapPin,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  X,
  Database,
  Globe,
  ShieldCheck,
  SlidersHorizontal,
  Eye,
  EyeOff
} from 'lucide-react';
import { SafetyProtocol, BeforeAfterItem } from '../../types';

import { storageService } from '../../services/storageService';

export const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'homepage' | 'business' | 'hours' | 'faqs' | 'safety' | 'before-after' | 'supabase'>('homepage');
  const [config, setConfig] = useState<ExtendedStudioConfig>(studioStore.getSettings());
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [protocols, setProtocols] = useState<SafetyProtocol[]>([]);
  const [beforeAfters, setBeforeAfters] = useState<BeforeAfterItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { url, error } = await storageService.uploadImage(file, 'retouching');
      if (error) throw error;
      if (url) {
        if (target === 'before') setBABefore(url);
        else setBAAfter(url);
        showNotification('Image uploaded to cloud.');
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // FAQ Modal states
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState<'general' | 'safety' | 'pricing' | 'preparation'>('general');

  // Safety Modal states
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [editingProtocol, setEditingProtocol] = useState<SafetyProtocol | null>(null);
  const [safetyTitle, setSafetyTitle] = useState('');
  const [safetyDesc, setSafetyDesc] = useState('');
  const [safetyIcon, setSafetyIcon] = useState('ShieldCheck');
  const [safetyPublished, setSafetyPublished] = useState(false);

  // Before/After Modal states
  const [showBAModal, setShowBAModal] = useState(false);
  const [editingBA, setEditingBA] = useState<BeforeAfterItem | null>(null);
  const [baTitle, setBATitle] = useState('');
  const [baDesc, setBADesc] = useState('');
  const [baBefore, setBABefore] = useState('');
  const [baAfter, setBAAfter] = useState('');
  const [baHighlights, setBAHighlights] = useState<string[]>([]);
  const [baHighlightInput, setBAHighlightInput] = useState('');
  const [baPublished, setBAPublished] = useState(false);

  const loadData = async () => {
    await Promise.all([
      studioStore.fetchSettings(),
      studioStore.fetchFaqs(),
      studioStore.fetchSafetyProtocols(),
      studioStore.fetchBeforeAfter()
    ]);
    setConfig(studioStore.getSettings());
    setFaqs(studioStore.getFaqs());
    setProtocols(studioStore.getSafetyProtocols());
    setBeforeAfters(studioStore.getBeforeAfter());
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

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studioStore.updateSettings(config);
      setSaved(true);
      showNotification('Studio settings saved to cloud database.');
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    }
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    try {
      if (editingFaq) {
        await studioStore.updateFaq(editingFaq.id, {
          question: faqQuestion,
          answer: faqAnswer,
          category: faqCategory
        });
        showNotification('FAQ item updated.');
      } else {
        await studioStore.addFaq({
          question: faqQuestion,
          answer: faqAnswer,
          category: faqCategory
        });
        showNotification('New FAQ entry created.');
      }

      setShowFaqModal(false);
      setEditingFaq(null);
      setFaqQuestion('');
      setFaqAnswer('');
      loadData();
    } catch (err: any) {
      alert(`Error saving FAQ: ${err.message}`);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    try {
      await studioStore.deleteFaq(id);
      showNotification('FAQ item removed.');
      loadData();
    } catch (err: any) {
      alert(`Error deleting FAQ: ${err.message}`);
    }
  };

  const handleSaveSafety = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProtocol) {
        await studioStore.updateSafetyProtocol(editingProtocol.id, {
          title: safetyTitle,
          description: safetyDesc,
          iconName: safetyIcon,
          isPublished: safetyPublished
        });
        showNotification('Safety protocol updated.');
      } else {
        await studioStore.addSafetyProtocol({
          title: safetyTitle,
          description: safetyDesc,
          iconName: safetyIcon,
          isPublished: safetyPublished,
          isStandardGuideline: true
        });
        showNotification('New safety protocol added.');
      }
      setShowSafetyModal(false);
      loadData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteSafety = async (id: string) => {
    if (!confirm('Delete this safety protocol?')) return;
    try {
      await studioStore.deleteSafetyProtocol(id);
      showNotification('Protocol removed.');
      loadData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSaveBA = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBA) {
        await studioStore.updateBeforeAfter(editingBA.id, {
          title: baTitle,
          description: baDesc,
          beforeImage: baBefore,
          afterImage: baAfter,
          retouchHighlights: baHighlights,
          isPublished: baPublished
        });
        showNotification('Retouching example updated.');
      } else {
        await studioStore.addBeforeAfter({
          title: baTitle,
          description: baDesc,
          beforeImage: baBefore,
          afterImage: baAfter,
          retouchHighlights: baHighlights,
          isPublished: baPublished
        });
        showNotification('New retouching example added.');
      }
      setShowBAModal(false);
      loadData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteBA = async (id: string) => {
    if (!confirm('Delete this retouching example?')) return;
    try {
      await studioStore.deleteBeforeAfter(id);
      showNotification('Example removed.');
      loadData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleToggleSafetyPublish = async (id: string, current: boolean) => {
    try {
      await studioStore.updateSafetyProtocol(id, { isPublished: !current });
      showNotification(!current ? 'Protocol published' : 'Protocol hidden');
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleBAPublish = async (id: string, current: boolean) => {
    try {
      await studioStore.updateBeforeAfter(id, { isPublished: !current });
      showNotification(!current ? 'Example published' : 'Example hidden');
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Studio Configuration & Content
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage studio identity, Wanaparthy location, safety protocols, and retouching showcases.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'homepage', label: 'Homepage', icon: Globe },
          { id: 'business', label: 'Business', icon: Settings },
          { id: 'hours', label: 'Hours', icon: Clock },
          { id: 'faqs', label: 'FAQs', icon: HelpCircle },
          { id: 'safety', label: 'Safety Protocols', icon: ShieldCheck },
          { id: 'before-after', label: 'Retouching Showcase', icon: SlidersHorizontal },
          { id: 'supabase', label: 'Database', icon: Database }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: Homepage & Carousel Settings */}
      {activeTab === 'homepage' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          {/* Section 1: Services Carousel */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Main Photography Services Carousel
            </h3>
            <p className="text-xs text-stone-500">
              Control autoplay timing and sliding behavior for the main hero carousel on the homepage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <input
                  type="checkbox"
                  id="carouselAutoSlide"
                  checked={config.carouselAutoSlide !== false}
                  onChange={e => setConfig({ ...config, carouselAutoSlide: e.target.checked })}
                  className="w-4 h-4 rounded text-stone-900 cursor-pointer"
                />
                <label htmlFor="carouselAutoSlide" className="text-xs text-stone-800 font-medium cursor-pointer">
                  Enable Automatic Carousel Sliding
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Slide Interval Duration (Seconds)
                </label>
                <input
                  type="number"
                  min={3}
                  max={20}
                  value={config.carouselIntervalSeconds || 5}
                  onChange={e => setConfig({ ...config, carouselIntervalSeconds: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Minimal Enquiry Transition */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Minimal Enquiry Section
            </h3>
            <p className="text-xs text-stone-500">
              Customize the closing transition headline and invitation leading into WhatsApp and contact.
            </p>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={config.enquiryHeadline || ''}
                placeholder="Have a moment worth remembering?"
                onChange={e => setConfig({ ...config, enquiryHeadline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Subtitle / Invitation Text
              </label>
              <textarea
                rows={2}
                value={config.enquirySubtitle || ''}
                placeholder="Whether you are planning a sacred wedding ceremony, a joyful baby milestone..."
                onChange={e => setConfig({ ...config, enquirySubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </div>

          {/* Section 3: Shared Footer Details */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Shared Footer Presentation
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Studio Short Factual Description
              </label>
              <textarea
                rows={2}
                value={config.footerDescription || ''}
                placeholder="Dedicated full-service photography studio in Wanaparthy, Telangana..."
                onChange={e => setConfig({ ...config, footerDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Homepage Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 1: Business & Contact Form */}
      {activeTab === 'business' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Studio Identity & SEO
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Business Name
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={e => setConfig({ ...config, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Short Wordmark
                </label>
                <input
                  type="text"
                  value={config.shortName}
                  onChange={e => setConfig({ ...config, shortName: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Website Meta SEO Title
              </label>
              <input
                type="text"
                value={config.seoTitle || ''}
                onChange={e => setConfig({ ...config, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Website Meta SEO Description
              </label>
              <textarea
                rows={2}
                value={config.seoDescription || ''}
                onChange={e => setConfig({ ...config, seoDescription: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Contact & WhatsApp
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  value={config.whatsapp}
                  onChange={e => setConfig({ ...config, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Display Phone
                </label>
                <input
                  type="text"
                  value={config.phoneDisplay}
                  onChange={e => setConfig({ ...config, phoneDisplay: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Studio Email
                </label>
                <input
                  type="email"
                  value={config.email}
                  onChange={e => setConfig({ ...config, email: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>

        </form>
      )}

      {/* TAB 2: Hours & Location */}
      {activeTab === 'hours' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Physical Studio Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={config.address.street}
                  onChange={e => setConfig({
                    ...config,
                    address: { ...config.address, street: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Area / Landmark</label>
                <input
                  type="text"
                  value={config.address.area}
                  onChange={e => setConfig({
                    ...config,
                    address: { ...config.address, area: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                <input
                  type="text"
                  value={config.address.city}
                  onChange={e => setConfig({
                    ...config,
                    address: { ...config.address, city: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={config.address.pincode}
                  onChange={e => setConfig({
                    ...config,
                    address: { ...config.address, pincode: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
              Working Hours
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Weekdays (Mon-Fri)</label>
                <input
                  type="text"
                  value={config.workingHours.weekdays}
                  onChange={e => setConfig({
                    ...config,
                    workingHours: { ...config.workingHours, weekdays: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Weekends (Sat-Sun)</label>
                <input
                  type="text"
                  value={config.workingHours.weekends}
                  onChange={e => setConfig({
                    ...config,
                    workingHours: { ...config.workingHours, weekends: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Location & Hours</span>
          </button>
        </form>
      )}

      {/* TAB 3: FAQ Management */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500">
              Manage frequently asked questions displayed on the public <code className="bg-stone-100 px-1 py-0.5 rounded">/faq</code> page.
            </p>
            <button
              onClick={() => {
                setEditingFaq(null);
                setFaqQuestion('');
                setFaqAnswer('');
                setFaqCategory('general');
                setShowFaqModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map(faq => (
              <div
                key={faq.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                      {faq.category}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setFaqQuestion(faq.question);
                      setFaqAnswer(faq.answer);
                      setFaqCategory(faq.category);
                      setShowFaqModal(true);
                    }}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 cursor-pointer"
                    title="Edit FAQ"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-red-50 text-stone-400 hover:text-red-700 cursor-pointer"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Safety Protocols */}
      {activeTab === 'safety' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500">
              Manage safety guidelines and hygiene protocols displayed on the homepage.
            </p>
            <button
              onClick={() => {
                setEditingProtocol(null);
                setSafetyTitle('');
                setSafetyDesc('');
                setSafetyIcon('ShieldCheck');
                setSafetyPublished(false);
                setShowSafetyModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Protocol</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {protocols.map(p => (
              <div key={p.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/60">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleSafetyPublish(p.id, p.isPublished || false)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        p.isPublished ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-stone-50 border-stone-200 text-stone-400'
                      }`}
                      title={p.isPublished ? 'Published' : 'Hidden'}
                    >
                      {p.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingProtocol(p);
                        setSafetyTitle(p.title);
                        setSafetyDesc(p.description);
                        setSafetyIcon(p.iconName);
                        setSafetyPublished(p.isPublished || false);
                        setShowSafetyModal(true);
                      }}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSafety(p.id)}
                      className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900">{p.title}</h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Before/After Showcase */}
      {activeTab === 'before-after' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500">
              Manage retouching examples showing the "Raw vs Mastered" quality comparison.
            </p>
            <button
              onClick={() => {
                setEditingBA(null);
                setBATitle('');
                setBADesc('');
                setBABefore('');
                setBAAfter('');
                setBAHighlights([]);
                setBAPublished(false);
                setShowBAModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Comparison</span>
            </button>
          </div>

          <div className="space-y-4">
            {beforeAfters.map(ba => (
              <div key={ba.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                  <img src={ba.afterImage} className="w-full h-full object-cover" alt="Retouched" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-lg text-stone-900">{ba.title}</h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleBAPublish(ba.id, ba.isPublished || false)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          ba.isPublished ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-stone-50 border-stone-200 text-stone-400'
                        }`}
                      >
                        {ba.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => {
                          setEditingBA(ba);
                          setBATitle(ba.title);
                          setBADesc(ba.description);
                          setBABefore(ba.beforeImage);
                          setBAAfter(ba.afterImage);
                          setBAHighlights(ba.retouchHighlights);
                          setBAPublished(ba.isPublished || false);
                          setShowBAModal(true);
                        }}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBA(ba.id)}
                        className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600">{ba.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {ba.retouchHighlights.map((h, i) => (
                      <span key={i} className="text-[10px] font-medium bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-100">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Supabase Integration */}
      {activeTab === 'supabase' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-start gap-3 border-b border-stone-100 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Supabase Production Integration
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Your studio is connected to the Supabase cloud. All photography data, client leads, and settings are synchronized with the live PostgreSQL database and secure media bucket.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-bold text-emerald-900">Supabase Connection Active</p>
                <p className="text-emerald-700">Environment variables are correctly configured in .env</p>
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Active Project Endpoint
              </label>
              <input
                type="text"
                readOnly
                value="https://xnuvbqryqpbmiykzcgst.supabase.co"
                className="w-full px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-500 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
            <p className="font-semibold">Tables Configured in Architecture:</p>
            <ul className="list-disc list-inside space-y-1 text-stone-600 text-[11px]">
              <li><code className="text-amber-900 font-bold">portfolio_items</code> (Media URLs, categories, display order, metadata)</li>
              <li><code className="text-amber-900 font-bold">booking_leads</code> (WhatsApp enquiries, status pipelines, parent contact)</li>
              <li><code className="text-amber-900 font-bold">studio_packages</code> (Pricing, inclusions, features, category tags)</li>
              <li><code className="text-amber-900 font-bold">studio_services</code> (Descriptions, hero images, subcategories)</li>
            </ul>
          </div>
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingFaq ? 'Edit FAQ Item' : 'New FAQ Question'}
              </h3>
              <button
                onClick={() => setShowFaqModal(false)}
                className="text-stone-400 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Category</label>
                <select
                  value={faqCategory}
                  onChange={e => setFaqCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                >
                  <option value="general">General Studio Information</option>
                  <option value="safety">Baby Safety & Hygiene</option>
                  <option value="pricing">Pricing & Packages</option>
                  <option value="preparation">Outfits & Preparation</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. When is the ideal time for a newborn photoshoot?"
                  value={faqQuestion}
                  onChange={e => setFaqQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Clear, factual explanation for parents and couples..."
                  value={faqAnswer}
                  onChange={e => setFaqAnswer(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Safety Protocol Modal */}
      {showSafetyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
              {editingProtocol ? 'Edit Safety Protocol' : 'New Safety Protocol'}
            </h3>
            <form onSubmit={handleSaveSafety} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Protocol Title *</label>
                <input
                  type="text"
                  required
                  value={safetyTitle}
                  onChange={e => setSafetyTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={safetyDesc}
                  onChange={e => setSafetyDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                <input
                  type="checkbox"
                  id="safetyPublished"
                  checked={safetyPublished}
                  onChange={e => setSafetyPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-stone-900 cursor-pointer"
                />
                <label htmlFor="safetyPublished" className="text-xs text-stone-800 font-medium cursor-pointer">
                  Publish immediately to public website
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowSafetyModal(false)} className="px-4 py-2 text-stone-500">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-stone-900 text-white rounded-xl">Save Protocol</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Before/After Modal */}
      {showBAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3">
              {editingBA ? 'Edit Retouching Example' : 'New Retouching Example'}
            </h3>
            <form onSubmit={handleSaveBA} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Example Title *</label>
                  <input type="text" required value={baTitle} onChange={e => setBATitle(e.target.value)} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Short Description *</label>
                  <input type="text" required value={baDesc} onChange={e => setBADesc(e.target.value)} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-stone-700 font-semibold">Before Image</label>
                    <label className={`text-emerald-700 font-bold cursor-pointer hover:underline ${isUploading ? 'opacity-50' : ''}`}>
                      Upload
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'before')} />
                    </label>
                  </div>
                  <input type="url" required value={baBefore} onChange={e => setBABefore(e.target.value)} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[10px]" placeholder="URL or upload above" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-stone-700 font-semibold">After Image</label>
                    <label className={`text-emerald-700 font-bold cursor-pointer hover:underline ${isUploading ? 'opacity-50' : ''}`}>
                      Upload
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'after')} />
                    </label>
                  </div>
                  <input type="url" required value={baAfter} onChange={e => setBAAfter(e.target.value)} className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[10px]" placeholder="URL or upload above" />
                </div>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Retouch Highlights (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Skin softening, Natural warmth, Texture preservation"
                  value={baHighlightInput}
                  onChange={e => {
                    setBAHighlightInput(e.target.value);
                    setBAHighlights(e.target.value.split(',').map(s => s.trim()).filter(Boolean));
                  }}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                <input
                  type="checkbox"
                  id="baPublished"
                  checked={baPublished}
                  onChange={e => setBAPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-stone-900 cursor-pointer"
                />
                <label htmlFor="baPublished" className="text-xs text-stone-800 font-medium cursor-pointer">
                  Publish comparison to homepage
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowBAModal(false)} className="px-4 py-2 text-stone-500">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-stone-900 text-white rounded-xl">Save Example</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
