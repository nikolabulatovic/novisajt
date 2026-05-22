'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import PageContainer from './ui/PageContainer';
import Pill from './ui/Pill';

export default function ChoiceStage() {
  const {
    transitionToStage,
    transitionViaBlackOverlayTo,
    trackAnswerSelected,
  } = useStoryFlow();
  const t = useTranslations(StageId.Choice);
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);

  const handlePillClick = (pill: 'red' | 'blue') => {
    if (selectedPill !== null) return;
    setSelectedPill(pill);
    trackAnswerSelected(StageId.Choice, pill);
    if (pill === 'red') {
      transitionToStage(StageId.Intro, 'pill');
    } else {
      transitionViaBlackOverlayTo(StageId.StayComfortable);
    }
  };

  const { backgroundImage, opacity } = stageConfig[StageId.Choice];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      showBackgroundEffects={false}
    >
      {/* Animated background - minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
        <div className="space-y-6 mt-48">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-300 via-purple-400 to-gray-300 bg-clip-text text-transparent animate-gradient">
            {t('title')}
          </h1>
        </div>

        {/* Dva dugmeta - pilule */}
        <div className="flex flex-row items-center justify-around gap-8 sm:gap-12 md:gap-16 mt-16 sm:mt-24 md:mt-32">
          {/* Plava pilula */}
          <div className="flex flex-col items-center space-y-6">
            <Pill
              color="blue"
              onClick={() => handlePillClick('blue')}
              isSelected={selectedPill === 'blue'}
            />
            <div className="text-center space-y-2">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300">
                {t('blue.label')}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-xs">
                {t('blue.description')}
              </p>
            </div>
          </div>

          {/* Crvena pilula */}
          <div className="flex flex-col items-center space-y-6">
            <Pill
              color="red"
              onClick={() => handlePillClick('red')}
              isSelected={selectedPill === 'red'}
            />
            <div className="text-center space-y-2">
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300">
                {t('red.label')}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-xs">
                {t('red.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
