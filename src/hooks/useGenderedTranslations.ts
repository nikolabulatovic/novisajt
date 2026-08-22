'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import {
  DEFAULT_USER_GENDER,
  type GenderedContent,
  type UserGender,
  resolveGenderedContent,
} from '@/src/lib/gender';
import { resolveBackgroundImage } from '@/src/lib/story/stageUiConfig';

/** Current story address gender (defaults to male until chosen). */
export function useStoryGender(): UserGender {
  return useStoryFlow().gender ?? DEFAULT_USER_GENDER;
}

/** Stage background path for the current story gender. */
export function useResolvedBackgroundImage(
  backgroundImage: GenderedContent<string> | undefined,
): string | undefined {
  const gender = useStoryGender();
  return useMemo(
    () => resolveBackgroundImage(backgroundImage, gender),
    [backgroundImage, gender],
  );
}

/**
 * next-intl helpers that apply story gender:
 * - `t`: inject `{ gender }` for ICU `{gender, select, …}` messages
 * - `raw` / `label`: resolve `{ male, female }` content shapes
 */
export function useGenderedTranslations(namespace: string) {
  const t = useTranslations(namespace);
  const gender = useStoryGender();

  return useMemo(() => {
    const genderedT = (key: string, values?: Record<string, unknown>) =>
      t(key, { gender, ...values });

    const raw = <T = unknown>(key: string): T =>
      resolveGenderedContent(t.raw(key) as GenderedRaw<T>, gender);

    const label = (key: string): string =>
      resolveGenderedContent(t.raw(key) as GenderedRaw<string>, gender);

    return {
      t: genderedT,
      raw,
      label,
      has: t.has.bind(t),
      gender,
    };
  }, [t, gender]);
}

type GenderedRaw<T> = T | { male: T; female: T };
