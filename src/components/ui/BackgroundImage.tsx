'use client';

import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
  opacity?: number;
  /** CSS object-position. Defaults to `center`. */
  position?: string;
  className?: string;
  /** Preload + high fetch priority — use for the first-paint / LCP stage only. */
  priority?: boolean;
}

export default function BackgroundImage({
  src,
  opacity = 0.8,
  position = 'center',
  className = '',
  priority = false,
}: BackgroundImageProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        quality={75}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
