'use client';

import { ReactNode } from 'react';

import type { StageScrollMode } from '@/src/lib/story/stageUiConfig';

import BackgroundEffects from './BackgroundEffects';
import BackgroundImage from './BackgroundImage';

export type { StageScrollMode };

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
  /**
   * Defaults to `content` — cinematic fixed backdrop. Use `stage` only when
   * the image should move with the copy (rare exceptions).
   */
  scrollMode?: StageScrollMode;
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

function StageBackground({
  backgroundImage,
  backgroundImageOpacity,
  backgroundImagePosition,
  backgroundImagePositionMd,
  backgroundImagePositionSm,
  backgroundImagePriority,
  showBackgroundEffects,
  washClass,
}: {
  backgroundImage?: string;
  backgroundImageOpacity: number;
  backgroundImagePosition: string;
  backgroundImagePositionMd?: string;
  backgroundImagePositionSm?: string;
  backgroundImagePriority: boolean;
  showBackgroundEffects: boolean;
  washClass: string;
}) {
  return (
    <div className={`absolute inset-0 ${washClass}`}>
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
  );
}

/**
 * Stage shell inside the dvh app frame.
 *
 * Default {@link StageScrollMode} `content`: sticky viewport-tall backdrop;
 * tall copy scrolls over it. Opt into `stage` when image + text should scroll
 * as one document.
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
  scrollMode = 'content',
  className = '',
}: PageContainerProps) {
  const washClass = backgroundWash === 'white' ? 'bg-white' : 'bg-black';
  const background = (
    <StageBackground
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      backgroundImagePosition={backgroundImagePosition}
      backgroundImagePositionMd={backgroundImagePositionMd}
      backgroundImagePositionSm={backgroundImagePositionSm}
      backgroundImagePriority={backgroundImagePriority}
      showBackgroundEffects={showBackgroundEffects}
      washClass={washClass}
    />
  );

  const content = (
    <div className="relative z-10 flex min-h-full w-full items-center justify-center p-4 md:p-8">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto w-full`}>
        {children}
      </div>
    </div>
  );

  if (scrollMode === 'stage') {
    return (
      <div
        className={`h-full min-h-0 w-full overflow-y-auto overscroll-y-contain ${washClass} ${className}`}
        data-scroll-mode="stage"
      >
        <div className="relative min-h-full w-full">
          <div className="pointer-events-none absolute inset-0 z-0">
            {background}
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full min-h-0 w-full overflow-y-auto overscroll-y-contain ${washClass} ${className}`}
      data-scroll-mode="content"
    >
      {/*
        Sticky viewport-tall layer with h-0 so it does not consume flow height.
        Image stays pinned while children scroll.
      */}
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <div className="relative h-dvh w-full">{background}</div>
      </div>
      {content}
    </div>
  );
}
