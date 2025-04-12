"use client";

import React from 'react';
import Image from 'next/image';

const HomeSection: React.FC = () => {
  return (
    <section id="home" className="welcome-message px-1 sm:px-4">
      <h2 className="text-2xl font-bold mb-2">
        Selamat Datang di IMPHNEN! <span className="blink text-red-600">NEW!</span>
      </h2>

      <div className="w-full">
        <Image src="/images/divider.svg" alt="divider" width={600} height={20} className="w-full" />
      </div>

      <p className="mb-4">
        Selamat datang di website resmi <span className="bg-yellow-300 font-bold px-1">IMPHNEN</span>
      </p>

      {/* Desktop version - hidden on mobile */}
      <p className="mb-4 hidden sm:block">
        <span className="bg-yellow-300 font-bold px-1">I</span>ngin
        <span className="bg-yellow-300 font-bold px-1">M</span>enjadi
        <span className="bg-yellow-300 font-bold px-1">P</span>rogrammer
        <span className="bg-yellow-300 font-bold px-1">H</span>andal
        <span className="bg-yellow-300 font-bold px-1">N</span>amun
        <span className="bg-yellow-300 font-bold px-1">E</span>nggan
        <span className="bg-yellow-300 font-bold px-1">N</span>goding!
      </p>

      {/* Mobile version - shown only on mobile */}
      <div className="mb-4 block sm:hidden">
        <p>
          <span className="bg-yellow-300 font-bold px-1">I</span>ngin
          <span className="bg-yellow-300 font-bold px-1">M</span>enjadi
        </p>
        <p>
          <span className="bg-yellow-300 font-bold px-1">P</span>rogrammer
          <span className="bg-yellow-300 font-bold px-1">H</span>andal
        </p>
        <p>
          <span className="bg-yellow-300 font-bold px-1">N</span>amun
          <span className="bg-yellow-300 font-bold px-1">E</span>nggan
          <span className="bg-yellow-300 font-bold px-1">N</span>goding!
        </p>
      </div>

      <div className="text-center my-4">
        <Image src="/images/programmer.svg" alt="Programmer SVG" width={150} height={150} className="border-2 border-blue-900 inline-block" />
      </div>

      <p className="mb-4">
        IMPHNEN berawal dari sebuah grup Facebook yang dibuat untuk menampung para programmer dan calon programmer yang memiliki satu kesamaan:
        <span className="blink text-red-600 font-bold">MALAS NGODING!</span>
      </p>

      <p className="mb-4">
        Kami adalah komunitas yang saling mendukung satu sama lain dalam perjuangan melawan rasa malas.
        Alih-alih ngoding, kami lebih suka scroll Facebook dan berbagi meme programming. 😂
      </p>
    </section>
  );
};

export default HomeSection;
