'use client';

import { MouseEvent, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useAnswerChoiceRipples } from '@/src/hooks/useAnswerChoiceRipples';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import { ANSWER_CHOICE_NON_SELECTED_FADE_MS } from '@/src/lib/ui/answerChoiceInteraction';

import AnswerChoiceRippleSpans from './ui/AnswerChoiceRippleSpans';

export type GenderModalChoice = 'male' | 'female' | 'not-important';

const FADE_IN_MS = 250;
const FADE_OUT_MS = 750;
const serif = { fontFamily: 'var(--font-literata), serif' } as const;

const CARD_BTN =
  'group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900/80 px-6 py-6 sm:px-8 sm:py-7 transition-all duration-300 hover:scale-[1.02] hover:border-gray-600/60 hover:bg-gray-800/90 cursor-pointer';

const PLAIN_BTN =
  'group relative overflow-hidden rounded-xl border border-gray-700/40 bg-gray-900/60 px-8 py-3 transition-all duration-300 hover:scale-[1.01] hover:border-gray-600/40 hover:bg-gray-800/70 cursor-pointer';

function fadeStyle(fadingOut: boolean) {
  return {
    transitionDuration: `${fadingOut ? FADE_OUT_MS : FADE_IN_MS}ms`,
    transitionTimingFunction: 'ease-out',
  };
}

function GenderSymbol({
  variant,
  className,
}: {
  variant: 'male' | 'female';
  className?: string;
}) {
  if (variant === 'male') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <circle cx="10" cy="14" r="5" />
        <path d="M14 10l5-5M19 5h-4M19 5v4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="9" r="5" />
      <path d="M12 14v7M9 18h6" strokeLinecap="round" />
    </svg>
  );
}

interface GenderModalProps {
  open: boolean;
  onSelect: (choice: GenderModalChoice) => void;
}

export default function GenderModal({ open, onSelect }: GenderModalProps) {
  const t = useTranslations('gender');
  const schedule = useScheduledTimeouts();
  const { ripples, createRipple } =
    useAnswerChoiceRipples<GenderModalChoice>(schedule);

  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [selected, setSelected] = useState<GenderModalChoice | null>(null);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      setFadingOut(false);
      setSelected(null);
      return;
    }

    setSelected(null);
    setFadingOut(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleChoice = (
    event: MouseEvent<HTMLButtonElement>,
    choice: GenderModalChoice,
  ) => {
    if (selected) return;

    createRipple(event, choice);
    setSelected(choice);

    schedule(() => {
      setFadingOut(true);
      schedule(() => {
        onSelect(choice);
      }, FADE_OUT_MS);
    }, ANSWER_CHOICE_NON_SELECTED_FADE_MS);
  };

  if (!open) return null;

  const isLocked = selected !== null;
  const fadeClass = (choice: GenderModalChoice) =>
    isLocked && selected !== choice ? 'opacity-0 pointer-events-none' : '';

  const symbolChoices: {
    choice: GenderModalChoice;
    label: string;
    symbol: 'male' | 'female';
    symbolClass: string;
  }[] = [
    {
      choice: 'male',
      label: t('options.male'),
      symbol: 'male',
      symbolClass:
        'h-16 w-16 sm:h-20 sm:w-20 text-blue-500 group-hover:text-blue-400 transition-colors',
    },
    {
      choice: 'female',
      label: t('options.female'),
      symbol: 'female',
      symbolClass:
        'h-16 w-16 sm:h-20 sm:w-20 text-rose-400 group-hover:text-rose-300 transition-colors',
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-6 transition-opacity ease-out ${
        fadingOut ? 'opacity-0' : visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        ...fadeStyle(fadingOut),
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gender-modal-title"
        className={`w-full max-w-md rounded-3xl border border-white/10 bg-[#101014]/95 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/5 transition-all ease-out sm:px-8 sm:py-10 ${
          fadingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={fadeStyle(fadingOut)}
      >
        <div className="flex flex-col items-center gap-8">
          <p
            id="gender-modal-title"
            className="text-center text-xl sm:text-2xl text-gray-200 font-light"
            style={serif}
          >
            {t('text.0')}
          </p>

          <div className="flex flex-row flex-wrap items-stretch justify-center gap-6 sm:gap-10">
            {symbolChoices.map(({ choice, label, symbol, symbolClass }) => (
              <button
                key={choice}
                type="button"
                disabled={isLocked}
                onClick={(e) => handleChoice(e, choice)}
                className={`${CARD_BTN} ${fadeClass(choice)} ${
                  selected === choice
                    ? 'scale-[1.02] border-gray-500 bg-gray-800/90'
                    : ''
                }`}
              >
                <AnswerChoiceRippleSpans ripples={ripples[choice] ?? []} />
                <GenderSymbol variant={symbol} className={symbolClass} />
                <span
                  className="text-lg sm:text-xl text-gray-300 font-light group-hover:text-gray-200 transition-colors"
                  style={serif}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={isLocked}
            onClick={(e) => handleChoice(e, 'not-important')}
            className={`${PLAIN_BTN} ${fadeClass('not-important')} ${
              selected === 'not-important'
                ? 'scale-[1.01] border-gray-500 bg-gray-800/70'
                : ''
            }`}
          >
            <AnswerChoiceRippleSpans ripples={ripples['not-important'] ?? []} />
            <span
              className="text-base sm:text-lg text-gray-400 font-light group-hover:text-gray-300 transition-colors"
              style={serif}
            >
              {t('options.notImportant')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
