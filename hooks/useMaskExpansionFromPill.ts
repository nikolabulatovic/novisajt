import { useCallback } from 'react';
import { usePillContext } from '@/contexts/PillContext';
import { useMaskExpansion, UseMaskExpansionOptions, UseMaskExpansionReturn } from './useMaskExpansion';

// Pill dimensions (matching Pill component: w-32 h-16 md:w-40 md:h-20)
// Using desktop size as base (160px x 80px)
const PILL_WIDTH_PX = 160;
const PILL_HEIGHT_PX = 80;
const PILL_BORDER_RADIUS_PX = PILL_HEIGHT_PX / 2; // Full rounded = 50% of height

interface UseMaskExpansionFromPillOptions extends Omit<UseMaskExpansionOptions, 'centerX' | 'centerY' | 'startWidth' | 'startHeight' | 'startBorderRadius'> {
  // All options from useMaskExpansion except those that are pill-specific
}

/**
 * Hook that wraps useMaskExpansion specifically for pill-to-viewport expansion
 * Automatically gets the red pill position from PillContext and uses pill dimensions
 */
export function useMaskExpansionFromPill({
  duration,
  onComplete,
}: UseMaskExpansionFromPillOptions = {}): UseMaskExpansionReturn {
  const pillContext = usePillContext();

  // Use the generic useMaskExpansion hook with pill-specific dimensions
  const { startExpansion: baseStartExpansion, ...rest } = useMaskExpansion({
    duration,
    startWidth: PILL_WIDTH_PX,
    startHeight: PILL_HEIGHT_PX,
    startBorderRadius: PILL_BORDER_RADIUS_PX,
    onComplete,
  });

  const startExpansion = useCallback(() => {
    // Calculate position from red pill ref in context (on-demand)
    if (pillContext?.redPillRef?.current) {
      const rect = pillContext.redPillRef.current.getBoundingClientRect();
      const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const centerY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      baseStartExpansion(centerX, centerY);
    } else {
      // Fallback to default center if pill not found
      baseStartExpansion();
    }
  }, [baseStartExpansion, pillContext]);

  return {
    ...rest,
    startExpansion,
  };
}

