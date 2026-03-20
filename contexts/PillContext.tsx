'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface PillContextValue {
  redPillRef: React.RefObject<HTMLElement | null> | null;
  registerRedPill: (ref: React.RefObject<HTMLElement | null>) => void;
  unregisterRedPill: () => void;
}

const PillContext = createContext<PillContextValue | null>(null);

export function PillProvider({ children }: { children: ReactNode }) {
  const [redPillRef, setRedPillRef] = useState<React.RefObject<HTMLElement | null> | null>(null);

  const registerRedPill = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    setRedPillRef(ref);
  }, []);

  const unregisterRedPill = useCallback(() => {
    setRedPillRef(null);
  }, []);

  const value = useMemo(
    () => ({ redPillRef, registerRedPill, unregisterRedPill }),
    [redPillRef, registerRedPill, unregisterRedPill]
  );

  return (
    <PillContext.Provider value={value}>
      {children}
    </PillContext.Provider>
  );
}

export function usePillContext() {
  const context = useContext(PillContext);
  if (!context) {
    return null;
  }
  return context;
}

