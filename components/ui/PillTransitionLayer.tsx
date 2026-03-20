'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Stage } from '@/contexts/NavigationContext';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import { useMaskExpansionFromPill } from '@/hooks/useMaskExpansionFromPill';

interface PillTransitionLayerProps {
  pendingNextStage: Stage | null;
  onComplete: () => void;
}

/**
 * Fixed full-screen overlay that handles the pill-to-viewport mask expansion transition.
 * Renders on top of everything when a pill transition is in progress.
 *
 * Both the background image opacity and overlay opacity animate toward their
 * target values from sectionBackgrounds, so at expansion end the layer looks
 * identical to the destination page — no flash on unmount.
 */
export default function PillTransitionLayer({
  pendingNextStage,
  onComplete,
}: PillTransitionLayerProps) {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Stable callback so useMaskExpansion doesn't recreate startExpansion when onComplete changes
  const stableOnComplete = useCallback(() => {
    onCompleteRef.current();
  }, []);

  const { startExpansion, maskStyle, expansionProgress } = useMaskExpansionFromPill({
    onComplete: stableOnComplete,
  });

  // Track which stage we've already started expanding to, so startExpansion
  // is only called once per pending stage (not re-called when its identity changes)
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

  // Don't render until the animation has started (position is correct only after startExpansion fires)
  if (!pendingNextStage || expansionProgress === 0) return null;

  const nextConfig = sectionBackgrounds[pendingNextStage];
  const nextBackgroundImage = nextConfig?.backgroundImage;
  const transitionOverlayColor = nextConfig?.pillTransitionOverlayColor ?? 'black';
  const targetBgOpacity = nextConfig?.opacity ?? 0.8;

  const widthValue = parseFloat(maskStyle.width);
  const heightValue = parseFloat(maskStyle.height);
  const borderRadiusValue = parseFloat(maskStyle.borderRadius);
  const leftValue = parseFloat(maskStyle.left);
  const topValue = parseFloat(maskStyle.top);

  const maskId = 'pill-transition-mask';

  return (
    <div className="fixed inset-0 z-[10001] pointer-events-none">
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
