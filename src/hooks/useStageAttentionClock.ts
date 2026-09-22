import { useEffect, useRef, useState } from 'react';

import { StageAttentionClock } from '@/src/lib/stageAttentionClock';

const ACTIVITY_EVENTS = [
  'pointerdown',
  'keydown',
  'wheel',
  'touchstart',
  'scroll',
] as const;

/** Throttle noisy move events; other activity is counted immediately. */
const POINTER_MOVE_THROTTLE_MS = 1000;

/**
 * React wiring for {@link StageAttentionClock}: visibility + input listeners.
 * Timing rules live in the pure class (unit-tested without PostHog / DOM flakiness).
 */
export function useStageAttentionClock() {
  const [clock] = useState(
    () =>
      new StageAttentionClock({
        isVisible: () => typeof document !== 'undefined' && !document.hidden,
      }),
  );
  const lastPointerMoveAtRef = useRef(0);
  const lastTouchMoveAtRef = useRef(0);

  useEffect(() => {
    clock.resetForStage();

    const onVisibilityChange = () => {
      if (document.hidden) {
        clock.onHidden();
        return;
      }
      clock.onVisible();
    };

    const onActivity = () => {
      clock.noteActivity();
    };

    const onPointerMove = () => {
      const now = Date.now();
      if (now - lastPointerMoveAtRef.current < POINTER_MOVE_THROTTLE_MS) {
        return;
      }
      lastPointerMoveAtRef.current = now;
      clock.noteActivity();
    };

    // Div scroll often doesn't reach window; touch-drag still emits touchmove.
    const onTouchMove = () => {
      const now = Date.now();
      if (now - lastTouchMoveAtRef.current < POINTER_MOVE_THROTTLE_MS) {
        return;
      }
      lastTouchMoveAtRef.current = now;
      clock.noteActivity();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, onActivity, {
        capture: true,
        passive: true,
      });
    }
    window.addEventListener('pointermove', onPointerMove, {
      capture: true,
      passive: true,
    });
    window.addEventListener('touchmove', onTouchMove, {
      capture: true,
      passive: true,
    });

    return () => {
      clock.destroy();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      for (const eventName of ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, onActivity, {
          capture: true,
        } as EventListenerOptions);
      }
      window.removeEventListener('pointermove', onPointerMove, {
        capture: true,
      } as EventListenerOptions);
      window.removeEventListener('touchmove', onTouchMove, {
        capture: true,
      } as EventListenerOptions);
    };
  }, [clock]);

  return {
    resetForStage: () => clock.resetForStage(),
    takeElapsedMs: () => clock.takeElapsedMs(),
  };
}
