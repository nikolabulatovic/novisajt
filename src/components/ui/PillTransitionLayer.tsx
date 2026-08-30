'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import ClipWindowTechnique from '@/src/components/ui/pillTransition/ClipWindowTechnique';
import SvgMaskTechnique from '@/src/components/ui/pillTransition/SvgMaskTechnique';
import { Stage } from '@/src/contexts/NavigationContext';
import { useMaskExpansion } from '@/src/hooks/useMaskExpansion';
import { usePillTransitionExpansion } from '@/src/hooks/usePillTransitionExpansion';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { selectPillTransitionTechnique } from '@/src/lib/pillTransition/selectTechnique';
import type {
  PillTransitionSceneProps,
  PillTransitionTechniqueId,
} from '@/src/lib/pillTransition/types';
import {
  DEFAULT_STAGE_SHELL,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';

const FADE_OUT_DURATION = 400;

interface PillTransitionLayerProps {
  pendingNextStage: Stage | null;
  origin: PillOrigin | null;
  onComplete: () => void;
}

/**
 * Full-screen overlay: expands a pill-shaped reveal from `origin` to the viewport,
 * showing the next stage background, then fades out after the real stage swaps in.
 *
 * Techniques (plugins): `clip-window` (current default) and `svg-mask`.
 * Force either with `?pillTechnique=svg-mask` or `?pillTechnique=clip-window`.
 * Active id is on `document.documentElement.dataset.pillTechnique`.
 */
export default function PillTransitionLayer({
  pendingNextStage,
  origin,
  onComplete,
}: PillTransitionLayerProps) {
  const onCompleteRef = useRef(onComplete);
  const [persistedStage, setPersistedStage] = useState<Stage | null>(null);
  const [persistedOrigin, setPersistedOrigin] = useState<PillOrigin | null>(
    null,
  );
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [fadeOutOpacity, setFadeOutOpacity] = useState(1);
  const [technique, setTechnique] =
    useState<PillTransitionTechniqueId>('clip-window');

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const next = selectPillTransitionTechnique();
    setTechnique(next);
    document.documentElement.dataset.pillTechnique = next;
  }, []);

  if (pendingNextStage && pendingNextStage !== persistedStage) {
    setPersistedStage(pendingNextStage);
    setPersistedOrigin(origin);
  }

  const handleExpansionComplete = useCallback(() => {
    onCompleteRef.current();
    setIsFadingOut(true);
  }, []);

  useEffect(() => {
    if (!isFadingOut) return;
    const startTime = Date.now();
    let raf: number;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / FADE_OUT_DURATION, 1);
      setFadeOutOpacity(1 - progress);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setIsFadingOut(false);
        setFadeOutOpacity(1);
        setPersistedStage(null);
        setPersistedOrigin(null);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isFadingOut]);

  const { startExpansion, reset, maskStyle, expansionProgress } =
    useMaskExpansion({
      onComplete: handleExpansionComplete,
    });

  usePillTransitionExpansion({
    pendingNextStage,
    origin,
    persistedOrigin,
    isFadingOut,
    startExpansion,
    reset,
  });

  const activeStage = pendingNextStage ?? persistedStage;
  const nextBackgroundImage = useResolvedBackgroundImage(
    activeStage ? stageConfig[activeStage]?.backgroundImage : undefined,
  );

  if (!pendingNextStage && !isFadingOut) return null;
  if (!activeStage) return null;

  const nextConfig = stageConfig[activeStage];
  const scene: PillTransitionSceneProps = {
    backgroundWash:
      nextConfig?.backgroundWash ?? DEFAULT_STAGE_SHELL.backgroundWash,
    backgroundImage: nextBackgroundImage,
    backgroundPosition:
      nextConfig?.backgroundPosition ?? DEFAULT_STAGE_SHELL.backgroundPosition,
    backgroundOpacity: nextConfig?.opacity ?? 0.8,
    gradientOverlayClasses: nextConfig?.gradientOverlayClasses ?? [],
    overlayColor: nextConfig?.pillTransitionOverlayColor ?? 'black',
    expansionProgress,
  };

  const Technique =
    technique === 'clip-window' ? ClipWindowTechnique : SvgMaskTechnique;

  return (
    <div
      className="fixed inset-0 z-[10001] pointer-events-none"
      style={{ opacity: isFadingOut ? fadeOutOpacity : 1 }}
      data-pill-technique={technique}
    >
      <Technique maskStyle={maskStyle} scene={scene} />
    </div>
  );
}
