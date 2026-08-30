import PillTransitionScene from '@/src/components/ui/pillTransition/PillTransitionScene';
import type { PillTransitionTechniqueProps } from '@/src/lib/pillTransition/types';

/**
 * Reveal via CSS `clip-path: inset(... round ...)` on a full-viewport scene.
 *
 * Prefer this over `overflow: hidden` + an offset inner layer: mobile WebKit
 * often fails to clip a larger absolutely-positioned child, so the next-stage
 * black wash paints the entire screen (looks like the stage “goes black”).
 */
export default function ClipWindowTechnique({
  maskStyle,
  scene,
}: PillTransitionTechniqueProps) {
  const left = parseFloat(maskStyle.left) || 0;
  const top = parseFloat(maskStyle.top) || 0;
  const width = parseFloat(maskStyle.width) || 0;
  const height = parseFloat(maskStyle.height) || 0;
  const radius = parseFloat(maskStyle.borderRadius) || 0;

  const viewportWidth =
    typeof window !== 'undefined' ? window.innerWidth : width;
  const viewportHeight =
    typeof window !== 'undefined' ? window.innerHeight : height;

  const right = Math.max(0, viewportWidth - left - width);
  const bottom = Math.max(0, viewportHeight - top - height);
  const clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;

  return (
    <div
      className="absolute inset-0"
      style={{
        clipPath,
        WebkitClipPath: clipPath,
      }}
    >
      <PillTransitionScene {...scene} />
    </div>
  );
}
