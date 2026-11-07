import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studioStore, ExtendedPortfolioItem } from '../../services/store';
import { BookingLeadRecord } from '../../types';
import {
  Image,
  Layers,
  DollarSign,
  Sparkles,
  Calendar,
  MessageSquare,
  ArrowRight,
  Database,
  ExternalLink,
  Phone,
  CheckCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { buildWhatsAppLink } from '../../config/studioConfig';

export const AdminDashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<BookingLeadRecord[]>([]);
  const [portfolio, setPortfolio] = useState<ExtendedPortfolioItem[]>([]);
  const [servicesCount, setServicesCount] = useState(0);
  const [packagesCount, setPackagesCount] = useState(0);
  const [safetyCount, setSafetyCount] = useState(0);
  const [baCount, setBaCount] = useState(0);

  const [isSyncing, setIsSyncing] = useState(false);

  const loadData = async () => {
    setIsSyncing(true);
    try {
      await studioStore.syncAll();
      setLeads(studioStore.getEnquiries());
      setPortfolio(studioStore.getPortfolio());
      setServicesCount(studioStore.getServices().length);
      setPackagesCount(studioStore.getPackages().length);
      setSafetyCount(studioStore.getSafetyProtocols().length);
      setBaCount(studioStore.getBeforeAfter().length);
    } catch (err) {
      console.error('Dashboard sync error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('studio_storage_update', () => {
      setLeads(studioStore.getEnquiries());
      setPortfolio(studioStore.getPortfolio());
      setServicesCount(studioStore.getServices().length);
      setPackagesCount(studioStore.getPackages().length);
      setSafetyCount(studioStore.getSafetyProtocols().length);
      setBaCount(studioStore.getBeforeAfter().length);
    });
  }, []);

  const stats = [
    { label: 'Active Leads', count: leads.length, icon: MessageSquare, to: '/admin/enquiries', color: 'text-amber-800' },
    { label: 'Portfolio Photos', count: portfolio.length, icon: Image, to: '/admin/portfolio', color: 'text-stone-800' },
    { label: 'Photography Services', count: servicesCount, icon: Layers, to: '/admin/services', color: 'text-stone-800' },
    { label: 'Featured Packages', count: packagesCount, icon: DollarSign, to: '/admin/packages', color: 'text-stone-800' },
    { label: 'Safety Guidelines', count: safetyCount, icon: ShieldCheck, to: '/admin/safety', color: 'text-stone-800' },
    { label: 'Retouching Samples', count: baCount, icon: Sparkles, to: '/admin/before-after', color: 'text-stone-800' },
    { label: 'FAQ Entries', count: studioStore.getFaqs().length, icon: HelpCircle, to: '/admin/settings', color: 'text-stone-800' },
  ];

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Studio Overview
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Summary of website portfolio, services, packages, and incoming client enquiries in Wanaparthy.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isSyncing && <span className="text-[10px] text-stone-400 animate-pulse">Syncing...</span>}
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Site</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.to}
              className="bg-white border border-stone-200 hover:border-stone-400 rounded-2xl p-4 sm:p-5 transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between text-stone-400 mb-2">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-800 transition-colors" />
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                {stat.count}
              </div>
              <p className="text-xs text-stone-500 mt-1 font-medium">
                {stat.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Pipeline */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Recent Client Enquiries
            </h3>
            <p className="text-xs text-stone-500">
              Booking requests from WhatsApp link and website forms.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs text-amber-800 hover:text-amber-900 font-semibold"
          >
            View All Enquiries →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 bg-stone-50">
                <th className="p-3 font-semibold">Parent / Client</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Shoot Type</th>
                <th className="p-3 font-semibold">Preferred Date / Baby Age</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {recentLeads.length > 0 ? recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="p-3 font-medium text-stone-900">{lead.parentName}</td>
                  <td className="p-3 font-mono text-[11px] text-stone-500">{lead.phone}</td>
                  <td className="p-3 font-medium text-stone-800">{lead.shootType}</td>
                  <td className="p-3 text-stone-600">{lead.preferredDate || lead.babyAgeOrDueDate || 'Flexible'}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      lead.status === 'New'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : lead.status === 'Contacted'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : lead.status === 'Slot Reserved' || lead.status === 'Shoot Completed'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-stone-100 text-stone-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <a
                      href={buildWhatsAppLink(`Hello ${lead.parentName}! Following up on your enquiry for the ${lead.shootType} at New Sri Laxmi Baby Photo Studio.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-400 italic">
                    No enquiries found. Real client leads will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supabase Connected Notice */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-stone-900">
              Supabase Production Cloud Active
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
              The studio management system is now live and synchronized with Supabase PostgreSQL and Storage. All data you see here is fetched from the cloud.
            </p>
          </div>
        </div>
        <Link
          to="/admin/settings"
          className="px-4 py-2 bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 rounded-xl whitespace-nowrap transition-colors shadow-xs"
        >
          Check Connectivity
        </Link>
      </div>

    </div>
  );
};
