'use client';

import { useState } from 'react';
import PageContainer from './ui/PageContainer';
import AnimatedLines from './ui/AnimatedLines';
import NextButton from './ui/NextButton';
import ContentContainer from './ui/ContentContainer';

interface MoralConsistencyProps {
  onComplete: () => void;
}

export default function MoralConsistency({
  onComplete,
}: MoralConsistencyProps) {
  const [showButton, setShowButton] = useState(false);

  const lines = [
    { text: 'Ne bismo ih oslepeli.', bold: false },
    { text: 'Ne bismo im sekli grkljan.', bold: false },
    { text: 'Činjenica da ih pojedemo kasnije ne opravdava čin.', bold: true },
    { text: 'Možemo da živimo bez ovoga.', bold: false },
  ];

  return (
    <PageContainer maxWidth="lg">
      <ContentContainer spacing="md" align="center">
        <AnimatedLines
          lines={lines}
          delayBetweenLines={500}
          delayAfterComplete={1200}
          textSize="md"
          onComplete={() => setShowButton(true)}
        />

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
