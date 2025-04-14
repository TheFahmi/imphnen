"use client";

import React, { ReactNode } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ScrollToTopButton from './ScrollToTopButton';
import CursorEffects from './effects/CursorEffects';
// BonziBuddyCursor removed as requested

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-navy text-black">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-full sm:max-w-7xl">
        <div className="bg-silver border-4 border-silver border-outset shadow-lg">
          <Header />
          <Navigation />

          <main className="p-2 sm:p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left Sidebar - Hidden on small mobile, shown at bottom on larger mobile */}
              <div className="hidden sm:block md:hidden order-3 w-full mt-4">
                <Sidebar position="left" />
              </div>
              <div className="hidden md:block md:w-1/5 order-1">
                <Sidebar position="left" />
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/5 bg-white p-2 sm:p-4 order-2">
                {children}
              </div>

              {/* Right Sidebar - Hidden on mobile */}
              <div className="hidden md:block md:w-1/5 order-4">
                <Sidebar position="right" />
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
      <ScrollToTopButton />
      <CursorEffects />
    </div>
  );
};

export default Layout;
