'use client';

import { useState, useEffect } from 'react';

interface AnimalsIntroductionProps {
  onComplete: () => void;
}

export default function AnimalsIntroduction({
  onComplete,
}: AnimalsIntroductionProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  const text = [
    {
      line: 'Ljudi nisu jedina svesna bića.',
      size: 'text-4xl md:text-5xl lg:text-6xl',
    },
    {
      line: 'Životinje imaju svest.',
      size: 'text-3xl md:text-4xl lg:text-5xl',
    },
    {
      line: 'Životinje imaju osećanja.',
      size: 'text-3xl md:text-4xl lg:text-5xl',
    },
    {
      line: 'Ljudi su takođe životinje.',
      size: 'text-4xl md:text-5xl lg:text-6xl',
    },
  ];

  useEffect(() => {
    text.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        if (index === text.length - 1) {
          setTimeout(() => {
            setShowButton(true);
          }, 1000);
        }
      }, index * 600);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - možda apstraktna forma koja sugerira prirodu ili svest */}
      {/* Opciono: Dark, abstract background suggesting nature/consciousness/connection */}
      {/* ILI: Subtle, non-graphic image of animals in natural setting (very dark, almost silhouette) */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='space-y-6 md:space-y-10 text-center'>
          {text.map((item, index) => (
            <p
              key={index}
              className={`${
                item.size
              } font-light text-gray-200 leading-tight transition-all duration-800 ease-out ${
                visibleLines.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}>
              {item.line}
            </p>
          ))}
        </div>

        {showButton && (
          <div className='mt-12 text-center animate-fade-in'>
            <button
              onClick={onComplete}
              className='px-10 py-5 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-white font-light text-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50'>
              Nastavi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
