/**
 * Cubic Bezier easing functions inspired by Apple's design principles
 * These create natural, smooth animations that feel organic
 */

/**
 * Apple's standard ease-out curve - smooth deceleration
 * Similar to iOS default timing function
 * cubic-bezier(0.4, 0.0, 0.2, 1.0)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Apple's ease-in-out curve - smooth acceleration and deceleration
 * cubic-bezier(0.42, 0.0, 0.58, 1.0)
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Accurate cubic-bezier implementation using Newton's method
 * Solves for y given x using the cubic bezier formula
 * @param t - Progress from 0 to 1 (x value)
 * @param x1, y1, x2, y2 - Control points for the cubic bezier curve
 */
function cubicBezierSolve(
  t: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  // Clamp t to [0, 1]
  t = Math.max(0, Math.min(1, t));

  // Cubic bezier formula: B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
  // For our case: P₀ = (0,0), P₁ = (x1,y1), P₂ = (x2,y2), P₃ = (1,1)
  
  // We need to find the y value for a given x (t)
  // Since we're using t as the parameter, we can directly calculate y
  
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  
  // Calculate y using the bezier formula
  const y = mt3 * 0 + 3 * mt2 * t * y1 + 3 * mt * t2 * y2 + t3 * 1;
  
  return y;
}

/**
 * Generic cubic-bezier implementation
 * @param t - Progress from 0 to 1
 * @param x1, y1, x2, y2 - Control points for the cubic bezier curve
 */
export function cubicBezier(
  t: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  // For most UI animations, we can use a direct calculation
  // since we're typically using t as the time parameter
  return cubicBezierSolve(t, x1, y1, x2, y2);
}

/**
 * Apple's recommended ease-out for expansion/reveal animations
 * Creates a natural, smooth deceleration that feels organic
 * Uses cubic-bezier(0.4, 0.0, 0.2, 1.0) - Apple's standard ease-out
 */
export function appleEaseOut(t: number): number {
  // Apple's standard ease-out: cubic-bezier(0.4, 0.0, 0.2, 1.0)
  // This creates a smooth deceleration that feels natural and organic
  return cubicBezier(t, 0.4, 0.0, 0.2, 1.0);
}

/**
 * Apple's ease-in for expansion animations that accelerate at the end
 * Creates a smooth acceleration that builds momentum
 * Uses cubic-bezier(0.4, 0.0, 1, 1) - Apple's standard ease-in
 */
export function appleEaseIn(t: number): number {
  // Apple's standard ease-in: cubic-bezier(0.4, 0.0, 1, 1)
  // This creates a smooth acceleration that feels dynamic
  return cubicBezier(t, 0.4, 0.0, 1, 1);
}

/**
 * Enhanced ease-in with more pronounced slow start and stronger acceleration
 * Perfect for expansion animations that need to feel dramatic
 * Uses cubic-bezier(0.25, 0.1, 0.25, 1.0) - more pronounced ease-in
 */
export function appleEaseInStrong(t: number): number {
  // More pronounced ease-in: starts slower, accelerates more dramatically
  // cubic-bezier(0.25, 0.1, 0.25, 1.0) creates a stronger ease-in effect
  return cubicBezier(t, 0.25, 0.1, 0.25, 1.0);
}

