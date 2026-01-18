import { useState, useEffect, useRef, useMemo } from 'react';

interface UseWordAnimationOptions {
  text: string | string[];
  speed?: number; // ms per word
  delayAfterComplete?: number; // ms to wait after animation completes
  onComplete?: () => void;
}

export function useWordAnimation({
  text,
  speed = 120,
  delayAfterComplete = 1000,
  onComplete,
}: UseWordAnimationOptions) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasAnimatedRef = useRef(false);

  // Update ref when onComplete changes, but don't trigger re-animation
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const textArray = useMemo(() => Array.isArray(text) ? text : [text], [text]);
  const allWords = useMemo(() => textArray.flatMap((sentence) => sentence.split(' ')), [textArray]);
  const totalWords = allWords.length;
  const textKey = useMemo(() => allWords.join(' '), [allWords]);

  useEffect(() => {
    setVisibleWordCount(0);
    setShowButton(false);
    hasAnimatedRef.current = false;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < totalWords) {
        setVisibleWordCount(currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(interval);
        hasAnimatedRef.current = true;
        setTimeout(() => {
          setShowButton(true);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, delayAfterComplete);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [totalWords, speed, delayAfterComplete, textKey]);

  return {
    visibleWordCount,
    showButton,
    totalWords,
    textArray,
    allWords,
  };
}

