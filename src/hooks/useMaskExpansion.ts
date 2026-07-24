import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { PillOrigin } from '@/src/lib/pillOrigin';
import { appleEaseOut } from '@/src/utils/easing';

const EXPANSION_DURATION = 1500;

export type MaskStyle = {
  width: string;
  height: string;
  borderRadius: string;
  left: string;
  top: string;
};

export interface UseMaskExpansionReturn {
  expansionProgress: number;
  startExpansion: (origin: PillOrigin) => void;
  reset: () => void;
  maskStyle: MaskStyle;
}

/**
 * Animates a rounded rect from `origin` to the full viewport.
 */
export function useMaskExpansion({
  duration = EXPANSION_DURATION,
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
} = {}): UseMaskExpansionReturn {
  const [expansionProgress, setExpansionProgress] = useState(0);
  const [origin, setOrigin] = useState<PillOrigin | null>(null);
  const onCompleteRef = useRef(onComplete);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const reset = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setExpansionProgress(0);
    setOrigin(null);
  }, []);

  const startExpansion = useCallback(
    (nextOrigin: PillOrigin) => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }

      setOrigin(nextOrigin);
      setExpansionProgress(0);

      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const linearProgress = Math.min(elapsed / duration, 1);
        setExpansionProgress(appleEaseOut(linearProgress));

        if (linearProgress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          rafRef.current = null;
          onCompleteRef.current?.();
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    },
    [duration],
  );

  const maskStyle = useMemo<MaskStyle>(() => {
    if (!origin || typeof window === 'undefined') {
      return {
        width: '0px',
        height: '0px',
        borderRadius: '0px',
        left: '0px',
        top: '0px',
      };
    }

    const p = expansionProgress;
    const width = origin.width + (window.innerWidth - origin.width) * p;
    const height = origin.height + (window.innerHeight - origin.height) * p;
    const borderRadius = (origin.height / 2) * (1 - p);
    const left = origin.left * (1 - p);
    const top = origin.top * (1 - p);

    return {
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: `${borderRadius}px`,
      left: `${left}px`,
      top: `${top}px`,
    };
  }, [expansionProgress, origin]);

  return {
    expansionProgress,
    startExpansion,
    reset,
    maskStyle,
  };
}
