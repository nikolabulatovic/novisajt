'use client';

import { useTranslations } from 'next-intl';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';
import { NEXT_LABEL, stageConfig } from '@/src/lib/story/stageUiConfig';

import AnswerOptions from './AnswerOptions';
import StoryStageNextPill from './StoryStageNextPillFooter';

interface StoryStageNextInteractionProps {
  stage: Stage;
  visible: boolean;
  isMultiStep?: boolean;
  step?: 1 | 2;
}

export default function StoryStageNextInteraction({
  stage,
  visible,
  isMultiStep = false,
  step = 1,
}: StoryStageNextInteractionProps) {
  const { completeStage, goToNextStep } = useStoryFlow();
  const stageCfg = stageConfig[stage];
  const nextInteraction = stageCfg.nextInteraction ?? 'pill';
  const translationNamespace = stageCfg.translationNamespace ?? stage;
  const t = useTranslations(translationNamespace);

  if (!nextInteraction || nextInteraction === 'none' || !translationNamespace) {
    return null;
  }

  const visibilityClass = visible
    ? 'visible opacity-100'
    : 'invisible opacity-0 pointer-events-none';

  if (isMultiStep && step === 1) {
    return (
      <div className={`transition-opacity duration-300 ${visibilityClass}`}>
        <AnswerOptions
          options={[{ id: 'next-step', label: t(NEXT_LABEL) }]}
          onSelect={() => goToNextStep()}
        />
      </div>
    );
  }

  if (nextInteraction === 'answer') {
    if (!stageCfg.answerOptions?.length) {
      return null;
    }
    return (
      <div className={`transition-opacity duration-300 ${visibilityClass}`}>
        <AnswerOptions
          options={mapLocalizedAnswerOptions(stageCfg.answerOptions, t)}
          onSelect={(answerId) => completeStage(stage, answerId)}
        />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-300 ${visibilityClass}`}>
      <StoryStageNextPill stage={stage} visible={visible} />
    </div>
  );
}
