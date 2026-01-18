'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';

interface SpasaStoryProps {
  onComplete: () => void;
}

export default function SpasaStory({ onComplete }: SpasaStoryProps) {
  const [showButton, setShowButton] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageVisible, setFinalMessageVisible] = useState(false);

  const text = [
    'Upoznaćemo te sa Spasinom pričom.',
    'Spasa je dobila ime po tome što je spašena. Njena sudbina pre nego što su je ljudi udomili bila je gotovo sigurna smrt. Ljudi su odlučili da joj pruže šansu za život — život koji bi inače izgubila.',
    'Svaki čin spašavanja nosi težinu. Čak i kada niko nije dužan da reaguje, izbor da poštuješ i saosećaš sa bićem koje oseća, razume i želi da živi, pokazuje koliko možemo biti odgovorni i dobri.',
  ];

  const handleContinue = () => {
    if (!showFinalMessage) {
      setShowFinalMessage(true);
      setShowButton(false);
      setTimeout(() => {
        setFinalMessageVisible(true);
        setTimeout(() => {
          onComplete();
        }, 3000); // Show final message for 3 seconds before moving on
      }, 500);
    }
  };

  return (
    <PageContainer
      backgroundImage="/images/spasa-rescue-hope.png"
      backgroundImageOpacity={0.8}
      overlayOpacity={0.5}>
      {!showFinalMessage ? (
        <ContentContainer spacing="lg">
          <div className='relative p-16'>
            <TextBackdrop type="linear" />
            <div className='relative z-10'>
              <AnimatedText
                text={text}
                speed={120}
                delayAfterComplete={1000}
                textSize="md"
                alignment="center"
                onComplete={() => setShowButton(true)}
              />
            </div>
          </div>

          <NextButton onClick={handleContinue} label='Nastavi' show={showButton} />
        </ContentContainer>
      ) : (
        <div
          className={`text-center transition-opacity duration-1000 relative ${finalMessageVisible ? 'opacity-100' : 'opacity-0'
            }`}>
          <TextBackdrop type="linear" className="-mx-8 -my-12" />
          <p className='text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed relative z-10'>
            Ali postoji nešto što jesmo dužni: da sve životinje ostavimo na
            miru.
          </p>
        </div>
      )}
    </PageContainer>
  );
}

