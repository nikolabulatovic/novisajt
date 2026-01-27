import { useState, useCallback, useMemo } from 'react';
import { appleEaseOut } from '@/utils/easing';

const EXPANSION_DURATION = 1500;
const DEFAULT_CENTER_X = 50;
const DEFAULT_CENTER_Y = 50;

export interface UseMaskExpansionOptions {
  duration?: number; // Animation duration in milliseconds
  centerX?: number; // Center X position as percentage (0-100)
  centerY?: number; // Center Y position as percentage (0-100)
  startWidth: number; // Starting width in pixels
  startHeight: number; // Starting height in pixels
  startBorderRadius: number; // Starting border radius in pixels
  onComplete?: () => void; // Callback when animation completes
}

export type MaskStyle = {
  width: string; // Current width (px or vw)
  height: string; // Current height (px or vh)
  borderRadius: string; // Current border radius (px)
  left: string; // Left position
  top: string; // Top position
};

export interface UseMaskExpansionReturn {
  expansionProgress: number; // 0 to 1
  startExpansion: (centerX?: number, centerY?: number) => void; // Function to start the animation, optionally with center position
  maskStyle: {
    width: string; // Current width (px or vw)
    height: string; // Current height (px or vh)
    borderRadius: string; // Current border radius (px)
    left: string; // Left position
    top: string; // Top position
  };
}

/**
 * Generic hook for managing mask expansion animation
 * Morphs from a starting shape to full viewport rectangle
 */
export function useMaskExpansion({
  duration = EXPANSION_DURATION,
  centerX = DEFAULT_CENTER_X,
  centerY = DEFAULT_CENTER_Y,
  startWidth,
  startHeight,
  startBorderRadius,
  onComplete,
}: UseMaskExpansionOptions): UseMaskExpansionReturn {
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [currentCenterX, setCurrentCenterX] = useState(centerX);
  const [currentCenterY, setCurrentCenterY] = useState(centerY);

  const startExpansion = useCallback((overrideCenterX?: number, overrideCenterY?: number) => {
    // Reset expansion progress
    setExpansionProgress(0);

    // Update center position if provided
    if (overrideCenterX !== undefined && overrideCenterY !== undefined) {
      setCurrentCenterX(overrideCenterX);
      setCurrentCenterY(overrideCenterY);
    } else {
      // Use default center position
      setCurrentCenterX(centerX);
      setCurrentCenterY(centerY);
    }

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      // Apply easing function for smooth deceleration
      const easedProgress = appleEaseOut(linearProgress);
      setExpansionProgress(easedProgress);

      if (linearProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        if (onComplete) {
          onComplete();
        }
      }
    };

    requestAnimationFrame(animate);
  }, [duration, onComplete, centerX, centerY]);

  // Calculate mask style - use SSR-safe values when window is undefined
  // Since expansionProgress starts at 0, initial values will be consistent
  const maskStyle = useMemo(() => {
    // SSR-safe: use starting dimensions when window is undefined
    // This ensures server and client initial render match
    if (typeof window === 'undefined') {
      return {
        width: `${startWidth}px`,
        height: `${startHeight}px`,
        borderRadius: `${startBorderRadius}px`,
        left: `${currentCenterX}%`,
        top: `${currentCenterY}%`,
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Start with provided dimensions, end with viewport dimensions
    const endWidth = viewportWidth;
    const endHeight = viewportHeight;

    const currentWidth = startWidth + (endWidth - startWidth) * expansionProgress;
    const currentHeight = startHeight + (endHeight - startHeight) * expansionProgress;
    const currentBorderRadius = startBorderRadius * (1 - expansionProgress);

    // Calculate position to keep center point fixed
    const left = `calc(${currentCenterX}% - ${(currentWidth / viewportWidth) * 50}vw)`;
    const top = `calc(${currentCenterY}% - ${(currentHeight / viewportHeight) * 50}vh)`;

    return {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      borderRadius: `${currentBorderRadius}px`,
      left,
      top,
    };
  }, [expansionProgress, currentCenterX, currentCenterY, startWidth, startHeight, startBorderRadius]);

  return {
    expansionProgress,
    startExpansion,
    maskStyle,
  };
}

