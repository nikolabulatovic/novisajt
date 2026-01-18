'use client';

import { useLineAnimation } from '@/hooks/useLineAnimation';

interface Line {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface AnimatedLinesProps {
  lines: Line[];
  delayBetweenLines?: number;
  delayAfterComplete?: number;
  onComplete?: () => void;
  textSize?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

const textSizeClasses = {
  sm: 'text-lg md:text-xl lg:text-2xl',
  md: 'text-xl md:text-2xl lg:text-3xl',
  lg: 'text-2xl md:text-3xl lg:text-4xl',
  xl: 'text-3xl md:text-4xl lg:text-5xl',
};

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const spacingClasses = {
  sm: 'space-y-2 md:space-y-3',
  md: 'space-y-4 md:space-y-6',
  lg: 'space-y-6 md:space-y-8',
};

export default function AnimatedLines({
  lines,
  delayBetweenLines = 500,
  delayAfterComplete = 1000,
  onComplete,
  textSize = 'md',
  alignment = 'center',
  spacing = 'md',
  className = '',
}: AnimatedLinesProps) {
  const { visibleLines } = useLineAnimation({
    lines,
    delayBetweenLines,
    delayAfterComplete,
    onComplete,
  });

  return (
    <div className={`${spacingClasses[spacing]} ${alignmentClasses[alignment]} ${className}`}>
      {lines.map((line, index) => (
        <p
          key={index}
          className={`${textSizeClasses[textSize]} leading-relaxed text-gray-200 transition-all duration-700 ease-out ${line.bold ? 'font-medium' : 'font-light'
            } ${line.italic ? 'italic' : ''} ${visibleLines.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
            }`}>
          {line.text}
        </p>
      ))}
    </div>
  );
}

