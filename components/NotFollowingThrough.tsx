'use client';

import { StageId } from '@/contexts/NavigationContext';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

export default function NotFollowingThrough() {
  const text = [
    '[placeholder] Ne držiš se svojih uverenja.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <StoryStage
      stage={StageId.NotFollowingThrough}
      textContentClassName="relative p-6 md:p-16"
    >
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
