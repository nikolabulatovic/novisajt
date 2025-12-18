'use client';

import { useState, useEffect } from 'react';

interface MilgramExperimentProps {
  onComplete: () => void;
}

export default function MilgramExperiment({
  onComplete,
}: MilgramExperimentProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  const text = [
    { line: 'Milgramov eksperiment.', delay: 0 },
    { line: 'Ljudi čine zlo kada autoritet kaže da je to u redu.', delay: 800 },
    { line: 'Ne zato što su zli.', delay: 2000 },
    { line: 'Već zato što ne preispituju.', delay: 2800 },
  ];

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    text.forEach((item, index) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        if (index === text.length - 1) {
          setTimeout(() => {
            setShowButton(true);
          }, 1500);
        }
      }, item.delay);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, možda apstraktna forma koja sugerira autoritet ili sistem */}
      {/* Opciono: Abstract background suggesting authority/system/control */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full'>
        <div className='space-y-8 md:space-y-12'>
          {text.map((item, index) => (
            <p
              key={index}
              className={`text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 text-center transition-all duration-1000 ease-out ${
                visibleLines.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
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
