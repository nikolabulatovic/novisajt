'use client';

import { useState } from 'react';

interface BreakingQuestionProps {
  onComplete: (answer: string) => void;
}

export default function BreakingQuestion({
  onComplete,
}: BreakingQuestionProps) {
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
      onComplete(selected);
    }
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
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    selected === option
                      ? 'bg-gray-800/60 border-2 border-gray-600'
                      : 'bg-gray-900/30 border border-gray-800/50 hover:bg-gray-800/40 hover:border-gray-700/50'
                  }`}>
                  <span className='text-lg md:text-xl text-gray-300'>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Continue button */}
          {showButton && (
            <div className='mt-8 animate-fade-in'>
              <button
                onClick={handleContinue}
                className='px-10 py-5 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-white font-light text-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50'>
                Nastavi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
