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
    <>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: backgroundWash }}
      />
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundPosition,
            opacity: backgroundOpacity,
          }}
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
    </>
  );
}
