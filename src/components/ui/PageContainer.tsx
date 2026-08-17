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
    <div className={`relative min-h-screen w-full ${washClass} ${className}`}>
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <BackgroundImage
            src={backgroundImage}
            opacity={backgroundImageOpacity}
            position={backgroundImagePosition}
            positionMd={backgroundImagePositionMd}
            positionSm={backgroundImagePositionSm}
            priority={backgroundImagePriority}
          />
        </div>
      )}
      {showBackgroundEffects && <BackgroundEffects />}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center p-4 md:p-8">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto w-full`}>
          {children}
        </div>
      </div>
    </div>
  );
}
