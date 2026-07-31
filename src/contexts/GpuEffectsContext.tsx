'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  type GpuEffectsTier,
  detectGpuEffectsTier,
} from '@/src/lib/gpuCapability';

interface GpuEffectsContextValue {
  /** `reduced` until client detection finishes, then the real tier. */
  tier: GpuEffectsTier;
  /** True when large `filter:blur` / `backdrop-filter` stacks are considered safe. */
  allowsHeavyEffects: boolean;
}

const GpuEffectsContext = createContext<GpuEffectsContextValue>({
  tier: 'reduced',
  allowsHeavyEffects: false,
});

export function GpuEffectsProvider({ children }: { children: ReactNode }) {
  // Start reduced so weak GPUs never briefly mount crashy blur layers.
  const [tier, setTier] = useState<GpuEffectsTier>('reduced');

  useEffect(() => {
    const next = detectGpuEffectsTier();
    setTier(next);
    document.documentElement.dataset.gpuEffects = next;
  }, []);

  const value = useMemo(
    () => ({
      tier,
      allowsHeavyEffects: tier === 'full',
    }),
    [tier],
  );

  return (
    <GpuEffectsContext.Provider value={value}>
      {children}
    </GpuEffectsContext.Provider>
  );
}

export function useGpuEffects(): GpuEffectsContextValue {
  return useContext(GpuEffectsContext);
}
