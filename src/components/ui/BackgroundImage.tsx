'use client';

interface BackgroundImageProps {
  src: string;
  opacity?: number;
  /** CSS background-position. Defaults to `center`. */
  position?: string;
  className?: string;
}

export default function BackgroundImage({
  src,
  opacity = 0.8,
  position = 'center',
  className = '',
}: BackgroundImageProps) {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundPosition: position,
        opacity,
      }}
    />
  );
}
