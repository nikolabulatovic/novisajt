'use client';

import { useState } from 'react';
import Pill from './ui/Pill';

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
            <Pill
              color='blue'
              onClick={() => handlePillClick('blue')}
              disabled={isFadingOut}
              isSelected={selectedPill === 'blue'}
              isFadingOut={isFadingOut}
            />
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
            <Pill
              color='red'
              onClick={() => handlePillClick('red')}
              disabled={isFadingOut}
              isSelected={selectedPill === 'red'}
              isFadingOut={isFadingOut}
            />
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
