'use client';

import { MouseEvent, useEffect, useState } from 'react';

import { useAnswerChoiceRipples } from '@/src/hooks/useAnswerChoiceRipples';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import {
  ANSWER_CHOICE_NON_SELECTED_FADE_MS,
  type AnswerChoiceShellState,
  answerChoiceShellFadeOnlyClassName,
  scheduleAnswerChoiceExit,
} from '@/src/lib/ui/answerChoiceInteraction';

import AnswerChoiceRippleSpans from './AnswerChoiceRippleSpans';
import AnswerOption from './AnswerOption';

interface AnswerOptionItem {
  id: string;
  label: string;
}

interface AnswerOptionsProps {
  options: AnswerOptionItem[];
  onSelect: (id: string) => void;
  selectedId?: string | null;
  disableUnselectedWhenSelected?: boolean;
  containerClassName?: string;
  textClassName?: string;
  getButtonClassName?: (isSelected: boolean, isDisabled: boolean) => string;
  /**
   * Same orchestration as {@link CharacterEvaluation}: ripple, non-selected fade,
   * shell motion + selected fade, then commit. Disable when the parent sequences its own exit.
   */
  animateBeforeSelect?: boolean;
  /**
   * When set (e.g. from {@link StoryStageChrome}), shell motion applies to the parent wrapper;
   * this component only mirrors {@link AnswerChoiceShellState} upward.
   */
  onAnswerChoiceShellChange?: (state: AnswerChoiceShellState) => void;
  /**
   * `standard` — ripple, non-selected fade, shell fade, then onSelect.
   * `defer` — ripple + non-selected fade only, then onSelect (parent handles what happens next).
   */
  resolveSelectBehavior?: (id: string) => 'standard' | 'defer';
}

const defaultButtonClassName = (isSelected: boolean, isDisabled: boolean) =>
  `text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
    isDisabled
      ? 'opacity-60 cursor-not-allowed bg-gray-900/70 border border-gray-800/50'
      : isSelected
        ? 'bg-gray-800/60 border-2 border-gray-600'
        : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50'
  }`;

export default function AnswerOptions({
  options,
  onSelect,
  selectedId,
  disableUnselectedWhenSelected = false,
  containerClassName = 'flex flex-row gap-6 justify-center flex-wrap px-4',
  textClassName = 'text-lg md:text-xl text-gray-300 font-light',
  getButtonClassName = defaultButtonClassName,
  animateBeforeSelect = true,
  onAnswerChoiceShellChange,
  resolveSelectBehavior,
}: AnswerOptionsProps) {
  const schedule = useScheduledTimeouts();
  const { ripples, createRipple } = useAnswerChoiceRipples<string>(schedule);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [nonSelectedFading, setNonSelectedFading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);

  useEffect(() => {
    if (!animateBeforeSelect || !onAnswerChoiceShellChange) return;
    onAnswerChoiceShellChange({ isTransitioning, showContent });
  }, [
    animateBeforeSelect,
    isTransitioning,
    showContent,
    onAnswerChoiceShellChange,
  ]);

  const handleAnimatedClick = (
    event: MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (selectedOptionId !== null) return;

    createRipple(event, id);
    setSelectedOptionId(id);
    setNonSelectedFading(true);

    const behavior = resolveSelectBehavior?.(id) ?? 'standard';

    if (behavior === 'defer') {
      schedule(() => {
        onSelect(id);
      }, ANSWER_CHOICE_NON_SELECTED_FADE_MS);
      return;
    }

    scheduleAnswerChoiceExit(
      schedule,
      () => {
        setIsTransitioning(true);
        setShowContent(false);
      },
      () => {
        onSelect(id);
      },
    );
  };

  const handlePlainClick = (id: string) => {
    onSelect(id);
  };

  /**
   * Story / chrome pills — legacy {@link defaultButtonClassName} footprint (`px-8 py-4`).
   * Label sizing uses {@link textClassName} via {@link AnswerOption} `labelClassName`; evaluation rows omit it.
   */
  const compactStoryAnswerOptionClassName =
    'w-auto min-w-0 shrink rounded-xl !px-8 !py-4 sm:!px-8 sm:!py-4 md:!px-8 md:!py-4 lg:!px-8 lg:!py-4';

  if (!animateBeforeSelect) {
    return (
      <div className={containerClassName}>
        {options.map((option) => {
          const isHighlighted = selectedId === option.id;
          const isDisabled =
            disableUnselectedWhenSelected &&
            selectedId != null &&
            selectedId !== option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handlePlainClick(option.id)}
              disabled={isDisabled}
              className={getButtonClassName(isHighlighted, isDisabled)}
            >
              <span
                className={textClassName}
                style={{ fontFamily: 'var(--font-literata), serif' }}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  const buttons = (
    <div className={containerClassName}>
      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;
        const shouldFade = nonSelectedFading && !isSelected;
        const shouldFadeOut = isTransitioning && isSelected;
        const isHighlighted =
          isSelected || (hoveredOptionId === option.id && !nonSelectedFading);

        return (
          <AnswerOption
            key={option.id}
            text={option.label}
            fullWidth={false}
            labelClassName={textClassName}
            className={compactStoryAnswerOptionClassName}
            onClick={(e) => handleAnimatedClick(e, option.id)}
            onMouseEnter={() =>
              !nonSelectedFading && setHoveredOptionId(option.id)
            }
            onMouseLeave={() => setHoveredOptionId(null)}
            isSelected={isHighlighted}
            isDisabled={nonSelectedFading || isTransitioning}
            shouldFade={shouldFade}
            shouldFadeOut={shouldFadeOut}
          >
            <AnswerChoiceRippleSpans ripples={ripples[option.id] ?? []} />
          </AnswerOption>
        );
      })}
    </div>
  );

  if (onAnswerChoiceShellChange) {
    return buttons;
  }

  return (
    <div
      className={answerChoiceShellFadeOnlyClassName(
        isTransitioning,
        showContent,
      )}
    >
      {buttons}
    </div>
  );
}
