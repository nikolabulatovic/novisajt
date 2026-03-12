'use client';

interface TextBackdropProps {
  type?: 'linear' | 'radial';
  opacity?: number;
  className?: string;
}

export default function TextBackdrop({
  type = 'linear',
  opacity = 0.65,
  className = '',
}: TextBackdropProps) {
  const linearGradient = `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, ${opacity}) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)`;

  const radialGradient = `radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0, 0, 0, ${opacity}) 0%, rgba(0, 0, 0, ${opacity * 0.94}) 15%, rgba(0, 0, 0, ${opacity * 0.82}) 25%, rgba(0, 0, 0, ${opacity * 0.65}) 40%, rgba(0, 0, 0, ${opacity * 0.4}) 55%, rgba(0, 0, 0, ${opacity * 0.25}) 70%, rgba(0, 0, 0, ${opacity * 0.15}) 80%, rgba(0, 0, 0, ${opacity * 0.08}) 90%, transparent 100%)`;

  return (
    <div
      className={`absolute inset-0 -mx-4 md:-mx-8 -my-3 md:-my-6 pointer-events-none ${className}`}
      style={{
        background: type === 'linear' ? linearGradient : radialGradient,
      }}
    />
  );
}

