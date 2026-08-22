'use client';

import { useRef } from 'react';

import { type PillOrigin, pillOriginFromRect } from '@/src/lib/pillOrigin';

type PillBaseProps = {
  color: 'red' | 'blue';
  onClick: (origin?: PillOrigin) => void;
  disabled?: boolean;
  isSelected?: boolean;
  isFadingOut?: boolean;
  show?: boolean;
  className?: string;
  interactive?: boolean;
};

/** Labeled pill: visible text is the accessible name; `ariaLabel` optional override. */
type LabeledPillProps = PillBaseProps & {
  label: string;
  ariaLabel?: string;
};

/** Icon-only pill: accessible name is required. */
type IconPillProps = PillBaseProps & {
  label?: undefined;
  ariaLabel: string;
};

export type PillProps = LabeledPillProps | IconPillProps;

export default function Pill({
  color,
  onClick,
  disabled = false,
  isSelected = false,
  isFadingOut = false,
  label,
  ariaLabel,
  show = true,
  className = '',
  interactive = true,
}: PillProps) {
  const pillShapeRef = useRef<HTMLButtonElement>(null);
  const pendingClickTimeoutRef = useRef<number | null>(null);
  const isRed = color === 'red';
  const isButton = !!label;

  const gradientStyle = isRed
    ? 'linear-gradient(to bottom, rgb(140, 35, 35) 0%, rgb(220, 60, 60) 15%, rgb(69, 10, 10) 90%, rgb(55, 11, 11) 95%, rgb(48, 9, 9) 98%, rgb(42, 8, 8) 100%)'
    : 'linear-gradient(to bottom, rgb(35, 60, 145) 0%, rgb(60, 95, 200) 15%, rgb(23, 37, 84) 90%, rgb(18, 28, 55) 95%, rgb(15, 22, 45) 98%, rgb(12, 18, 38) 100%)';

  const highlightColor = isRed ? 'from-red-800/20' : 'from-blue-800/20';

  const handleClick = () => {
    if (disabled || pendingClickTimeoutRef.current !== null) return;

    const el = pillShapeRef.current;
    const origin = el
      ? pillOriginFromRect(el.getBoundingClientRect())
      : undefined;

    pendingClickTimeoutRef.current = window.setTimeout(() => {
      pendingClickTimeoutRef.current = null;
      onClick(origin);
    }, 100);
  };

  if (isButton) {
    return (
      <div
        className={`transition-opacity duration-500 ${className} ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          ref={pillShapeRef}
          onClick={handleClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={`group relative flex flex-col items-center ${
            disabled || !interactive
              ? 'pointer-events-none cursor-default'
              : 'cursor-pointer'
          }`}
        >
          <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 transform transition-all duration-[4000ms] ease-out group-hover:scale-110 group-hover:rotate-3">
            <div className="absolute inset-0 rounded-full bg-black/50 blur-md translate-y-2"></div>
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: gradientStyle,
              }}
            >
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b ${highlightColor} to-transparent rounded-t-full`}
              ></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-black/30"></div>
              <span
                className="relative z-10 text-white font-light text-xs sm:text-sm md:text-base"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {label}
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <button
      ref={pillShapeRef}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`group relative flex flex-col items-center space-y-6 ${
        disabled || !interactive
          ? 'pointer-events-none cursor-default'
          : 'cursor-pointer'
      } ${isFadingOut && !isSelected ? 'opacity-30' : ''} ${className}`}
    >
      <div
        className={`relative w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 transform transition-all duration-[4000ms] ease-out group-hover:scale-110 ${
          isRed ? 'group-hover:-rotate-3' : 'group-hover:rotate-3'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-black/50 blur-md translate-y-2"></div>
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: gradientStyle,
          }}
        >
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b ${highlightColor} to-transparent rounded-t-full`}
          ></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-black/30"></div>
        </div>
      </div>
    </button>
  );
}
