'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface AcceptingSelfOwnershipProps {
  onComplete: () => void;
}

export default function AcceptingSelfOwnership({
  onComplete,
}: AcceptingSelfOwnershipProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Tvoje uverenje je rezultat mentalita koji si prihvatio kao dete dok još nisi imao razvijeno razmišljanje. Ako izbaciš to uverenje iz glave i samo posmatraš, videćeš sledeće:',
    'Svako biće prirodno upravlja sobom. Mi možemo, zato što smo moćniji, fizički da upravljamo životinjama i da se ponašamo kao da njihova tela pripadaju nama.',
    'Međutim, jasno je kome čije telo pripada. Ta granica postoji bez obzira na to da li je poštujemo.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['accepting-self-ownership'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}>
      <ContentContainer spacing="lg">
        <div className="relative p-6 md:p-16">
          <TextBackdrop type="linear" />
          <div className="relative z-10">
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

        <NextButton onClick={onComplete} label="Nastavi" show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
