"use client";

import React from 'react';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section id="tentang" className="bg-gray-100 p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: TENTANG IMPHNEN ::</h2>
      <p className="my-2">IMPHNEN adalah komunitas bagi mereka yang:</p>
      <ul className="list-disc pl-8 mb-4">
        <li>Ingin menjadi programmer handal tapi malas belajar koding</li>
        <li>Lebih suka scroll media sosial daripada debugging</li>
        <li>Punya banyak ide aplikasi tapi tidak pernah dieksekusi</li>
        <li>Selalu bilang &quot;Besok aja deh mulai ngodingnya&quot;</li>
        <li>Koleksi tutorial programming tapi tidak pernah dipraktekkan</li>
      </ul>

      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl mt-6">:: FILOSOFI KAMI ::</h2>
      <p className="my-2">Di IMPHNEN, kami percaya bahwa:</p>
      <ol className="list-decimal pl-8 mb-4">
        <li>Tidak apa-apa untuk mengakui kemalasan - itu langkah pertama menuju perubahan</li>
        <li>Saling mendukung lebih baik daripada saling menjatuhkan</li>
        <li>Humor adalah cara terbaik untuk menghadapi frustrasi dalam programming</li>
        <li>Semua orang punya ritme belajar yang berbeda</li>
        <li>Kadang-kadang kita perlu istirahat dari coding (meskipun istirahatnya lebih lama dari codingnya 😅)</li>
      </ol>

      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl mt-6">:: BERITA TERBARU ::</h2>
      <ul className="list-disc pl-8 mb-4">
        <li>
          <span className="text-red-600 font-bold">12/04/1998</span> -
          Website IMPHNEN diluncurkan dengan desain retro!
          <Image src="/images/new.svg" alt="New!" width={20} height={20} className="inline-block ml-2 h-5" />
        </li>
        <li>
          <span className="text-red-600 font-bold">10/04/1998</span> -
          Grup Facebook IMPHNEN mencapai 1000 anggota!
        </li>
        <li>
          <span className="text-red-600 font-bold">04/04/1998</span> -
          Meetup virtual pertama IMPHNEN - 50 orang hadir tapi tidak ada yang ngoding
        </li>
      </ul>
    </section>
  );
};

export default AboutSection;
