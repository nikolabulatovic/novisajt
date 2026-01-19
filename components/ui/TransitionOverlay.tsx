'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransition } from '@/contexts/TransitionContext';
import { appleEaseInStrong } from '@/utils/easing';

export default function TransitionOverlay() {
  const {
    isTransitioning,
    transitionCenter,
    nextBackgroundImage,
    nextBackgroundOpacity,
  } = useTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [clipSize, setClipSize] = useState(0);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

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
      const duration = 2500; // 2.5 seconds - quicker overall, but slow start with acceleration

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Use enhanced ease-in curve: slow start, then strong acceleration
        const eased = appleEaseInStrong(progress);
        setClipSize(eased * maxRadius);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Animation complete - start fade out
          setShouldFadeOut(true);
          // Remove overlay after fade out
          setTimeout(() => {
            setClipSize(0);
            setShouldFadeOut(false);
          }, 300);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setClipSize(0);
      setShouldFadeOut(false);
    }
  }, [isTransitioning, transitionCenter]);

  if (!isTransitioning || !transitionCenter || !nextBackgroundImage) {
    return null;
  }

  // Use clip-path to show the NEW background in an expanding circle
  // The circle starts small and expands, revealing more of the new background
  const clipPath = `circle(${clipSize}px at ${transitionCenter.x}px ${transitionCenter.y}px)`;

  // Calculate opacity: use nextBackgroundOpacity during expansion, fade to 0 when shouldFadeOut
  const currentOpacity = shouldFadeOut ? 0 : nextBackgroundOpacity;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] pointer-events-none transition-opacity duration-300"
      style={{
        backgroundImage: `url('${nextBackgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: currentOpacity,
        clipPath,
        WebkitClipPath: clipPath,
      }}
    />
  );
}

