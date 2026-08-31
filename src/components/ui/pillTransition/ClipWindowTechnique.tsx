import BackgroundImage from '@/src/components/ui/BackgroundImage';
import type { PillTransitionTechniqueProps } from '@/src/lib/pillTransition/types';

/**
 * Expanding rounded window that reveals a full-viewport stage backdrop.
 *
 * Outer box grows from the pill; inner layer is viewport-sized and offset so
 * the crop tracks the reveal. Uses the same {@link BackgroundImage} as the
 * real stage (`object-cover` + resolved position) so the handoff does not snap.
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
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backgroundColor: scene.backgroundWash,
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
        <div
          className="absolute inset-0"
          style={{ backgroundColor: scene.backgroundWash }}
        />
        {scene.backgroundImage ? (
          <BackgroundImage
            src={scene.backgroundImage}
            opacity={scene.backgroundOpacity}
            position={scene.backgroundPosition}
          />
        ) : null}
        {scene.gradientOverlayClasses.map((cls, i) => (
          <div key={i} className={cls} />
        ))}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: scene.overlayColor,
            opacity: 1 - scene.expansionProgress,
          }}
        />
      </div>
    </div>
  );
}
