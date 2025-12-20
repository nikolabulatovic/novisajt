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

      <div className='relative z-10 max-w-4xl mx-auto text-center space-y-12 animate-fade-in'>
        <div className='space-y-6'>
          <h1 className='text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-gray-300 via-purple-400 to-gray-300 bg-clip-text text-transparent animate-gradient'>
            Izbor
          </h1>
          <h2 className='text-2xl md:text-4xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
            Želiš li da saznaš istinu – ili da nastaviš kao do sada?
          </h2>
        </div>

        {/* Dva dugmeta - pilule */}
        <div className='flex flex-row md:flex-row items-center justify-center gap-12 md:gap-16 mt-16'>
          {/* Plava pilula */}
          <div className='flex flex-col items-center space-y-6'>
            <button
              onClick={() => handlePillClick('blue')}
              disabled={isFadingOut}
              className={`group relative flex flex-col items-center space-y-6 cursor-pointer ${
                isFadingOut && selectedPill !== 'blue' ? 'opacity-30' : ''
              } ${isFadingOut ? 'pointer-events-none' : ''}`}>
              <div className='relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'>
                {/* Shadow at bottom for 3D effect */}
                <div className='absolute inset-0 rounded-full bg-black/50 blur-md translate-y-2'></div>
                {/* Pill with top-to-bottom gradient */}
                <div
                  className='relative w-full h-full rounded-full flex items-center justify-center shadow-2xl'
                  style={{
                    background:
                      'linear-gradient(to bottom, rgb(35, 60, 145) 0%, rgb(60, 95, 200) 15%, rgb(23, 37, 84) 90%, rgb(18, 28, 55) 95%, rgb(15, 22, 45) 98%, rgb(12, 18, 38) 100%)',
                  }}>
                  {/* Subtle highlight at top */}
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b from-blue-800/20 to-transparent rounded-t-full'></div>
                </div>
              </div>
            </button>
            <div className='text-center space-y-2'>
              <p className='text-2xl md:text-3xl font-semibold text-gray-300'>
                Ostani
              </p>
              <p className='text-md md:text-lg text-gray-400 max-w-xs'>
                Nastavi kao što jesi - udoban u poznatom.
              </p>
            </div>
          </div>

          {/* Crvena pilula */}
          <div className='flex flex-col items-center space-y-6'>
            <button
              onClick={() => handlePillClick('red')}
              disabled={isFadingOut}
              className={`group relative flex flex-col items-center space-y-6 cursor-pointer ${
                isFadingOut && selectedPill !== 'red' ? 'opacity-30' : ''
              } ${isFadingOut ? 'pointer-events-none' : ''}`}>
              <div
                className={`relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-500 ${
                  selectedPill === 'red' && isFadingOut
                    ? 'scale-110 -rotate-3'
                    : 'group-hover:scale-110 group-hover:-rotate-3'
                }`}>
                {/* Shadow at bottom for 3D effect */}
                <div className='absolute inset-0 rounded-full bg-black/50 blur-md translate-y-2'></div>
                {/* Pill with top-to-bottom gradient */}
                <div
                  className='relative w-full h-full rounded-full flex items-center justify-center shadow-2xl'
                  style={{
                    background:
                      'linear-gradient(to bottom, rgb(140, 35, 35) 0%, rgb(220, 60, 60) 15%, rgb(69, 10, 10) 90%, rgb(55, 11, 11) 95%, rgb(48, 9, 9) 98%, rgb(42, 8, 8) 100%)',
                  }}>
                  {/* Subtle highlight at top */}
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b from-red-800/20 to-transparent rounded-t-full'></div>
                </div>
              </div>
            </button>
            <div className='text-center space-y-2'>
              <p className='text-2xl md:text-3xl font-semibold text-gray-300'>
                Vidi
              </p>
              <p className='text-md md:text-lg text-gray-400 max-w-xs w-60'>
                Otvori oči. Otkrij istinu o sebi i svetu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
