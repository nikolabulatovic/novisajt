'use client';

import { useState } from 'react';

interface ChoiceStageProps {
  onPillChoice: (pill: 'red' | 'blue') => void;
}

export default function ChoiceStage({ onPillChoice }: ChoiceStageProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);

  const handlePillClick = (pill: 'red' | 'blue') => {
    setSelectedPill(pill);
    setIsFadingOut(true);

    // Wait for fade out animation to complete before calling onPillChoice
    setTimeout(() => {
      onPillChoice(pill);
    }, 600); // Match the fade out duration
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 relative bg-black transition-opacity duration-[600ms] ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}>
      {/* SLIKA: Minimalistička, tamna pozadina - možda apstraktna tekstura ili mrlje svetlosti u tamnoj sobi */}
      {/* Opciono: Subtle background image - dark, abstract, minimal */}
      <div
        className='absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat transition-opacity duration-[600ms]'
        style={{
          backgroundImage: "url('/images/red-pill-blue-pill-cover-ai.png')",
        }}
      />

      {/* Animated background - minimal */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto text-center space-y-16'>
        {/* Centrirano pitanje - bez objašnjenja */}
        <div className='space-y-8'>
          <h1 className='text-4xl md:text-6xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto'>
            Želiš li da saznaš istinu – ili da nastaviš kao do sada?
          </h1>
        </div>

        {/* Dva dugmeta - pilule */}
        <div className='flex flex-row items-center justify-center gap-16 md:gap-24 mt-20'>
          {/* Plava pilula */}
          <div className='flex flex-col items-center space-y-8'>
            <button
              onClick={() => handlePillClick('blue')}
              disabled={isFadingOut}
              className={`group relative flex flex-col items-center space-y-6 cursor-pointer transition-all duration-300 ${
                isFadingOut && selectedPill !== 'blue'
                  ? 'opacity-30'
                  : 'hover:opacity-80'
              } ${isFadingOut ? 'pointer-events-none' : ''}`}>
              <div className='relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-500 group-hover:scale-105'>
                <div className='absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity' />
                <div className='relative w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600/50 group-hover:border-blue-500 transition-all'></div>
              </div>
            </button>
            <p className='text-xl md:text-2xl font-light text-gray-400'>
              🔵 Plava pilula
            </p>
          </div>

          {/* Crvena pilula */}
          <div className='flex flex-col items-center space-y-8'>
            <button
              onClick={() => handlePillClick('red')}
              disabled={isFadingOut}
              className={`group relative flex flex-col items-center space-y-6 cursor-pointer transition-all duration-300 ${
                isFadingOut && selectedPill !== 'red'
                  ? 'opacity-30'
                  : 'hover:opacity-80'
              } ${isFadingOut ? 'pointer-events-none' : ''}`}>
              <div
                className={`relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-500 ${
                  selectedPill === 'red' && isFadingOut
                    ? 'scale-110'
                    : 'group-hover:scale-105'
                }`}>
                <div className='absolute inset-0 bg-red-600 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity' />
                <div className='relative w-full h-full bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg border-2 border-red-600/50 group-hover:border-red-500 transition-all'></div>
              </div>
            </button>
            <p className='text-xl md:text-2xl font-light text-gray-400'>
              🔴 Crvena pilula
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
