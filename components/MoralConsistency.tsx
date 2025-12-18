'use client';

import { useState, useEffect } from 'react';

interface MoralConsistencyProps {
  onComplete: () => void;
}

export default function MoralConsistency({
  onComplete,
}: MoralConsistencyProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  const text = [
    { line: 'Ne bismo ih oslepeli.', bold: false },
    { line: 'Ne bismo im sekli grkljan.', bold: false },
    { line: 'Činjenica da ih pojedemo kasnije ne opravdava čin.', bold: true },
    { line: 'Možemo da živimo bez ovoga.', bold: false },
  ];

  useEffect(() => {
    text.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        if (index === text.length - 1) {
          setTimeout(() => {
            setShowButton(true);
          }, 1200);
        }
      }, index * 500);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - možda apstraktna forma koja sugerira moralnu doslednost */}
      {/* Opciono: Dark, abstract background suggesting moral consistency/integrity */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full'>
        <div className='space-y-4 md:space-y-6 text-center'>
          {text.map((item, index) => (
            <p
              key={index}
              className={`text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-200 transition-all duration-700 ease-out ${
                item.bold ? 'font-medium' : 'font-light'
              } ${
                visibleLines.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
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
