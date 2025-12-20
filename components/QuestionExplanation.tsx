'use client';

import { useState, useEffect } from 'react';
import NextButton from './ui/NextButton';

interface QuestionExplanationProps {
  onComplete: () => void;
}

export default function QuestionExplanation({
  onComplete,
}: QuestionExplanationProps) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const text = [
    {
      line: [
        {
          text: 'Ova pitanja nisu test. Nema tačnih odgovora.',
          bold: false,
          italic: false,
        },
      ],
    },
    {
      line: [
        {
          text: 'Postavili smo ih jer ovo putovanje ima smisla samo za ljude kojima je stalo da budu ',
          bold: false,
          italic: false,
        },
        { text: 'iskreni prema sebi', bold: true, italic: false },
        { text: '.', bold: false, italic: false },
      ],
    },
    {
      line: [
        {
          text: 'Ako želiš da se vidiš onakvim kakav jesi - ',
          bold: false,
          italic: false,
        },
        { text: 'a ne onakvim kakvim ', bold: false, italic: false },
        { text: 'misliš da jesi', bold: true, italic: true },
        { text: ', nastavi dalje.', bold: false, italic: false },
      ],
    },
  ];

  const allWords = text.flatMap((item) =>
    item.line.flatMap((segment) => segment.text.split(' ')),
  );
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
      {/* SLIKA: Minimalistička, tamna - apstraktna forma koja sugerira samopreispitivanje i doslednost */}
      {/* Opciono: Dark, abstract background suggesting self-examination/consistency/authenticity */}
      {/* Primeri: Apstraktne forme koje sugerišu ogledalo, autentičnost, ili suprotnost između stvarnog i željenog sebe */}
      {/* Fajl: explanation-background.png ili self-examination.png */}
      <div
        className='absolute inset-0 opacity-35 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out'
        style={{
          backgroundImage: "url('/images/ogledalo.png')",
        }}
      />

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full'>
        <div className='text-center space-y-6'>
          {text.map((item, itemIndex) => {
            let wordStartIndex = 0;
            for (let i = 0; i < itemIndex; i++) {
              wordStartIndex += text[i].line.reduce(
                (acc, segment) => acc + segment.text.split(' ').length,
                0,
              );
            }

            return (
              <p
                key={itemIndex}
                className='text-2xl md:text-3xl lg:text-4xl leading-relaxed px-2 font-light text-gray-200'>
                {item.line.map((segment, segmentIndex) => {
                  const segmentWords = segment.text.split(' ');
                  return segmentWords.map((word: string, wordIndex: number) => {
                    const currentWordIndex =
                      wordStartIndex +
                      item.line
                        .slice(0, segmentIndex)
                        .reduce((acc, s) => acc + s.text.split(' ').length, 0) +
                      wordIndex;
                    const isVisible = currentWordIndex < visibleWordCount;

                    return (
                      <span
                        key={`${segmentIndex}-${wordIndex}`}
                        className={`transition-all duration-5000 ease-in-out ${
                          isVisible
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8'
                        } ${segment.bold ? 'font-bold' : ''} ${
                          segment.italic ? 'italic' : ''
                        }`}
                        style={{
                          transitionDelay: isVisible
                            ? `${currentWordIndex * 15}ms`
                            : '0ms',
                        }}>
                        {word}
                        {wordIndex < segmentWords.length - 1 ? ' ' : ''}
                      </span>
                    );
                  });
                })}
              </p>
            );
          })}

          <div className='mt-12'>
            <NextButton onClick={onComplete} label='Razumem' show={showButton} />
          </div>
        </div>
      </div>
    </div>
  );
}
