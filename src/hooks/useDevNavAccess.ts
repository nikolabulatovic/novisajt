'use client';

import { useEffect, useState } from 'react';

import { applyDevAccessFromUrl } from '@/src/lib/applyDevAccessFromUrl';

/**
 * Whether the stage {@link NavigationMenu} should render.
 * Unlocks via `?nav=1` (or `NEXT_PUBLIC_DEV_NAV_SECRET`), then stays for this tab.
 * Turn off with `?nav=0` (also clears the session flag).
 * `?test=1` also unlocks nav (and skips story pacing — see {@link useSkipStoryPacing}).
 */
export function useDevNavAccess(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(applyDevAccessFromUrl().showNav);
  }, []);

  return enabled;
}
