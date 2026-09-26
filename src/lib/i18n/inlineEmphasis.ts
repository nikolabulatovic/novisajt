import type {
  AnimatedTextBlock,
  AnimatedTextSegment,
} from '@/src/lib/i18n/animatedText';

/**
 * Inline emphasis markers (parallel to `{g:male|female}`):
 * - `{b:text}` → bold
 * - `{i:text}` → italic
 * - `{bi:text}` → bold + italic
 *
 * Prefer resolving `{g:…}` first, then parsing emphasis (markers must not nest `{…}`).
 * Example: `{b:Ti lično} si {g:odgovoran|odgovorna}…`
 */
const EMPHASIS_RE = /\{(bi|b|i):([^}]*)\}/g;

export function hasInlineEmphasis(text: string): boolean {
  return /\{(?:bi|b|i):/.test(text);
}

/** Split a plain string into styled segments (empty input → no segments). */
export function parseInlineEmphasis(text: string): AnimatedTextSegment[] {
  if (!text) return [];
  if (!hasInlineEmphasis(text)) {
    return [{ text, bold: false, italic: false }];
  }

  const segments: AnimatedTextSegment[] = [];
  let lastIndex = 0;
  EMPHASIS_RE.lastIndex = 0;

  for (const match of text.matchAll(EMPHASIS_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, index),
        bold: false,
        italic: false,
      });
    }
    const kind = match[1];
    segments.push({
      text: match[2],
      bold: kind === 'b' || kind === 'bi',
      italic: kind === 'i' || kind === 'bi',
    });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      bold: false,
      italic: false,
    });
  }

  return segments.filter((segment) => segment.text.length > 0);
}

/** One plain string per visual paragraph → AnimatedTextBlock. */
export function linesToEmphasizedBlock(lines: string[]): AnimatedTextBlock {
  return lines.map((line) => ({ line: parseInlineEmphasis(line) }));
}

/**
 * Expand `{b:}` / `{i:}` inside existing block segments (OR with segment flags).
 * No-op when there are no markers.
 */
export function expandInlineEmphasisInBlock(
  block: AnimatedTextBlock,
): AnimatedTextBlock {
  return block.map((entry) => ({
    line: entry.line.flatMap((segment) => {
      const parts = parseInlineEmphasis(segment.text);
      return parts.map((part) => ({
        text: part.text,
        bold: Boolean(segment.bold) || Boolean(part.bold),
        italic: Boolean(segment.italic) || Boolean(part.italic),
      }));
    }),
  }));
}
