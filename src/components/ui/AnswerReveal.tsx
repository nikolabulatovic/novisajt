'use client';

import { ReactNode, useEffect, useState } from 'react';

import { ANSWER_ENTRANCE_MS } from '@/src/lib/ui/answerChoiceInteraction';

interface AnswerRevealProps {
  show: boolean;
  children: ReactNode;
}

/**
 * Keeps children in the layout from first paint (reserved slot) and fades opacity
 * in when `show` becomes true — text above does not shift on reveal.
 */
export default function AnswerReveal({ show, children }: AnswerRevealProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!show) {
      setRevealed(false);
      return;
    }

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setRevealed(true));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [show]);

  const interactive = show && revealed;

  return (
    <div
      className="transition-opacity ease-out motion-reduce:transition-none"
      style={{
        opacity: interactive ? 1 : 0,
        transitionDuration: `${ANSWER_ENTRANCE_MS}ms`,
        pointerEvents: interactive ? undefined : 'none',
      }}
      aria-hidden={!interactive}
    >
      {children}
    </div>
  );
}
