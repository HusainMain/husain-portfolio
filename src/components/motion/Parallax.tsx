import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/motion";
import { cn } from "../../lib/utils";

interface ParallaxProps {
  children: ReactNode;
  /** Peak offset in px in one direction (full travel is 2x). Halved 768–1023, disabled <768. */
  distance?: number;
  /** Extra scale baked into the transform so edges stay hidden while translating. */
  scale?: number;
  className?: string;
}

/**
 * Scroll-scrubbed vertical parallax (GSAP). Disabled entirely below 768px and
 * for reduced-motion users, in which case children render untouched.
 */
export function Parallax({ children, distance = 20, scale = 1, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    const createTween = (factor: number) => {
      gsap.fromTo(
        el,
        { y: distance * factor, scale },
        {
          y: -distance * factor,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    };
    mm.add("(min-width: 1024px)", () => createTween(1));
    mm.add("(min-width: 768px) and (max-width: 1023.98px)", () => createTween(0.5));

    return () => mm.revert();
  }, [distance, scale]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
