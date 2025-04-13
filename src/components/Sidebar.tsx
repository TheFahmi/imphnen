"use client";

import React from 'react';
import Image from 'next/image';
import VisitorCounter from './VisitorCounter';
import VisitorStats from './VisitorStats';
import OnlineUsers from './OnlineUsers';
import DailyQuote from './DailyQuote';

interface SidebarProps {
  position: 'left' | 'right';
}

const Sidebar: React.FC<SidebarProps> = ({ position }) => {
  if (position === 'left') {
    return (
      <div className="bg-green-100 p-4 border border-blue-900">
        <h2 className="bg-blue-900 text-white p-2 font-bold text-center mb-4 text-sm sm:text-base">SITE INFO</h2>

        <div className="text-center mb-4">
          <VisitorCounter />
        </div>

        <hr className="my-4 border-t border-blue-900" />

        <div className="mb-4">
          <VisitorStats />
          <div className="mt-3 text-center">
            <p><b>Anggota:</b> 1,000+</p>
            <p><b>Meme:</b> 500+</p>
            <p><b>Kode yang ditulis:</b> 0 baris</p>
          </div>
        </div>

        <hr className="my-4 border-t border-blue-900" />

        <div className="text-center">
          <Image src="/images/under_construction.svg" alt="Under Construction" width={90} height={30} className="mx-auto" />
          <p><span className="blink text-red-600 font-bold">UNDER CONSTRUCTION</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-100 p-4 border border-blue-900">
      <h2 className="bg-blue-900 text-white p-2 font-silkscreen font-bold text-center mb-4 text-sm sm:text-base">KOMUNITAS</h2>

      <div className="mb-4">
        <OnlineUsers className="mb-4" />

        <div className="text-center">
          <a href="#" className="block mb-2">
            <Image src="/images/join_group.svg" alt="Join Group" width={120} height={44} className="mx-auto" />
          </a>
          <a href="#" className="block mb-2">
            <Image src="/images/meme_gallery.svg" alt="Meme Gallery" width={120} height={44} className="mx-auto" />
          </a>
          <a href="#" className="block mb-2">
            <Image src="/images/discord.svg" alt="Join Discord" width={120} height={44} className="mx-auto" />
          </a>
        </div>
      </div>

      <hr className="my-4 border-t border-blue-900" />

      <div className="text-center mb-4">
        <h3 className="font-bold mb-2 text-sm sm:text-base">POLLING HARIAN</h3>
        <p>Apa alasanmu malas ngoding?</p>
        <form className="text-left mt-2">
          <div className="mb-1">
            <input type="radio" name="alasan" value="susah" id="susah" className="mr-2" />
            <label htmlFor="susah">Terlalu susah</label>
          </div>
          <div className="mb-1">
            <input type="radio" name="alasan" value="bosan" id="bosan" className="mr-2" />
            <label htmlFor="bosan">Membosankan</label>
          </div>
          <div className="mb-1">
            <input type="radio" name="alasan" value="sosmed" id="sosmed" className="mr-2" />
            <label htmlFor="sosmed">Lebih suka sosmed</label>
          </div>
          <div className="mb-1">
            <input type="radio" name="alasan" value="lainnya" id="lainnya" className="mr-2" />
            <label htmlFor="lainnya">Lainnya</label>
          </div>
          <button
            type="button"
            className="bg-orange-500 border-2 border-gray-400 border-outset font-bold px-4 py-1 mt-2 hover:bg-orange-400"
            onClick={() => alert('Terima kasih atas partisipasinya!')}
          >
            VOTE!
          </button>
        </form>
      </div>

      <hr className="my-4 border-t border-blue-900" />

      <div className="text-center mt-4">
        <DailyQuote />
      </div>
    </div>
  );
};

export default Sidebar;
