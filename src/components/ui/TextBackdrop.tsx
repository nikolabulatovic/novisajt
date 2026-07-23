'use client';

export type TextBackdropGradientType = 'linear' | 'radial';

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface TextBackdropProps {
  type?: TextBackdropGradientType;
  opacity?: number;
  /**
   * How much of the gradient height each end uses to fade (0–0.5).
   * Example: `0.35` → fade 0–35% and 65–100%, full strength plateau in the middle.
   * Higher = softer / longer fades; lower = shorter fades (harder band edges).
   */
  fade?: number;
  /**
   * Gradient color. Accepts `#rgb`, `#rrggbb`, or `rgb(r, g, b)`.
   * Defaults to black.
   */
  color?: string;
  className?: string;
}

const BLACK: RgbColor = { r: 0, g: 0, b: 0 };

function parseColor(color: string): RgbColor {
  const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const value = hex[1];
    if (value.length === 3) {
      return {
        r: parseInt(value[0] + value[0], 16),
        g: parseInt(value[1] + value[1], 16),
        b: parseInt(value[2] + value[2], 16),
      };
    }
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16),
    };
  }

  const rgb = color
    .trim()
    .match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
    };
  }

  return BLACK;
}

function rgba({ r, g, b }: RgbColor, alpha: number): string {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function smoothstep(t: number): number {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}

/** Plateau in the middle; smooth fades over `fade` of the height at each end. */
function strengthAt(t: number, fade: number): number {
  if (t <= 0 || t >= 1) return 0;
  if (t < fade) return smoothstep(t / fade);
  if (t > 1 - fade) return smoothstep((1 - t) / fade);
  return 1;
}

/**
 * Place stop percentages so fades are sampled densely and the plateau sparsely.
 * `fade` is a 0–0.5 fraction of full height.
 */
function stopPositions(fade: number): number[] {
  const positions = new Set<number>([0, 1]);
  const fadeSamples = 5;
  for (let i = 1; i < fadeSamples; i++) {
    const u = i / fadeSamples;
    positions.add(fade * u);
    positions.add(1 - fade * u);
  }
  positions.add(fade);
  positions.add(1 - fade);
  positions.add(0.5);
  return [...positions].sort((a, b) => a - b);
}

function buildLinearGradient(
  opacity: number,
  fade: number,
  color: RgbColor,
): string {
  const parts = stopPositions(fade).map((t) => {
    const at = Math.round(t * 1000) / 10;
    const strength = strengthAt(t, fade);
    return `${rgba(color, opacity * strength)} ${at}%`;
  });
  return `linear-gradient(to bottom, ${parts.join(', ')})`;
}

function buildRadialGradient(opacity: number, color: RgbColor): string {
  return `radial-gradient(ellipse 90% 70% at 50% 50%, ${rgba(color, opacity)} 0%, ${rgba(color, opacity * 0.94)} 15%, ${rgba(color, opacity * 0.82)} 25%, ${rgba(color, opacity * 0.65)} 40%, ${rgba(color, opacity * 0.4)} 55%, ${rgba(color, opacity * 0.25)} 70%, ${rgba(color, opacity * 0.15)} 80%, ${rgba(color, opacity * 0.08)} 90%, transparent 100%)`;
}

export default function TextBackdrop({
  type = 'linear',
  opacity = 0.65,
  fade = 0.35,
  color = '#000000',
  className = '',
}: TextBackdropProps) {
  const clampedFade = Math.min(Math.max(fade, 0.01), 0.5);
  const rgb = parseColor(color);
  const linearGradient = buildLinearGradient(opacity, clampedFade, rgb);
  const radialGradient = buildRadialGradient(opacity, rgb);

  return (
    <div
      className={`absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2 -my-6 md:-my-12 pointer-events-none ${className}`}
      style={{
        background: type === 'linear' ? linearGradient : radialGradient,
      }}
    />
  );
}
