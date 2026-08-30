import type { PillTransitionTechniqueId } from '@/src/lib/pillTransition/types';

/** `?pillTechnique=svg-mask` | `?pillTechnique=clip-window` forces a technique. */
export const PILL_TECHNIQUE_QUERY_PARAM = 'pillTechnique';

/** `sessionStorage` key — set in DevTools, then reload (query param still wins). */
export const PILL_TECHNIQUE_STORAGE_KEY = 'saznaj.pillTechnique';

const TECHNIQUE_IDS: readonly PillTransitionTechniqueId[] = [
  'svg-mask',
  'clip-window',
];

function isTechniqueId(value: string): value is PillTransitionTechniqueId {
  return (TECHNIQUE_IDS as readonly string[]).includes(value);
}

function readQueryOverride(): PillTransitionTechniqueId | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = new URLSearchParams(window.location.search).get(
      PILL_TECHNIQUE_QUERY_PARAM,
    );
    if (raw && isTechniqueId(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

function readStorageOverride(): PillTransitionTechniqueId | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(PILL_TECHNIQUE_STORAGE_KEY);
    if (raw && isTechniqueId(raw)) return raw;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

function isAppleTouchDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return true;
  // iPadOS desktop UA
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

/** Major iOS / iPadOS version from the UA, or null if unknown. */
export function readIosMajorVersion(): number | null {
  if (typeof navigator === 'undefined') return null;
  const fromOs = navigator.userAgent.match(/OS (\d+)[._]/);
  if (fromOs) return Number(fromOs[1]);
  // Newer iPadOS sometimes only exposes Version/x.y like Safari desktop.
  if (isAppleTouchDevice()) {
    const fromVersion = navigator.userAgent.match(/Version\/(\d+)/);
    if (fromVersion) return Number(fromVersion[1]);
  }
  return null;
}

/**
 * Override anytime with `?pillTechnique=clip-window` or `svg-mask`
 * (or `sessionStorage` key {@link PILL_TECHNIQUE_STORAGE_KEY}).
 *
 * Engine heuristic (older iOS WebKit → clip) is kept for later; for now every
 * non-override path defaults to `clip-window`.
 */
export function selectPillTransitionTechnique(): PillTransitionTechniqueId {
  const override = readQueryOverride() ?? readStorageOverride();
  if (override) return override;

  if (isAppleTouchDevice()) {
    const major = readIosMajorVersion();
    if (major !== null && major < 17) return 'clip-window';
  }

  return 'clip-window';
}
