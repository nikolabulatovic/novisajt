import PillTransitionScene from '@/src/components/ui/pillTransition/PillTransitionScene';
import type { PillTransitionTechniqueProps } from '@/src/lib/pillTransition/types';

const MASK_ID = 'pill-transition-mask';

/**
 * Reveal via CSS `mask-image` referencing an SVG `<mask>` rect.
 * Works on current desktop + newer iOS WebKit; unreliable on older iOS.
 */
export default function SvgMaskTechnique({
  maskStyle,
  scene,
}: PillTransitionTechniqueProps) {
  const widthValue = parseFloat(maskStyle.width);
  const heightValue = parseFloat(maskStyle.height);
  const borderRadiusValue = parseFloat(maskStyle.borderRadius);
  const leftValue = parseFloat(maskStyle.left);
  const topValue = parseFloat(maskStyle.top);

  return (
    <>
      <svg
        className="absolute"
        width="100%"
        height="100%"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id={MASK_ID}>
            <rect
              width={widthValue}
              height={heightValue}
              rx={borderRadiusValue}
              ry={borderRadiusValue}
              fill="white"
              x={leftValue}
              y={topValue}
            />
          </mask>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          maskImage: `url(#${MASK_ID})`,
          WebkitMaskImage: `url(#${MASK_ID})`,
        }}
      >
        <PillTransitionScene {...scene} />
      </div>
    </>
  );
}
