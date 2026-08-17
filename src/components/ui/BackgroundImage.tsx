'use client';

import type { CSSProperties } from 'react';

import Image from 'next/image';

interface BackgroundImageProps {
  src: string;
  opacity?: number;
  /** CSS object-position. Defaults to `center`. */
  position?: string;
  /** Tablet (md–lg) object-position override. */
  positionMd?: string;
  /** Mobile (< md) object-position override. */
  positionSm?: string;
  className?: string;
  /** Preload + high fetch priority — use for the first-paint / LCP stage only. */
  priority?: boolean;
}

export default function BackgroundImage({
  src,
  opacity = 0.8,
  position = 'center',
  positionMd,
  positionSm,
  className = '',
  priority = false,
}: BackgroundImageProps) {
  const hasResponsivePosition = Boolean(positionMd || positionSm);
  const responsiveStyle = hasResponsivePosition
    ? ({
        '--stage-bg-pos-sm': positionSm ?? position,
        '--stage-bg-pos-md': positionMd ?? positionSm ?? position,
        '--stage-bg-pos-lg': position,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        hasResponsivePosition ? 'stage-bg-responsive' : ''
      } ${className}`}
      style={{ opacity, ...responsiveStyle }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        quality={75}
        className="object-cover"
        style={hasResponsivePosition ? undefined : { objectPosition: position }}
      />
    </div>
  );
}
