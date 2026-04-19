'use client';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

export default function RecognizingInjustice() {
  const text = [
    '[placeholder] Prepoznao si nepravdu, ali si odlučio da ne deluješ.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <StoryStage
      stage="prepoznavanje-nepravde"
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
