'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useSkipStoryPacing } from '@/src/hooks/useSkipStoryPacing';
import {
  ANSWER_ENTRANCE_EASING,
  ANSWER_ENTRANCE_MS,
} from '@/src/lib/ui/answerChoiceInteraction';

interface AnswerRevealProps {
  show: boolean;
  children: ReactNode;
}

/**
 * Keeps children in the layout from first paint (reserved slot) and fades opacity
 * in when `show` becomes true — text above does not shift on reveal.
 */
export default function AnswerReveal({ show, children }: AnswerRevealProps) {
  const skipPacing = useSkipStoryPacing();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!show) {
      setRevealed(false);
      return;
    }

    if (skipPacing) {
      setRevealed(true);
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
  }, [show, skipPacing]);

  const interactive = show && revealed;

  return (
    <div
      className="transition-opacity motion-reduce:transition-none"
      style={{
        opacity: interactive ? 1 : 0,
        transitionDuration: skipPacing ? '0ms' : `${ANSWER_ENTRANCE_MS}ms`,
        transitionTimingFunction: ANSWER_ENTRANCE_EASING,
        pointerEvents: interactive ? undefined : 'none',
      }}
      aria-hidden={!interactive}
    >
      {children}
    </div>
  );
}
