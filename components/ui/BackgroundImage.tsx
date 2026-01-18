'use client';

interface BackgroundImageProps {
  src: string;
  opacity?: number;
  overlayOpacity?: number;
  className?: string;
}

export default function BackgroundImage({
  src,
  opacity = 0.8,
  overlayOpacity = 0.5,
  className = '',
}: BackgroundImageProps) {
  return (
    <>
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out ${className}`}
        style={{
          backgroundImage: `url('${src}')`,
          opacity,
        }}
      />
      {overlayOpacity > 0 && (
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          }}
        />
      )}
    </>
  );
}

