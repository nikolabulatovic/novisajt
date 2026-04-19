'use client';

import { useTranslations } from 'next-intl';
import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

export default function ApatheticStance() {
  const t = useTranslations('ApatheticStance');
  const text = t.raw('text') as string[];

  return (
    <StoryStage
      stage="apatican-stav"
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
