'use client';

import { MouseEvent, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAnswerChoiceRipples } from '@/src/hooks/useAnswerChoiceRipples';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import { AnswerId } from '@/src/lib/answerIds';
import { scheduleAnswerChoiceExit } from '@/src/lib/ui/answerChoiceInteraction';

import AnswerChoiceRippleSpans from './ui/AnswerChoiceRippleSpans';

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
  'group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900/80 px-6 py-6 sm:px-8 sm:py-7 transition-all duration-300 hover:scale-[1.02] hover:border-gray-600/60 hover:bg-gray-800/90 cursor-pointer';

const genderNotImportantClassName =
  'group relative overflow-hidden rounded-xl border border-gray-700/40 bg-gray-900/60 px-8 py-3 transition-all duration-300 hover:scale-[1.01] hover:border-gray-600/40 hover:bg-gray-800/70 cursor-pointer';

interface GenderModalProps {
  open: boolean;
  /** Called with the resolved gender answer once the selection animation settles. */
  onSelect: (gender: typeof AnswerId.MALE | typeof AnswerId.FEMALE) => void;
}

export default function GenderModal({ open, onSelect }: GenderModalProps) {
  const t = useTranslations('gender');
  const schedule = useScheduledTimeouts();
  const { ripples, createRipple } =
    useAnswerChoiceRipples<GenderChoice>(schedule);

  const [visible, setVisible] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<GenderChoice | null>(
    null,
  );
  const [nonSelectedFading, setNonSelectedFading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fade the backdrop in once mounted
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

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
      },
      () => {
        onSelect(resolveAnswer(choice));
      },
    );
  };

  const choiceState = (choice: GenderChoice) => {
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

  const male = choiceState('male');
  const female = choiceState('female');
  const notImportant = choiceState('not-important');

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-6 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gender-modal-title"
        className="max-w-2xl rounded-[2rem] border border-white/10 bg-[#101014]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.15)] ring-1 ring-white/5 sm:p-8"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <p
              id="gender-modal-title"
              className="text-center text-xl sm:text-2xl text-gray-200 font-light"
              style={{ fontFamily: 'var(--font-literata), serif' }}
            >
              {t('text.0')}
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-stretch justify-center gap-6 sm:gap-10">
            <button
              type="button"
              disabled={male.isDisabled}
              onClick={(e) => handleChoice(e, 'male')}
              className={`${genderCardClassName} ${male.fadeClass} ${
                male.isSelected
                  ? 'scale-[1.02] border-gray-500 bg-gray-800/90'
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
                  ? 'scale-[1.02] border-gray-500 bg-gray-800/90'
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
                ? 'scale-[1.01] border-gray-500 bg-gray-800/70'
                : ''
            }`}
          >
            <AnswerChoiceRippleSpans ripples={ripples['not-important'] ?? []} />
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
  );
}
