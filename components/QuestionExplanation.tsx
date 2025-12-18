'use client';

import { useState, useEffect } from 'react';

interface QuestionExplanationProps {
  onComplete: () => void;
}

export default function QuestionExplanation({
  onComplete,
}: QuestionExplanationProps) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const text =
    'Ovo nije test. Ovo je za ljude kojima je stalo da budu dosledni sebi. Ovo važi samo ako želiš da znaš istinu o sebi.';

  const allWords = text.split(' ');
  const totalWords = allWords.length;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < totalWords) {
        setVisibleWordCount(currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowButton(true);
        }, 1200);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [totalWords]);

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, možda apstraktna forma ili tekstura koja sugerira refleksiju */}
      {/* Opciono: Subtle abstract background suggesting reflection/introspection */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full'>
        <div className='text-center'>
          <p className='text-3xl md:text-4xl lg:text-5xl leading-relaxed font-light text-gray-200 px-8'>
            {allWords.map((word, wordIndex) => {
              const isVisible = wordIndex < visibleWordCount;

              return (
                <span
                  key={wordIndex}
                  className={`inline-block transition-all duration-500 ease-in-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${wordIndex * 15}ms` : '0ms',
                  }}>
                  {word}
                  {wordIndex < allWords.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </p>

          {showButton && (
            <div className='mt-12 animate-fade-in'>
              <button
                onClick={onComplete}
                className='cursor-pointer px-10 py-5 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-white font-light text-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50'>
                Razumem
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
