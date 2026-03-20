import { useState, useEffect, useRef, useMemo } from 'react';

interface UseWordAnimationOptions {
  text: string | string[];
  speed?: number; // ms per word or char
  delayAfterComplete?: number; // ms to wait after animation completes
  onComplete?: () => void;
  mode?: 'word' | 'char';
}

export function useWordAnimation({
  text,
  speed = 120,
  delayAfterComplete = 1000,
  onComplete,
  mode = 'word',
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
  const allWords = useMemo(
    () => textArray.flatMap((sentence) => mode === 'char' ? sentence.split('') : sentence.split(' ')),
    [textArray, mode],
  );
  const totalWords = allWords.length;
  const textKey = useMemo(() => allWords.join(mode === 'char' ? '' : ' '), [allWords, mode]);

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

