'use client';

import { useEffect, useState } from 'react';

import {
  isDevNavQueryDisabled,
  isDevNavQueryEnabled,
  readDevNavSessionFlag,
  stripDevNavQueryFromUrl,
  writeDevNavSessionFlag,
} from '@/src/lib/devNavAccess';

/**
 * Whether the stage {@link NavigationMenu} should render.
 * Unlocks via `?nav=1` (or `NEXT_PUBLIC_DEV_NAV_SECRET`), then stays for this tab.
 * Turn off with `?nav=0` (also clears the session flag).
 */
export function useDevNavAccess(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (isDevNavQueryDisabled(params)) {
      writeDevNavSessionFlag(false);
      stripDevNavQueryFromUrl();
      setEnabled(false);
      return;
    }

    if (isDevNavQueryEnabled(params)) {
      writeDevNavSessionFlag(true);
      stripDevNavQueryFromUrl();
      setEnabled(true);
      return;
    }

    setEnabled(readDevNavSessionFlag());
  }, []);

  return enabled;
}
