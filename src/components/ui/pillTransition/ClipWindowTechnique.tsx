import type { PillTransitionTechniqueProps } from '@/src/lib/pillTransition/types';

/**
 * Expanding rounded rect that paints the next-stage scene as its own
 * background (viewport-sized `background-size`, offset with
 * `background-position`).
 *
 * Important for iOS WebKit: do **not** mount a full-viewport child under
 * `overflow: hidden` / `clip-path`. Those often fail to clip there, so the
 * next-stage black wash covers the whole screen. Everything here stays
 * within the expanding box’s border box.
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
    typeof window !== 'undefined' ? window.innerWidth : Math.max(width, 1);
  const viewportHeight =
    typeof window !== 'undefined' ? window.innerHeight : Math.max(height, 1);

  const sceneBackgroundSize = `${viewportWidth}px ${viewportHeight}px`;
  const sceneBackgroundPosition = `${-left}px ${-top}px`;

  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        width,
        height,
        borderRadius: radius,
        overflow: 'hidden',
        // Force a compositing layer so overflow + radius clip reliably on iOS.
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backgroundColor: scene.backgroundWash,
      }}
    >
      {scene.backgroundImage ? (
        <div
          className="absolute inset-0"
          style={{
            borderRadius: radius,
            backgroundImage: `url('${scene.backgroundImage}')`,
            backgroundSize: sceneBackgroundSize,
            backgroundPosition: sceneBackgroundPosition,
            backgroundRepeat: 'no-repeat',
            opacity: scene.backgroundOpacity,
          }}
        />
      ) : null}

      {scene.gradientOverlayClasses.map((cls, i) => (
        <div key={i} className={cls} />
      ))}

      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          backgroundColor: scene.overlayColor,
          opacity: 1 - scene.expansionProgress,
        }}
      />
    </div>
  );
}
