'use client';

interface ProgressDotsProps {
  current: number;
  total: number;
  className?: string;
  /**
   * `emphasized` — slightly larger, higher-contrast dots
   * (pair with a soft TextBackdrop on busy photo stages).
   */
  variant?: 'default' | 'emphasized';
}

export default function ProgressDots({
  current,
  total,
  className = '',
  variant = 'default',
}: ProgressDotsProps) {
  const emphasized = variant === 'emphasized';

  return (
    <div className={`flex justify-center items-center space-x-4 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out rounded-full relative ${
            index < current
              ? emphasized
                ? 'w-3.5 h-3.5 bg-gray-100 shadow-lg shadow-gray-300/40'
                : 'w-3 h-3 bg-gray-300 shadow-lg shadow-gray-400/50'
              : index === current
                ? emphasized
                  ? 'w-3.5 h-3.5 bg-white shadow-lg shadow-gray-200/50 animate-pulse-glow'
                  : 'w-3 h-3 bg-gray-400 shadow-lg shadow-gray-400/70 animate-pulse-glow'
                : emphasized
                  ? 'w-2.5 h-2.5 bg-gray-400/55'
                  : 'w-2 h-2 bg-gray-600/40'
          }`}
        >
          {index < current && (
            <div
              className={`absolute inset-0 rounded-full animate-ping opacity-20 ${
                emphasized ? 'bg-gray-100' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
