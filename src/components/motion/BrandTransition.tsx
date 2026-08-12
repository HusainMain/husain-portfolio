import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "../../content/site";

interface BrandTransitionProps {
  /** Fired when the exit wipe begins (hero entrance should start now). */
  onHero: () => void;
  /** Fired when the overlay has fully left (unmount it). */
  onComplete: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One-shot brand stamp (Phase 6, homepage first visit/session only):
 * wordmark masked reveal → system line draws → mono identity fades →
 * clip-path wipe up reveals the hero. Rendered above the header (z-70),
 * never shows a spinner. Reduced-motion users never see it (Home gates it).
 */
export function BrandTransition({ onHero, onComplete }: BrandTransitionProps) {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timers = [
      window.setTimeout(() => setStage(1), 250),
      window.setTimeout(() => setStage(2), 600),
      window.setTimeout(() => {
        onHero();
        setStage(3);
      }, 1050),
      window.setTimeout(onComplete, 1500),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce, onHero, onComplete]);

  if (reduce) return null;

  const exiting = stage >= 3;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-canvas"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={
        exiting
          ? { clipPath: "inset(100% 0 0% 0)" }
          : { clipPath: "inset(0% 0 0% 0)" }
      }
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.span
            className="block pb-[0.05em] text-[clamp(2.5rem,6vw,5rem)] font-medium uppercase leading-none tracking-[-0.03em] text-navy-900"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.4, delay: 0, ease: EASE }}
          >
            {site.firstName.toUpperCase()}
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.span
            className="block pb-[0.05em] text-[clamp(2.5rem,6vw,5rem)] font-medium uppercase leading-none tracking-[-0.03em] text-navy-900"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
          >
            {site.lastName.toUpperCase()}
          </motion.span>
        </div>
        <motion.span
          className="mt-6 block h-1 w-32 origin-left bg-orange"
          initial={{ scaleX: 0 }}
          animate={stage >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.45, delay: 0, ease: EASE }}
        />
        <motion.p
          className="text-mono-label mt-5 text-muted"
          initial={{ opacity: 0 }}
          animate={stage >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {site.heroEyebrow.toUpperCase()}
        </motion.p>
      </div>
    </motion.div>
  );
}
