export interface PillOrigin {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function pillOriginFromRect(rect: DOMRect): PillOrigin {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/** Centered fallback when a pill transition runs without a measured origin. */
export function fallbackPillOrigin(): PillOrigin {
  const width = 160;
  const height = 80;
  return {
    left: Math.max(0, window.innerWidth / 2 - width / 2),
    top: Math.max(0, window.innerHeight / 2 - height / 2),
    width,
    height,
  };
}
