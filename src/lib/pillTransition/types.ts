import type { MaskStyle } from '@/src/hooks/useMaskExpansion';

/** Reveal strategies for the pill expand transition. */
export type PillTransitionTechniqueId = 'svg-mask' | 'clip-window';

/** Shared next-stage composite drawn inside the expanding reveal. */
export interface PillTransitionSceneProps {
  backgroundWash: string;
  backgroundImage?: string;
  backgroundPosition: string;
  backgroundOpacity: number;
  gradientOverlayClasses: string[];
  overlayColor: 'black' | 'white';
  /** 0 at start → 1 at full expand; overlay fades out with this. */
  expansionProgress: number;
}

export interface PillTransitionTechniqueProps {
  maskStyle: MaskStyle;
  scene: PillTransitionSceneProps;
}
