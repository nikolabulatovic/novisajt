'use client';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';
import { stageConfig } from '@/src/lib/story/stageUiConfig';
import type { AnswerChoiceShellState } from '@/src/lib/ui/answerChoiceInteraction';

import AnswerOptions from './AnswerOptions';
import StoryStageNextPill from './StoryStageNextPillFooter';

interface StoryStageNextInteractionProps {
  stage: Stage;
  visible: boolean;
  /** When provided (answer-stage chrome), answer presses animate the shared shell like evaluation. */
  onAnswerChoiceShellChange?: (state: AnswerChoiceShellState) => void;
}

export default function StoryStageNextInteraction({
  stage,
  visible,
  onAnswerChoiceShellChange,
}: StoryStageNextInteractionProps) {
  const { completeStage } = useStoryFlow();
  const stageCfg = stageConfig[stage];
  const nextInteraction = stageCfg.nextInteraction ?? 'pill';
  const translationNamespace = stageCfg.translationNamespace ?? stage;
  const { label } = useGenderedTranslations(translationNamespace);

  if (!nextInteraction || nextInteraction === 'none' || !translationNamespace) {
    return null;
  }

  const visibilityClass = visible
    ? 'visible opacity-100'
    : 'invisible opacity-0 pointer-events-none';

  if (nextInteraction === 'answer') {
    if (!stageCfg.answerOptions?.length) {
      return null;
    }
    return (
      <div className={`transition-opacity duration-300 ${visibilityClass}`}>
        <AnswerOptions
          options={mapLocalizedAnswerOptions(stageCfg.answerOptions, label)}
          onSelect={(answerId) => completeStage(stage, answerId)}
          onAnswerChoiceShellChange={onAnswerChoiceShellChange}
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
