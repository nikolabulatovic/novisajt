'use client';

import { useState, useEffect } from 'react';

interface DomesticationReproductionProps {
  onComplete: () => void;
}

export default function DomesticationReproduction({
  onComplete,
}: DomesticationReproductionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const text =
    'Oduzeta sloboda. Biološke deformacije. Patnja kao nusprodukt "efikasnosti". Naša obaveza nije da ih koristimo humanije – već da ih ostavimo na miru.';

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setShowButton(true);
      }, 2000);
    }, 300);
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - BEZ grafičkih scena */}
      {/* Opciono: Dark, abstract background - NO graphic scenes */}
      {/* Možda apstraktna forma koja sugerira ograničenje ili sistem */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full px-8'>
        <p
          className={`text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-gray-300 text-left transition-all duration-[1200ms] ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
          {text}
        </p>

        <div
          className={`mt-12 text-center transition-opacity duration-500 ${
            showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <button
            onClick={onComplete}
            className='button-next cursor-pointer px-12 py-6 rounded-full font-light text-xl group relative overflow-hidden'>
            <span className='relative z-10 flex items-center justify-center'>
            Nastavi
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
          </button>
        </div>
      </div>
    </div>
  );
}
