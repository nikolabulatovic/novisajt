import { useState, useEffect } from 'react';

interface Line {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface UseLineAnimationOptions {
  lines: Line[];
  delayBetweenLines?: number;
  delayAfterComplete?: number;
  onComplete?: () => void;
}

export function useLineAnimation({
  lines,
  delayBetweenLines = 500,
  delayAfterComplete = 1000,
  onComplete,
}: UseLineAnimationOptions) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setVisibleLines([]);
    setShowButton(false);
    
    lines.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        if (index === lines.length - 1) {
          setTimeout(() => {
            setShowButton(true);
            if (onComplete) {
              onComplete();
            }
          }, delayAfterComplete);
        }
      }, index * delayBetweenLines);
    });
  }, [lines, delayBetweenLines, delayAfterComplete, onComplete]);

  return {
    visibleLines,
    showButton,
  };
}

