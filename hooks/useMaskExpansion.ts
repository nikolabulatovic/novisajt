import { useState, useCallback, useMemo } from 'react';

const EXPANSION_DURATION = 4000;
const EXPANSION_CENTER_X = 50;
const EXPANSION_CENTER_Y = 50;

// Pill dimensions (matching Pill component: w-32 h-16 md:w-40 md:h-20)
// Using desktop size as base (160px x 80px)
const PILL_WIDTH_PX = 160;
const PILL_HEIGHT_PX = 80;
const PILL_BORDER_RADIUS_PX = PILL_HEIGHT_PX / 2; // Full rounded = 50% of height

interface UseMaskExpansionOptions {
  duration?: number; // Animation duration in milliseconds
  centerX?: number; // Center X position as percentage (0-100)
  centerY?: number; // Center Y position as percentage (0-100)
  pillWidth?: number; // Starting pill width in pixels
  pillHeight?: number; // Starting pill height in pixels
  onComplete?: () => void; // Callback when animation completes
}

interface UseMaskExpansionReturn {
  expansionProgress: number; // 0 to 1
  startExpansion: () => void; // Function to start the animation
  maskStyle: {
    width: string; // Current width (px or vw)
    height: string; // Current height (px or vh)
    borderRadius: string; // Current border radius (px)
    left: string; // Left position
    top: string; // Top position
  };
}

/**
 * Hook for managing pill-to-viewport mask expansion animation
 * Morphs from pill shape to full viewport rectangle
 */
export function useMaskExpansion({
  duration = EXPANSION_DURATION,
  centerX = EXPANSION_CENTER_X,
  centerY = EXPANSION_CENTER_Y,
  pillWidth = PILL_WIDTH_PX,
  pillHeight = PILL_HEIGHT_PX,
  onComplete,
}: UseMaskExpansionOptions = {}): UseMaskExpansionReturn {
  const [expansionProgress, setExpansionProgress] = useState(0);

  const startExpansion = useCallback(() => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setExpansionProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        if (onComplete) {
          onComplete();
        }
      }
    };

    requestAnimationFrame(animate);
  }, [duration, onComplete]);

  // Calculate mask style - use SSR-safe values when window is undefined
  // Since expansionProgress starts at 0, initial values will be consistent
  const maskStyle = useMemo(() => {
    // SSR-safe: use pill dimensions when window is undefined
    // This ensures server and client initial render match
    if (typeof window === 'undefined') {
      return {
        width: `${pillWidth}px`,
        height: `${pillHeight}px`,
        borderRadius: `${PILL_BORDER_RADIUS_PX}px`,
        left: '50%',
        top: '50%',
      };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Start with pill dimensions, end with viewport dimensions
    const startWidth = pillWidth;
    const startHeight = pillHeight;
    const endWidth = viewportWidth;
    const endHeight = viewportHeight;

    const currentWidth = startWidth + (endWidth - startWidth) * expansionProgress;
    const currentHeight = startHeight + (endHeight - startHeight) * expansionProgress;
    const currentBorderRadius = PILL_BORDER_RADIUS_PX * (1 - expansionProgress);

    // Calculate position to keep center point fixed
    const left = `calc(${centerX}% - ${(currentWidth / viewportWidth) * 50}vw)`;
    const top = `calc(${centerY}% - ${(currentHeight / viewportHeight) * 50}vh)`;

    return {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      borderRadius: `${currentBorderRadius}px`,
      left,
      top,
    };
  }, [expansionProgress, centerX, centerY, pillWidth, pillHeight]);

  return {
    expansionProgress,
    startExpansion,
    maskStyle,
  };
}

