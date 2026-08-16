import type {
  StoryStageSurfaceFrame,
  StoryStageTextPadding,
  StoryStageTextTone,
} from '@/src/lib/story/stageUiConfig';

/** Global fade-in for `TextBackdrop` on mount (ms). */
export const TEXT_BACKDROP_APPEAR_MS = 2000;

export type StoryStageTextSize = 'sm' | 'md' | 'lg' | 'xl';

/** Same scale as {@link AnimatedText} body copy. */
export const STORY_STAGE_TEXT_SIZE_CLASS: Record<StoryStageTextSize, string> = {
  sm: 'text-base sm:text-lg md:text-xl lg:text-2xl',
  md: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  lg: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  xl: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
};

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

export const STORY_STAGE_TEXT_TONE_CLASS: Record<StoryStageTextTone, string> = {
  light: '',
  dark: 'text-gray-900',
};
