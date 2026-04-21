'use client';

import { ReactNode } from 'react';

import { type StageTextSurfaceMode, stageConfig } from '@/config/stageConfig';
import type { Stage } from '@/contexts/NavigationContext';

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
    const outer =
      contentClassName.length > 0 ? `relative ${contentClassName}` : 'relative';
    return (
      <div className={outer}>
        <TextBackdrop type={backdropType} opacity={opacity} />
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
