import React, { useState, useEffect } from 'react';
import { studioStore, ExtendedPortfolioItem } from '../../services/store';
import { ShootCategory } from '../../types';
import {
  Image,
  Plus,
  Trash2,
  Check,
  Star,
  Eye,
  EyeOff,
  Edit2,
  X,
  Search,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Upload,
  Loader2
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import {
  WEDDING_IMAGE,
  PREWEDDING_IMAGE,
  CEREMONY_IMAGE,
  HERO_IMAGE,
  NEWBORN_IMAGE,
  SITTER_IMAGE,
  CAKE_SMASH_IMAGE,
  MATERNITY_IMAGE,
  TODDLER_IMAGE,
  PRODUCTS_IMAGE
} from '../../data/mockData';

const SAMPLE_ASSETS = [
  { label: 'Telugu Wedding Rites', url: WEDDING_IMAGE },
  { label: 'Romantic Pre-Wedding', url: PREWEDDING_IMAGE },
  { label: 'Cradle & Namakaranam', url: CEREMONY_IMAGE },
  { label: 'Newborn Crescent Moon', url: HERO_IMAGE },
  { label: 'Sitter Wooden Tub', url: SITTER_IMAGE },
  { label: '1st Birthday Cake Smash', url: CAKE_SMASH_IMAGE },
  { label: 'Fine Art Maternity Gown', url: MATERNITY_IMAGE },
  { label: 'Studio Child Portrait', url: TODDLER_IMAGE },
  { label: 'Archival Album & Frames', url: PRODUCTS_IMAGE }
];

export const AdminPortfolioPage: React.FC = () => {
  const [items, setItems] = useState<ExtendedPortfolioItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { url, error } = await storageService.uploadImage(file, 'portfolio');
      if (error) throw error;
      if (url) {
        setFormImage(url);
        showNotification('Image uploaded successfully to cloud storage.');
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMapsImportModal, setShowMapsImportModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ExtendedPortfolioItem | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<ExtendedPortfolioItem | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<ShootCategory>('wedding');
  const [formAge, setFormAge] = useState('');
  const [formTheme, setFormTheme] = useState('');
  const [formImage, setFormImage] = useState(WEDDING_IMAGE);
  const [formCloudinaryId, setFormCloudinaryId] = useState('');
  const [formAssetSource, setFormAssetSource] = useState<'studio' | 'external_illustrative'>('studio');
  const [formDescription, setFormDescription] = useState('');

  // Maps import states
  const [mapsImportUrl, setMapsImportUrl] = useState('');
  const [mapsImportTitle, setMapsImportTitle] = useState('');
  const [mapsImportCategory, setMapsImportCategory] = useState<ShootCategory>('wedding');

  const handleMapsImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapsImportUrl.trim() || !mapsImportTitle.trim()) return;

    try {
      await studioStore.addPortfolioItem({
        title: mapsImportTitle,
        category: mapsImportCategory,
        categoryLabel: mapsImportCategory.charAt(0).toUpperCase() + mapsImportCategory.slice(1),
        ageGroup: 'Studio Archive',
        theme: 'Google Maps Business Gallery',
        imageUrl: mapsImportUrl.trim(),
        aspectRatio: '4:3',
        description: 'Authentic studio photograph imported directly from Google Maps business gallery.',
        featured: true,
        isPublished: true,
        isIllustrativePlaceholder: false
      });

      setShowMapsImportModal(false);
      setMapsImportUrl('');
      setMapsImportTitle('');
      setFormCloudinaryId('');
      setFormAssetSource('studio');
      showNotification(`Successfully imported "${mapsImportTitle}" from Google Maps business gallery.`);
      loadItems();
    } catch (err: any) {
      alert(`Error importing from Google Maps: ${err.message}`);
    }
  };

  const loadItems = async () => {
    await studioStore.fetchPortfolio();
    setItems(studioStore.getPortfolio());
  };

  useEffect(() => {
    loadItems();
    window.addEventListener('studio_storage_update', loadItems);
    return () => window.removeEventListener('studio_storage_update', loadItems);
  }, []);

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = search.trim() === '' ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.theme.toLowerCase().includes(search.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTogglePublish = async (id: string, current: boolean | undefined) => {
    try {
      await studioStore.updatePortfolioItem(id, { isPublished: !current });
      showNotification(!current ? 'Photograph published to website' : 'Photograph hidden from public site');
      loadItems();
    } catch (err: any) {
      alert(`Error updating publication status: ${err.message}`);
    }
  };

  const handleToggleFeatured = async (id: string, current: boolean | undefined) => {
    try {
      await studioStore.updatePortfolioItem(id, { featured: !current });
      showNotification(!current ? 'Marked as featured hero work' : 'Removed from featured spotlight');
      loadItems();
    } catch (err: any) {
      alert(`Error updating featured status: ${err.message}`);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    try {
      await studioStore.reorderPortfolioItem(id, direction);
      loadItems();
    } catch (err: any) {
      alert(`Error reordering portfolio: ${err.message}`);
    }
  };

  const handleOpenAdd = () => {
    setFormTitle('');
    setFormCategory('wedding');
    setFormAge('Wedding Session');
    setFormTheme('Traditional Telugu Muhurtham');
    setFormImage(WEDDING_IMAGE);
    setFormCloudinaryId('');
    setFormAssetSource('studio');
    setFormDescription('High-resolution documentary wedding photography.');
    setShowAddModal(true);
  };

  const handleOpenEdit = (item: ExtendedPortfolioItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormAge(item.ageGroup);
    setFormTheme(item.theme);
    setFormImage(item.imageUrl);
    setFormCloudinaryId(item.cloudinaryPublicId || '');
    setFormAssetSource(item.assetSource || 'studio');
    setFormDescription(item.description || '');
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    try {
      await studioStore.addPortfolioItem({
        title: formTitle,
        category: formCategory,
        categoryLabel: formCategory.charAt(0).toUpperCase() + formCategory.slice(1),
        ageGroup: formAge || 'Studio Session',
        theme: formTheme || 'Signature Portrait Collection',
        imageUrl: formImage,
        cloudinaryPublicId: formCloudinaryId || undefined,
        assetSource: formAssetSource,
        aspectRatio: '4:3',
        description: formDescription,
        featured: true,
        isPublished: true,
        isIllustrativePlaceholder: formAssetSource === 'external_illustrative'
      });

      setShowAddModal(false);
      showNotification(`"${formTitle}" added to studio portfolio`);
      loadItems();
    } catch (err: any) {
      alert(`Error adding item: ${err.message}`);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !formTitle.trim()) return;

    try {
      const success = await studioStore.updatePortfolioItem(editingItem.id, {
        title: formTitle,
        category: formCategory,
        categoryLabel: formCategory.charAt(0).toUpperCase() + formCategory.slice(1),
        ageGroup: formAge,
        theme: formTheme,
        imageUrl: formImage,
        cloudinaryPublicId: formCloudinaryId || undefined,
        assetSource: formAssetSource,
        isIllustrativePlaceholder: formAssetSource === 'external_illustrative',
        description: formDescription
      });

      if (success) {
        setEditingItem(null);
        showNotification(`Changes to "${formTitle}" saved`);
        loadItems();
      }
    } catch (err: any) {
      alert(`Error updating item: ${err.message}`);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmItem) return;
    try {
      const success = await studioStore.deletePortfolioItem(deleteConfirmItem.id);
      if (success) {
        showNotification(`Removed "${deleteConfirmItem.title}" from portfolio`);
        setDeleteConfirmItem(null);
        loadItems();
      }
    } catch (err: any) {
      alert(`Error deleting item: ${err.message}`);
    }
  };

  const [isDeletingCloudinary, setIsDeletingCloudinary] = useState(false);
  const handlePermanentDelete = async () => {
    if (!deleteConfirmItem) return;
    
    if (deleteConfirmItem.cloudinaryPublicId) {
      const confirmPerm = confirm("This will PERMANENTLY DELETE the asset from Cloudinary storage. This cannot be undone. Proceed?");
      if (!confirmPerm) return;

      setIsDeletingCloudinary(true);
      try {
        const { success, error } = await storageService.deleteCloudinaryAsset(deleteConfirmItem.cloudinaryPublicId);
        if (error) throw error;
        if (success) {
          showNotification('Cloudinary asset deleted successfully.');
        }
      } catch (err: any) {
        alert(`Cloudinary deletion failed: ${err.message}`);
        setIsDeletingCloudinary(false);
        return;
      }
    }

    try {
      const success = await studioStore.deletePortfolioItem(deleteConfirmItem.id);
      if (success) {
        showNotification(`Removed "${deleteConfirmItem.title}" from website`);
        setDeleteConfirmItem(null);
        loadItems();
      }
    } catch (err: any) {
      alert(`Error deleting item record: ${err.message}`);
    } finally {
      setIsDeletingCloudinary(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Portfolio Gallery Management
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Curate photographs across all 7 studio disciplines. Changes save immediately to browser storage.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowMapsImportModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Image className="w-4 h-4" />
            <span>Google Maps Photo Import</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photograph</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, theme, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'wedding', label: 'Weddings' },
            { id: 'pre-wedding', label: 'Pre-Wedding' },
            { id: 'events', label: 'Events' },
            { id: 'baby', label: 'Baby' },
            { id: 'newborn', label: 'Newborn' },
            { id: 'maternity', label: 'Maternity' },
            { id: 'portraits', label: 'Portraits' },
            { id: 'birthday', label: 'Cake Smash' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filter === cat.id
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all ${
              item.isPublished === false ? 'opacity-60 border-stone-300' : 'border-stone-200'
            }`}
          >
            <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden group">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-black/75 text-amber-300 text-[10px] font-semibold uppercase px-2 py-0.5 rounded backdrop-blur-xs">
                {item.categoryLabel}
              </span>

              {item.featured && (
                <span className="absolute top-3 right-3 bg-amber-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-white text-white" />
                  <span>Featured</span>
                </span>
              )}

              {item.assetSource === 'studio' ? (
                <span className="absolute bottom-3 left-3 bg-emerald-800 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 shadow-xs">
                  Studio Work
                </span>
              ) : (
                <span className="absolute bottom-3 left-3 bg-stone-500 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 shadow-xs">
                  Illustrative
                </span>
              )}

              {item.isPublished === false && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider">
                  Unpublished / Hidden
                </div>
              )}
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-500 truncate mt-0.5">
                  Theme: {item.theme}
                </p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-400">
                  <span>Subject: {item.ageGroup}</span>
                  <span>·</span>
                  <span className="capitalize">{item.category}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {/* Toggle publish */}
                  <button
                    onClick={() => handleTogglePublish(item.id, item.isPublished !== false)}
                    className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                      item.isPublished !== false
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-stone-200 bg-stone-100 text-stone-500'
                    }`}
                    title={item.isPublished !== false ? 'Published (Click to hide)' : 'Hidden (Click to publish)'}
                  >
                    {item.isPublished !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* Toggle featured */}
                  <button
                    onClick={() => handleToggleFeatured(item.id, item.featured)}
                    className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                      item.featured
                        ? 'border-amber-200 bg-amber-50 text-amber-800'
                        : 'border-stone-200 bg-white text-stone-400 hover:text-stone-700'
                    }`}
                    title="Toggle Featured Work"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                    title="Edit photograph metadata"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Reorder Up / Down */}
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => handleReorder(item.id, 'up')}
                      disabled={filteredItems.indexOf(item) === 0}
                      className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-20 transition-colors cursor-pointer"
                      title="Move Up in Gallery"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleReorder(item.id, 'down')}
                      disabled={filteredItems.indexOf(item) === filteredItems.length - 1}
                      className="p-1 text-stone-500 hover:text-stone-900 hover:bg-stone-100 disabled:opacity-20 transition-colors cursor-pointer"
                      title="Move Down in Gallery"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => setDeleteConfirmItem(item)}
                  className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                  title="Delete photograph"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingItem ? 'Edit Photograph Details' : 'Add Studio Photograph'}
              </h3>
              <button
                onClick={() => { setShowAddModal(false); setEditingItem(null); }}
                className="text-stone-400 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingItem ? handleSaveEdit : handleSaveAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Photograph Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Celestial Moon Swaddle"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  >
                    <option value="wedding">Weddings</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="events">Events & Cradle</option>
                    <option value="baby">Baby & Milestones</option>
                    <option value="newborn">Newborn</option>
                    <option value="maternity">Maternity</option>
                    <option value="portraits">Fine Art Portraits</option>
                    <option value="birthday">Cake Smash & 1st B'day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Subject / Age</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Days Old or Wedding Couple"
                    value={formAge}
                    onChange={e => setFormAge(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Asset Source *</label>
                  <select
                    value={formAssetSource}
                    onChange={e => setFormAssetSource(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  >
                    <option value="studio">Studio (Genuine Work)</option>
                    <option value="external_illustrative">External (Illustrative)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Cloudinary Public ID</label>
                  <input
                    type="text"
                    placeholder="Optional: for secure deletion"
                    value={formCloudinaryId}
                    onChange={e => setFormCloudinaryId(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Theme / Setup</label>
                <input
                  type="text"
                  placeholder="e.g. Handcrafted Wooden Crescent Moon & Warm Lighting"
                  value={formTheme}
                  onChange={e => setFormTheme(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              {/* Image Selection & Upload */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-stone-700 font-semibold mb-1">Photograph Image</label>
                  <label className={`cursor-pointer inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{isUploading ? 'Uploading...' : 'Upload Real Studio Photo'}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl">
                   <div className="flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 shrink-0 shadow-inner">
                        <img src={formImage} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">Active Image URL:</p>
                        <p className="text-[10px] font-mono text-stone-400 break-all line-clamp-2 leading-tight bg-white p-1.5 rounded border border-stone-100">{formImage}</p>
                      </div>
                   </div>
                </div>

                <div>
                  <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider mb-2">Or select from studio assets:</p>
                  <div className="grid grid-cols-5 gap-2 max-h-24 overflow-y-auto p-1.5 bg-stone-50 rounded-xl border border-stone-200">
                    {SAMPLE_ASSETS.map((asset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormImage(asset.url)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          formImage === asset.url ? 'border-amber-700 ring-2 ring-amber-400' : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img src={asset.url} alt={asset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Editorial Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Short note about camera setup, warmth, or traditional context..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingItem(null); }}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  {editingItem ? 'Save Changes' : 'Add to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-700">
              <div className="p-2 bg-red-50 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to remove <strong>"{deleteConfirmItem.title}"</strong> from the studio portfolio? This action updates your local studio store.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                Remove from Website
              </button>
              <button
                onClick={handlePermanentDelete}
                disabled={isDeletingCloudinary}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-colors disabled:opacity-50"
              >
                {isDeletingCloudinary ? 'Deleting...' : 'Permanent Delete (Cloudinary)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Business Gallery Import Modal */}
      {showMapsImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Import Google Maps Business Gallery Photo
              </h3>
              <button
                onClick={() => setShowMapsImportModal(false)}
                className="text-stone-400 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
              <strong>Google Maps Photo Import Workflow:</strong> Since Google Maps restricts direct background CDN image scraping, you can open your Google Maps business listing, right-click any authentic studio photograph, select "Copy image address", and paste it below with its title and category.
            </div>

            <form onSubmit={handleMapsImportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Photograph Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Telugu Wedding Ritual"
                  value={mapsImportTitle}
                  onChange={e => setMapsImportTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Category *
                </label>
                <select
                  value={mapsImportCategory}
                  onChange={e => setMapsImportCategory(e.target.value as ShootCategory)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs"
                >
                  <option value="wedding">Wedding</option>
                  <option value="pre-wedding">Pre-Wedding</option>
                  <option value="events">Events & Ceremonies</option>
                  <option value="baby">Baby & Newborn</option>
                  <option value="maternity">Maternity</option>
                  <option value="portraits">Family & Portraits</option>
                  <option value="photo-products">Photo Products</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Direct Image URL (from Google Maps or Studio Storage) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://lh3.googleusercontent.com/... or your image URL"
                  value={mapsImportUrl}
                  onChange={e => setMapsImportUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowMapsImportModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  Import & Publish Photograph
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
