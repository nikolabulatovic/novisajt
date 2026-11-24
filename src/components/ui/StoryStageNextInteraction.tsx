'use client';

import {
  STORY_STAGE_SURFACE_FRAME_CLASS,
  STORY_STAGE_TEXT_PADDING_CLASS,
  STORY_STAGE_TEXT_TONE_CLASS,
} from '@/src/constants/storyStageTokens';
import type { Stage, StepId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';
import { resolveStoryLabel } from '@/src/lib/story/conditionalText';
import {
  DEFAULT_STAGE_BODY,
  DEFAULT_STORY_UI,
  resolveStepNextInteraction,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';
import type { AnswerChoiceShellState } from '@/src/lib/ui/answerChoiceInteraction';

import AnimatedText from './AnimatedText';
import AnswerOptions from './AnswerOptions';
import AnswerReveal from './AnswerReveal';
import GlassPanel from './GlassPanel';
import StageTextSurface from './StageTextSurface';
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
  const nextInteraction = resolveStepNextInteraction(stageCfg, stepId);
  const translationNamespace = stageCfg.translationNamespace ?? stage;
  const { label, raw, gender } = useGenderedTranslations(translationNamespace);

  if (!nextInteraction || nextInteraction === 'none' || !translationNamespace) {
    return null;
  }

  if (nextInteraction === 'external-link') {
    const externalLink = stageCfg.externalLink;
    if (!externalLink) {
      return null;
    }

    const body = stageCfg.body;
    const ui = stageCfg.additionalUiConfig;
    const afterLinkText = externalLink.afterLinkKey
      ? label(externalLink.afterLinkKey)
      : null;

    return (
      <AnswerReveal key={stepId ?? stage} show={visible}>
        <div className="flex flex-col items-center gap-8 w-full">
          <GlassPanel
            variant="dark"
            className="rounded-2xl transition-transform duration-300 hover:scale-[1.04] hover:-translate-y-0.5"
            contentClassName="rounded-2xl px-10 py-5 sm:px-12 sm:py-6"
          >
            <a
              href={externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-lg sm:text-xl md:text-2xl font-light text-gray-200 hover:text-white transition-colors duration-300"
              style={{ fontFamily: 'var(--font-literata), serif' }}
            >
              {label(externalLink.labelKey)}
            </a>
          </GlassPanel>
          {afterLinkText ? (
            <StageTextSurface
              stage={stage}
              surface={stageCfg.textSurface}
              glassVariant={stageCfg.glassVariant}
              className={
                STORY_STAGE_SURFACE_FRAME_CLASS[
                  ui?.textSurfaceFrame ?? DEFAULT_STORY_UI.textSurfaceFrame
                ]
              }
              contentClassName={
                STORY_STAGE_TEXT_PADDING_CLASS[
                  ui?.textPadding ?? DEFAULT_STORY_UI.textPadding
                ]
              }
              backdropType={ui?.backdropType}
              backdropOpacity={ui?.backdropOpacity}
              backdropFade={ui?.backdropFade}
              backdropColor={ui?.backdropColor}
            >
              <AnimatedText
                key={`${stage}:after-link`}
                text={[afterLinkText]}
                speed={body?.speed ?? DEFAULT_STAGE_BODY.speed}
                delayAfterComplete={0}
                textSize={body?.textSize ?? DEFAULT_STAGE_BODY.textSize}
                alignment={body?.alignment ?? DEFAULT_STAGE_BODY.alignment}
                wordTransitionDuration={
                  body?.wordTransitionDuration ??
                  DEFAULT_STAGE_BODY.wordTransitionDuration
                }
                className={
                  STORY_STAGE_TEXT_TONE_CLASS[
                    body?.textTone ?? DEFAULT_STAGE_BODY.textTone
                  ]
                }
              />
            </StageTextSurface>
          ) : null}
        </div>
      </AnswerReveal>
    );
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
    <AnswerReveal key={stepId ?? stage} show={visible}>
      <StoryStageNextPill stage={stage} visible={visible} />
    </AnswerReveal>
  );
}
