'use client';

import { ReactNode } from 'react';

import BackgroundEffects from './BackgroundEffects';
import BackgroundImage from './BackgroundImage';

interface PageContainerProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundImageOpacity?: number;
  /** CSS background-position for the stage image. Defaults to `center`. */
  backgroundImagePosition?: string;
  /** Tablet (md–lg) object-position override for the stage image. */
  backgroundImagePositionMd?: string;
  /** Mobile (< md) object-position override for the stage image. */
  backgroundImagePositionSm?: string;
  /** Preload the background (for the LCP / first-paint stage). */
  backgroundImagePriority?: boolean;
  /**
   * Color under a translucent stage image. `black` darkens (default);
   * `white` lightens toward a soft wash.
   */
  backgroundWash?: 'black' | 'white';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  showBackgroundEffects?: boolean;
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
};

/**
 * Stage shell: fills the dvh app frame. Short content is centered; tall content
 * scrolls inside. The background is sticky to the visible frame so it is not
 * clipped when the column scrolls.
 */
export default function PageContainer({
  children,
  backgroundImage,
  backgroundImageOpacity = 0.8,
  backgroundImagePosition = 'center',
  backgroundImagePositionMd,
  backgroundImagePositionSm,
  backgroundImagePriority = false,
  backgroundWash = 'black',
  maxWidth = 'md',
  showBackgroundEffects = false,
  className = '',
}: PageContainerProps) {
  const washClass = backgroundWash === 'white' ? 'bg-white' : 'bg-black';

  return (
    <div
      className={`h-full min-h-0 w-full overflow-y-auto overscroll-y-contain ${washClass} ${className}`}
    >
      {/*
        Sticky viewport-tall layer + negative margin so it does not push content
        down. Image stays pinned to the visible stage while children scroll.
      */}
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <div className={`relative h-dvh w-full ${washClass}`}>
          {backgroundImage ? (
            <BackgroundImage
              src={backgroundImage}
              opacity={backgroundImageOpacity}
              position={backgroundImagePosition}
              positionMd={backgroundImagePositionMd}
              positionSm={backgroundImagePositionSm}
              priority={backgroundImagePriority}
            />
          ) : null}
          {showBackgroundEffects ? <BackgroundEffects /> : null}
        </div>
      </div>

      <div className="relative z-10 flex min-h-full w-full items-center justify-center p-4 md:p-8">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto w-full`}>
          {children}
        </div>
      </div>
    </div>
  );
}
