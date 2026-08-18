'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useAnswerChoiceRipples } from '@/src/hooks/useAnswerChoiceRipples';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import { AnswerId } from '@/src/lib/answerIds';
import {
  DEFAULT_STAGE_BODY,
  DEFAULT_STAGE_SHELL,
  DEFAULT_STORY_UI,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';
import {
  answerChoiceShellFadeOnlyClassName,
  scheduleAnswerChoiceExit,
} from '@/src/lib/ui/answerChoiceInteraction';

import AnimatedText from './ui/AnimatedText';
import AnswerChoiceRippleSpans from './ui/AnswerChoiceRippleSpans';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

type GenderChoice = 'male' | 'female' | 'not-important';

function MaleSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="10" cy="14" r="5" />
      <path d="M14 10l5-5M19 5h-4M19 5v4" strokeLinecap="round" />
    </svg>
  );
}

function FemaleSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14v7M9 18h6" strokeLinecap="round" />
    </svg>
  );
}

const genderCardClassName =
  'group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-800/50 bg-gray-900/70 px-6 py-3 sm:px-8 sm:py-4 transition-all duration-300 hover:scale-[1.02] hover:border-gray-700/50 hover:bg-gray-800/80 cursor-pointer';

const genderNotImportantClassName =
  'group relative overflow-hidden rounded-xl border border-gray-800/40 bg-gray-900/50 px-8 py-4 transition-all duration-300 hover:scale-[1.01] hover:border-gray-700/40 hover:bg-gray-800/60 cursor-pointer';

export default function Gender() {
  const { completeStage } = useStoryFlow();
  const t = useTranslations(StageId.Gender);
  const cfg = stageConfig[StageId.Gender];
  const ui = cfg.additionalUiConfig;
  const body = cfg.body;

  const schedule = useScheduledTimeouts();
  const { ripples, createRipple } =
    useAnswerChoiceRipples<GenderChoice>(schedule);

  const [choicesVisible, setChoicesVisible] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<GenderChoice | null>(
    null,
  );
  const [nonSelectedFading, setNonSelectedFading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const resolveAnswer = (choice: GenderChoice) =>
    choice === 'female' ? AnswerId.FEMALE : AnswerId.MALE;

  const handleChoice = (
    event: MouseEvent<HTMLButtonElement>,
    choice: GenderChoice,
  ) => {
    if (selectedChoice !== null) return;

    createRipple(event, choice);
    setSelectedChoice(choice);
    setNonSelectedFading(true);

    scheduleAnswerChoiceExit(
      schedule,
      () => {
        setIsTransitioning(true);
        setShowContent(false);
      },
      () => {
        completeStage(StageId.Gender, resolveAnswer(choice));
      },
    );
  };

  const revealChoices = useCallback(() => setChoicesVisible(true), []);

  const choiceButtonState = (choice: GenderChoice) => {
    const isSelected = selectedChoice === choice;
    const shouldFade = nonSelectedFading && !isSelected;
    const shouldFadeOut = isTransitioning && isSelected;

    return {
      isSelected,
      isDisabled: nonSelectedFading || isTransitioning,
      fadeClass:
        shouldFade || shouldFadeOut ? 'opacity-0 pointer-events-none' : '',
    };
  };

  const male = choiceButtonState('male');
  const female = choiceButtonState('female');
  const notImportant = choiceButtonState('not-important');

  return (
    <PageContainer
      backgroundImage={cfg.backgroundImage}
      backgroundImageOpacity={cfg.opacity ?? DEFAULT_STAGE_SHELL.opacity}
      backgroundWash={cfg.backgroundWash ?? DEFAULT_STAGE_SHELL.backgroundWash}
      maxWidth={ui?.maxWidth ?? DEFAULT_STORY_UI.maxWidth}
      showBackgroundEffects={
        cfg.showBackgroundEffects ?? DEFAULT_STAGE_SHELL.showBackgroundEffects
      }
    >
      <ContentContainer
        spacing={ui?.contentSpacing ?? DEFAULT_STORY_UI.contentSpacing}
      >
        <div
          className={`space-y-10 ${answerChoiceShellFadeOnlyClassName(
            isTransitioning,
            showContent,
          )}`}
        >
          <StageTextSurface stage={StageId.Gender} surface={cfg.textSurface}>
            <AnimatedText
              text={t.raw('text') as string[]}
              speed={body?.speed ?? DEFAULT_STAGE_BODY.speed}
              delayAfterComplete={
                body?.delayAfterComplete ??
                DEFAULT_STAGE_BODY.delayAfterComplete
              }
              textSize={body?.textSize ?? DEFAULT_STAGE_BODY.textSize}
              alignment={body?.alignment ?? DEFAULT_STAGE_BODY.alignment}
              onComplete={revealChoices}
            />
          </StageTextSurface>

          <div
            className={`transition-opacity duration-300 ${
              choicesVisible
                ? 'visible opacity-100'
                : 'invisible opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-row flex-wrap items-stretch justify-center gap-6 sm:gap-10">
                <button
                  type="button"
                  disabled={male.isDisabled}
                  onClick={(e) => handleChoice(e, 'male')}
                  className={`${genderCardClassName} ${male.fadeClass} ${
                    male.isSelected
                      ? 'scale-[1.02] border-gray-600 bg-gray-800/60'
                      : ''
                  }`}
                >
                  <AnswerChoiceRippleSpans ripples={ripples.male ?? []} />
                  <MaleSymbol className="h-16 w-16 sm:h-20 sm:w-20 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <span
                    className="text-lg sm:text-xl text-gray-300 font-light group-hover:text-gray-200 transition-colors"
                    style={{ fontFamily: 'var(--font-literata), serif' }}
                  >
                    {t('options.male')}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={female.isDisabled}
                  onClick={(e) => handleChoice(e, 'female')}
                  className={`${genderCardClassName} ${female.fadeClass} ${
                    female.isSelected
                      ? 'scale-[1.02] border-gray-600 bg-gray-800/60'
                      : ''
                  }`}
                >
                  <AnswerChoiceRippleSpans ripples={ripples.female ?? []} />
                  <FemaleSymbol className="h-16 w-16 sm:h-20 sm:w-20 text-rose-400 group-hover:text-rose-300 transition-colors" />
                  <span
                    className="text-lg sm:text-xl text-gray-300 font-light group-hover:text-gray-200 transition-colors"
                    style={{ fontFamily: 'var(--font-literata), serif' }}
                  >
                    {t('options.female')}
                  </span>
                </button>
              </div>

              <button
                type="button"
                disabled={notImportant.isDisabled}
                onClick={(e) => handleChoice(e, 'not-important')}
                className={`${genderNotImportantClassName} ${notImportant.fadeClass} ${
                  notImportant.isSelected
                    ? 'scale-[1.01] border-gray-600 bg-gray-800/60'
                    : ''
                }`}
              >
                <AnswerChoiceRippleSpans
                  ripples={ripples['not-important'] ?? []}
                />
                <span
                  className="text-base sm:text-lg text-gray-400 font-light group-hover:text-gray-300 transition-colors"
                  style={{ fontFamily: 'var(--font-literata), serif' }}
                >
                  {t('options.notImportant')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
