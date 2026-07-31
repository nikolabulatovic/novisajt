'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import {
  isDevNavPath,
  isDevNavQueryDisabled,
  isDevNavQueryEnabled,
  readDevNavSessionFlag,
  stripDevNavQueryFromUrl,
  writeDevNavSessionFlag,
} from '@/src/lib/devNavAccess';

/**
 * Whether the stage {@link NavigationMenu} should render.
 * Unlocks via `?nav=1` (or `NEXT_PUBLIC_DEV_NAV_SECRET`), `/preview`, or a prior unlock in this tab.
 * Turn off with `?nav=0` (also clears the session flag).
 */
export function useDevNavAccess(): boolean {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (isDevNavQueryDisabled(params)) {
      writeDevNavSessionFlag(false);
      stripDevNavQueryFromUrl();
      setEnabled(false);
      return;
    }

    const fromQuery = isDevNavQueryEnabled(params);
    const fromPath = isDevNavPath(pathname);

    if (fromQuery || fromPath) {
      writeDevNavSessionFlag(true);
      if (fromQuery) stripDevNavQueryFromUrl();
      setEnabled(true);
      return;
    }

    setEnabled(readDevNavSessionFlag());
  }, [pathname]);

  return enabled;
}
