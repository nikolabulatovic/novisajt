'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TransitionContextType {
  startTransition: (
    centerX: number,
    centerY: number,
    currentBackgroundImage?: string,
  ) => void;
  isTransitioning: boolean;
  transitionCenter: { x: number; y: number } | null;
  currentBackgroundImage: string | null;
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
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState<
    string | null
  >(null);

  const startTransition = (
    centerX: number,
    centerY: number,
    currentBackgroundImage?: string,
  ) => {
    setTransitionCenter({ x: centerX, y: centerY });
    setCurrentBackgroundImage(currentBackgroundImage || null);
    setIsTransitioning(true);

    // Reset after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionCenter(null);
      setCurrentBackgroundImage(null);
    }, 2000);
  };

  return (
    <TransitionContext.Provider
      value={{
        startTransition,
        isTransitioning,
        transitionCenter,
        currentBackgroundImage,
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

