'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PillContextValue {
  redPillRef: React.RefObject<HTMLElement | null> | null;
  registerRedPill: (ref: React.RefObject<HTMLElement | null>) => void;
  unregisterRedPill: () => void;
}

const PillContext = createContext<PillContextValue | null>(null);

export function PillProvider({ children }: { children: ReactNode }) {
  const [redPillRef, setRedPillRef] = useState<React.RefObject<HTMLElement | null> | null>(null);

  const registerRedPill = (ref: React.RefObject<HTMLElement | null>) => {
    setRedPillRef(ref);
  };

  const unregisterRedPill = () => {
    setRedPillRef(null);
  };

  return (
    <PillContext.Provider value={{ redPillRef, registerRedPill, unregisterRedPill }}>
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

