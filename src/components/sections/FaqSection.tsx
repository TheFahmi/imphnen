"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface FaqItem {
  question: string;
  answer: string;
  code?: string;
  image?: string;
  category: 'css' | 'javascript' | 'general' | 'motivation';
}

const faqs: FaqItem[] = [
  // CSS Questions
  {
    question: "Kenapa CSS saya tidak bekerja? Padahal sudah benar!",
    answer: "Karena CSS itu seperti hubungan: perlu spesifik, perlu prioritas, dan kadang-kadang perlu !important untuk didengarkan. Coba periksa selector dan specificity Anda.",
    code: "/* Ini tidak akan bekerja jika ada style yang lebih spesifik */\ndiv { color: red; }\n\n/* Ini lebih spesifik */\n#myDiv.special { color: blue !important; }",
    category: 'css'
  },
  {
    question: "Apa bedanya display: none; dan visibility: hidden;?",
    answer: "display: none; menghilangkan elemen sepenuhnya dari layout, sedangkan visibility: hidden; menyembunyikan elemen tapi tetap mempertahankan ruangnya. Seperti bedanya antara bolos kerja dan tidur di meja kerja.",
    code: "/* Elemen hilang total, tidak ada ruang */\n.hilang-total { display: none; }\n\n/* Elemen tidak terlihat tapi ruangnya masih ada */\n.sembunyi { visibility: hidden; }",
    category: 'css'
  },
  {
    question: "Bagaimana cara membuat website responsive?",
    answer: "Gunakan media queries, unit relatif (%, em, rem), dan Flexbox/Grid. Atau gunakan framework seperti Tailwind CSS dan biarkan orang lain yang memikirkannya.",
    code: "@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}",
    category: 'css'
  },
  {
    question: "Kenapa harus belajar CSS kalau ada Bootstrap?",
    answer: "Karena suatu hari Bootstrap tidak akan bisa memenuhi kebutuhan desain spesifik Anda. Seperti kenapa harus belajar memasak kalau ada GoFood? Karena kadang-kadang kita ingin makan jam 3 pagi.",
    image: "/images/no_coding_new.svg",
    category: 'css'
  },
  {
    question: "Apa itu 'CSS Specificity' dan kenapa penting?",
    answer: "CSS Specificity adalah sistem poin yang menentukan style mana yang akan diterapkan jika ada konflik. Ini seperti sistem kasta dalam CSS. ID > Class > Element. Penting karena tanpa memahaminya, Anda akan terus menambahkan !important dan membuat kode CSS Anda berantakan.",
    code: "/* Specificity: 0-0-1 */\ndiv { color: black; }\n\n/* Specificity: 0-1-0 */\n.text { color: blue; }\n\n/* Specificity: 1-0-0 */\n#title { color: red; }",
    category: 'css'
  },

  // JavaScript Questions
  {
    question: "Apa bedanya == dan === di JavaScript?",
    answer: "== membandingkan nilai setelah konversi tipe, sedangkan === membandingkan nilai dan tipe data. Gunakan === untuk menghindari bug aneh. Seperti bedanya antara 'mirip-mirip' dan 'persis sama'.",
    code: "// Ini true karena '5' dikonversi ke angka\n5 == '5'  // true\n\n// Ini false karena tipe datanya berbeda\n5 === '5' // false",
    category: 'javascript'
  },
  {
    question: "Kenapa callback hell terjadi dan bagaimana mengatasinya?",
    answer: "Callback hell terjadi ketika kita memiliki terlalu banyak callback bersarang, membuat kode sulit dibaca. Solusinya: gunakan Promises, async/await, atau buat fungsi terpisah. Atau lebih baik lagi: hindari asynchronous programming dan kembali ke PHP.",
    code: "// Callback hell\ngetData(function(a) {\n  getMoreData(a, function(b) {\n    getEvenMoreData(b, function(c) {\n      // Terlalu banyak indentasi!\n    });\n  });\n});\n\n// Dengan async/await\nasync function getData() {\n  const a = await getDataPromise();\n  const b = await getMoreDataPromise(a);\n  const c = await getEvenMoreDataPromise(b);\n  // Lebih rapi!\n}",
    category: 'javascript'
  },
  {
    question: "Apa itu 'this' di JavaScript dan kenapa selalu membingungkan?",
    answer: "Keyword 'this' merujuk pada konteks eksekusi saat ini, yang bisa berubah tergantung bagaimana fungsi dipanggil. Ini membingungkan karena 'this' bisa merujuk ke objek yang berbeda-beda. Seperti teman yang selalu berubah pendapat.",
    code: "// 'this' dalam method objek merujuk ke objek tersebut\nconst obj = {\n  name: 'IMPHNEN',\n  greet() { console.log(`Hello, ${this.name}`); }\n};\nobj.greet(); // 'Hello, IMPHNEN'\n\n// 'this' dalam fungsi biasa merujuk ke global (window)\nfunction standalone() {\n  console.log(this);\n}\nstandalone(); // window object",
    category: 'javascript'
  },
  {
    question: "Kenapa harus pakai framework JavaScript? Vanilla JS kan lebih ringan!",
    answer: "Framework membantu mengelola state, routing, dan struktur aplikasi yang kompleks. Vanilla JS memang lebih ringan, tapi Anda akan menghabiskan waktu menulis ulang fitur yang sudah ada di framework. Seperti kenapa naik mobil kalau bisa jalan kaki? Karena perjalanannya jauh dan kita malas.",
    image: "/images/programmer_new.svg",
    category: 'javascript'
  },

  // General Programming Questions
  {
    question: "Apakah saya perlu belajar algoritma dan struktur data?",
    answer: "Ya, jika Anda ingin menjadi programmer yang baik. Tidak, jika Anda hanya ingin membuat website sederhana dan tidak peduli dengan performa. Seperti apakah Anda perlu belajar memasak? Ya, jika ingin jadi chef. Tidak, jika hanya ingin mie instan.",
    category: 'general'
  },
  {
    question: "Bahasa pemrograman apa yang terbaik untuk dipelajari pertama kali?",
    answer: "Python untuk kemudahan, JavaScript untuk web, Java untuk perusahaan besar. Tapi sebenarnya, bahasa terbaik adalah yang membuat Anda tetap termotivasi untuk belajar. Atau pilih bahasa dengan gaji tertinggi, karena uang adalah motivator universal.",
    category: 'general'
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk menjadi programmer handal?",
    answer: "10.000 jam menurut teori, seumur hidup menurut realita. Teknologi terus berkembang, jadi belajar tidak pernah berhenti. Tapi untuk jadi programmer yang cukup kompeten untuk mendapat pekerjaan? Sekitar 6-12 bulan belajar intensif. Atau 10 tahun jika Anda anggota IMPHNEN.",
    category: 'general'
  },
  {
    question: "Apakah saya perlu gelar komputer untuk jadi programmer?",
    answer: "Tidak. Banyak programmer sukses yang belajar sendiri. Gelar membantu untuk pekerjaan pertama dan pengetahuan fundamental, tapi portofolio dan pengalaman lebih penting dalam jangka panjang. Seperti apakah Anda perlu sekolah memasak untuk jadi koki? Tidak, tapi Anda tetap perlu belajar memasak.",
    category: 'general'
  },

  // Motivation Questions
  {
    question: "Bagaimana cara mengatasi programmer's block?",
    answer: "Istirahat sejenak, jalan-jalan, mandi, atau tidur. Otak butuh waktu untuk memproses masalah secara bawah sadar. Atau coba rubber duck debugging: jelaskan masalah Anda pada bebek karet (atau teman yang tidak mengerti coding). Kadang menjelaskan masalah membuat solusi muncul dengan sendirinya.",
    category: 'motivation'
  },
  {
    question: "Apakah normal merasa seperti impostor dalam programming?",
    answer: "Sangat normal. Bahkan programmer berpengalaman pun sering merasa tidak cukup pintar. Bidang ini terlalu luas untuk dikuasai sepenuhnya. Ingat bahwa semua orang googling dan melihat Stack Overflow. Tidak ada yang tahu segalanya.",
    category: 'motivation'
  },
  {
    question: "Bagaimana cara tetap termotivasi belajar coding ketika malas?",
    answer: "Buat proyek yang Anda sukai, bergabung dengan komunitas, tetapkan tujuan kecil yang bisa dicapai, dan rayakan kemajuan sekecil apapun. Atau gabung IMPHNEN dan terima kenyataan bahwa Anda memang malas. Kadang menerima kemalasan adalah langkah pertama menuju produktivitas.",
    image: "/images/komunitas.svg",
    category: 'motivation'
  },
  {
    question: "Apakah wajar jika saya lebih suka menonton tutorial daripada coding?",
    answer: "Wajar, tapi tidak produktif. Tutorial memberikan ilusi kemajuan tanpa keterampilan nyata. Ini seperti menonton video workout tanpa berolahraga. Solusinya: batasi tutorial, dan selalu praktekkan apa yang Anda tonton. Atau akui saja bahwa Anda memang anggota IMPHNEN sejati.",
    category: 'motivation'
  }
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section id="faq" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: FAQ UNTUK PROGRAMMER MALAS ::</h2>
      <p className="my-4">
        Pertanyaan yang sering ditanyakan oleh programmer yang malas belajar coding:
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap mb-4 border-b border-navy">
        <button
          className={`px-4 py-2 font-bold ${activeCategory === 'all' ? 'bg-navy text-white' : 'bg-gray-200 text-navy'}`}
          onClick={() => setActiveCategory('all')}
        >
          Semua
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeCategory === 'css' ? 'bg-navy text-white' : 'bg-gray-200 text-navy'}`}
          onClick={() => setActiveCategory('css')}
        >
          CSS
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeCategory === 'javascript' ? 'bg-navy text-white' : 'bg-gray-200 text-navy'}`}
          onClick={() => setActiveCategory('javascript')}
        >
          JavaScript
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeCategory === 'general' ? 'bg-navy text-white' : 'bg-gray-200 text-navy'}`}
          onClick={() => setActiveCategory('general')}
        >
          Umum
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeCategory === 'motivation' ? 'bg-navy text-white' : 'bg-gray-200 text-navy'}`}
          onClick={() => setActiveCategory('motivation')}
        >
          Motivasi
        </button>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="border border-navy">
            <div
              className={`p-3 font-bold cursor-pointer flex justify-between items-center ${openIndex === index ? 'bg-navy text-white' : 'bg-silver'}`}
              onClick={() => toggleFaq(index)}
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? '▼' : '►'}</span>
            </div>

            {openIndex === index && (
              <div className="p-4 bg-white">
                <p className="mb-4">{faq.answer}</p>

                {faq.code && (
                  <pre className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto mb-4">
                    {faq.code}
                  </pre>
                )}

                {faq.image && (
                  <div className="flex justify-center my-4">
                    <Image src={faq.image} alt="Illustration" width={100} height={100} />
                  </div>
                )}

                <div className="mt-4 text-right">
                  <button
                    className="bg-orange-500 text-black px-4 py-1 font-bold border-2 border-gray-400 border-outset hover:bg-orange-400"
                    onClick={() => toggleFaq(index)}
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="p-8 text-center bg-yellow-100 border border-dashed border-red-600">
          <p className="font-bold text-lg">Tidak ada FAQ dalam kategori ini.</p>
          <p>Mungkin kami terlalu malas untuk menulisnya... 😴</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-100 border border-dashed border-red-600 text-center">
        <p className="font-bold">Ingat:</p>
        <p>"Programmer malas bukanlah programmer buruk. Programmer malas adalah programmer yang mencari cara paling efisien untuk menyelesaikan masalah dengan usaha minimal."</p>
        <p className="text-sm italic mt-2">- Filosofi IMPHNEN</p>
      </div>
    </section>
  );
};

export default FaqSection;
