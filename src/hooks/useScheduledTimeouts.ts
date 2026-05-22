'use client';

import { useCallback, useEffect, useRef } from 'react';

/** Clears all tracked timeouts on unmount (pattern used by answer-choice transitions). */
export function useScheduledTimeouts() {
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  const schedule = useCallback((fn: () => void, delayMs: number) => {
    const id = setTimeout(fn, delayMs);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  return schedule;
}
