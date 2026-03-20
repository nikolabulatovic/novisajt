'use client';

import { useState } from 'react';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

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
    <div className='min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-black'>
      {(() => {
        const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['breaking-question'];
        return backgroundImage ? (
          <div className='absolute inset-0 w-full h-full overflow-hidden'>
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `url('${backgroundImage}')`,
                opacity: opacity,
              }}
            />
          </div>
        ) : null;
      })()}

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          {/* Question */}
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto'>
            Šta ako danas postoji ogromna nepravda u kojoj učestvuješ – a da to
            ignorišeš jer je lakše?
          </h1>

          {/* Sub-question */}
          <p className='text-xl sm:text-2xl md:text-3xl font-light text-gray-300'>
            Da li želiš da znaš?
          </p>

          {/* Options */}
          <div className='flex flex-row gap-8'>
            {['Želim da znam', 'Radije bih da ne znam'].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-center p-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${selected === option
                    ? 'bg-gray-800/60 border-2 border-gray-600'
                    : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50'
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
      </div>
    </div>
  );
}
