'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

export default function NotHonest() {
  const text = [
    '[placeholder] Nisi bio iskren prema sebi.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <StoryStage stage={StageId.NotHonest}>
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={800}
        textSize="md"
        alignment="center"
        onComplete={() => {}}
      />
    </StoryStage>
  );
}
