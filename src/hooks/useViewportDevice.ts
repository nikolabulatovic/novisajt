'use client';

import { useSyncExternalStore } from 'react';

import {
  VIEWPORT_LG_MIN_PX,
  VIEWPORT_MD_MIN_PX,
  type ViewportDevice,
  readViewportDevice,
} from '@/src/lib/viewportDevice';

const SERVER_VIEWPORT_DEVICE: ViewportDevice = 'desktop';

function subscribe(onStoreChange: () => void) {
  const md = window.matchMedia(`(min-width: ${VIEWPORT_MD_MIN_PX}px)`);
  const lg = window.matchMedia(`(min-width: ${VIEWPORT_LG_MIN_PX}px)`);
  md.addEventListener('change', onStoreChange);
  lg.addEventListener('change', onStoreChange);
  return () => {
    md.removeEventListener('change', onStoreChange);
    lg.removeEventListener('change', onStoreChange);
  };
}

/** Current layout bucket: mobile < 768px, tablet 768–1023px, desktop ≥ 1024px. */
export function useViewportDevice(): ViewportDevice {
  return useSyncExternalStore(
    subscribe,
    readViewportDevice,
    () => SERVER_VIEWPORT_DEVICE,
  );
}
