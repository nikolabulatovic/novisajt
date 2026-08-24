'use client';

import { useMemo } from 'react';

import { useStoryGender } from '@/src/hooks/useGenderedTranslations';
import { useViewportDevice } from '@/src/hooks/useViewportDevice';
import type { GenderedContent } from '@/src/lib/gender';
import { resolveBackgroundImage } from '@/src/lib/story/stageUiConfig';
import type { DeviceSizedPath } from '@/src/lib/viewportDevice';

/** Stage background path for the current story gender and viewport. */
export function useResolvedBackgroundImage(
  backgroundImage: GenderedContent<DeviceSizedPath> | undefined,
): string | undefined {
  const gender = useStoryGender();
  const device = useViewportDevice();
  return useMemo(
    () => resolveBackgroundImage(backgroundImage, gender, device),
    [backgroundImage, gender, device],
  );
}
