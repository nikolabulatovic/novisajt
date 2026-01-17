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
    { line: 'Milgramov eksperiment, 1961.', delay: 0 },
    {
      line: 'Istraživač naređuje učesniku da daje električne šokove „učeniku".',
      delay: 1000,
    },
    { line: 'Učenik je zapravo glumac. Šokovi su lažni.', delay: 2500 },
    { line: 'Ali učesnik to ne zna.', delay: 4000 },
    { line: '', delay: 5000 },
    { line: 'Kada autoritet kaže da je nešto u redu,', delay: 6000 },
    { line: 'većina ljudi posluša.', delay: 7500 },
    { line: '', delay: 8500 },
    { line: 'Čak i kada to povređuje druge.', delay: 9500 },
    { line: 'Čak i kada osećaju da nešto nije u redu.', delay: 11000 },
    { line: '', delay: 12000 },
    { line: 'Poslušnost često pobedi savest.', delay: 13000 },
    { line: '', delay: 14000 },
    { line: '65% učesnika je nastavilo do kraja.', delay: 15000 },
    { line: 'Samo zato što im je autoritet rekao da nastave.', delay: 16500 },
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
    <div className='min-h-screen flex items-start justify-center pt-16 md:pt-24 relative bg-black'>
      {/* Full background image */}
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('/images/milgram.jpeg')",
          }}
        />
        {/* Dark overlay for text visibility */}
        <div className='absolute inset-0 bg-black/70 pointer-events-none' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full p-6 md:p-8'>
        {/* Text container with backdrop for better visibility */}
        <div className='bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-800/50 shadow-2xl'>
          <div className='space-y-3 md:space-y-4'>
            {text.map((item, index) => {
              if (item.line === '') {
                return <div key={index} className='h-2' />;
              }
              return (
                <p
                  key={index}
                  className={`text-lg md:text-xl lg:text-2xl font-light text-gray-200 text-center leading-relaxed transition-all duration-1000 ease-out ${
                    visibleLines.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}>
                  {item.line}
                </p>
              );
            })}
          </div>

          <div
            className={`mt-8 text-center transition-opacity duration-500 ${
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
    </div>
  );
}
