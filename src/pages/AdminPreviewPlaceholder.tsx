import React from 'react';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { supabaseConfig } from '../services/supabaseClient';
import { ShieldCheck, Database, Lock, LayoutDashboard, Image, Layers, DollarSign, MessageSquare, ArrowLeft } from 'lucide-react';

export const AdminPreviewPlaceholder: React.FC = () => {
  const adminModules = [
    {
      title: 'Dashboard & Enquiries',
      description: 'Incoming WhatsApp and web booking leads with status pipeline (New, Contacted, Reserved, Completed).',
      icon: LayoutDashboard,
      status: 'Schema Prepared'
    },
    {
      title: 'Portfolio Management',
      description: 'Add new client shoots, assign categories (Newborn, Milestone, Cake Smash), set display order, and upload high-res photos.',
      icon: Image,
      status: 'Schema Prepared'
    },
    {
      title: 'Services & Themes',
      description: 'Update baby themes, session age recommendations, included outfits, and prop highlights.',
      icon: Layers,
      status: 'Schema Prepared'
    },
    {
      title: 'Packages & Pricing',
      description: 'Adjust package prices, deliverables (edited photos, canvas prints, raw photo terms) and active promo banners.',
      icon: DollarSign,
      status: 'Schema Prepared'
    },
    {
      title: 'Reviews & Testimonials',
      description: 'Moderate customer reviews, feature verified parent stories, and sync testimonial ratings.',
      icon: MessageSquare,
      status: 'Schema Prepared'
    },
    {
      title: 'Supabase RLS & Auth',
      description: 'Row Level Security policy enforcing studio owner email login, preventing public database writes.',
      icon: Lock,
      status: 'Ready for Connection'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Website</span>
          </a>
          <span className="text-xs text-stone-500">
            Phase 1 Architecture Complete
          </span>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-stone-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Lock className="w-4 h-4" />
            <span>Studio Management Architecture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {STUDIO_CONFIG.name} — Admin Portal
          </h1>
          <p className="text-stone-400 text-sm max-w-2xl leading-relaxed">
            Phase 1 has established the design system, data contracts, and public storefront. The admin management modules below are architecturally mapped to Supabase for Phase 2 implementation.
          </p>
        </div>

        {/* Supabase Status Card */}
        <div className="bg-stone-800/80 rounded-2xl p-6 border border-stone-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Database className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-white">Database & Auth Provider Architecture</h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {supabaseConfig.isConfigured 
                  ? `Connected to Supabase project: ${supabaseConfig.supabaseUrl}`
                  : `Configured with resilient local mock-data provider. Ready for Supabase free-tier project credentials.`
                }
              </p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-stone-900 border border-stone-700 text-amber-300">
            {supabaseConfig.isConfigured ? 'LIVE_DB' : 'PHASE_1_STUB'}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, idx) => {
            const Icon = module.icon;
            return (
              <div
                key={idx}
                className="bg-stone-800/50 rounded-2xl p-6 border border-stone-700/60 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-700/60 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {module.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-700/40 flex items-center justify-between text-xs">
                  <span className="text-stone-400">{module.status}</span>
                  <span className="text-amber-400 font-semibold text-[11px] uppercase tracking-wider">
                    Phase 2 Target
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase 1 Completion Confirmation */}
        <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs text-stone-300 space-y-2">
          <p className="font-semibold text-amber-200">
            Phase 1 Scope Achieved:
          </p>
          <p className="leading-relaxed">
            Per instructions, Phase 1 strictly focuses on establishing the project architecture, design system, responsive homepage, navigation, and portfolio sections without premature database mutations. Phase 2 will introduce Supabase Auth, Row Level Security, and CRUD controllers.
          </p>
        </div>

      </div>
    </div>
  );
};
