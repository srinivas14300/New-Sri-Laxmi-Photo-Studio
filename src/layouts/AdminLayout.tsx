import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Image,
  Layers,
  DollarSign,
  Sparkles,
  Star,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Database,
  HelpCircle,
  Camera,
  ShieldCheck
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navSections = [
    {
      title: 'Overview',
      items: [
        { to: '/admin/dashboard', label: 'Studio Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Enquiries & Bookings',
      items: [
        { to: '/admin/bookings', label: 'Bookings Pipeline', icon: Calendar },
        { to: '/admin/enquiries', label: 'Enquiries & Leads', icon: MessageSquare }
      ]
    },
    {
      title: 'Portfolio & Media',
      items: [
        { to: '/admin/portfolio', label: 'Portfolio Gallery', icon: Image }
      ]
    },
    {
      title: 'Website Content',
      items: [
        { to: '/admin/services', label: 'Services & Themes', icon: Layers },
        { to: '/admin/packages', label: 'Packages & Pricing', icon: DollarSign },
        { to: '/admin/offers', label: 'Special Offers', icon: Sparkles },
        { to: '/admin/safety', label: 'Safety & Hygiene', icon: ShieldCheck },
        { to: '/admin/before-after', label: 'Retouching Gallery', icon: Sparkles },
        { to: '/admin/reviews', label: 'Client Reviews', icon: Star }
      ]
    },
    {
      title: 'Configuration',
      items: [
        { to: '/admin/settings', label: 'Studio Settings & FAQ', icon: Settings }
      ]
    }
  ];

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col antialiased">
      
      {/* Top Architecture Banner */}
      <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2 text-center text-xs text-emerald-950 flex items-center justify-center gap-2 flex-wrap">
        <Database className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
        <span>
          <strong>Live Studio Database:</strong> All changes to portfolio, packages, enquiries, and settings are synchronized with your Supabase backend and reflect instantly on the public website.
        </span>
      </div>

      <div className="flex-1 flex min-w-0">
        
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-68 bg-white border-r border-stone-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div>
            {/* Sidebar Header */}
            <div className="h-16 px-6 border-b border-stone-200/80 flex items-center justify-between">
              <div className="min-w-0">
                <span className="font-serif font-bold text-base text-stone-900 tracking-tight truncate block">
                  {STUDIO_CONFIG.shortName}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold block">
                  Studio Management
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-stone-400 hover:text-stone-800"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list with section headers */}
            <nav className="p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-140px)]">
              {navSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-stone-600">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setSidebarOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors min-h-[42px] ${
                              isActive
                                ? 'bg-stone-900 text-white font-semibold shadow-xs'
                                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                            }`
                          }
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Sidebar Action */}
          <div className="p-4 border-t border-stone-200/80 space-y-2 bg-stone-50/50">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-stone-500" />
              <span>View Public Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-700 hover:text-red-900 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header */}
          <header className="h-16 px-4 sm:px-8 bg-white/90 border-b border-stone-200/90 flex items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-stone-900 truncate">
                  Studio Owner Management
                </h1>
                <p className="text-[11px] text-stone-500 truncate hidden sm:block">
                  {STUDIO_CONFIG.name} · Wanaparthy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="hidden sm:inline font-medium">Studio Owner</span>
                <span className="font-mono text-[10px] text-stone-500">active</span>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
};
