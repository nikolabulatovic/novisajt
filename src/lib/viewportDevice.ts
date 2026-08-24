/** Tailwind `md` / `lg` (default theme). Mobile < md, tablet md–lg, desktop ≥ lg. */
export const VIEWPORT_MD_MIN_PX = 768;
export const VIEWPORT_LG_MIN_PX = 1024;

export type ViewportDevice = 'mobile' | 'tablet' | 'desktop';

/** Path, or `default` plus optional per-bucket overrides. Missing buckets use `default`. */
export type DeviceSizedPath =
  | string
  | {
      default: string;
      mobile?: string;
      tablet?: string;
    };

export function viewportDeviceFromWidth(width: number): ViewportDevice {
  if (width < VIEWPORT_MD_MIN_PX) return 'mobile';
  if (width < VIEWPORT_LG_MIN_PX) return 'tablet';
  return 'desktop';
}

export function readViewportDevice(): ViewportDevice {
  return viewportDeviceFromWidth(window.innerWidth);
}

export function resolveDeviceSizedPath(
  value: DeviceSizedPath,
  device: ViewportDevice,
): string {
  if (typeof value === 'string') return value;
  if (device === 'mobile' && value.mobile) return value.mobile;
  if (device === 'tablet' && value.tablet) return value.tablet;
  return value.default;
}
