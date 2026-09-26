/**
 * Apply `nav` / `anim` / `test` query flags once per page load.
 * Must run atomically so concurrent hooks don't strip params before others read them.
 */
import {
  DEV_NAV_QUERY_PARAM,
  isDevNavQueryDisabled,
  isDevNavQueryEnabled,
  readDevNavSessionFlag,
  writeDevNavSessionFlag,
} from '@/src/lib/devNavAccess';
import { stripQueryParamsFromUrl } from '@/src/lib/devQueryParams';
import {
  DEV_TEST_QUERY_PARAM,
  isDevTestQueryDisabled,
  isDevTestQueryEnabled,
} from '@/src/lib/devTestAccess';
import {
  STORY_PACING_QUERY_PARAM,
  isSkipStoryPacingQueryDisabled,
  isSkipStoryPacingQueryEnabled,
  readSkipStoryPacingSessionFlag,
  writeSkipStoryPacingSessionFlag,
} from '@/src/lib/storyPacingAccess';

export type DevAccessFlags = {
  showNav: boolean;
  skipPacing: boolean;
};

let cached: DevAccessFlags | null = null;

/** Clears the per-load cache (tests only). */
export function resetDevAccessCacheForTests(): void {
  cached = null;
}

/**
 * Read session + URL, persist flags, strip applied query params.
 * Safe to call from multiple hooks; only the first call per load does work.
 */
export function applyDevAccessFromUrl(): DevAccessFlags {
  if (cached) return cached;
  if (typeof window === 'undefined') {
    return { showNav: false, skipPacing: false };
  }

  const params = new URLSearchParams(window.location.search);
  let showNav = readDevNavSessionFlag();
  let skipPacing = readSkipStoryPacingSessionFlag();
  const toStrip: string[] = [];

  // Combo first; `nav` / `anim` below can still override.
  if (isDevTestQueryEnabled(params)) {
    showNav = true;
    skipPacing = true;
    writeDevNavSessionFlag(true);
    writeSkipStoryPacingSessionFlag(true);
    toStrip.push(DEV_TEST_QUERY_PARAM);
  } else if (isDevTestQueryDisabled(params)) {
    showNav = false;
    skipPacing = false;
    writeDevNavSessionFlag(false);
    writeSkipStoryPacingSessionFlag(false);
    toStrip.push(DEV_TEST_QUERY_PARAM);
  }

  if (isDevNavQueryDisabled(params)) {
    showNav = false;
    writeDevNavSessionFlag(false);
    toStrip.push(DEV_NAV_QUERY_PARAM);
  } else if (isDevNavQueryEnabled(params)) {
    showNav = true;
    writeDevNavSessionFlag(true);
    toStrip.push(DEV_NAV_QUERY_PARAM);
  }

  if (isSkipStoryPacingQueryEnabled(params)) {
    skipPacing = true;
    writeSkipStoryPacingSessionFlag(true);
    toStrip.push(STORY_PACING_QUERY_PARAM);
  } else if (isSkipStoryPacingQueryDisabled(params)) {
    skipPacing = false;
    writeSkipStoryPacingSessionFlag(false);
    toStrip.push(STORY_PACING_QUERY_PARAM);
  }

  stripQueryParamsFromUrl(toStrip);
  cached = { showNav, skipPacing };
  return cached;
}
