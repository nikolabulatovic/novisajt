import { describe, expect, it } from 'vitest';

import {
  expandInlineEmphasisInBlock,
  hasInlineEmphasis,
  linesToEmphasizedBlock,
  parseInlineEmphasis,
} from '@/src/lib/i18n/inlineEmphasis';

describe('parseInlineEmphasis', () => {
  it('returns a single plain segment when there are no markers', () => {
    expect(parseInlineEmphasis('Hello world')).toEqual([
      { text: 'Hello world', bold: false, italic: false },
    ]);
  });

  it('parses bold, italic, and bold-italic markers', () => {
    expect(
      parseInlineEmphasis('A {b:bold} and {i:italic} and {bi:both} end.'),
    ).toEqual([
      { text: 'A ', bold: false, italic: false },
      { text: 'bold', bold: true, italic: false },
      { text: ' and ', bold: false, italic: false },
      { text: 'italic', bold: false, italic: true },
      { text: ' and ', bold: false, italic: false },
      { text: 'both', bold: true, italic: true },
      { text: ' end.', bold: false, italic: false },
    ]);
  });

  it('matches bi before b so {bi:…} is not parsed as b', () => {
    expect(parseInlineEmphasis('{bi:x}')).toEqual([
      { text: 'x', bold: true, italic: true },
    ]);
  });

  it('drops empty plain gaps between markers', () => {
    expect(parseInlineEmphasis('{b:a}{i:b}')).toEqual([
      { text: 'a', bold: true, italic: false },
      { text: 'b', bold: false, italic: true },
    ]);
  });
});

describe('hasInlineEmphasis', () => {
  it('detects markers', () => {
    expect(hasInlineEmphasis('no')).toBe(false);
    expect(hasInlineEmphasis('{b:yes}')).toBe(true);
  });
});

describe('linesToEmphasizedBlock', () => {
  it('maps each line to a paragraph of segments', () => {
    expect(linesToEmphasizedBlock(['One', '{b:Two}'])).toEqual([
      { line: [{ text: 'One', bold: false, italic: false }] },
      { line: [{ text: 'Two', bold: true, italic: false }] },
    ]);
  });
});

describe('expandInlineEmphasisInBlock', () => {
  it('ORs markers with existing segment flags', () => {
    expect(
      expandInlineEmphasisInBlock([
        {
          line: [{ text: 'Hi {i:there}', bold: true, italic: false }],
        },
      ]),
    ).toEqual([
      {
        line: [
          { text: 'Hi ', bold: true, italic: false },
          { text: 'there', bold: true, italic: true },
        ],
      },
    ]);
  });
});
