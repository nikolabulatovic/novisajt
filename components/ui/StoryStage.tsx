'use client';

import { ReactNode } from 'react';

import {
  type StageTextSurfaceMode,
  sectionBackgrounds,
} from '@/config/sectionBackgrounds';
import type { Stage } from '@/contexts/NavigationContext';

import ContentContainer from './ContentContainer';
import type { GlassPanelVariant } from './GlassPanel';
import PageContainer from './PageContainer';
import StageTextSurface from './StageTextSurface';
import type { TextBackdropGradientType } from './TextBackdrop';

export interface StoryStageProps {
  stage: Stage;
  /** Passed to `PageContainer` (defaults from `sectionBackgrounds[stage]`). */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  showBackgroundEffects?: boolean;
  pageClassName?: string;
  /** Overrides config background when you need a one-off image. */
  backgroundImage?: string;
  /** Overrides config opacity. */
  backgroundImageOpacity?: number;
  /** `ContentContainer` */
  contentSpacing?: 'sm' | 'md' | 'lg';
  contentAlign?: 'left' | 'center' | 'right';
  contentContainerClassName?: string;
  /** Passed to `StageTextSurface` as `contentClassName` (padding around text). */
  textContentClassName?: string;
  /** Passed to `StageTextSurface` as `className` (e.g. horizontal margin on the glass shell). */
  textSurfaceClassName?: string;
  surface?: StageTextSurfaceMode;
  glassVariant?: GlassPanelVariant;
  backdropType?: TextBackdropGradientType;
  backdropOpacity?: number;
  /** Narrative body — always wrapped in `StageTextSurface` for this stage. */
  children: ReactNode;
  /** CTAs / pills / answer rows — below the text chrome, still inside `ContentContainer`. */
  footer?: ReactNode;
}

/**
 * One shell for the common flow: full-page stage image + centered column + config-driven
 * text surface (`backdrop` | `panel` | `none` from `sectionBackgrounds[stage]`) + optional footer.
 */
export default function StoryStage({
  stage,
  maxWidth,
  showBackgroundEffects = true,
  pageClassName = '',
  backgroundImage: backgroundImageProp,
  backgroundImageOpacity: backgroundImageOpacityProp,
  contentSpacing = 'lg',
  contentAlign = 'center',
  contentContainerClassName = '',
  textContentClassName = '',
  textSurfaceClassName = '',
  surface,
  glassVariant,
  backdropType,
  backdropOpacity,
  children,
  footer,
}: StoryStageProps) {
  const cfg = sectionBackgrounds[stage];
  const backgroundImage = backgroundImageProp ?? cfg.backgroundImage;
  const backgroundImageOpacity =
    backgroundImageOpacityProp ?? cfg.opacity ?? 0.8;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      maxWidth={maxWidth ?? 'md'}
      showBackgroundEffects={showBackgroundEffects}
      className={pageClassName}
    >
      <ContentContainer
        spacing={contentSpacing}
        align={contentAlign}
        className={contentContainerClassName}
      >
        <StageTextSurface
          stage={stage}
          surface={surface}
          glassVariant={glassVariant}
          className={textSurfaceClassName}
          contentClassName={textContentClassName}
          backdropType={backdropType}
          backdropOpacity={backdropOpacity}
        >
          {children}
        </StageTextSurface>
        {footer}
      </ContentContainer>
    </PageContainer>
  );
}
