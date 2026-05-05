'use client';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

export default function RecognizingInjustice() {
  const t = useTranslations('RecognizingInjustice');
  const text = t.raw('text') as string[];

  return (
    <StoryStage stage={StageId.RecognizingInjustice}>
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={800}
        textSize="md"
        alignment="center"
      />
    </StoryStage>
  );
}
