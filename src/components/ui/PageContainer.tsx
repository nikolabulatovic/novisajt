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
  maxWidth = 'md',
  showBackgroundEffects = false,
  className = '',
}: PageContainerProps) {
  return (
    <div className={`relative min-h-screen w-full bg-black ${className}`}>
      {backgroundImage && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <BackgroundImage
            src={backgroundImage}
            opacity={backgroundImageOpacity}
            position={backgroundImagePosition}
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
