import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { BookingLeadRecord } from '../../types';
import { MessageSquare, MessageCircle, Phone, Clock, Check, Search, Trash2, AlertTriangle } from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const AdminEnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<BookingLeadRecord[]>([]);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<BookingLeadRecord | null>(null);

  const loadData = async () => {
    await studioStore.fetchEnquiries();
    setEnquiries(studioStore.getEnquiries());
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

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await studioStore.updateEnquiryStatus(id, newStatus);
      showNotification(`Status updated to "${newStatus}"`);
      loadData();
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await studioStore.deleteEnquiry(deleteConfirm.id);
      showNotification(`Enquiry from ${deleteConfirm.parentName} removed`);
      setDeleteConfirm(null);
      loadData();
    } catch (err: any) {
      alert(`Error deleting enquiry: ${err.message}`);
    }
  };

  const filtered = enquiries.filter(enq =>
    enq.parentName.toLowerCase().includes(search.toLowerCase()) ||
    enq.phone.includes(search) ||
    enq.shootType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Client Enquiries & Leads
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Review incoming inquiries generated via WhatsApp links and website booking forms.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(enq => (
          <div
            key={enq.id}
            className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                  {enq.source}
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  {enq.receivedDate}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {enq.parentName}
                </h3>
                <a
                  href={`tel:${enq.phone}`}
                  className="text-xs text-amber-800 hover:underline font-mono font-medium"
                >
                  {enq.phone}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                <p className="text-stone-900 font-semibold">{enq.shootType}</p>
                <p className="text-stone-600 text-[11px]">
                  <strong>Baby Age / Target Date:</strong> {enq.babyAgeOrDueDate || enq.preferredDate || 'Flexible'}
                </p>
                {enq.notes && (
                  <p className="text-stone-600 text-[11px] italic pt-1 border-t border-stone-200">
                    "{enq.notes}"
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
              <select
                value={enq.status}
                onChange={e => handleStatusChange(enq.id, e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Slot Reserved">Slot Reserved</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>

              <div className="flex items-center gap-1.5">
                <a
                  href={buildWhatsAppLink(`Hello ${enq.parentName}! Replying to your enquiry for ${enq.shootType} at New Sri Laxmi Baby Photo Studio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => setDeleteConfirm(enq)}
                  className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                  title="Delete lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-700">
              <div className="p-2 bg-red-50 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Delete Enquiry
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to delete the enquiry from <strong>{deleteConfirm.parentName}</strong>?
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
