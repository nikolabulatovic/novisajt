import { useCallback, useMemo } from 'react';

import { usePillContext } from '@/src/contexts/PillContext';

import {
  UseMaskExpansionOptions,
  UseMaskExpansionReturn,
  useMaskExpansion,
} from './useMaskExpansion';

const FALLBACK_PILL_WIDTH_PX = 160;
const FALLBACK_PILL_HEIGHT_PX = 80;
const FALLBACK_PILL_BORDER_RADIUS_PX = FALLBACK_PILL_HEIGHT_PX / 2;

type UseMaskExpansionFromPillOptions = Omit<
  UseMaskExpansionOptions,
  'startLeft' | 'startTop' | 'startWidth' | 'startHeight' | 'startBorderRadius'
>;

/**
 * Wraps useMaskExpansion for pill-to-viewport expansion.
 * Prefers the origin captured on pill click, then a live element measure.
 */
export function useMaskExpansionFromPill({
  duration,
  onComplete,
}: UseMaskExpansionFromPillOptions = {}): UseMaskExpansionReturn {
  const pillContext = usePillContext();

  const origin = pillContext?.originRect;
  const startWidth = origin?.width ?? FALLBACK_PILL_WIDTH_PX;
  const startHeight = origin?.height ?? FALLBACK_PILL_HEIGHT_PX;
  const startLeft = origin?.left ?? 0;
  const startTop = origin?.top ?? 0;

  const { startExpansion: baseStartExpansion, ...rest } = useMaskExpansion({
    duration,
    startLeft,
    startTop,
    startWidth,
    startHeight,
    startBorderRadius: startHeight / 2 || FALLBACK_PILL_BORDER_RADIUS_PX,
    onComplete,
  });

  const startExpansion = useCallback(() => {
    const live = pillContext?.getRedPillElement()?.getBoundingClientRect();
    const captured = pillContext?.originRect;

    if (live && live.width > 0 && live.height > 0) {
      baseStartExpansion(live.left, live.top);
      return;
    }

    if (captured) {
      baseStartExpansion(captured.left, captured.top);
      return;
    }

    baseStartExpansion(startLeft, startTop);
  }, [baseStartExpansion, pillContext, startLeft, startTop]);

  return useMemo(
    () => ({
      ...rest,
      startExpansion,
    }),
    [rest, startExpansion],
  );
}
