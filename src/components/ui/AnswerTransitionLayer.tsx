'use client';

import { useEffect, useRef, useState } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

const CROSSFADE_MS = 1800;

interface AnswerTransitionLayerProps {
  pendingNextStage: Stage | null;
  /** Route stage before navigation commits — outgoing background. */
  fromStage: Stage;
  /**
   * Called once the crossfade has finished. Route commit happens here (not mid-blend) so the
   * page background stays the outgoing shot underneath until the overlay matches the destination,
   * avoiding a perceptual “cut” when React swaps `PageContainer` mid-animation.
   */
  onComplete: () => void;
}

interface TransitionSlot {
  from: Stage;
  to: Stage;
}

export default function AnswerTransitionLayer({
  pendingNextStage,
  fromStage,
  onComplete,
}: AnswerTransitionLayerProps) {
  const [slot, setSlot] = useState<TransitionSlot | null>(null);
  const [outOpacity, setOutOpacity] = useState(1);
  const [inOpacity, setInOpacity] = useState(0);
  /** When false, opacity changes apply instantly (preload / settle); crossfade enables after arm. */
  const [crossfadeArmed, setCrossfadeArmed] = useState(false);

  const onDoneRef = useRef(onComplete);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    onDoneRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const clearTimers = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
    clearTimers();
    setCrossfadeArmed(false);
    setSlot(null);

    if (!pendingNextStage) {
      return;
    }

    const fromCfg = stageConfig[fromStage];
    const toCfg = stageConfig[pendingNextStage];
    const fromUrl = fromCfg.backgroundImage;
    const toUrl = toCfg.backgroundImage;

    if (!fromUrl && !toUrl) {
      queueMicrotask(() => {
        onDoneRef.current();
      });
      return;
    }

    const startOut = fromUrl ? (fromCfg.opacity ?? 0.8) : 1;
    const endIn = toUrl ? (toCfg.opacity ?? 0.8) : 1;

    setSlot({ from: fromStage, to: pendingNextStage });
    setCrossfadeArmed(false);
    setOutOpacity(startOut);
    setInOpacity(0);

    const schedule = (fn: () => void, ms: number) => {
      timeoutsRef.current.push(window.setTimeout(fn, ms));
    };

    const beginBlend = () => {
      let raf2 = 0;
      const raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => {
          setCrossfadeArmed(true);
          setOutOpacity(0);
          setInOpacity(endIn);
          schedule(() => {
            onDoneRef.current();
          }, CROSSFADE_MS);
        });
      });
      return () => {
        window.cancelAnimationFrame(raf1);
        window.cancelAnimationFrame(raf2);
      };
    };

    let cancelRaf: (() => void) | undefined;

    if (toUrl) {
      let cancelled = false;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        cancelRaf = beginBlend();
      };
      img.onerror = () => {
        if (cancelled) return;
        cancelRaf = beginBlend();
      };
      img.src = toUrl;

      return () => {
        cancelled = true;
        clearTimers();
        cancelRaf?.();
      };
    }

    cancelRaf = beginBlend();

    return () => {
      clearTimers();
      cancelRaf?.();
    };
  }, [pendingNextStage, fromStage]);

  if (!slot || !pendingNextStage) {
    return null;
  }

  const fromCfg = stageConfig[slot.from];
  const toCfg = stageConfig[slot.to];
  const fromUrl = fromCfg.backgroundImage;
  const toUrl = toCfg.backgroundImage;

  const transitionStyle = {
    transitionProperty: 'opacity',
    transitionDuration: crossfadeArmed ? `${CROSSFADE_MS}ms` : '0ms',
    /** Linear keeps outgoing/incoming moving at matched rates; ease-out was skewing the dissolve. */
    transitionTimingFunction: 'linear' as const,
  };

  const gradientClasses = toCfg.gradientOverlayClasses ?? [];

  return (
    <div
      className="fixed inset-0 z-[10000] pointer-events-auto bg-black"
      aria-hidden
    >
      {/* Incoming */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={
          toUrl
            ? {
                backgroundImage: `url('${toUrl}')`,
                opacity: inOpacity,
                ...transitionStyle,
              }
            : {
                backgroundColor: '#000',
                opacity: inOpacity,
                ...transitionStyle,
              }
        }
      />

      {gradientClasses.map((cls, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute inset-0 ${cls}`}
          style={{
            opacity: inOpacity,
            ...transitionStyle,
          }}
        />
      ))}

      {/* Outgoing on top */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={
          fromUrl
            ? {
                backgroundImage: `url('${fromUrl}')`,
                opacity: outOpacity,
                ...transitionStyle,
              }
            : {
                backgroundColor: '#000',
                opacity: outOpacity,
                ...transitionStyle,
              }
        }
      />

      {/* Eases in toward mid-crossfade and eases out — matches photo dissolve duration. */}
      {crossfadeArmed ? (
        <div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{
            animationName: 'answer-crossfade-dim',
            animationDuration: `${CROSSFADE_MS}ms`,
            animationTimingFunction: 'ease-in-out',
            animationFillMode: 'both',
          }}
        />
      ) : null}
    </div>
  );
}
