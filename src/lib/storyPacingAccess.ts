/**
 * Story text/answer pacing (word animation, delayed reveals).
 * Independent of stage nav: `?anim=0` skips pacing; `?anim=1` restores it.
 */
import {
  isQueryFalsy,
  isQueryTruthy,
  readQueryParam,
} from '@/src/lib/devQueryParams';

export const STORY_PACING_QUERY_PARAM = 'anim';
export const STORY_PACING_STORAGE_KEY = 'saznaj.skipStoryPacing';

/** `?anim=0` — skip text/answer pacing for this tab. */
export function isSkipStoryPacingQueryEnabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readQueryParam(params, STORY_PACING_QUERY_PARAM);
  if (raw == null) return false;
  return isQueryFalsy(raw);
}

/** `?anim=1` — restore normal pacing (clears a prior skip). */
export function isSkipStoryPacingQueryDisabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readQueryParam(params, STORY_PACING_QUERY_PARAM);
  if (raw == null) return false;
  return isQueryTruthy(raw);
}

export function readSkipStoryPacingSessionFlag(): boolean {
  try {
    return sessionStorage.getItem(STORY_PACING_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function writeSkipStoryPacingSessionFlag(skip: boolean): void {
  try {
    if (skip) {
      sessionStorage.setItem(STORY_PACING_STORAGE_KEY, '1');
    } else {
      sessionStorage.removeItem(STORY_PACING_STORAGE_KEY);
    }
  } catch {
    /* private mode / blocked storage */
  }
}
