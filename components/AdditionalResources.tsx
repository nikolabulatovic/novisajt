'use client';

import { useState } from 'react';

import { StageId } from '@/contexts/NavigationContext';

import AnimatedText from './ui/AnimatedText';
import Pill from './ui/Pill';
import StoryStage from './ui/StoryStage';

interface AdditionalResourcesProps {
  onComplete: () => void;
}

export default function AdditionalResources({
  onComplete,
}: AdditionalResourcesProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    '[placeholder] Razumemo tvoju sumnju. Evo dodatnih resursa i dokaza.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <StoryStage
      stage={StageId.AdditionalResources}
      textContentClassName="relative p-6 md:p-16"
      footer={
        <div className="flex justify-center mt-8 md:mt-12">
          <Pill color="red" onClick={onComplete} show={showButton} />
        </div>
      }
    >
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={1000}
        textSize="md"
        alignment="center"
        onComplete={() => setShowButton(true)}
      />
    </StoryStage>
  );
}
