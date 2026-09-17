import {
  type GenderedContent,
  type UserGender,
  resolveGenderSnippets,
  resolveGenderedContent,
} from '@/src/lib/gender';

/**
 * Match clause for answers.
 * - Flat object: all keys must match (AND), e.g. `{ q1: 'act' }`
 * - `{ or: [...] }`: any clause matches
 * - `{ and: [...] }`: all clauses match (same as flat, useful when nesting with `or`)
 * - `{}`: always matches (fallback)
 */
export type ConditionalTextWhen =
  | Record<string, string>
  | { or: ConditionalTextWhen[] }
  | { and: ConditionalTextWhen[] };

export type ConditionalTextRule = {
  when: ConditionalTextWhen;
  text: GenderedContent<string>;
};

/**
 * Inline slot inside a `text` array: ordered rules, first match wins.
 * If nothing matches, the slot is skipped (no empty line).
 * Use `"when": {}` as a final fallback when a line should always appear.
 */
export type ConditionalTextSlot = {
  conditional: ConditionalTextRule[];
};

/** One entry in a stage `text` array: fixed copy or a conditional slot. */
export type StoryTextItem = string | ConditionalTextSlot;

function isLogicWhen(
  when: object,
): when is { or: ConditionalTextWhen[] } | { and: ConditionalTextWhen[] } {
  return (
    ('or' in when && Array.isArray((when as { or: unknown }).or)) ||
    ('and' in when && Array.isArray((when as { and: unknown }).and))
  );
}

export function answersMatchWhen(
  when: ConditionalTextWhen,
  answers: Record<string, string>,
): boolean {
  if (!when || typeof when !== 'object' || Array.isArray(when)) return false;

  if (isLogicWhen(when)) {
    if ('or' in when && Array.isArray(when.or)) {
      return when.or.some((clause) => answersMatchWhen(clause, answers));
    }
    if ('and' in when && Array.isArray(when.and)) {
      return when.and.every((clause) => answersMatchWhen(clause, answers));
    }
  }

  return Object.entries(when as Record<string, string>).every(
    ([key, value]) => typeof value === 'string' && answers[key] === value,
  );
}

export function isConditionalTextSlot(
  value: unknown,
): value is ConditionalTextSlot {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const conditional = (value as { conditional?: unknown }).conditional;
  return Array.isArray(conditional);
}

/** First matching rule’s resolved line, or `null` if none match. */
export function resolveConditionalSlot(
  slot: ConditionalTextSlot,
  answers: Record<string, string>,
  gender: UserGender,
): string | null {
  for (const rule of slot.conditional) {
    if (!rule || typeof rule !== 'object') continue;
    const when = rule.when;
    if (when === undefined || when === null || typeof when !== 'object') {
      continue;
    }
    if (answersMatchWhen(when as ConditionalTextWhen, answers)) {
      return resolveGenderSnippets(
        resolveGenderedContent(rule.text, gender),
        gender,
      );
    }
  }
  return null;
}

/**
 * Walks a story `text` array in order: keeps strings, resolves conditional
 * slots (at most one line each; omitted when no rule matches).
 */
export function resolveStoryTextItems(
  items: StoryTextItem[],
  answers: Record<string, string>,
  gender: UserGender,
): string[] {
  const lines: string[] = [];
  for (const item of items) {
    if (typeof item === 'string') {
      lines.push(resolveGenderSnippets(item, gender));
      continue;
    }
    if (isConditionalTextSlot(item)) {
      const line = resolveConditionalSlot(item, answers, gender);
      if (line) lines.push(line);
    }
  }
  return lines;
}

/** True when `text` is a string[] / mixed story-text array (not AnimatedTextBlock). */
export function isStoryTextItemArray(value: unknown): value is StoryTextItem[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (item) => typeof item === 'string' || isConditionalTextSlot(item),
  );
}

/** Resolves a message label that may be a plain string or a conditional slot. */
export function resolveStoryLabel(
  value: unknown,
  answers: Record<string, string>,
  gender: UserGender,
): string | null {
  if (typeof value === 'string') {
    return resolveGenderSnippets(value, gender);
  }
  if (isConditionalTextSlot(value)) {
    return resolveConditionalSlot(value, answers, gender);
  }
  return null;
}
