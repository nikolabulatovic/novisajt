'use client';

import { ReactNode } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import StoryStageChrome from './StoryStageChrome';
import StoryStageNarrativeTwoBeat from './StoryStageNarrativeTwoBeat';

export interface StoryStageProps {
  stage: Stage;
  /** Narrative body — always wrapped in `StageTextSurface` for this stage. Ignored when `stageConfig[stage].narrativeTwoBeat` is set. */
  children?: ReactNode;
  /** CTAs / pills / answer rows — below the text chrome, still inside `ContentContainer`. Shown after beat 2 animation when `narrativeTwoBeat` is set. */
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

  if (cfg.narrativeTwoBeat) {
    return (
      <StoryStageNarrativeTwoBeat
        stage={stage}
        narrativeTwoBeat={cfg.narrativeTwoBeat}
        footer={footer}
      />
    );
  }

  return (
    <StoryStageChrome
      stage={stage}
      textSurfaceContent={children ?? null}
      belowSurface={footer}
    />
  );
}
