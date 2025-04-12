"use client";

import React from 'react';
import Image from 'next/image';
import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    quote: "Saya sudah download 27 tutorial programming, install 5 IDE berbeda, dan beli 3 kursus online. Tapi belum pernah nulis kode sama sekali. Terima kasih IMPHNEN, sekarang saya tahu saya tidak sendiri!",
    author: "Procrastinator Pro",
    age: 29,
    avatar: "/images/avatar1.svg"
  },
  {
    quote: "Kemarin saya hampir ngoding, tapi terus kepikiran 'ah, besok aja deh'. Sudah 3 tahun begitu terus. IMPHNEN adalah rumah kedua saya sekarang.",
    author: "Tomorrow Coder",
    age: 25,
    avatar: "/images/avatar2.svg"
  },
  {
    quote: "Saya punya ide aplikasi yang akan mengubah dunia! Sudah saya tulis di notepad sejak 2015, tapi belum sempat ngoding. Mungkin tahun depan... atau depannya lagi...",
    author: "Idea Generator",
    age: 34,
    avatar: "/images/avatar3.svg"
  },
  {
    quote: "Saya lebih suka nonton tutorial coding 10 jam daripada ngoding 10 menit. Rasanya seperti sudah jago padahal belum nulis kode sama sekali. IMPHNEN mengerti perasaan saya!",
    author: "Tutorial Addict",
    age: 27,
    avatar: "/images/avatar4.svg"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimoni" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: TESTIMONI MALAS NGODING ::</h2>
      <p className="my-4">
        Apa kata mereka yang sudah bergabung dengan komunitas IMPHNEN?
      </p>

      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-4 border ${
              index === 0 ? 'bg-yellow-100 border-dashed border-red-600' :
              index === 1 ? 'bg-cyan-100 border-dashed border-blue-600' :
              index === 2 ? 'bg-pink-100 border-dashed border-pink-600' :
              'bg-green-100 border-dashed border-green-600'
            }`}
          >
            <div className="flex items-center">
              <Image
                src={testimonial.avatar}
                alt={`Avatar ${index + 1}`}
                width={50}
                height={50}
                className="mr-4 border-2 border-navy"
              />
              <div>
                <p className="italic mb-2">{testimonial.quote}</p>
                <p className="text-right font-bold">
                  - {testimonial.author}, {testimonial.age} tahun
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
