'use client';

import { useState, MouseEvent, useRef, useEffect } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { usePillContext } from '@/contexts/PillContext';
import {
  getBackgroundImageForStage,
  getBackgroundOpacityForStage,
} from '@/utils/backgroundImages';
import { getNextStage } from '@/utils/nextStage';

interface PillProps {
  color: 'red' | 'blue';
  onClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
  isFadingOut?: boolean;
  label?: string;
  show?: boolean;
  className?: string;
}

export default function Pill({
  color,
  onClick,
  disabled = false,
  isSelected = false,
  isFadingOut = false,
  label,
  show = true,
  className = '',
}: PillProps) {
  const [isExpanding, setIsExpanding] = useState(false);
  const { currentStage } = useNavigation();
  const pillContext = usePillContext();
  const pillShapeRef = useRef<HTMLDivElement>(null);
  const isRed = color === 'red';
  const rotationClass = isRed ? '-rotate-3' : 'rotate-3';
  const isButton = !!label;

  // Register red pill ref in context (ref to the actual pill shape element)
  useEffect(() => {
    if (isRed && pillContext && pillShapeRef.current) {
      pillContext.registerRedPill(pillShapeRef as React.RefObject<HTMLElement | null>);
      return () => {
        pillContext.unregisterRedPill();
      };
    }
  }, [isRed, pillContext]);

  const gradientStyle = isRed
    ? 'linear-gradient(to bottom, rgb(140, 35, 35) 0%, rgb(220, 60, 60) 15%, rgb(69, 10, 10) 90%, rgb(55, 11, 11) 95%, rgb(48, 9, 9) 98%, rgb(42, 8, 8) 100%)'
    : 'linear-gradient(to bottom, rgb(35, 60, 145) 0%, rgb(60, 95, 200) 15%, rgb(23, 37, 84) 90%, rgb(18, 28, 55) 95%, rgb(15, 22, 45) 98%, rgb(12, 18, 38) 100%)';

  const highlightColor = isRed ? 'from-red-800/20' : 'from-blue-800/20';

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Start expansion animation
    setIsExpanding(true);

    // Call the original onClick after a short delay
    setTimeout(() => {
      onClick();
    }, 100);

    // Reset expansion after animation completes - slower (4 seconds)
    setTimeout(() => {
      setIsExpanding(false);
    }, 4000); // Match animation duration
  };

  // Button variant: same pill shape with text
  if (isButton) {
    return (
      <div
        className={`transition-opacity duration-500 ${className} ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`group relative flex flex-col items-center cursor-pointer ${disabled ? 'pointer-events-none' : ''
            }`}>
          <div className={`relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-[4000ms] ease-out ${isExpanding
            ? 'scale-[2] opacity-0'
            : 'group-hover:scale-110 group-hover:rotate-3'
            }`}>
            {/* Shadow at bottom for 3D effect */}
            <div className='absolute inset-0 rounded-full bg-black/50 blur-md translate-y-2'></div>
            {/* Pill with top-to-bottom gradient */}
            <div
              ref={isRed ? pillShapeRef : undefined}
              className='relative w-full h-full rounded-full flex items-center justify-center shadow-2xl'
              style={{
                background: gradientStyle,
              }}>
              {/* Subtle highlight at top */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b ${highlightColor} to-transparent rounded-t-full`}></div>
              {/* Vertical line down the middle (capsule seam) */}
              <div className='absolute left-1/2 top-0 bottom-0 w-[3px] bg-black/30'></div>
              {/* Text label */}
              <span
                className='relative z-10 text-white font-light text-sm md:text-base'
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                {label}
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Original pill variant: visual pill without text
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`group relative flex flex-col items-center space-y-6 cursor-pointer ${isFadingOut && !isSelected ? 'opacity-30' : ''
        } ${disabled ? 'pointer-events-none' : ''} ${className}`}>
      <div
        className={`relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-[4000ms] ease-out ${isExpanding
          ? 'scale-[2] opacity-0'
          : isSelected && isFadingOut
            ? `scale-110 ${rotationClass}`
            : `group-hover:scale-110 ${isRed ? 'group-hover:-rotate-3' : 'group-hover:rotate-3'
            }`
          }`}>
        {/* Shadow at bottom for 3D effect */}
        <div className='absolute inset-0 rounded-full bg-black/50 blur-md translate-y-2'></div>
        {/* Pill with top-to-bottom gradient */}
        <div
          ref={isRed ? pillShapeRef : undefined}
          className='relative w-full h-full rounded-full flex items-center justify-center shadow-2xl'
          style={{
            background: gradientStyle,
          }}>
          {/* Subtle highlight at top */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-gradient-to-b ${highlightColor} to-transparent rounded-t-full`}></div>
          {/* Vertical line down the middle (capsule seam) */}
          <div className='absolute left-1/2 top-0 bottom-0 w-[3px] bg-black/30'></div>
        </div>
      </div>
    </button>
  );
}
