"use client";

import React from 'react';
import Image from 'next/image';
import { Feature } from '../../types';

const features: Feature[] = [
  {
    title: 'Belajar Tanpa Koding',
    description: 'Pelajari konsep programming dengan cara yang mudah dipahami tanpa harus menulis kode yang rumit.',
    icon: '/images/no_coding.svg'
  },
  {
    title: 'Komunitas Supportif',
    description: 'Bergabunglah dengan komunitas programmer Indonesia yang siap membantu dan berbagi pengalaman.',
    icon: '/images/community.svg'
  },
  {
    title: 'Tutorial Interaktif',
    description: 'Akses tutorial interaktif yang membuat konsep pemrograman sulit menjadi mudah dipahami.',
    icon: '/images/tutorial.svg'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="fitur" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: FITUR UNGGULAN ::</h2>
      <p className="my-4">
        IMPHNEN hadir dengan berbagai fitur untuk membantu kamu menjadi programmer handal tanpa harus pusing dengan coding.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`border border-navy p-4 text-center ${
              index === 0 ? 'bg-cyan-100' : index === 1 ? 'bg-pink-100' : 'bg-yellow-100'
            }`}
          >
            <h3 className="bg-navy text-white p-2 font-bold -mt-4 -mx-4 mb-4">{feature.title}</h3>
            <Image src={feature.icon} alt={feature.title} width={50} height={50} className="mx-auto my-4" />
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
