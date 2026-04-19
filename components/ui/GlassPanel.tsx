'use client';

import { CSSProperties, ReactNode } from 'react';

export type GlassPanelVariant = 'dark' | 'light';

/**
 * Same family as the choice pills: `shadow-2xl`-style lift + a softer
 * downward bloom (like the pill’s `bg-black/50 blur-md translate-y-2` under-layer).
 */
const darkPanelShadow =
  '0 18px 38px -10px rgb(0 0 0 / 0.36), 0 10px 22px -6px rgb(0 0 0 / 0.28), 0 6px 16px -3px rgb(0 0 0 / 0.22)';

/** Light panels: similar depth, toned down for white glass. */
const lightPanelShadow =
  '0 18px 38px -10px rgb(0 0 0 / 0.15), 0 10px 22px -6px rgb(0 0 0 / 0.10), 0 4px 12px -2px rgb(0 0 0 / 0.06)';

export interface GlassPanelProps {
  children: ReactNode;
  /** Classes on the outer shell (e.g. margin). Shadow is applied here. */
  className?: string;
  /** Classes on the inner frosted surface (e.g. padding). */
  contentClassName?: string;
  /** `dark`: gray glass on image stages. `light`: white glass (e.g. AfterChoice). */
  variant?: GlassPanelVariant;
  /**
   * Override `box-shadow` on the outer shell. Use `"none"` for no shadow.
   * Default is always applied as an inline style so it is not lost next to `backdrop-filter`.
   */
  edgeShadow?: string;
}

/**
 * Frosted panel: shadow lives on an **outer** wrapper so it stays visible; blur + fill
 * stay on an **inner** layer (`backdrop-filter` often eats or hides same-node shadows).
 */
export default function GlassPanel({
  children,
  className = '',
  contentClassName = '',
  variant = 'dark',
  edgeShadow,
}: GlassPanelProps) {
  const defaultShadow =
    variant === 'light' ? lightPanelShadow : darkPanelShadow;

  const boxShadow =
    edgeShadow === 'none'
      ? 'none'
      : typeof edgeShadow === 'string' && edgeShadow.length > 0
        ? edgeShadow
        : defaultShadow;

  const outerStyle: CSSProperties = { boxShadow };

  const innerSurface =
    variant === 'light'
      ? 'relative rounded-2xl bg-white/80 backdrop-blur-lg'
      : 'relative rounded-2xl bg-gray-800/25 backdrop-blur-xs';

  return (
    <div className={`relative rounded-2xl ${className}`} style={outerStyle}>
      <div className={`${innerSurface} ${contentClassName}`}>{children}</div>
    </div>
  );
}
