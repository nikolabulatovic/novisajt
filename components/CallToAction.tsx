'use client';

import { useState } from 'react';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';

interface CallToActionProps {
  onComplete: () => void;
}

export default function CallToAction({ onComplete }: CallToActionProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Sada znaš.',
    'Sada vidiš.',
    'Sada možeš da biraš.',
    'Izaberi DOBRO.',
  ];

  return (
    <PageContainer maxWidth="md">
      <ContentContainer spacing="lg">
        <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
          <AnimatedText
            text={text}
            speed={120}
            delayAfterComplete={1000}
            textSize="lg"
            alignment="center"
            onComplete={() => setShowButton(true)}
          />
        </div>

        <div
          className={`mt-12 transition-opacity duration-500 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
          <button
            onClick={onComplete}
            className='cursor-pointer px-12 py-6 bg-gray-700/70 hover:bg-gray-600/70 rounded-full text-white font-medium text-2xl transition-all duration-300 border-2 border-gray-600/50 hover:border-gray-500/50 transform hover:scale-105'>
            Izaberi DOBRO
          </button>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
