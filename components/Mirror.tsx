'use client';

import { useState, useEffect } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface MirrorProps {
  answers: Record<string, string>;
  onComplete: () => void;
}

const questionLabels: Record<string, string> = {
  q1: 'Kako definišeš svoj karakter?',
  q2: 'Kada saznaš nešto neprijatno o sebi, ti:',
  q3: 'Šta ti je najvažnije?',
};

const answerLabels: Record<string, Record<string, string>> = {
  q1: {
    pravedan: 'Trudim se da budem pravedan',
    nepravda: 'Bitno mi je da ne nanosim nepravdu drugima',
    otvoren: 'Otvoren sam da menjam stavove',
    dobra: 'Smatram sebe dobrom osobom',
  },
  q2: {
    popravim: 'Razmislim i pokušam da se popravim',
    oduprem: 'Oduprem se u početku, ali poslušam argumente',
    istina: 'Više volim istinu nego utehu',
    tesko: 'Teško mi je, ali ne ignorišem',
  },
  q3: {
    pravednost: 'Pravednost',
    odgovornost: 'Odgovornost',
    doslednost: 'Doslednost',
    'istina-boli': 'Istina, čak i kada boli',
  },
};

export default function Mirror({ answers, onComplete }: MirrorProps) {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [showButton, setShowButton] = useState(false);

  const answerEntries = Object.entries(answers);

  useEffect(() => {
    if (answerEntries.length > 0) {
      const timer = setTimeout(() => {
        setVisibleIndex(0);
      }, 500);

      const interval = setInterval(() => {
        setVisibleIndex((prev) => {
          if (prev < answerEntries.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setShowButton(true);
            }, 2000);
            return prev;
          }
        });
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [answerEntries.length]);

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds.mirror;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      maxWidth="md">
      <ContentContainer spacing="lg">
        {/* Title */}
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-300 mb-6 md:mb-12'>
          Tvoji odgovori
        </h1>

        {/* Answers */}
        <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl space-y-8'>
          {answerEntries.map(([questionId, answerValue], index) => {
            const question = questionLabels[questionId];
            const answer =
              answerLabels[questionId]?.[answerValue] || answerValue;
            const isVisible = index <= visibleIndex;

            return (
              <div
                key={questionId}
                className={`transition-all duration-1000 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}>
                <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-400 mb-2'>
                  {question}
                </p>
                <p
                  className='text-xl sm:text-2xl md:text-3xl font-light text-gray-200'
                  style={{ fontFamily: 'var(--font-literata), serif' }}>
                  {answer}
                </p>
              </div>
            );
          })}
        </div>

        {/* Message */}
        {visibleIndex >= answerEntries.length - 1 && (
          <div className='mt-12 animate-fade-in'>
            <p className='text-xl sm:text-2xl md:text-3xl font-light text-gray-300'>
              Budi ono za šta kažeš da jesi.
            </p>
          </div>
        )}

        {/* Continue button */}
        <NextButton onClick={onComplete} show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
