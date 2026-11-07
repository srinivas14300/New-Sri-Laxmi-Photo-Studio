import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { MobileDrawer } from '../components/common/MobileDrawer';
import { Footer } from '../components/common/Footer';
import { WhatsAppFloat } from '../components/common/WhatsAppFloat';
import { studioStore } from '../services/store';

export const RootLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    studioStore.syncAll();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 w-full overflow-x-hidden min-w-0 relative">

      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main className={`flex-1 w-full min-w-0 ${isHomePage ? 'pt-0' : 'pt-20 sm:pt-24'}`}>
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};
