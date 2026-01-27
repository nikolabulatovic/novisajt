'use client';

import { ReactNode } from 'react';

interface MaskStyle {
  width: string;
  height: string;
  borderRadius: string;
  left: string;
  top: string;
}

interface MaskedContainerProps {
  children: ReactNode;
  maskStyle: MaskStyle; // Style object for the mask shape
  expansionProgress?: number; // Progress of expansion (0 to 1), used to determine if mask should be applied
  backgroundImage?: string; // Current section background
  nextBackgroundImage?: string; // Next section background to reveal inside mask
  isFadingOut?: boolean; // Whether the container is fading out
  showGlow?: boolean; // Whether to show the glow border
  className?: string; // Additional CSS classes
}

/**
 * Container component that applies a pill-to-viewport mask expansion effect
 * Morphs from pill shape to full viewport rectangle, revealing content behind
 */
export default function MaskedContainer({
  children,
  maskStyle,
  expansionProgress = 0,
  backgroundImage,
  nextBackgroundImage,
  isFadingOut = false,
  showGlow = true,
  className = '',
}: MaskedContainerProps) {
  // Only apply mask if expansion has started (progress > 0)
  const shouldApplyMask = expansionProgress > 0;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 relative transition-opacity duration-[600ms] ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'
        } ${className}`}>
      {/* Next section's background - rendered behind with clip-path to show only inside mask */}
      {nextBackgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('${nextBackgroundImage}')`,
          }}
        />
      )}



      {/* Current section's background with mask cutout */}
      {backgroundImage ? (
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[600ms] z-[1]'
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            opacity: 1,
            // Create a mask that cuts out a circle, revealing the next section behind
            maskImage: 'radial-gradient(circle at 45% 45%, transparent 15%, black 15%)',
            WebkitMaskImage: 'radial-gradient(circle at 45% 45%, transparent 15%, black 15%)',
          }}
        />
      ) : null}

      {children}

      {/* Subtle glow/border around the mask */}
      {showGlow && nextBackgroundImage && (
        <div
          className="absolute animate-pulse pointer-events-none z-[2]"
          style={{
            left: maskStyle.left,
            top: maskStyle.top,
            width: maskStyle.width,
            height: maskStyle.height,
            borderRadius: maskStyle.borderRadius,
            border: '1px solid rgba(255, 100, 100, 0.3)',
            boxShadow:
              '0 0 40px rgba(255, 100, 100, 0.2), inset 0 0 30px rgba(255, 100, 100, 0.15)',
          }}
        />
      )}
    </div>
  );
}

