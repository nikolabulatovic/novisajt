'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TransitionContextType {
  startTransition: (
    centerX: number,
    centerY: number,
    nextBackgroundImage?: string,
    nextBackgroundOpacity?: number,
  ) => void;
  isTransitioning: boolean;
  transitionCenter: { x: number; y: number } | null;
  nextBackgroundImage: string | null;
  nextBackgroundOpacity: number;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined,
);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCenter, setTransitionCenter] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [nextBackgroundImage, setNextBackgroundImage] = useState<
    string | null
  >(null);
  const [nextBackgroundOpacity, setNextBackgroundOpacity] = useState<number>(0.8);

  const startTransition = (
    centerX: number,
    centerY: number,
    nextBackgroundImage?: string,
    nextBackgroundOpacity: number = 0.8,
  ) => {
    setTransitionCenter({ x: centerX, y: centerY });
    setNextBackgroundImage(nextBackgroundImage || null);
    setNextBackgroundOpacity(nextBackgroundOpacity);
    setIsTransitioning(true);

    // Reset after animation completes - slower transition (4 seconds)
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionCenter(null);
      setNextBackgroundImage(null);
      setNextBackgroundOpacity(0.8);
    }, 4000);
  };

  return (
    <TransitionContext.Provider
      value={{
        startTransition,
        isTransitioning,
        transitionCenter,
        nextBackgroundImage,
        nextBackgroundOpacity,
      }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

