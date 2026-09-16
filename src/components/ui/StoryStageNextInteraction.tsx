'use client';

import type { Stage, StepId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';
import { resolveStoryLabel } from '@/src/lib/story/conditionalText';
import { stageConfig } from '@/src/lib/story/stageUiConfig';
import type { AnswerChoiceShellState } from '@/src/lib/ui/answerChoiceInteraction';

import AnswerOptions from './AnswerOptions';
import AnswerReveal from './AnswerReveal';
import StoryStageNextPill from './StoryStageNextPillFooter';

interface StoryStageNextInteractionProps {
  stage: Stage;
  /** Active step for multi-step stages; ignored for single-shot stages. */
  stepId?: StepId;
  visible: boolean;
  /** When provided (answer-stage chrome), answer presses animate the shared shell like evaluation. */
  onAnswerChoiceShellChange?: (state: AnswerChoiceShellState) => void;
}

type MessageStepOptions = {
  id: string;
  options: Record<string, string>;
};

function labelFromStepOptions(
  labelKey: string,
  stepOptions: Record<string, string>,
): string {
  const leaf = labelKey.startsWith('options.')
    ? labelKey.slice('options.'.length)
    : labelKey;
  return stepOptions[leaf] ?? labelKey;
}

export default function StoryStageNextInteraction({
  stage,
  stepId,
  visible,
  onAnswerChoiceShellChange,
}: StoryStageNextInteractionProps) {
  const { completeStage, answers } = useStoryFlow();
  const stageCfg = stageConfig[stage];
  const nextInteraction = stageCfg.nextInteraction ?? 'pill';
  const translationNamespace = stageCfg.translationNamespace ?? stage;
  const { label, raw, gender } = useGenderedTranslations(translationNamespace);

  if (!nextInteraction || nextInteraction === 'none' || !translationNamespace) {
    return null;
  }

  if (nextInteraction === 'answer') {
    const stepConfig = stepId
      ? stageCfg.steps?.find((step) => step.id === stepId)
      : undefined;
    const answerOptions = stepConfig?.answerOptions ?? stageCfg.answerOptions;
    if (!answerOptions?.length) {
      return null;
    }

    const messageStep =
      stepId != null
        ? (raw('steps') as MessageStepOptions[] | undefined)?.find(
            (step) => step.id === stepId,
          )
        : undefined;

    const options = mapLocalizedAnswerOptions(
      answerOptions,
      messageStep
        ? (key) => labelFromStepOptions(key, messageStep.options)
        : (key) => resolveStoryLabel(raw(key), answers, gender) ?? label(key),
    );

    return (
      <AnswerReveal key={stepId ?? stage} show={visible}>
        <AnswerOptions
          options={options}
          onSelect={(answerId) => completeStage(stage, answerId)}
          onAnswerChoiceShellChange={onAnswerChoiceShellChange}
        />
      </AnswerReveal>
    );
  }

  return (
    <AnswerReveal show={visible}>
      <StoryStageNextPill stage={stage} visible={visible} />
    </AnswerReveal>
  );
}
