"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
  title: string;
  description: string;
  imagePath: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: "Komunitas IMPHNEN",
    description: "Bergabunglah dengan komunitas programmer yang malas ngoding. Bersama-sama kita bisa saling memotivasi untuk... tetap malas bersama!",
    imagePath: "/images/komunitas.svg"
  },
  {
    title: "Badge Malas Ngoding",
    description: "Dapatkan badge kehormatan sebagai anggota resmi komunitas programmer yang malas ngoding. Pajang dengan bangga!",
    imagePath: "/images/malas_ngoding_badge.svg"
  },
  {
    title: "CSS Questions",
    description: "Pusing dengan CSS? Tenang, kamu tidak sendiri. Kami punya jawaban untuk pertanyaan CSS yang sering membuat pusing.",
    imagePath: "/images/css_question.svg"
  },
  {
    title: "Retro Computer",
    description: "Komputer retro untuk programmer retro. Cocok untuk yang malas upgrade skill coding-nya sejak tahun 90-an.",
    imagePath: "/images/retro_computer.svg"
  },
  {
    title: "Programmer Malas",
    description: "Ikon resmi programmer yang lebih suka tidur daripada debugging. Relatable banget kan?",
    imagePath: "/images/programmer_new.svg"
  },
  {
    title: "No Coding Zone",
    description: "Area bebas coding untuk programmer yang butuh istirahat dari syntax error dan debugging yang tidak ada habisnya.",
    imagePath: "/images/no_coding_new.svg"
  }
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: GALERI IMPHNEN ::</h2>
      <p className="my-4">
        Koleksi gambar-gambar yang menggambarkan semangat IMPHNEN. Klik untuk melihat lebih detail!
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="border-2 border-navy p-2 bg-white cursor-pointer hover:bg-yellow-100 transition-colors"
            onClick={() => setSelectedImage(item)}
          >
            <div className="aspect-square relative overflow-hidden flex items-center justify-center bg-gray-50">
              <Image
                src={item.imagePath}
                alt={item.title}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <h3 className="text-center font-bold mt-2 text-navy text-sm">{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 max-w-lg w-full border-4 border-navy">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-navy">{selectedImage.title}</h2>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-red-500 text-white w-8 h-8 flex items-center justify-center font-bold rounded-full"
              >
                X
              </button>
            </div>

            <div className="flex justify-center my-4 bg-gray-50 p-4">
              <Image
                src={selectedImage.imagePath}
                alt={selectedImage.title}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            <p className="mb-4">{selectedImage.description}</p>

            <div className="text-right">
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-orange-500 text-black px-4 py-1 font-bold border-2 border-gray-400 border-outset hover:bg-orange-400"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-100 border border-dashed border-red-600 text-center">
        <p className="font-bold">Fun Fact:</p>
        <p>"Programmer malas sebenarnya adalah programmer efisien yang menolak mengerjakan hal yang tidak perlu."</p>
        <p className="text-sm italic mt-2">(Ini hanya pembenaran diri, jangan terlalu dianggap serius)</p>
      </div>
    </section>
  );
};

export default GallerySection;
