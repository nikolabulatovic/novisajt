'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface AlignBehaviourProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.YES, labelKey: 'options.yes' },
  { id: AnswerId.NO, labelKey: 'options.no' },
];

export default function AlignBehaviour({ onComplete }: AlignBehaviourProps) {
  const t = useTranslations('AlignBehaviour');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = [
    'Da li si spreman da usaglasiš svoje ponašanje sa svojim uverenjima i da prestaneš da iskorišćavaš životinje?',
  ];

  const handleAnswer = (value: string) => {
    onComplete(value);
  };

  return (
    <StoryStage
      stage="align-behaviour"
      textContentClassName="relative p-6 md:p-16"
      footer={
        showOptions ? (
          <AnswerOptions options={options} onSelect={handleAnswer} />
        ) : null
      }
    >
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={1000}
        textSize="md"
        alignment="center"
        onComplete={() => setShowOptions(true)}
      />
    </StoryStage>
  );
}
