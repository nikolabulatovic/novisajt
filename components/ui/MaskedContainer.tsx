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
  showGlow = true,
  className = '',
}: MaskedContainerProps) {
  // Parse dimensions for SVG mask
  const widthValue = parseFloat(maskStyle.width);
  const heightValue = parseFloat(maskStyle.height);
  const borderRadiusValue = parseFloat(maskStyle.borderRadius);

  // Extract center percentages from left/top
  const leftValue = parseFloat(maskStyle.left);
  const topValue = parseFloat(maskStyle.top);

  // Generate unique mask ID
  const maskId = `mask-hole-${Math.round(widthValue)}-${Math.round(heightValue)}-${Math.round(borderRadiusValue)}-${leftValue}-${topValue}`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-8 relative ${className}`}>
      {/* SVG mask definition - creates a hole in the current section background */}
      <svg className='absolute' height='100%' width='100%' style={{ pointerEvents: 'none' }}>
        <defs>
          <mask id={maskId}>
            {/* Centered at centerXPercent, centerYPercent, expanding in all directions */}
            <rect
              width={widthValue}
              height={heightValue}
              rx={borderRadiusValue}
              ry={borderRadiusValue}
              fill="white"
              x={leftValue}
              y={topValue}
            />
          </mask>
        </defs>
      </svg>

      {/* Next section's background - rendered behind with clip-path to show only inside mask */}
      {
        nextBackgroundImage && (
          <div
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat before:content-[""] before:absolute before:inset-0 before:bg-black/50 ${expansionProgress > 0 ? 'z-[10000]' : ''}`}
            style={{
              backgroundImage: `url('${nextBackgroundImage}')`,
              ...(expansionProgress > 0 ? {
                maskImage: `url(#${maskId})`,
                WebkitMaskImage: `url(#${maskId})`,
              } : {}),
            }}
          />
        )
      }



      {/* Current section's background with mask cutout */}
      {
        backgroundImage ? (
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat z-0 before:content-[""] before:absolute before:inset-0 before:bg-black/50'
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          />
        ) : null
      }

      <div className='relative'>
        {children}
      </div>

      {/* Subtle glow/border around the mask */}
      {
        showGlow && nextBackgroundImage && expansionProgress === 0 && (
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
        )
      }
    </div >
  );
}

