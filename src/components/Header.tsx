"use client";

import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-navy text-yellow-300 p-4 text-center border-4 border-silver border-inset">
      {/* Desktop construction banner */}
      <div className="construction-banner hidden sm:flex justify-center items-center mb-2">
        <Image src="/images/under_construction.svg" alt="Under Construction" width={120} height={30} className="mx-2" />
        <span className="blink text-red-500 font-bold">WEBSITE UNDER CONSTRUCTION</span>
        <Image src="/images/under_construction.svg" alt="Under Construction" width={120} height={30} className="mx-2" />
      </div>

      {/* Mobile construction banner */}
      <div className="construction-banner flex sm:hidden flex-col justify-center items-center mb-2">
        <div className="flex justify-center items-center">
          <Image src="/images/under_construction.svg" alt="Under Construction" width={80} height={20} className="mx-1" />
        </div>
        <span className="blink text-red-500 font-bold text-center my-1">WEBSITE UNDER CONSTRUCTION</span>
        <div className="flex justify-center items-center">
          <Image src="/images/under_construction.svg" alt="Under Construction" width={80} height={20} className="mx-1" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold rainbow-text mb-2">WELCOME TO IMPHNEN.DEV</h1>

      <div className="bg-black text-green-400 p-2 font-bold overflow-hidden whitespace-nowrap">
        <div className="marquee text-xs sm:text-base">
          Thanks for visiting IMPHNEN website! Last updated: April 1998
        </div>
      </div>
    </header>
  );
};

export default Header;
