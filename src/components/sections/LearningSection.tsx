"use client";

import React from 'react';
import { LearningResource } from '../../types';

const resources: LearningResource[] = [
  {
    title: 'Video Tutorial',
    description: 'Belajar melalui tutorial video langkah demi langkah yang mudah diikuti.',
    buttonText: 'Lihat Semua Video',
    buttonLink: '#'
  },
  {
    title: 'Artikel & Tutorial',
    description: 'Pelajari konsep programming melalui artikel yang disusun secara terstruktur.',
    buttonText: 'Baca Artikel',
    buttonLink: '#'
  },
  {
    title: 'Tantangan Koding',
    description: 'Uji kemampuanmu dengan tantangan koding yang menyenangkan dan menantang.',
    buttonText: 'Mulai Tantangan',
    buttonLink: '#'
  },
  {
    title: 'Sharing Session',
    description: 'Ikuti sesi sharing bersama programmer berpengalaman dan belajar dari pengalaman mereka.',
    buttonText: 'Jadwal Session',
    buttonLink: '#'
  }
];

const LearningSection: React.FC = () => {
  return (
    <section id="belajar" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: SUMBER BELAJAR ::</h2>
      <p className="my-4">
        Akses berbagai materi belajar yang akan membantu kamu menguasai konsep programming dengan cara yang menyenangkan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        {resources.map((resource, index) => (
          <div
            key={index}
            className={`border border-navy p-4 ${
              index === 0 ? 'bg-cyan-100' :
              index === 1 ? 'bg-pink-100' :
              index === 2 ? 'bg-yellow-100' :
              'bg-green-100'
            }`}
          >
            <h3 className="bg-navy text-white p-2 font-bold -mt-4 -mx-4 mb-4">{resource.title}</h3>
            <p className="mb-4">{resource.description}</p>
            <div className="text-right">
              <a
                href={resource.buttonLink}
                className="bg-orange-500 text-black px-4 py-1 font-bold no-underline border-2 border-gray-400 border-outset hover:bg-orange-400"
              >
                {resource.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningSection;
