/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import { RootLayout } from './layouts/RootLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { PortfolioPage } from './pages/public/PortfolioPage';
import { PackagesPage } from './pages/public/PackagesPage';
import { OffersPage } from './pages/public/OffersPage';
import { ReviewsPage } from './pages/public/ReviewsPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPortfolioPage } from './pages/admin/AdminPortfolioPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminPackagesPage } from './pages/admin/AdminPackagesPage';
import { AdminOffersPage } from './pages/admin/AdminOffersPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminSafetyPage } from './pages/admin/AdminSafetyPage';
import { AdminBeforeAfterPage } from './pages/admin/AdminBeforeAfterPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import { CategoryShowcasePage } from './pages/public/CategoryShowcasePage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with shared RootLayout */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:category" element={<PortfolioPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Dedicated Category Showcase Routes */}
          <Route path="weddings" element={<CategoryShowcasePage />} />
          <Route path="pre-wedding" element={<CategoryShowcasePage />} />
          <Route path="events" element={<CategoryShowcasePage />} />
          <Route path="baby-photography" element={<CategoryShowcasePage />} />
          <Route path="maternity" element={<CategoryShowcasePage />} />
          <Route path="portraits" element={<CategoryShowcasePage />} />
          <Route path="photo-services" element={<CategoryShowcasePage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes with AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="portfolio" element={<AdminPortfolioPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="packages" element={<AdminPackagesPage />} />
          <Route path="offers" element={<AdminOffersPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="enquiries" element={<AdminEnquiriesPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="safety" element={<AdminSafetyPage />} />
          <Route path="before-after" element={<AdminBeforeAfterPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Catch-all redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
