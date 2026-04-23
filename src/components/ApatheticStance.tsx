'use client';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

export default function ApatheticStance() {
  const t = useTranslations('ApatheticStance');
  const text = t.raw('text') as string[];

  return (
    <StoryStage stage={StageId.ApatheticStance}>
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
