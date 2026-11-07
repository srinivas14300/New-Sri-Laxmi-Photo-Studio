import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { BeforeAfterItem } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  ArrowRight,
  Upload,
  Loader2
} from 'lucide-react';
import { storageService } from '../../services/storageService';

export const AdminBeforeAfterPage: React.FC = () => {
  const [items, setItems] = useState<BeforeAfterItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BeforeAfterItem | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<BeforeAfterItem | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBeforeImage, setFormBeforeImage] = useState('');
  const [formAfterImage, setFormAfterImage] = useState('');
  const [formHighlights, setFormHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [formIsPublished, setFormIsPublished] = useState(false);
  
  const [isUploading, setIsUploading] = useState<'before' | 'after' | null>(null);

  const loadData = async () => {
    await studioStore.fetchBeforeAfter();
    setItems(studioStore.getBeforeAfter());
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(target);
    try {
      const { url, error } = await storageService.uploadImage(file, 'retouching');
      if (error) throw error;
      if (url) {
        if (target === 'before') setFormBeforeImage(url);
        else setFormAfterImage(url);
        showNotification(`${target.charAt(0).toUpperCase() + target.slice(1)} image uploaded.`);
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(null);
    }
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormDescription('');
    setFormBeforeImage('');
    setFormAfterImage('');
    setFormHighlights([]);
    setFormIsPublished(false);
    setShowModal(true);
  };

  const handleOpenEdit = (item: BeforeAfterItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormBeforeImage(item.beforeImage);
    setFormAfterImage(item.afterImage);
    setFormHighlights(item.retouchHighlights || []);
    setFormIsPublished(item.isPublished ?? false);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formBeforeImage || !formAfterImage) return;

    try {
      if (editingItem) {
        await studioStore.updateBeforeAfter(editingItem.id, {
          title: formTitle,
          description: formDescription,
          beforeImage: formBeforeImage,
          afterImage: formAfterImage,
          retouchHighlights: formHighlights,
          isPublished: formIsPublished
        });
        showNotification(`Updated: "${formTitle}"`);
      } else {
        await studioStore.addBeforeAfter({
          title: formTitle,
          description: formDescription,
          beforeImage: formBeforeImage,
          afterImage: formAfterImage,
          retouchHighlights: formHighlights,
          isPublished: formIsPublished
        });
        showNotification(`Added new showcase: "${formTitle}"`);
      }
      setShowModal(false);
      loadData();
    } catch (err: any) {
      alert(`Error saving showcase: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      await studioStore.deleteBeforeAfter(deleteConfirmItem.id);
      showNotification(`Removed showcase: "${deleteConfirmItem.title}"`);
      setDeleteConfirmItem(null);
      loadData();
    } catch (err: any) {
      alert(`Error deleting showcase: ${err.message}`);
    }
  };

  const handleTogglePublish = async (id: string, current: boolean | undefined) => {
    try {
      await studioStore.updateBeforeAfter(id, { isPublished: !current });
      showNotification(!current ? 'Showcase published' : 'Showcase hidden');
      loadData();
    } catch (err: any) {
      alert(`Error updating publication status: ${err.message}`);
    }
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormHighlights([...formHighlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const removeHighlight = (idx: number) => {
    setFormHighlights(formHighlights.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Retouching Showcase (Before/After)
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Display your professional photo editing and color grading excellence.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Showcase</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {items.map(item => (
          <div key={item.id} className={`bg-white border rounded-3xl overflow-hidden shadow-xs flex flex-col ${!item.isPublished ? 'opacity-60 border-stone-300' : 'border-stone-200'}`}>
            <div className="grid grid-cols-2 bg-stone-100 relative">
              <div className="aspect-[4/5] relative">
                <img src={item.beforeImage} className="w-full h-full object-cover" alt="Before" />
                <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">BEFORE</span>
              </div>
              <div className="aspect-[4/5] relative">
                <img src={item.afterImage} className="w-full h-full object-cover" alt="After" />
                <span className="absolute bottom-3 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">AFTER</span>
              </div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-stone-900 border border-stone-200/50">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-900">{item.title}</h3>
                  <button
                    onClick={() => handleTogglePublish(item.id, item.isPublished)}
                    className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                      item.isPublished
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-stone-200 bg-stone-100 text-stone-500'
                    }`}
                  >
                    {item.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.retouchHighlights.map((h, idx) => (
                    <span key={idx} className="px-2 py-1 bg-stone-100 text-stone-500 text-[10px] rounded-lg border border-stone-200">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-50">
                <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-stone-500 hover:text-stone-900"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setDeleteConfirmItem(item)} className="p-1.5 text-stone-400 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingItem ? 'Edit Retouching Showcase' : 'Add Retouching Showcase'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Showcase Title *</label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={e => setFormTitle(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formDescription}
                      onChange={e => setFormDescription(e.target.value)}
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-2">Retouching Highlights</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newHighlight}
                        onChange={e => setNewHighlight(e.target.value)}
                        placeholder="e.g. Skin Smoothing"
                        className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                      />
                      <button type="button" onClick={addHighlight} className="p-2 bg-stone-900 text-white rounded-xl"><Plus className="w-4 h-4" /></button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {formHighlights.map((h, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-100">
                          {h}
                          <button type="button" onClick={() => removeHighlight(idx)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      checked={formIsPublished}
                      onChange={e => setFormIsPublished(e.target.checked)}
                      className="rounded text-emerald-800"
                    />
                    <span className="font-semibold">Publish to website</span>
                  </label>
                </div>

                <div className="space-y-5">
                  {/* Before Image */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-stone-700">Before Image *</label>
                      <label className="cursor-pointer text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1">
                        {isUploading === 'before' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>{isUploading === 'before' ? 'Uploading...' : 'Upload'}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'before')} />
                      </label>
                    </div>
                    <div className="aspect-video rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden relative">
                      {formBeforeImage ? (
                        <img src={formBeforeImage} className="w-full h-full object-cover" alt="Before" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 italic">No image selected</div>
                      )}
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-stone-700">After Image *</label>
                      <label className="cursor-pointer text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1">
                        {isUploading === 'after' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>{isUploading === 'after' ? 'Uploading...' : 'Upload'}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'after')} />
                      </label>
                    </div>
                    <div className="aspect-video rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden relative">
                      {formAfterImage ? (
                        <img src={formAfterImage} className="w-full h-full object-cover" alt="After" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 italic">No image selected</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-stone-500">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-stone-900 text-white rounded-xl font-semibold shadow-xs">
                  {editingItem ? 'Save Changes' : 'Create Showcase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-stone-200">
            <div className="flex items-center gap-3 text-red-700">
              <div className="p-2 bg-red-50 rounded-xl"><AlertTriangle className="w-5 h-5 text-red-600" /></div>
              <h3 className="font-serif font-bold text-base text-stone-900">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-stone-600">Are you sure you want to remove <strong>"{deleteConfirmItem.title}"</strong>?</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirmItem(null)} className="px-3.5 py-2 text-xs font-medium text-stone-600">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl shadow-xs">Delete Showcase</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
