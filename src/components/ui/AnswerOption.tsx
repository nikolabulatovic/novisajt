'use client';

import { MouseEvent, ReactNode } from 'react';

interface AnswerOptionProps {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  /** When false, width is not forced to full row (e.g. horizontal {@link AnswerOptions}). */
  fullWidth?: boolean;
  index?: number;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  shouldFade?: boolean;
  shouldFadeOut?: boolean;
  /** Override label typography (e.g. compact story pills); defaults to evaluation-sized responsive text. */
  labelClassName?: string;
  children?: ReactNode; // For ripple effects
}

export default function AnswerOption({
  text,
  onClick,
  isSelected = false,
  isDisabled = false,
  fullWidth = true,
  className = '',
  onMouseEnter,
  onMouseLeave,
  shouldFade = false,
  shouldFadeOut = false,
  labelClassName,
  children,
}: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${fullWidth ? 'w-full ' : ''}text-center p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl transition-all duration-500 transform cursor-pointer backdrop-blur-md group relative overflow-hidden animate-fade-in border ${
        shouldFade
          ? 'opacity-0 pointer-events-none border-transparent'
          : shouldFadeOut
            ? 'opacity-0 pointer-events-none border-transparent'
            : isSelected
              ? 'scale-[1.02] bg-gray-800/60 border-gray-600/50'
              : isDisabled
                ? 'opacity-50 cursor-not-allowed border-gray-800/30'
                : 'scale-100 bg-gray-900/50 border-gray-800/30 hover:bg-gray-800/60 hover:border-gray-700/50'
      } ${className}`}
    >
      {/* Ripple effects or other children */}
      {children}

      <span
        className={`relative z-10 transition-colors duration-300 ${
          labelClassName ??
          'text-base sm:text-lg md:text-xl lg:text-2xl font-light'
        } ${
          isSelected
            ? 'text-gray-200'
            : labelClassName
              ? 'group-hover:text-gray-200'
              : 'text-gray-300 group-hover:text-gray-200'
        }`}
        style={{ fontFamily: 'var(--font-literata), serif' }}
      >
        {text}
      </span>
    </button>
  );
}
