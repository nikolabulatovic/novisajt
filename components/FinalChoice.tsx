'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface FinalChoiceProps {
  onComplete: () => void;
}

export default function FinalChoice({ onComplete }: FinalChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showButton, setShowButton] = useState(false);

  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      setShowButton(true);
    }, 500);
  };

  const handleContinue = () => {
    if (selected) {
      onComplete();
    }
  };

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['final-choice'];

  return (
    <div className='min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-black'>
      {backgroundImage && (
        <div className='absolute inset-0 w-full h-full overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              opacity: opacity,
            }}
          />
        </div>
      )}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          {/* Question */}
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto'>
            Da li želiš istinu – ili povratak u ignorisanje?
          </h1>

          {/* Emphasis */}
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl space-y-6'>
            <p className='text-lg sm:text-xl md:text-2xl font-light text-gray-300'>
              Ovo je lična odluka.
            </p>
            <p className='text-lg sm:text-xl md:text-2xl font-light text-gray-300'>
              Nije važno šta drugi rade.
            </p>
            <p className='text-lg sm:text-xl md:text-2xl font-light text-gray-300'>
              Važno je šta TI radiš.
            </p>

            {/* Options */}
            <div className='mt-12 space-y-4'>
              {['Istinu', 'Ignorisanje'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`cursor-pointer w-full text-left p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${selected === option
                    ? 'bg-gray-800/60 border-2 border-gray-600'
                    : 'bg-gray-900/30 border border-gray-800/50 hover:bg-gray-800/40 hover:border-gray-700/50'
                    }`}>
                  <span
                    className='text-lg md:text-xl lg:text-2xl text-gray-300 font-light'
                    style={{ fontFamily: 'var(--font-literata), serif' }}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <NextButton onClick={handleContinue} label='Nastavi' show={showButton} marginTop="sm" />
        </div>
      </div>
    </div>
  );
}
