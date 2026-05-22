'use client';

import { MouseEvent, useCallback, useRef, useState } from 'react';

const RIPPLE_REMOVE_MS = 600;

export interface AnswerChoiceRipple {
  id: number;
  x: number;
  y: number;
}

/** Ripple dots keyed by option id / index (stringified internally). */
export function useAnswerChoiceRipples<K extends string | number>(
  schedule: (fn: () => void, delayMs: number) => void,
) {
  const [ripples, setRipples] = useState<Record<string, AnswerChoiceRipple[]>>(
    {},
  );
  const rippleIdCounter = useRef(0);

  const createRipple = useCallback(
    (event: MouseEvent<HTMLButtonElement>, key: K) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const keyStr = String(key);
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = ++rippleIdCounter.current;

      setRipples((prev) => ({
        ...prev,
        [keyStr]: [...(prev[keyStr] || []), { id, x, y }],
      }));

      schedule(() => {
        setRipples((prev) => ({
          ...prev,
          [keyStr]: (prev[keyStr] || []).filter((r) => r.id !== id),
        }));
      }, RIPPLE_REMOVE_MS);
    },
    [schedule],
  );

  const clearRipples = useCallback(() => setRipples({}), []);

  return { ripples, createRipple, clearRipples };
}
