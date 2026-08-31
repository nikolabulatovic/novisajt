const warmed = new Set<string>();

/** Fire-and-forget: cache a static public image URL in the browser. */
export function warmStageImage(src: string | undefined): void {
  if (!src || typeof window === 'undefined') return;
  if (warmed.has(src)) return;
  warmed.add(src);
  const img = new window.Image();
  img.decoding = 'async';
  img.src = src;
}
