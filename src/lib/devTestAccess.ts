/**
 * `?test=1` — convenience combo: show stage nav and skip story pacing.
 * Individual `nav` / `anim` params still override when present.
 */
import {
  isQueryFalsy,
  isQueryTruthy,
  readQueryParam,
} from '@/src/lib/devQueryParams';

export const DEV_TEST_QUERY_PARAM = 'test';

export function isDevTestQueryEnabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readQueryParam(params, DEV_TEST_QUERY_PARAM);
  if (raw == null) return false;
  return isQueryTruthy(raw);
}

/** `?test=0` — exit test mode (nav off, pacing restored). */
export function isDevTestQueryDisabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readQueryParam(params, DEV_TEST_QUERY_PARAM);
  if (raw == null) return false;
  return isQueryFalsy(raw);
}
