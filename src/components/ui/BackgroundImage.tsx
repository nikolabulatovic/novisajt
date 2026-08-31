'use client';

import type { CSSProperties } from 'react';

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
  /** High fetch priority — use for the LCP / first-paint stage only. */
  priority?: boolean;
}

/**
 * Full-bleed stage photo from a static public path (no `/_next/image`).
 * Same URL is used by the pill transition so expand handoff and stage match.
 */
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
      {/* eslint-disable-next-line @next/next/no-img-element -- static public assets; shared URL with pill transition */}
      <img
        src={src}
        alt=""
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="absolute inset-0 h-full w-full object-cover"
        style={hasResponsivePosition ? undefined : { objectPosition: position }}
      />
    </div>
  );
}
