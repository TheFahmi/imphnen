"use client";

import React from 'react';
import { ProgrammingLanguage } from '../../types';

const languages: ProgrammingLanguage[] = [
  {
    name: 'PHP',
    description: 'Bahasa yang membuat website dinamis, tapi kita lebih suka scroll website statis.',
    lazyLevel: 7
  },
  {
    name: 'JavaScript',
    description: 'Bahasa yang membuat website interaktif, tapi kita lebih suka klik tombol yang sudah ada.',
    lazyLevel: 8
  },
  {
    name: 'Python',
    description: 'Bahasa yang katanya paling mudah, tapi tetap saja kita malas belajarnya.',
    lazyLevel: 6
  },
  {
    name: 'HTML',
    description: 'Bahasa markup yang sebenarnya bukan bahasa pemrograman, tapi tetap saja malas.',
    lazyLevel: 5
  },
  {
    name: 'CSS',
    description: 'Bahasa styling yang membuat website cantik, tapi kita lebih suka template jadi.',
    lazyLevel: 9
  },
  {
    name: 'Node.js',
    description: 'Runtime JavaScript untuk server, tapi kita lebih suka jadi client yang dilayani.',
    lazyLevel: 10
  }
];

const LanguagesSection: React.FC = () => {
  return (
    <section id="bahasa" className="bg-gray-100 p-2 sm:p-4 border-2 border-navy my-4">
      <h2 className="bg-navy text-white p-2 font-bold text-center text-xl">:: BAHASA PEMROGRAMAN ::</h2>
      <p className="my-4">
        Bahasa pemrograman yang (harusnya) kita pelajari tapi males:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
        {languages.map((language, index) => (
          <div
            key={index}
            className={`border border-navy p-4 text-center ${
              index === 0 ? 'bg-cyan-100' :
              index === 1 ? 'bg-pink-100' :
              index === 2 ? 'bg-yellow-100' :
              index === 3 ? 'bg-green-100' :
              index === 4 ? 'bg-orange-100' :
              'bg-purple-100'
            }`}
          >
            <h3 className="bg-navy text-white p-2 font-bold -mt-4 -mx-4 mb-4">{language.name}</h3>
            <p className="mb-4">{language.description}</p>
            <div className="bg-orange-500 text-black p-1 font-bold border-2 border-gray-400 border-outset">
              Level Kemalasan: {language.lazyLevel}/10
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LanguagesSection;
