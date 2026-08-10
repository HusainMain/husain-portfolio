/**
 * Motion gatekeeper for later phases (IMPLEMENTATION_PLAN.md §14, lib/motion.ts).
 * Phase 6 will add Lenis + GSAP + ScrollTrigger wiring here.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
