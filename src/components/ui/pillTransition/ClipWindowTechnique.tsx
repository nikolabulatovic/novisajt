import PillTransitionScene from '@/src/components/ui/pillTransition/PillTransitionScene';
import type { PillTransitionTechniqueProps } from '@/src/lib/pillTransition/types';

/**
 * Reveal via an expanding rounded `overflow: hidden` window.
 * Inner scene is full-viewport and offset so the crop tracks the pill.
 * Avoids CSS `mask-image: url(#svg)` — more reliable on older iOS WebKit.
 */
export default function ClipWindowTechnique({
  maskStyle,
  scene,
}: PillTransitionTechniqueProps) {
  const left = parseFloat(maskStyle.left);
  const top = parseFloat(maskStyle.top);
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: maskStyle.left,
        top: maskStyle.top,
        width: maskStyle.width,
        height: maskStyle.height,
        borderRadius: maskStyle.borderRadius,
      }}
    >
      <div
        className="absolute"
        style={{
          left: -left,
          top: -top,
          width: viewportWidth,
          height: viewportHeight,
        }}
      >
        <PillTransitionScene {...scene} />
      </div>
    </div>
  );
}
