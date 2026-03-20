'use client';

import { ReactNode } from 'react';
import BackgroundImage from './BackgroundImage';
import BackgroundEffects from './BackgroundEffects';

interface PageContainerProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundImageOpacity?: number;
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
  maxWidth = 'md',
  showBackgroundEffects = true,
  className = '',
}: PageContainerProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-black ${className}`}>
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <BackgroundImage
            src={backgroundImage}
            opacity={backgroundImageOpacity}
          />
        </div>
      )}
      {showBackgroundEffects && <BackgroundEffects />}
      <div className={`relative z-10 ${maxWidthClasses[maxWidth]} mx-auto w-full`}>
        {children}
      </div>
    </div>
  );
}

