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
    <div className='min-h-screen flex items-center justify-center p-8 relative overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-red-900 to-slate-900' />
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        {/* Main content */}
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h1 className='text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent'>
            {sections[currentSection].title}
          </h1>

          <p className='text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed'>
            {sections[currentSection].content}
          </p>

          {/* Progress indicators */}
          <div className='flex justify-center space-x-2 mt-12'>
            {sections.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= currentSection
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 w-8'
                    : 'bg-white/20 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to action - appears after all sections */}
        {currentSection === sections.length - 1 && (
          <div className='mt-16 text-center animate-fade-in'>
            <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-2xl mx-auto'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'>
                Spreman/na da saznaš više?
              </h2>
              <p className='text-lg text-white/80 mb-8'>
                Otkrij kako možeš živeti u skladu sa svojim vrednostima i
                napraviti razliku.
              </p>
              <button className='px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white font-semibold text-lg hover:from-green-400 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
                Nastavi svoje putovanje
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
