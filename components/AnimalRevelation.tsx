'use client';

import { useState, useEffect } from 'react';

interface AnimalRevelationProps {
  choice: 'red' | 'blue' | null;
}

export default function AnimalRevelation({ choice }: AnimalRevelationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      title: 'Izabrao/la si da vidiš',
      content:
        'Sada kada si razmislio/la o svom karakteru, hajde da istražimo šta to znači u praksi.',
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Stvarnost',
      content:
        'Svakog dana, milijarde osećajnih bića doživljavaju bol, strah i patnju. Ona osećaju radost, stvaraju veze i vrednuju svoje živote—baš kao i ti.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Tvoj izbor je važan',
      content:
        'Hrana na tvom tanjiru, odeća koju nosiš, proizvodi koje koristiš—svaki izbor je glas za vrstu sveta u kojem želiš da živiš.',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      title: 'Ko si ti?',
      content:
        'Već si pokazao/la da ti je stalo do saosećanja, integriteta i činjenja prave stvari. Sada imaš priliku da uskladiš svoje postupke sa tim vrednostima.',
      color: 'from-yellow-500 to-green-500',
    },
  ];

  useEffect(() => {
    if (isVisible && currentSection < sections.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSection((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, isVisible]);

  return (
    <div className='min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-slate-950 to-black' />
        <div className='absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        {/* Main content */}
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-gray-300 via-red-400 to-orange-400 bg-clip-text text-transparent'>
            {sections[currentSection].title}
          </h1>

          <p className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            {sections[currentSection].content}
          </p>

          {/* Progress indicators */}
          <div className='flex justify-center space-x-2 mt-12'>
            {sections.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= currentSection
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 w-8'
                    : 'bg-gray-700/50 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to action - appears after all sections */}
        {currentSection === sections.length - 1 && (
          <div className='mt-16 text-center animate-fade-in'>
            <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl max-w-2xl mx-auto'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent'>
                Spreman/na da saznaš više?
              </h2>
              <p className='text-lg text-gray-300 mb-8'>
                Otkrij kako možeš živeti u skladu sa svojim vrednostima i
                napraviti razliku.
              </p>
              <button className='cursor-pointer px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-semibold text-lg hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
                Nastavi svoje putovanje
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
