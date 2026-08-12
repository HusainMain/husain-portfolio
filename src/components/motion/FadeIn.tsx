import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

interface FadeInProps {
  children: ReactNode;
  /**
   * When set, the reveal is gated on this boolean (e.g. brand transition
   * on the homepage). When unset, the element reveals itself on scroll.
   */
  started?: boolean;
  /** Delay in seconds, relative to `started` flipping true or viewport entry. */
  delay?: number;
  duration?: number;
  /** Vertical travel distance in px while fading in. */
  y?: number;
  /** Horizontal travel distance in px while fading in (positive = from the right). */
  x?: number;
  className?: string;
}

/** Fade + small rise entrance. Reduced-motion safe: renders fully visible. */
export function FadeIn({
  children,
  started,
  delay = 0,
  duration = 0.55,
  y = 16,
  x = 0,
  className,
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const isGated = started !== undefined;

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, x }}
      animate={isGated ? (started ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }) : undefined}
      whileInView={isGated ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={isGated ? undefined : { once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
