import React, { useState, useEffect } from 'react';
import { studioStore } from '../../services/store';
import { BookingLeadRecord } from '../../types';
import {
  Calendar,
  Search,
  Filter,
  MessageCircle,
  Check,
  Clock,
  Trash2,
  Plus,
  AlertTriangle,
  X
} from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const AdminBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingLeadRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<BookingLeadRecord | null>(null);

  // New booking form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newShootType, setNewShootType] = useState('Wedding Photography');
  const [newDate, setNewDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const loadData = async () => {
    await studioStore.fetchEnquiries();
    setBookings(studioStore.getEnquiries());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', loadData);
    return () => window.removeEventListener('studio_storage_update', loadData);
  }, []);

  const statuses = ['All', 'New', 'Contacted', 'Slot Reserved', 'Shoot Completed', 'Archived'];

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesSearch = search.trim() === '' ||
      b.parentName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.shootType.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const showNotification = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const updateStatus = async (id: string, newStatus: any) => {
    try {
      await studioStore.updateEnquiryStatus(id, newStatus);
      showNotification(`Status updated to "${newStatus}"`);
      loadData();
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    try {
      await studioStore.addEnquiry({
        parentName: newName,
        phone: newPhone,
        shootType: newShootType,
        babyAgeOrDueDate: 'Booked Appointment',
        preferredDate: newDate || 'Scheduled Date',
        notes: newNotes,
        status: 'Slot Reserved',
        source: 'Web Contact Form'
      });

      setShowAddModal(false);
      setNewName('');
      setNewPhone('');
      setNewNotes('');
      setNewDate('');
      showNotification(`Reservation for ${newName} created`);
      loadData();
    } catch (err: any) {
      alert(`Error creating booking: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await studioStore.deleteEnquiry(deleteConfirm.id);
      showNotification(`Lead for ${deleteConfirm.parentName} removed`);
      setDeleteConfirm(null);
      loadData();
    } catch (err: any) {
      alert(`Error deleting record: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Bookings & Shoot Pipeline
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Track confirmed appointments, reserved slots, and shoot day preparations across Wanaparthy.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Studio Booking</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === s
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-500">
                <th className="p-4 font-semibold">Client / Parent</th>
                <th className="p-4 font-semibold">Shoot Details</th>
                <th className="p-4 font-semibold">Preferred / Booked Date</th>
                <th className="p-4 font-semibold">Pipeline Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredBookings.map(b => (
                <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-stone-900">{b.parentName}</p>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">{b.phone}</p>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">{b.source}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-stone-900">{b.shootType}</p>
                    {b.notes && (
                      <p className="text-[11px] text-stone-500 italic mt-0.5 line-clamp-1">"{b.notes}"</p>
                    )}
                  </td>
                  <td className="p-4 text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-medium">{b.preferredDate || 'Flexible'}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Rec: {b.receivedDate}</span>
                  </td>
                  <td className="p-4">
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b.id, e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 font-medium cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Slot Reserved">Slot Reserved</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shoot Completed">Shoot Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={buildWhatsAppLink(`Hello ${b.parentName}! Confirming your photo session (${b.shootType}) at New Sri Laxmi Baby Photo Studio.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setDeleteConfirm(b)}
                        className="p-1.5 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Create Studio Booking
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Client / Parent Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sravanthi Reddy"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Contact Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98480 22338"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-mono focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Shoot Discipline</label>
                  <select
                    value={newShootType}
                    onChange={e => setNewShootType(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  >
                    <option value="Wedding Photography">Weddings</option>
                    <option value="Pre-Wedding Couple Shoot">Pre-Wedding</option>
                    <option value="Naming / Cradle Ceremony">Cradle Ceremony</option>
                    <option value="Baby Newborn Swaddle">Newborn Swaddle</option>
                    <option value="1st Birthday Cake Smash">1st Birthday Smash</option>
                    <option value="Fine Art Maternity">Fine Art Maternity</option>
                    <option value="Family Studio Portrait">Family Portraits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Target Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Nov 25, 2026"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Session Notes</label>
                <textarea
                  rows={2}
                  placeholder="Theme preference, baby sleeping habits, or venue location..."
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Booking
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
                Delete Booking Lead
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to delete the record for <strong>{deleteConfirm.parentName}</strong>?
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
