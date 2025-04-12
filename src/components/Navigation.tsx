"use client";

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'tentang', label: 'TENTANG' },
  { id: 'fitur', label: 'FITUR' },
  { id: 'belajar', label: 'BELAJAR' },
  { id: 'testimoni', label: 'TESTIMONI' },
  { id: 'bahasa', label: 'BAHASA' },
  { id: 'gallery', label: 'GALERI' },
  { id: 'tips', label: 'TIPS' },
  { id: 'faq', label: 'FAQ' }
];

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div
        className="md:hidden bg-orange-500 text-navy text-center p-2 font-bold cursor-pointer border-2 border-silver border-outset"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? 'CLOSE MENU ▲' : 'OPEN MENU ▼'}
      </div>

      {/* Navigation */}
      <nav className={`my-2 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        {/* Desktop Navigation - Horizontal */}
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                {navItems.map((item) => (
                  <td
                    key={item.id}
                    className="bg-orange-500 text-center border border-solid border-black p-2"
                  >
                    <Link
                      to={item.id}
                      spy={true}
                      smooth={true}
                      offset={-50}
                      duration={500}
                      className="text-navy no-underline font-bold hover:text-red-600 hover:underline block w-full cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Navigation - Vertical */}
        <div className="md:hidden">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="bg-orange-500 text-center border border-solid border-black p-2"
              >
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="text-navy no-underline font-bold hover:text-red-600 hover:underline block w-full cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
