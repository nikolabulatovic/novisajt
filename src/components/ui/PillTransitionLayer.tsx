'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Stage } from '@/src/contexts/NavigationContext';
import { useStoryGender } from '@/src/hooks/useGenderedTranslations';
import { useMaskExpansion } from '@/src/hooks/useMaskExpansion';
import { usePillTransitionExpansion } from '@/src/hooks/usePillTransitionExpansion';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import {
  DEFAULT_STAGE_SHELL,
  resolveBackgroundImage,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';

const FADE_OUT_DURATION = 400;

interface PillTransitionLayerProps {
  pendingNextStage: Stage | null;
  origin: PillOrigin | null;
  onComplete: () => void;
}

/**
 * Full-screen overlay: expands a pill-shaped mask from `origin` to the viewport,
 * revealing the next stage background, then fades out after the real stage swaps in.
 */
export default function PillTransitionLayer({
  pendingNextStage,
  origin,
  onComplete,
}: PillTransitionLayerProps) {
  const gender = useStoryGender();
  const onCompleteRef = useRef(onComplete);
  const [persistedStage, setPersistedStage] = useState<Stage | null>(null);
  const [persistedOrigin, setPersistedOrigin] = useState<PillOrigin | null>(
    null,
  );
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [fadeOutOpacity, setFadeOutOpacity] = useState(1);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

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

  if (!pendingNextStage && !isFadingOut) return null;
  if (!activeStage) return null;

  const nextConfig = stageConfig[activeStage];
  const nextBackgroundImage = resolveBackgroundImage(
    nextConfig?.backgroundImage,
    gender,
  );
  const nextBackgroundPosition =
    nextConfig?.backgroundPosition ?? DEFAULT_STAGE_SHELL.backgroundPosition;
  const transitionOverlayColor =
    nextConfig?.pillTransitionOverlayColor ?? 'black';
  const targetBgOpacity = nextConfig?.opacity ?? 0.8;
  const gradientOverlayClasses = nextConfig?.gradientOverlayClasses ?? [];
  const backgroundWash =
    nextConfig?.backgroundWash ?? DEFAULT_STAGE_SHELL.backgroundWash;

  const widthValue = parseFloat(maskStyle.width);
  const heightValue = parseFloat(maskStyle.height);
  const borderRadiusValue = parseFloat(maskStyle.borderRadius);
  const leftValue = parseFloat(maskStyle.left);
  const topValue = parseFloat(maskStyle.top);
  const maskId = 'pill-transition-mask';

  return (
    <div
      className="fixed inset-0 z-[10001] pointer-events-none"
      style={{ opacity: isFadingOut ? fadeOutOpacity : 1 }}
    >
      <svg
        className="absolute"
        width="100%"
        height="100%"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id={maskId}>
            <rect
              width={widthValue}
              height={heightValue}
              rx={borderRadiusValue}
              ry={borderRadiusValue}
              fill="white"
              x={leftValue}
              y={topValue}
            />
          </mask>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: backgroundWash }}
        />
        {nextBackgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${nextBackgroundImage}')`,
              backgroundPosition: nextBackgroundPosition,
              opacity: targetBgOpacity,
            }}
          />
        )}
        {gradientOverlayClasses.map((cls, i) => (
          <div key={i} className={cls} />
        ))}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: transitionOverlayColor,
            opacity: 1 - expansionProgress,
          }}
        />
      </div>
    </div>
  );
}
