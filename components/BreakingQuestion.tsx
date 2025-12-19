'use client';

import { useState } from 'react';

interface BreakingQuestionProps {
  onComplete: (answer: string) => void;
}

export default function BreakingQuestion({
  onComplete,
}: BreakingQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      onComplete(selected);
    }
  };

  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      handleContinue();
    }, 500);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - možda apstraktna forma koja sugerira prelomni momenat */}
      {/* Opciono: Dark, abstract background suggesting breaking point/moment of truth */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          {/* Question */}
          <h1 className='text-3xl md:text-5xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto'>
            Šta ako danas postoji ogromna nepravda u kojoj učestvuješ – a da to
            ignorišeš jer je lakše?
          </h1>

          {/* Sub-question */}
          <p className='text-2xl md:text-3xl font-light text-gray-300'>
            Da li želiš da znaš?
          </p>

          {/* Options */}
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
            <div className='space-y-4'>
              {['Da', 'Ne'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
                    selected === option
                      ? 'bg-gray-800/60 border-2 border-gray-600'
                      : 'bg-gray-900/30 border border-gray-800/50 hover:bg-gray-800/40 hover:border-gray-700/50'
                  }`}>
                  <span className='text-lg md:text-xl lg:text-2xl text-gray-300 font-light'>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
