import type {
  StoryStageSurfaceFrame,
  StoryStageTextPadding,
} from '@/src/lib/story/stageUiConfig';

/** Global fade-in for `TextBackdrop` on mount (ms). */
export const TEXT_BACKDROP_APPEAR_MS = 2000;

export const STORY_STAGE_TEXT_PADDING_CLASS: Record<
  StoryStageTextPadding,
  string
> = {
  default: 'relative p-6',
  intro: 'p-8 md:p-12',
  explanation: 'px-4 py-4 md:px-6 md:py-6',
};

export const STORY_STAGE_SURFACE_FRAME_CLASS: Record<
  StoryStageSurfaceFrame,
  string
> = {
  default: '',
  'inset-compact': 'mx-1 sm:mx-2',
};
