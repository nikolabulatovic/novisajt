'use client';

import type { AnswerChoiceRipple } from '@/src/hooks/useAnswerChoiceRipples';

const RIPPLE_BOX_STYLE = {
  width: '30px',
  height: '30px',
  marginLeft: '-15px',
  marginTop: '-15px',
} as const;

export default function AnswerChoiceRippleSpans({
  ripples,
}: {
  ripples: AnswerChoiceRipple[];
}) {
  return ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="ripple"
      style={{
        left: ripple.x,
        top: ripple.y,
        ...RIPPLE_BOX_STYLE,
      }}
    />
  ));
}
