'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { fallbackPillOrigin } from '@/src/lib/pillOrigin';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

/** Default Next.js `images.deviceSizes` — `/_next/image` only accepts these `w` values. */
const NEXT_IMAGE_DEVICE_SIZES = [
  640, 750, 828, 1080, 1200, 1920, 2048, 3840,
] as const;

/** Matches `BackgroundImage` `quality={75}`. */
const NEXT_IMAGE_QUALITY = 75;

/**
 * Fire-and-forget: request the `next/image` optimizer URL so a cold `/_next`
 * cache is warm by the time the real stage mounts. Never await this from the
 * expand path — delaying `startExpansion` can flash a stale full-screen mask.
 */
export function warmNextImageOptimizer(src: string) {
  const target = Math.ceil(window.innerWidth * (window.devicePixelRatio || 1));
  const width =
    NEXT_IMAGE_DEVICE_SIZES.find((w) => w >= target) ??
    NEXT_IMAGE_DEVICE_SIZES[NEXT_IMAGE_DEVICE_SIZES.length - 1];
  const img = new window.Image();
  img.src = `/_next/image?${new URLSearchParams({
    url: src,
    w: String(width),
    q: String(NEXT_IMAGE_QUALITY),
  })}`;
}

/**
 * Starts pill mask expansion as soon as a stage is pending, warms the
 * destination `next/image` URL in parallel, and clears a stale full-viewport
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
  const startedForStageRef = useRef<Stage | null>(null);

  useLayoutEffect(() => {
    if (!pendingNextStage) {
      startedForStageRef.current = null;
      return;
    }
    if (startedForStageRef.current === pendingNextStage) return;

    startedForStageRef.current = pendingNextStage;
    startExpansion(origin ?? persistedOrigin ?? fallbackPillOrigin());

    const imageSrc = stageConfig[pendingNextStage]?.backgroundImage;
    if (imageSrc) {
      warmNextImageOptimizer(imageSrc);
    }
  }, [pendingNextStage, origin, persistedOrigin, startExpansion]);

  useEffect(() => {
    if (pendingNextStage || isFadingOut) return;
    reset();
  }, [pendingNextStage, isFadingOut, reset]);
}
