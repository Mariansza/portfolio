'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

type RevealProps = {
  children: React.ReactNode;
};

export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(node);
        }
      },
      // threshold 0 + rootMargin: fires as soon as the element's top edge
      // crosses into the top 90% of the viewport, regardless of the
      // element's own height. A ratio-based threshold (e.g. 0.15) would
      // fire far too early on sections taller than the viewport.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isVisible = isIntersecting || prefersReducedMotion;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[900ms] ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
