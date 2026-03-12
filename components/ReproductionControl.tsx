'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface ReproductionControlProps {
  onComplete: () => void;
}

export default function ReproductionControl({
  onComplete,
}: ReproductionControlProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Parili smo ih i oblikovali po našim željama, na njihovu štetu.',
    'Krave sa hroničnim upalama vimena.',
    'Kokoške koje nose 250–300 jaja godišnje umesto nekoliko desetina.',
    'Ovce čija je vuna postala teret.',
    'To nije suživot.',
    'To je biološka dominacija.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['reproduction-control'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      overlayOpacity={0.5}>
      <ContentContainer spacing='lg'>
        <div className='relative p-6 md:p-16'>
          <TextBackdrop type='linear' />
          <div className='relative z-10'>
            <AnimatedText
              text={text}
              speed={120}
              delayAfterComplete={1000}
              textSize='md'
              alignment='center'
              onComplete={() => setShowButton(true)}
            />
          </div>
        </div>

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
