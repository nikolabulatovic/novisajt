'use client';

interface BackgroundImageProps {
  src: string;
  opacity?: number;
  className?: string;
}

export default function BackgroundImage({
  src,
  opacity = 0.8,
  className = '',
}: BackgroundImageProps) {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
        opacity,
      }}
    />
  );
}

