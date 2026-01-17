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
