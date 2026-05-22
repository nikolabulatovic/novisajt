'use client';

import type { Stage } from '@/src/contexts/NavigationContext';

import StoryStageChrome from './StoryStageChrome';

export interface StoryStageProps {
  stage: Stage;
}

/**
 * One shell for the common flow: full-page stage image + centered column + config-driven
 * text surface (`backdrop` | `panel` | `none` from `stagePresentation[stage]`) + optional footer.
 */
export default function StoryStage({ stage }: StoryStageProps) {
  return (
    <div key={stage} className="min-h-screen w-full">
      <StoryStageChrome stage={stage} />
    </div>
  );
}
