import { useCallback, useLayoutEffect, useState } from 'react';
import { usePillContext } from '@/contexts/PillContext';
import { useMaskExpansion, UseMaskExpansionOptions, UseMaskExpansionReturn } from './useMaskExpansion';

// Fallback pill dimensions (matching Pill component: w-32 h-16 md:w-40 md:h-20)
// Used only if pill ref is not available yet
const FALLBACK_PILL_WIDTH_PX = 160;
const FALLBACK_PILL_HEIGHT_PX = 80;
const FALLBACK_PILL_BORDER_RADIUS_PX = FALLBACK_PILL_HEIGHT_PX / 2; // Full rounded = 50% of height

type UseMaskExpansionFromPillOptions = Omit<UseMaskExpansionOptions, 'startLeft' | 'startTop' | 'startWidth' | 'startHeight' | 'startBorderRadius'>;

/**
 * Hook that wraps useMaskExpansion specifically for pill-to-viewport expansion
 * Automatically gets the red pill dimensions from PillContext upfront and position on-demand
 */
export function useMaskExpansionFromPill({
  duration,
  onComplete,
}: UseMaskExpansionFromPillOptions = {}): UseMaskExpansionReturn {
  const pillContext = usePillContext();
  const [pillDimensions, setPillDimensions] = useState({
    left: 0,
    top: 0,
    width: FALLBACK_PILL_WIDTH_PX,
    height: FALLBACK_PILL_HEIGHT_PX,
    borderRadius: FALLBACK_PILL_BORDER_RADIUS_PX,
  });

  // Calculate pill dimensions upfront when ref becomes available
  // Using useLayoutEffect for DOM measurements before paint
  useLayoutEffect(() => {
    if (pillContext?.redPillRef?.current) {
      const rect = pillContext.redPillRef.current.getBoundingClientRect();
      // Defer state update to avoid linter warning about synchronous setState
      requestAnimationFrame(() => {
        setPillDimensions({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          borderRadius: rect.height / 2, // Full rounded = 50% of height
        });
      });
    }
  }, [pillContext]);

  // Use the generic useMaskExpansion hook with actual pill dimensions
  const { startExpansion: baseStartExpansion, ...rest } = useMaskExpansion({
    duration,
    startLeft: pillDimensions.left,
    startTop: pillDimensions.top,
    startWidth: pillDimensions.width,
    startHeight: pillDimensions.height,
    startBorderRadius: pillDimensions.borderRadius,
    onComplete,
  });

  const startExpansion = useCallback(() => {
    // Calculate position from red pill ref in context (on-demand)
    if (pillContext?.redPillRef?.current && typeof window !== 'undefined') {
      const rect = pillContext.redPillRef.current.getBoundingClientRect();
      // Get left and top position directly from bounding rect
      const left = rect.left;
      const top = rect.top;

      // Start expansion with calculated position (dimensions already set via props)
      baseStartExpansion(left, top);
    } else {
      // Fallback if pill not found
      baseStartExpansion();
    }
  }, [baseStartExpansion, pillContext]);

  return {
    ...rest,
    startExpansion,
  };
}

