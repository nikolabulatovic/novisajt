'use client';

import { MouseEvent, ReactNode } from 'react';

import { useGpuEffects } from '@/src/contexts/GpuEffectsContext';

interface AnswerOptionProps {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  /** When false, width is not forced to full row (e.g. horizontal {@link AnswerOptions}). */
  fullWidth?: boolean;
  index?: number;
  className?: string;
  shouldFade?: boolean;
  shouldFadeOut?: boolean;
  /** Override label typography (e.g. compact story pills); defaults to evaluation-sized responsive text. */
  labelClassName?: string;
  /** Mount-time fade for always-visible lists (e.g. evaluation). Story stages use {@link AnswerReveal}. */
  entranceAnimation?: boolean;
  /** Story pills use solid surfaces — blur during opacity fades is too expensive. */
  useSurfaceBlur?: boolean;
  children?: ReactNode; // For ripple effects
}

export default function AnswerOption({
  text,
  onClick,
  isSelected = false,
  isDisabled = false,
  fullWidth = true,
  className = '',
  shouldFade = false,
  shouldFadeOut = false,
  labelClassName,
  entranceAnimation = false,
  useSurfaceBlur = true,
  children,
}: AnswerOptionProps) {
  const { allowsHeavyEffects } = useGpuEffects();
  const surfaceBlur =
    useSurfaceBlur && allowsHeavyEffects ? 'backdrop-blur-md' : '';
  const selectedBg =
    useSurfaceBlur && allowsHeavyEffects
      ? 'scale-[1.02] bg-gray-800/60 border-gray-600/50'
      : 'scale-[1.02] bg-gray-800/85 border-gray-600/50';
  const idleBg =
    useSurfaceBlur && allowsHeavyEffects
      ? 'scale-100 bg-gray-900/50 border-gray-800/30 hover:bg-gray-800/60 hover:border-gray-700/50'
      : 'scale-100 bg-gray-900/80 border-gray-800/30 hover:bg-gray-800/85 hover:border-gray-700/50';

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${fullWidth ? 'w-full ' : ''}text-center p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl transition-[background-color,border-color,opacity,transform] duration-500 transform cursor-pointer ${surfaceBlur} group relative overflow-hidden border ${entranceAnimation ? 'animate-fade-in ' : ''}${
        shouldFade
          ? 'opacity-0 pointer-events-none border-transparent'
          : shouldFadeOut
            ? 'opacity-0 pointer-events-none border-transparent'
            : isSelected
              ? selectedBg
              : isDisabled
                ? 'opacity-50 cursor-not-allowed border-gray-800/30'
                : idleBg
      } ${className}`}
    >
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
