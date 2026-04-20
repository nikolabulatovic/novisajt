'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/contexts/NavigationContext';
import { AnswerId } from '@/lib/answerIds';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

interface AlreadyVeganProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.YES, labelKey: 'options.ready' },
  { id: AnswerId.NO, labelKey: 'options.moreInfo' },
];

export default function AlreadyVegan({ onComplete }: AlreadyVeganProps) {
  const t = useTranslations('AlreadyVegan');
  const [showOptions, setShowOptions] = useState(false);

  const text = t.raw('text') as string[];

  return (
    <StoryStage
      stage={StageId.AlreadyVegan}
      textContentClassName="relative p-6 md:p-16"
      footer={
        showOptions ? (
          <div className="flex flex-row gap-6 justify-center flex-wrap px-4">
            {OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onComplete(option.id)}
                className="text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50"
              >
                <span
                  className="text-lg md:text-xl text-gray-300 font-light"
                  style={{ fontFamily: 'var(--font-literata), serif' }}
                >
                  {t(option.labelKey)}
                </span>
              </button>
            ))}
          </div>
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
