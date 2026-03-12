'use client';

import { useWordAnimation } from '@/hooks/useWordAnimation';
import { useMemo } from 'react';

interface TextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface AnimatedTextProps {
  text: string | string[] | Array<{ line: TextSegment[] }>;
  speed?: number;
  delayAfterComplete?: number;
  onComplete?: () => void;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  wordTransitionDelay?: number;
  wordTransitionDuration?: number;
}

const textSizeClasses = {
  sm: 'text-base sm:text-lg md:text-xl lg:text-2xl',
  md: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  lg: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  xl: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
};

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export default function AnimatedText({
  text,
  speed = 150,
  delayAfterComplete = 1000,
  onComplete,
  textSize = 'md',
  alignment = 'center',
  className = '',
  wordTransitionDelay = 15,
  wordTransitionDuration = 3000,
}: AnimatedTextProps) {
  // Handle QuestionExplanation-style text with segments
  const isSegmentFormat = Array.isArray(text) && text.length > 0 && typeof text[0] === 'object' && 'line' in text[0];

  // Memoize text preparation to prevent unnecessary hook resets
  const textToAnimate = useMemo(() => {
    if (isSegmentFormat) {
      // Flatten segments for animation counting
      const flattened = (text as Array<{ line: TextSegment[] }>).flatMap((item) =>
        item.line.flatMap((segment) => segment.text.split(' ')),
      );
      return flattened.join(' ');
    } else if (Array.isArray(text)) {
      return text as string[];
    } else {
      return text as string;
    }
  }, [text, isSegmentFormat]);

  const { visibleWordCount } = useWordAnimation({
    text: textToAnimate,
    speed,
    delayAfterComplete,
    onComplete,
  });

  // Render QuestionExplanation-style format
  if (isSegmentFormat) {
    const segmentText = text as Array<{ line: TextSegment[] }>;

    // Calculate word start indices for each item
    const wordStartIndices: number[] = [];
    let currentIndex = 0;
    segmentText.forEach((item) => {
      wordStartIndices.push(currentIndex);
      currentIndex += item.line.reduce(
        (acc, segment) => acc + segment.text.split(' ').length,
        0,
      );
    });

    return (
      <div className={`space-y-4 ${alignmentClasses[alignment]} ${className}`}>
        {segmentText.map((item, itemIndex) => {
          const currentWordStartIndex = wordStartIndices[itemIndex];

          return (
            <p
              key={itemIndex}
              className={`${textSizeClasses[textSize]} leading-relaxed`}>
              {item.line.map((segment, segmentIndex) => {
                const segmentWords = segment.text.split(' ');
                const segmentStartIndex =
                  currentWordStartIndex +
                  item.line
                    .slice(0, segmentIndex)
                    .reduce((acc, s) => acc + s.text.split(' ').length, 0);

                return segmentWords.map((word, wordIndex) => {
                  const currentWordIndex = segmentStartIndex + wordIndex;
                  const isVisible = currentWordIndex < visibleWordCount;
                  // Apply delay only when word becomes visible, not on every render
                  // Once visible, delay should be 0 to prevent re-animation
                  const transitionDelay = isVisible ? `${currentWordIndex * 15}ms` : '0ms';

                  return (
                    <span
                      key={`${segmentIndex}-${wordIndex}`}
                      className={`transition-all ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        } ${segment.bold ? 'font-bold' : ''} ${segment.italic ? 'italic' : ''}`}
                      style={{
                        transitionDuration: isVisible ? `${wordTransitionDuration}ms` : '0ms',
                        transitionDelay: isVisible ? transitionDelay : '0ms',
                      }}>
                      {word}
                      {wordIndex < segmentWords.length - 1 ? ' ' : ''}
                    </span>
                  );
                });
              })}
            </p>
          );
        })}
      </div>
    );
  }

  // Render simple string array format
  const textArray = Array.isArray(text) ? text : [text];

  // Calculate word start indices for each sentence
  const wordStartIndices: number[] = [];
  let currentIndex = 0;
  textArray.forEach((sentence) => {
    wordStartIndices.push(currentIndex);
    currentIndex += (typeof sentence === 'string' ? sentence : '').split(' ').length;
  });

  return (
    <div className={`space-y-6 ${alignmentClasses[alignment]} ${className}`}>
      {textArray.map((sentence, sentenceIndex) => {
        const sentenceText = typeof sentence === 'string' ? sentence : '';
        const sentenceWords = sentenceText.split(' ');
        const currentWordStartIndex = wordStartIndices[sentenceIndex];

        return (
          <p
            key={sentenceIndex}
            className={`${textSizeClasses[textSize]} leading-relaxed`}>
            {sentenceWords.map((word, wordIndex) => {
              const currentWordIndex = currentWordStartIndex + wordIndex;
              const isVisible = currentWordIndex < visibleWordCount;

              return (
                <span
                  key={wordIndex}
                  className={`transition-all ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  style={{
                    transitionDuration: isVisible ? `${wordTransitionDuration}ms` : '0ms',
                    transitionDelay: isVisible ? `${currentWordIndex * wordTransitionDelay}ms` : '0ms',
                  }}>
                  {word}
                  {wordIndex < sentenceWords.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

