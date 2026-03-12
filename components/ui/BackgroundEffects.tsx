'use client';

interface BackgroundEffectsProps {
  variant?: 'pulse' | 'glow' | 'float' | 'none';
}

export default function BackgroundEffects({
  variant = 'pulse',
}: BackgroundEffectsProps) {
  if (variant === 'none') {
    return null;
  }

  const effectClasses = {
    pulse: 'animate-pulse',
    glow: 'animate-glow',
    float: 'animate-float',
  };

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <div
        className={`absolute top-1/2 left-1/2 w-48 h-48 md:w-96 md:h-96 bg-gray-800/5 rounded-full blur-3xl ${effectClasses[variant]}`}
      />
    </div>
  );
}

