'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Stage } from '@/contexts/NavigationContext';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import { useMaskExpansionFromPill } from '@/hooks/useMaskExpansionFromPill';

const FADE_OUT_DURATION = 400;

interface PillTransitionLayerProps {
  pendingNextStage: Stage | null;
  onComplete: () => void;
}

/**
 * Fixed full-screen overlay that handles the pill-to-viewport mask expansion transition.
 * Renders on top of everything when a pill transition is in progress.
 *
 * Phase 1 — expansion: pill mask grows to fill viewport while revealing destination appearance.
 * Phase 2 — fade-out: after onComplete swaps the real stage in underneath, this layer fades
 *   to transparent, smoothly covering any residual visual mismatch between the layer and the page.
 */
export default function PillTransitionLayer({
  pendingNextStage,
  onComplete,
}: PillTransitionLayerProps) {
  const onCompleteRef = useRef(onComplete);
  // Keeps config readable during fade-out after pendingNextStage becomes null
  const [persistedStage, setPersistedStage] = useState<Stage | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [fadeOutOpacity, setFadeOutOpacity] = useState(1);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // React-recommended pattern for tracking the last non-null prop value:
  // update state during render so React re-renders immediately without a cascading effect.
  if (pendingNextStage && pendingNextStage !== persistedStage) {
    setPersistedStage(pendingNextStage);
  }

  // Called when mask expansion finishes
  const handleExpansionComplete = useCallback(() => {
    // Swap the real stage in underneath this layer
    onCompleteRef.current();
    // Then fade this layer out to cover any residual visual mismatch
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
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isFadingOut]);

  const stableOnComplete = useCallback(() => {
    handleExpansionComplete();
  }, [handleExpansionComplete]);

  const { startExpansion, maskStyle, expansionProgress } = useMaskExpansionFromPill({
    onComplete: stableOnComplete,
  });

  const startedForStageRef = useRef<typeof pendingNextStage>(null);

  useEffect(() => {
    if (pendingNextStage && startedForStageRef.current !== pendingNextStage) {
      startedForStageRef.current = pendingNextStage;
      startExpansion();
    }
    if (!pendingNextStage) {
      startedForStageRef.current = null;
    }
  }, [pendingNextStage, startExpansion]);

  const activeStage = pendingNextStage ?? persistedStage;

  if ((!pendingNextStage && !isFadingOut) || expansionProgress === 0) return null;
  if (!activeStage) return null;

  const nextConfig = sectionBackgrounds[activeStage];
  const nextBackgroundImage = nextConfig?.backgroundImage;
  const transitionOverlayColor = nextConfig?.pillTransitionOverlayColor ?? 'black';
  const targetBgOpacity = nextConfig?.opacity ?? 0.8;
  const gradientOverlayClasses = nextConfig?.gradientOverlayClasses ?? [];

  const widthValue = parseFloat(maskStyle.width);
  const heightValue = parseFloat(maskStyle.height);
  const borderRadiusValue = parseFloat(maskStyle.borderRadius);
  const leftValue = parseFloat(maskStyle.left);
  const topValue = parseFloat(maskStyle.top);

  const maskId = 'pill-transition-mask';

  return (
    <div
      className="fixed inset-0 z-[10001] pointer-events-none"
      style={{ opacity: isFadingOut ? fadeOutOpacity : 1 }}>
      <svg className="absolute" width="100%" height="100%" style={{ pointerEvents: 'none' }}>
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

      {/* Next stage background, visible only inside the expanding pill mask */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}>
        {/* Solid black base — always fully opaque so old stage never shows through */}
        <div className="absolute inset-0 bg-black" />
        {nextBackgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${nextBackgroundImage}')`,
              opacity: targetBgOpacity,
            }}
          />
        )}
        {gradientOverlayClasses.map((cls, i) => (
          <div key={i} className={cls} />
        ))}
        {/* Overlay animates from fully opaque → target, revealing destination appearance */}
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
