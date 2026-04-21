'use client';

import { ReactNode } from 'react';

import { stageConfig } from '@/config/stageConfig';
import type { Stage } from '@/contexts/NavigationContext';

import ContentContainer from './ContentContainer';
import PageContainer from './PageContainer';
import StageTextSurface from './StageTextSurface';

export interface StoryStageProps {
  stage: Stage;
  /** Narrative body — always wrapped in `StageTextSurface` for this stage. */
  children: ReactNode;
  /** CTAs / pills / answer rows — below the text chrome, still inside `ContentContainer`. */
  footer?: ReactNode;
}

/**
 * One shell for the common flow: full-page stage image + centered column + config-driven
 * text surface (`backdrop` | `panel` | `none` from `stagePresentation[stage]`) + optional footer.
 */
export default function StoryStage({
  stage,
  children,
  footer,
}: StoryStageProps) {
  const cfg = stageConfig[stage];
  const storyDefaults = cfg.storyStage ?? {};

  const backgroundImage = cfg.backgroundImage;
  const backgroundImageOpacity = cfg.opacity ?? 0.8;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      maxWidth={storyDefaults.maxWidth ?? 'md'}
      showBackgroundEffects={storyDefaults.showBackgroundEffects ?? true}
      className={storyDefaults.pageClassName ?? ''}
    >
      <ContentContainer
        spacing={storyDefaults.contentSpacing ?? 'lg'}
        align={storyDefaults.contentAlign ?? 'center'}
        className={storyDefaults.contentContainerClassName ?? ''}
      >
        <StageTextSurface
          stage={stage}
          surface={storyDefaults.surface}
          glassVariant={cfg.glassVariant}
          className={storyDefaults.textSurfaceClassName ?? ''}
          contentClassName={
            storyDefaults.textContentClassName ?? 'relative p-6 md:p-16'
          }
          backdropType={storyDefaults.backdropType}
          backdropOpacity={storyDefaults.backdropOpacity}
        >
          {children}
        </StageTextSurface>
        {footer}
      </ContentContainer>
    </PageContainer>
  );
}
