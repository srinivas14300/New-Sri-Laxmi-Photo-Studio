import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { PackageItem, ShootCategory } from '../../types';
import {
  DollarSign,
  Check,
  Edit2,
  Star,
  Plus,
  Trash2,
  X,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';

export const AdminPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PackageItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<PackageItem | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ShootCategory>('wedding');
  const [formPrice, setFormPrice] = useState(15000);
  const [formDuration, setFormDuration] = useState('3-4 Hours');
  const [formEditedPhotos, setFormEditedPhotos] = useState(30);
  const [formOutfitChanges, setFormOutfitChanges] = useState(3);
  const [formFeatures, setFormFeatures] = useState('');

  const loadData = async () => {
    await studioStore.fetchPackages();
    setPackages(studioStore.getPackages());
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

  const togglePopular = async (id: string, current: boolean | undefined) => {
    try {
      await studioStore.updatePackage(id, { isPopular: !current });
      showNotification(!current ? 'Package set as featured on website' : 'Featured highlight removed');
      loadData();
    } catch (err: any) {
      alert(`Error updating package: ${err.message}`);
    }
  };

  const handleOpenAdd = () => {
    setFormName('');
    setFormCategory('wedding');
    setFormPrice(25000);
    setFormDuration('Half Day Coverage');
    setFormEditedPhotos(50);
    setFormOutfitChanges(3);
    setFormFeatures('Complete Vedic rites coverage\nCandid bride and groom portraits\nCustom pendrive with full HD files\nArchival mini photobook');
    setShowAddModal(true);
  };

  const handleOpenEdit = (pkg: PackageItem) => {
    setEditingPkg(pkg);
    setFormName(pkg.name);
    setFormCategory(pkg.category as ShootCategory);
    setFormPrice(pkg.price);
    setFormDuration(pkg.duration);
    setFormEditedPhotos(pkg.editedPhotos);
    setFormOutfitChanges(pkg.outfitChanges);
    setFormFeatures(pkg.features.join('\n'));
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    try {
      await studioStore.addPackage({
        name: formName,
        category: formCategory,
        tagline: 'Signature studio photography collection',
        price: formPrice,
        duration: formDuration,
        editedPhotos: formEditedPhotos,
        rawPhotosIncluded: true,
        outfitChanges: formOutfitChanges,
        propsIncluded: true,
        features: formFeatures.split('\n').filter(f => f.trim() !== ''),
        isPopular: false
      });

      setShowAddModal(false);
      showNotification(`"${formName}" created and added to packages`);
      loadData();
    } catch (err: any) {
      alert(`Error adding package: ${err.message}`);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg || !formName.trim()) return;

    try {
      await studioStore.updatePackage(editingPkg.id, {
        name: formName,
        category: formCategory,
        price: formPrice,
        duration: formDuration,
        editedPhotos: formEditedPhotos,
        outfitChanges: formOutfitChanges,
        features: formFeatures.split('\n').filter(f => f.trim() !== '')
      });

      setEditingPkg(null);
      showNotification(`Package "${formName}" updated`);
      loadData();
    } catch (err: any) {
      alert(`Error updating package: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await studioStore.deletePackage(deleteConfirm.id);
      showNotification(`Package "${deleteConfirm.name}" removed`);
      setDeleteConfirm(null);
      loadData();
    } catch (err: any) {
      alert(`Error deleting package: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Packages & Investment Management
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Configure studio packages, transparent inclusions, duration, and featured badges.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Package cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className={`bg-white border rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all ${
              pkg.isPopular ? 'border-amber-700 ring-2 ring-amber-300' : 'border-stone-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-stone-100 text-stone-700 uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border border-stone-200">
                  {pkg.category}
                </span>
                {pkg.isPopular && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>Popular</span>
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  {pkg.name}
                </h3>
                <div className="font-serif text-3xl font-bold text-stone-900 tabular-nums mt-1">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-600 space-y-1.5 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-medium text-stone-900">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Retouched Photos:</span>
                  <span className="font-medium text-stone-900">{pkg.editedPhotos} High-Res</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Raw Originals:</span>
                  <span className="font-medium text-stone-900">{pkg.rawPhotosIncluded ? 'Included' : 'Optional'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Theme / Outfits:</span>
                  <span className="font-medium text-stone-900">{pkg.outfitChanges} setups</span>
                </div>
              </div>

              {pkg.features && pkg.features.length > 0 && (
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-[11px] font-semibold text-stone-700 mb-1">Key Deliverables:</p>
                  <ul className="text-[11px] text-stone-600 space-y-1">
                    {pkg.features.slice(0, 3).map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-700">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
              <button
                onClick={() => togglePopular(pkg.id, pkg.isPopular)}
                className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>{pkg.isPopular ? 'Featured on Site' : 'Feature Package'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Edit package"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(pkg)}
                  className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                  title="Delete package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Package Modal */}
      {(showAddModal || editingPkg) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingPkg ? 'Edit Package Details' : 'Create Studio Package'}
              </h3>
              <button
                onClick={() => { setShowAddModal(false); setEditingPkg(null); }}
                className="text-stone-400 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingPkg ? handleSaveEdit : handleSaveAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Package Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Telugu Wedding Collection"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  >
                    <option value="wedding">Weddings</option>
                    <option value="events">Ceremonies & Events</option>
                    <option value="baby">Baby & Newborn</option>
                    <option value="maternity">Maternity</option>
                    <option value="portraits">Fine Art Portraits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Duration</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={e => setFormDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Edited Photos</label>
                  <input
                    type="number"
                    value={formEditedPhotos}
                    onChange={e => setFormEditedPhotos(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Theme Setups</label>
                  <input
                    type="number"
                    value={formOutfitChanges}
                    onChange={e => setFormOutfitChanges(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Inclusions (One per line)</label>
                <textarea
                  rows={4}
                  value={formFeatures}
                  onChange={e => setFormFeatures(e.target.value)}
                  placeholder="Flush-mount silk album&#10;All high-resolution edited pictures&#10;Private cloud download gallery"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingPkg(null); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {editingPkg ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
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
              Are you sure you want to delete package <strong>"{deleteConfirm.name}"</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Delete Package
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
