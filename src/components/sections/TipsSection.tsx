"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Tip {
  title: string;
  description: string;
  code?: string;
  image?: string;
  lazyLevel: number; // 1-10, how lazy is this tip
}

const tips: Tip[] = [
  {
    title: "Gunakan Snippets dan Templates",
    description: "Jangan menulis kode dari awal. Gunakan snippets, templates, dan boilerplate. Kenapa menulis 100 baris kode kalau bisa copy-paste?",
    code: "// Contoh snippet untuk React component\nconst MyComponent = () => {\n  return (\n    <div>\n      <h1>Hello World</h1>\n    </div>\n  );\n};",
    lazyLevel: 7
  },
  {
    title: "Biarkan AI Menulis Kode Untuk Anda",
    description: "Gunakan GitHub Copilot, ChatGPT, atau AI lainnya untuk menulis kode. Cukup berikan prompt yang jelas, dan biarkan AI melakukan pekerjaan berat.",
    image: "/images/retro_computer.svg",
    lazyLevel: 10
  },
  {
    title: "Gunakan Framework dan Library",
    description: "Jangan menulis fungsi sendiri jika ada library yang bisa melakukannya. Butuh manipulasi tanggal? Moment.js. Animasi? GSAP. State management? Redux.",
    code: "// Tanpa library\nconst date = new Date();\nconst formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;\n\n// Dengan library\nimport moment from 'moment';\nconst formattedDate = moment().format('DD/MM/YYYY');",
    lazyLevel: 8
  },
  {
    title: "Otomatisasi dengan Script",
    description: "Buat script untuk tugas berulang. Jika Anda melakukan sesuatu lebih dari dua kali, otomatiskan. Programmer malas adalah programmer efisien.",
    code: "#!/bin/bash\n# Script untuk deploy ke production\nnpm run build\nscp -r ./build/* user@server:/var/www/html/",
    lazyLevel: 6
  },
  {
    title: "Gunakan Keyboard Shortcuts",
    description: "Kuasai keyboard shortcuts di editor Anda. Ini memang membutuhkan usaha di awal, tapi akan menghemat banyak waktu dalam jangka panjang.",
    lazyLevel: 4
  },
  {
    title: "Buat Dokumentasi yang Baik",
    description: "Tulis dokumentasi yang jelas untuk kode Anda. Ini mungkin terdengar tidak malas, tapi akan menghemat waktu ketika Anda lupa apa yang kode Anda lakukan 6 bulan kemudian.",
    code: "/**\n * Menghitung total harga dengan pajak\n * @param {number} price - Harga barang\n * @param {number} taxRate - Persentase pajak (default: 0.1 atau 10%)\n * @returns {number} Total harga dengan pajak\n */\nfunction calculateTotalPrice(price, taxRate = 0.1) {\n  return price * (1 + taxRate);\n}",
    lazyLevel: 3
  },
  {
    title: "Gunakan Stack Overflow Tanpa Malu",
    description: "Jangan habiskan waktu berjam-jam mencoba memecahkan masalah sendiri. Cari di Stack Overflow, copy-paste solusi, dan modifikasi sesuai kebutuhan.",
    image: "/images/malas_ngoding_badge.svg",
    lazyLevel: 9
  },
  {
    title: "Buat Fungsi Reusable",
    description: "Jangan menulis kode yang sama berulang kali. Buat fungsi yang bisa digunakan kembali. DRY (Don't Repeat Yourself) adalah prinsip programmer malas.",
    code: "// Buruk: Pengulangan\nconst user1Score = user1.points * 2;\nconst user2Score = user2.points * 2;\n\n// Baik: Fungsi reusable\nfunction calculateScore(user) {\n  return user.points * 2;\n}\nconst user1Score = calculateScore(user1);\nconst user2Score = calculateScore(user2);",
    lazyLevel: 5
  }
];

const TipsSection: React.FC = () => {
  const [sortBy, setSortBy] = useState<'default' | 'lazyLevel'>('default');

  const sortedTips = [...tips].sort((a, b) => {
    if (sortBy === 'lazyLevel') {
      return b.lazyLevel - a.lazyLevel; // Descending, most lazy first
    }
    return 0; // Default order
  });

  return (
    <section id="tips" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: TIPS UNTUK PROGRAMMER MALAS ::</h2>
      <p className="my-4">
        Kumpulan tips untuk memaksimalkan output coding dengan usaha minimal:
      </p>

      {/* Sorting options */}
      <div className="flex justify-end mb-4">
        <div className="bg-white p-2 border border-navy">
          <span className="mr-2 font-bold">Urutkan:</span>
          <button
            className={`px-2 py-1 mr-2 ${sortBy === 'default' ? 'bg-navy text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy('default')}
          >
            Default
          </button>
          <button
            className={`px-2 py-1 ${sortBy === 'lazyLevel' ? 'bg-navy text-white' : 'bg-gray-200'}`}
            onClick={() => setSortBy('lazyLevel')}
          >
            Level Kemalasan
          </button>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        {sortedTips.map((tip, index) => (
          <div
            key={index}
            className={`border-2 border-navy p-4 ${
              tip.lazyLevel >= 8 ? 'bg-red-100' :
              tip.lazyLevel >= 5 ? 'bg-yellow-100' :
              'bg-green-100'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{tip.title}</h3>
              <div className="bg-navy text-white px-2 py-1 text-sm">
                Lazy: {tip.lazyLevel}/10
              </div>
            </div>

            <p className="mb-4">{tip.description}</p>

            {tip.code && (
              <pre className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto mb-4">
                {tip.code}
              </pre>
            )}

            {tip.image && (
              <div className="flex justify-center my-4">
                <Image src={tip.image} alt={tip.title} width={80} height={80} />
              </div>
            )}

            <div className="mt-2 text-right italic text-sm">
              {tip.lazyLevel >= 8 ? '(Sangat direkomendasikan untuk anggota IMPHNEN)' :
               tip.lazyLevel >= 5 ? '(Cukup malas, tapi masih perlu usaha)' :
               '(Butuh usaha di awal, tapi menghemat waktu nanti)'}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-100 border border-dashed border-red-600 text-center">
        <p className="font-bold">Kata Mutiara IMPHNEN:</p>
        <p>"Programmer malas akan menemukan cara termudah untuk menyelesaikan tugas sulit. Programmer rajin akan menyelesaikan tugas sulit dengan cara sulit."</p>
      </div>
    </section>
  );
};

export default TipsSection;
