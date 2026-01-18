'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransition } from '@/contexts/TransitionContext';

export default function TransitionOverlay() {
  const {
    isTransitioning,
    transitionCenter,
    currentBackgroundImage,
  } = useTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [clipSize, setClipSize] = useState(0);

  useEffect(() => {
    if (isTransitioning && transitionCenter) {
      // Calculate the maximum distance from center to corner
      const maxDistance = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2),
      );
      const maxRadius = maxDistance * 1.2; // Add some padding

      // Animate clip size from 0 to maxRadius
      setClipSize(0);
      const startTime = Date.now();
      const duration = 2000; // 2 seconds

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Use ease-out for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setClipSize(eased * maxRadius);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setClipSize(0);
    }
  }, [isTransitioning, transitionCenter]);

  if (!isTransitioning || !transitionCenter || !currentBackgroundImage) {
    return null;
  }

  // Use CSS mask with radial gradient to create expanding circle reveal
  // The mask hides (transparent) the expanding circle area, revealing new background
  const centerXPercent = (transitionCenter.x / window.innerWidth) * 100;
  const centerYPercent = (transitionCenter.y / window.innerHeight) * 100;

  // Create radial gradient mask: transparent in center (expanding circle), white outside (visible overlay)
  // As clipSize grows, more of the overlay becomes transparent (hidden), revealing new background
  const maskImage = `radial-gradient(circle ${clipSize}px at ${centerXPercent}% ${centerYPercent}%, transparent 0%, transparent 99%, black 100%)`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] pointer-events-none"
      style={{
        backgroundImage: `url('${currentBackgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        maskImage,
        WebkitMaskImage: maskImage,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
      }}
    />
  );
}

