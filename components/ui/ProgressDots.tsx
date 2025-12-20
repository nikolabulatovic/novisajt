'use client';

interface ProgressDotsProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressDots({
  current,
  total,
  className = '',
}: ProgressDotsProps) {
  return (
    <div className={`flex justify-center items-center space-x-4 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            index < current
              ? 'w-3 h-3 bg-gray-300 shadow-lg shadow-gray-400/50'
              : index === current
              ? 'w-3 h-3 bg-gray-400 shadow-lg shadow-gray-400/70 animate-pulse-glow'
              : 'w-2 h-2 bg-gray-600/40'
          } rounded-full relative`}>
          {index < current && (
            <div className='absolute inset-0 rounded-full bg-gray-300 animate-ping opacity-20' />
          )}
        </div>
      ))}
    </div>
  );
}

