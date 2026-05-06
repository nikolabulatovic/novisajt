'use client';

import { ReactNode } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import {
  STORY_STAGE_SURFACE_FRAME_CLASS,
  STORY_STAGE_TEXT_PADDING_CLASS,
} from '../../constants/storyStageTokens';
import ContentContainer from './ContentContainer';
import PageContainer from './PageContainer';
import StageTextSurface from './StageTextSurface';

export interface StoryStageChromeProps {
  stage: Stage;
  /** Rendered inside `StageTextSurface`. */
  textSurfaceContent: ReactNode;
  /** Rendered below the text surface, still inside `ContentContainer` (e.g. footer, advance control). */
  belowSurface?: ReactNode;
}

/**
 * Shared shell: stage background + column + text chrome. Used by `StoryStage` and `StoryStageNarrativeTwoBeat`.
 */
export default function StoryStageChrome({
  stage,
  textSurfaceContent,
  belowSurface,
}: StoryStageChromeProps) {
  const cfg = stageConfig[stage];
  const storyDefaults = cfg.additionalUiConfig ?? {};
  const backgroundImage = cfg.backgroundImage;
  const backgroundImageOpacity = cfg.opacity ?? 0.8;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      maxWidth={storyDefaults.maxWidth ?? 'md'}
      showBackgroundEffects={cfg.showBackgroundEffects ?? false}
    >
      <ContentContainer
        spacing={storyDefaults.contentSpacing ?? 'lg'}
        align={storyDefaults.contentAlign ?? 'center'}
      >
        <StageTextSurface
          stage={stage}
          surface={cfg.textSurface}
          glassVariant={cfg.glassVariant}
          className={
            STORY_STAGE_SURFACE_FRAME_CLASS[
              storyDefaults.textSurfaceFrame ?? 'default'
            ]
          }
          contentClassName={
            STORY_STAGE_TEXT_PADDING_CLASS[
              storyDefaults.textPadding ?? 'default'
            ]
          }
          backdropType={storyDefaults.backdropType}
          backdropOpacity={storyDefaults.backdropOpacity}
        >
          {textSurfaceContent}
        </StageTextSurface>
        {belowSurface}
      </ContentContainer>
    </PageContainer>
  );
}
