/** Shared query-flag helpers for hidden dev tools (`nav`, `anim`, `test`). */

export const DEV_QUERY_TRUTHY = new Set(['1', 'true', 'yes']);
export const DEV_QUERY_FALSY = new Set(['0', 'false', 'no', 'off']);

export function readQueryParam(
  params: URLSearchParams | { get(name: string): string | null },
  name: string,
): string | null {
  const raw = params.get(name);
  if (raw == null || raw === '') return null;
  return raw;
}

export function isQueryTruthy(raw: string): boolean {
  return DEV_QUERY_TRUTHY.has(raw.toLowerCase());
}

export function isQueryFalsy(raw: string): boolean {
  return DEV_QUERY_FALSY.has(raw.toLowerCase());
}

/** Drop listed params from the address bar after applying them. */
export function stripQueryParamsFromUrl(names: readonly string[]): void {
  if (typeof window === 'undefined' || names.length === 0) return;

  const url = new URL(window.location.href);
  let changed = false;
  for (const name of names) {
    if (!url.searchParams.has(name)) continue;
    url.searchParams.delete(name);
    changed = true;
  }
  if (!changed) return;

  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, '', next);
}
