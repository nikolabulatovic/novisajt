import BackgroundImage from '@/src/components/ui/BackgroundImage';
import type { PillTransitionSceneProps } from '@/src/lib/pillTransition/types';

/** Next-stage wash + image + gradients + color overlay (technique-agnostic). */
export default function PillTransitionScene({
  backgroundWash,
  backgroundImage,
  backgroundPosition,
  backgroundOpacity,
  gradientOverlayClasses,
  overlayColor,
  expansionProgress,
}: PillTransitionSceneProps) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: backgroundWash }}
      />
      {backgroundImage ? (
        <BackgroundImage
          src={backgroundImage}
          opacity={backgroundOpacity}
          position={backgroundPosition}
        />
      ) : null}
      {gradientOverlayClasses.map((cls, i) => (
        <div key={i} className={cls} />
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: 1 - expansionProgress,
        }}
      />
    </div>
  );
}
