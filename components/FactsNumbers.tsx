'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface FactsNumbersProps {
  onComplete: () => void;
}

const facts = [
  'Svake godine oduzmemo život preko 90 milijardi kopnenih životinja da bismo ih pojeli. Broj ubijenih morskih životinja je mnogo veći.',
  'To ne radimo zbog zdravlja, preživljavanja niti samoodbrane.',
  'To radimo zbog trenutnog zadovoljstva i pogodnosti.',
  'Društvo to prihvata.'
  // Može se dodati više činjenica ako je potrebno
];

export default function FactsNumbers({ onComplete }: FactsNumbersProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const handleNext = () => {
    if (currentFact < facts.length - 1) {
      setCurrentFact(currentFact + 1);
      setShowButton(false);
    } else {
      onComplete();
    }
  };

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds.facts;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      maxWidth="md">
      <ContentContainer spacing="lg">
        {/* Fact */}
        <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
          <AnimatedText
            key={currentFact}
            text={facts[currentFact]}
            speed={150}
            delayAfterComplete={2000}
            textSize="lg"
            alignment="center"
            onComplete={() => setShowButton(true)}
          />
        </div>

        {/* Progress indicators */}
        <div className='flex justify-center space-x-2 mt-8'>
          {facts.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${index <= currentFact
                ? 'bg-gray-600 w-8'
                : 'bg-gray-800/50 w-2'
                }`}
            />
          ))}
        </div>

        {/* Button */}
        <NextButton
          onClick={handleNext}
          label={currentFact < facts.length - 1 ? 'Dalje' : 'Nastavi'}
          show={showButton}
        />
      </ContentContainer>
    </PageContainer>
  );
}
