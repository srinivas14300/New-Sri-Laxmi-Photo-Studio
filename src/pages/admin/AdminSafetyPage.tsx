import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { SafetyProtocol } from '../../types';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Eye,
  EyeOff,
  Sparkles,
  ThermometerSun,
  Clock,
  Shield
} from 'lucide-react';

const ICON_OPTIONS = [
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'ThermometerSun', icon: ThermometerSun },
  { name: 'Clock', icon: Clock },
  { name: 'Shield', icon: Shield }
];

export const AdminSafetyPage: React.FC = () => {
  const [protocols, setProtocols] = useState<SafetyProtocol[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SafetyProtocol | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<SafetyProtocol | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formIcon, setFormIcon] = useState('ShieldCheck');
  const [formIsStandard, setFormIsStandard] = useState(true);
  const [formIsPublished, setFormIsPublished] = useState(false);

  const loadData = async () => {
    await studioStore.fetchSafetyProtocols();
    setProtocols(studioStore.getSafetyProtocols());
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

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormDescription('');
    setFormIcon('ShieldCheck');
    setFormIsStandard(true);
    setFormIsPublished(false);
    setShowModal(true);
  };

  const handleOpenEdit = (item: SafetyProtocol) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormDescription(item.description);
    setFormIcon(item.iconName);
    setFormIsStandard(item.isStandardGuideline ?? true);
    setFormIsPublished(item.isPublished ?? false);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    try {
      if (editingItem) {
        await studioStore.updateSafetyProtocol(editingItem.id, {
          title: formTitle,
          description: formDescription,
          iconName: formIcon,
          isStandardGuideline: formIsStandard,
          isPublished: formIsPublished
        });
        showNotification(`Updated: "${formTitle}"`);
      } else {
        await studioStore.addSafetyProtocol({
          title: formTitle,
          description: formDescription,
          iconName: formIcon,
          isStandardGuideline: formIsStandard,
          isPublished: formIsPublished
        });
        showNotification(`Added new safety protocol: "${formTitle}"`);
      }
      setShowModal(false);
      loadData();
    } catch (err: any) {
      alert(`Error saving protocol: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      await studioStore.deleteSafetyProtocol(deleteConfirmItem.id);
      showNotification(`Removed safety protocol: "${deleteConfirmItem.title}"`);
      setDeleteConfirmItem(null);
      loadData();
    } catch (err: any) {
      alert(`Error deleting protocol: ${err.message}`);
    }
  };

  const handleTogglePublish = async (id: string, current: boolean | undefined) => {
    try {
      await studioStore.updateSafetyProtocol(id, { isPublished: !current });
      showNotification(!current ? 'Protocol published to website' : 'Protocol hidden from website');
      loadData();
    } catch (err: any) {
      alert(`Error updating publication status: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Safety & Hygiene Protocols
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage the studio safety guidelines displayed to parents and clients.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Protocol</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protocols.map(item => {
          const IconComp = ICON_OPTIONS.find(o => o.name === item.iconName)?.icon || Shield;
          return (
            <div key={item.id} className={`bg-white border rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between ${!item.isPublished ? 'opacity-60 border-stone-300' : 'border-stone-200'}`}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-100">
                    <IconComp className="w-5 h-5" />
                  </div>
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
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">{item.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed mt-1">{item.description}</p>
                </div>
                {item.isStandardGuideline && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600">
                    Standard Guideline
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-50">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmItem(item)}
                  className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingItem ? 'Edit Safety Protocol' : 'Add Safety Protocol'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Protocol Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-2">Visual Icon</label>
                <div className="flex gap-2">
                  {ICON_OPTIONS.map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setFormIcon(opt.name)}
                        className={`p-2 rounded-lg border transition-all ${
                          formIcon === opt.name ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs' : 'bg-white border-stone-200 text-stone-400 hover:bg-stone-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsStandard}
                    onChange={e => setFormIsStandard(e.target.checked)}
                    className="rounded text-amber-800"
                  />
                  <span>Identify as standard studio guideline</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsPublished}
                    onChange={e => setFormIsPublished(e.target.checked)}
                    className="rounded text-emerald-800"
                  />
                  <span>Publish to website public view</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-stone-500">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-stone-900 text-white rounded-xl font-semibold shadow-xs">
                  {editingItem ? 'Save Changes' : 'Add Protocol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-serif font-bold text-base text-stone-900">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-stone-600">Are you sure you want to remove <strong>"{deleteConfirmItem.title}"</strong>?</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setDeleteConfirmItem(null)} className="px-3.5 py-2 text-xs font-medium text-stone-600">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl shadow-xs">Delete Protocol</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
