import type { UserGender } from '@/src/lib/gender';
import { resolveGenderSnippets } from '@/src/lib/gender';

export interface AnimatedTextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface AnimatedTextLine {
  line: AnimatedTextSegment[];
}

export type AnimatedTextBlock = AnimatedTextLine[];

export function isAnimatedTextBlock(
  value: unknown,
): value is AnimatedTextBlock {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      'line' in item &&
      Array.isArray((item as AnimatedTextLine).line),
  );
}

/** Resolve `{g:…}` snippets inside each segment’s text. */
export function resolveAnimatedTextGender(
  block: AnimatedTextBlock,
  gender: UserGender,
): AnimatedTextBlock {
  return block.map((entry) => ({
    line: entry.line.map((segment) => ({
      ...segment,
      text: resolveGenderSnippets(segment.text, gender),
    })),
  }));
}
