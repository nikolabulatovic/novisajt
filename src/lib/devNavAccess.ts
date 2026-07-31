/** Hidden stage nav for people in the know — not shown to normal visitors. */

export const DEV_NAV_QUERY_PARAM = 'nav';
/** Accept `?nav=1` / `?nav=true` / `?nav=yes`, or a custom token from env. */
export const DEV_NAV_QUERY_TRUTHY = new Set(['1', 'true', 'yes']);
/** Explicitly turn off (and clear session): `?nav=0` / `false` / `no` / `off`. */
export const DEV_NAV_QUERY_FALSY = new Set(['0', 'false', 'no', 'off']);
export const DEV_NAV_STORAGE_KEY = 'saznaj.devNav';
/** Locale path segment that unlocks the menu, e.g. `/preview` or `/en/preview`. */
export const DEV_NAV_PATH_SEGMENT = 'preview';

export function getDevNavQuerySecret(): string | null {
  const secret = process.env.NEXT_PUBLIC_DEV_NAV_SECRET;
  return secret && secret.length > 0 ? secret : null;
}

function readNavParam(
  params: URLSearchParams | { get(name: string): string | null },
): string | null {
  const raw = params.get(DEV_NAV_QUERY_PARAM);
  if (raw == null || raw === '') return null;
  return raw;
}

/** `?nav=0` (etc.) — clears a prior unlock for this tab. */
export function isDevNavQueryDisabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readNavParam(params);
  if (raw == null) return false;
  return DEV_NAV_QUERY_FALSY.has(raw.toLowerCase());
}

export function isDevNavQueryEnabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readNavParam(params);
  if (raw == null) return false;
  if (DEV_NAV_QUERY_FALSY.has(raw.toLowerCase())) return false;

  const secret = getDevNavQuerySecret();
  if (secret) return raw === secret;

  return DEV_NAV_QUERY_TRUTHY.has(raw.toLowerCase());
}

/** True when the pathname ends with `/preview` (optional locale prefix). */
export function isDevNavPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return (
    normalized === `/${DEV_NAV_PATH_SEGMENT}` ||
    normalized.endsWith(`/${DEV_NAV_PATH_SEGMENT}`)
  );
}

export function readDevNavSessionFlag(): boolean {
  try {
    return sessionStorage.getItem(DEV_NAV_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function writeDevNavSessionFlag(enabled: boolean): void {
  try {
    if (enabled) {
      sessionStorage.setItem(DEV_NAV_STORAGE_KEY, '1');
    } else {
      sessionStorage.removeItem(DEV_NAV_STORAGE_KEY);
    }
  } catch {
    /* private mode / blocked storage */
  }
}

/** Drop `nav` from the address bar after unlocking so shared URLs stay clean. */
export function stripDevNavQueryFromUrl(): void {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(DEV_NAV_QUERY_PARAM)) return;
  url.searchParams.delete(DEV_NAV_QUERY_PARAM);
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, '', next);
}
