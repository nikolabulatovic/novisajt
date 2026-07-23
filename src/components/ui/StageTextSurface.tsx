'use client';

import { ReactNode } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import {
  type StageTextSurfaceMode,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';

import GlassPanel, { GlassPanelVariant } from './GlassPanel';
import TextBackdrop, { TextBackdropGradientType } from './TextBackdrop';

export type { StageTextSurfaceMode };

export interface StageTextSurfaceProps {
  /**
   * When set, `textSurface` / `glassVariant` fall back to `stagePresentation[stage]`
   * unless overridden by props below.
   */
  stage?: Stage;
  /** Overrides `stagePresentation[stage].textSurface`. */
  surface?: StageTextSurfaceMode;
  /** Overrides `stagePresentation[stage].glassVariant` (only used when surface is `panel`). */
  glassVariant?: GlassPanelVariant;
  className?: string;
  contentClassName?: string;
  backdropType?: TextBackdropGradientType;
  backdropOpacity?: number;
  backdropFade?: number;
  backdropColor?: string;
  children: ReactNode;
}

/**
 * Renders story text on either a gradient backdrop, a frosted `GlassPanel`, or plain content —
 * driven by `stagePresentation[stage].textSurface` (default `panel`) or explicit props.
 */
export default function StageTextSurface({
  stage,
  surface: surfaceProp,
  glassVariant: glassVariantProp,
  className = '',
  contentClassName = '',
  backdropType = 'linear',
  backdropOpacity,
  backdropFade,
  backdropColor,
  children,
}: StageTextSurfaceProps) {
  const cfg = stage != null ? stageConfig[stage] : undefined;
  const surface: StageTextSurfaceMode =
    surfaceProp ?? cfg?.textSurface ?? 'none';
  const glassVariant: GlassPanelVariant =
    glassVariantProp ?? cfg?.glassVariant ?? 'dark';

  if (surface === 'none') {
    return <div className={contentClassName}>{children}</div>;
  }

  if (surface === 'backdrop') {
    const opacity = backdropOpacity ?? 0.65;
    return (
      <div className={contentClassName}>
        <TextBackdrop
          type={backdropType}
          opacity={opacity}
          fade={backdropFade}
          color={backdropColor}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <GlassPanel
      variant={glassVariant}
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </GlassPanel>
  );
}
