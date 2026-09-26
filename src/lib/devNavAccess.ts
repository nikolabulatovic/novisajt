/** Hidden stage nav for people in the know — not shown to normal visitors. */
import {
  isQueryFalsy,
  isQueryTruthy,
  readQueryParam,
  stripQueryParamsFromUrl,
} from '@/src/lib/devQueryParams';

export const DEV_NAV_QUERY_PARAM = 'nav';
export const DEV_NAV_STORAGE_KEY = 'saznaj.devNav';

export function getDevNavQuerySecret(): string | null {
  const secret = process.env.NEXT_PUBLIC_DEV_NAV_SECRET;
  return secret && secret.length > 0 ? secret : null;
}

/** `?nav=0` (etc.) — clears a prior unlock for this tab. */
export function isDevNavQueryDisabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readQueryParam(params, DEV_NAV_QUERY_PARAM);
  if (raw == null) return false;
  return isQueryFalsy(raw);
}

export function isDevNavQueryEnabled(
  params: URLSearchParams | { get(name: string): string | null },
): boolean {
  const raw = readQueryParam(params, DEV_NAV_QUERY_PARAM);
  if (raw == null) return false;
  if (isQueryFalsy(raw)) return false;

  const secret = getDevNavQuerySecret();
  if (secret) return raw === secret;

  return isQueryTruthy(raw);
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
  stripQueryParamsFromUrl([DEV_NAV_QUERY_PARAM]);
}
