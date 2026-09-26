'use client';

import { useEffect, useState } from 'react';

import { applyDevAccessFromUrl } from '@/src/lib/applyDevAccessFromUrl';

/**
 * Whether story motion should cut instantly: text/answer pacing, answer exits,
 * and stage leaves (pill / shell crossfade / black overlay).
 * Enable with `?anim=0` (persists for this tab); restore with `?anim=1`.
 * `?test=1` also skips pacing (and shows stage nav — see {@link useDevNavAccess}).
 */
export function useSkipStoryPacing(): boolean {
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setSkip(applyDevAccessFromUrl().skipPacing);
  }, []);

  return skip;
}
