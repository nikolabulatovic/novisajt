/**
 * Grammatical address gender for locales that inflect (e.g. Serbian).
 * Skip / "not important" still use masculine grammar (`male`).
 */
export type UserGender = 'male' | 'female';

export const DEFAULT_USER_GENDER: UserGender = 'male';

/**
 * Raw gender-selection outcome for analytics (not collapsed to grammar).
 * Attached as PostHog super + person property `gender_choice` from selection onward.
 */
export type GenderChoiceAnalytics =
  | 'male'
  | 'female'
  | 'rather_not'
  | 'not_important';

/**
 * Message value that is either shared for all genders, or split by gender.
 *
 * Plain (unchanged):
 *   "text": ["…"]
 *
 * Gendered:
 *   "text": {
 *     "male": ["Nisi bio iskren…"],
 *     "female": ["Nisi bila iskrena…"]
 *   }
 *
 * For single ICU strings via `t()`, use:
 *   "{gender, select, female {…} male {…} other {…}}"
 */
export type GenderedContent<T> = T | { male: T; female: T };

export function isGenderedContent<T>(
  value: unknown,
): value is { male: T; female: T } {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    'male' in value &&
    'female' in value
  );
}

/** Picks male/female branch when present; otherwise returns the value as-is. */
export function resolveGenderedContent<T>(
  value: GenderedContent<T>,
  gender: UserGender,
): T {
  if (isGenderedContent<T>(value)) {
    return value[gender];
  }
  return value as T;
}
