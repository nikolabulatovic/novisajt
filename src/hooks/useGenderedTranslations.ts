'use client';

import { useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import {
  DEFAULT_USER_GENDER,
  type UserGender,
  resolveGenderedContent,
} from '@/src/lib/gender';

/** Current story address gender (defaults to male until the ask UI exists). */
export function useStoryGender(): UserGender {
  return useStoryFlow().gender ?? DEFAULT_USER_GENDER;
}

/**
 * next-intl helpers that apply story gender:
 * - `t` / `rich`: inject `{ gender }` for ICU `{gender, select, …}` messages
 * - `raw`: resolve `{ male, female }` content shapes used by AnimatedText arrays
 */
export function useGenderedTranslations(namespace: string) {
  const t = useTranslations(namespace);
  const gender = useStoryGender();

  return useMemo(() => {
    const genderedT = (key: string, values?: Record<string, unknown>) =>
      t(key, { gender, ...values });

    const raw = <T = unknown>(key: string): T =>
      resolveGenderedContent(t.raw(key) as GenderedRaw<T>, gender);

    return {
      t: genderedT,
      raw,
      has: t.has.bind(t),
      gender,
    };
  }, [t, gender]);
}

type GenderedRaw<T> = T | { male: T; female: T };
