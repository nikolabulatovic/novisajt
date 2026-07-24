'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface PillOriginRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PillContextValue {
  /** Live ref to the registered red pill element (may be null). */
  getRedPillElement: () => HTMLElement | null;
  /** Last measured red-pill rect (captured on click). */
  originRect: PillOriginRect | null;
  registerRedPill: (ref: React.RefObject<HTMLElement | null>) => void;
  unregisterRedPill: () => void;
  /** Snapshot the red pill’s viewport rect for the upcoming transition. */
  captureRedPillOrigin: () => PillOriginRect | null;
}

const PillContext = createContext<PillContextValue | null>(null);

export function PillProvider({ children }: { children: ReactNode }) {
  // Keep the DOM ref in a mutable box so register/unregister do not re-render.
  const redPillRefBox = useRef<React.RefObject<HTMLElement | null> | null>(
    null,
  );
  const [originRect, setOriginRect] = useState<PillOriginRect | null>(null);

  const registerRedPill = useCallback(
    (ref: React.RefObject<HTMLElement | null>) => {
      redPillRefBox.current = ref;
    },
    [],
  );

  const unregisterRedPill = useCallback(() => {
    redPillRefBox.current = null;
  }, []);

  const getRedPillElement = useCallback((): HTMLElement | null => {
    return redPillRefBox.current?.current ?? null;
  }, []);

  const captureRedPillOrigin = useCallback((): PillOriginRect | null => {
    const el = redPillRefBox.current?.current;
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const next: PillOriginRect = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    setOriginRect(next);
    return next;
  }, []);

  const value = useMemo(
    () => ({
      getRedPillElement,
      originRect,
      registerRedPill,
      unregisterRedPill,
      captureRedPillOrigin,
    }),
    [
      getRedPillElement,
      originRect,
      registerRedPill,
      unregisterRedPill,
      captureRedPillOrigin,
    ],
  );

  return <PillContext.Provider value={value}>{children}</PillContext.Provider>;
}

export function usePillContext() {
  return useContext(PillContext);
}
