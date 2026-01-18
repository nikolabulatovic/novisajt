'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';

interface QuestionExplanationProps {
  onComplete: () => void;
}

export default function QuestionExplanation({
  onComplete,
}: QuestionExplanationProps) {
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

  return (
    <PageContainer
      backgroundImage="/images/ogledalo.png"
      backgroundImageOpacity={0.35}
      overlayOpacity={0}
      maxWidth="lg">
      <ContentContainer spacing="sm">
        <div className="px-2">
          <AnimatedText
            text={text}
            speed={100}
            delayAfterComplete={1200}
            textSize="lg"
            alignment="center"
            wordTransitionDuration={5000}
            onComplete={() => setShowButton(true)}
          />
        </div>

        <NextButton onClick={onComplete} label='Razumem' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
