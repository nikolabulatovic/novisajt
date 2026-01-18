import { Stage } from '@/contexts/NavigationContext';

// Common component prop types
export interface BaseComponentProps {
  onComplete: () => void;
}

// Animation-related types
export interface TextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface AnimatedLine {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

// Page container types
export type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

// Text size types
export type TextSize = 'sm' | 'md' | 'lg' | 'xl';

// Alignment types
export type Alignment = 'left' | 'center' | 'right';

// Spacing types
export type Spacing = 'sm' | 'md' | 'lg';

// Background effect variants
export type BackgroundEffectVariant = 'pulse' | 'glow' | 'float' | 'none';

// Text backdrop types
export type TextBackdropType = 'linear' | 'radial';

// Re-export Stage type for convenience
export type { Stage };

