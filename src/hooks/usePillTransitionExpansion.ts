'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { fallbackPillOrigin } from '@/src/lib/pillOrigin';
import { warmStageImage } from '@/src/lib/preloadStageImage';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

/**
 * Starts pill mask expansion as soon as a stage is pending, warms the
 * destination static image URL in parallel, and clears a stale full-viewport
 * mask after the overlay finishes fading out.
 */
export function usePillTransitionExpansion({
  pendingNextStage,
  origin,
  persistedOrigin,
  isFadingOut,
  startExpansion,
  reset,
}: {
  pendingNextStage: Stage | null;
  origin: PillOrigin | null;
  persistedOrigin: PillOrigin | null;
  isFadingOut: boolean;
  startExpansion: (origin: PillOrigin) => void;
  reset: () => void;
}) {
  const pendingImageSrc = useResolvedBackgroundImage(
    pendingNextStage
      ? stageConfig[pendingNextStage]?.backgroundImage
      : undefined,
  );
  const startedForStageRef = useRef<Stage | null>(null);

  useLayoutEffect(() => {
    if (!pendingNextStage) {
      startedForStageRef.current = null;
      return;
    }
    if (startedForStageRef.current === pendingNextStage) return;

    startedForStageRef.current = pendingNextStage;
    startExpansion(origin ?? persistedOrigin ?? fallbackPillOrigin());
    warmStageImage(pendingImageSrc);
  }, [
    pendingNextStage,
    origin,
    persistedOrigin,
    startExpansion,
    pendingImageSrc,
  ]);

  useEffect(() => {
    if (pendingNextStage || isFadingOut) return;
    reset();
  }, [pendingNextStage, isFadingOut, reset]);
}
