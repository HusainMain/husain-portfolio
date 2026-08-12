import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

interface TextRevealProps {
  children: ReactNode;
  /**
   * When set, the reveal is gated on this boolean (e.g. brand transition
   * on the homepage). When unset, the element reveals itself on scroll.
   */
  started?: boolean;
  /** Delay in seconds, relative to `started` flipping true or viewport entry. */
  delay?: number;
  duration?: number;
  className?: string;
  innerClassName?: string;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "span";
}

/**
 * Masked line reveal: the inner line is clipped by the outer `overflow-hidden`
 * and slides up into place. Reduced-motion safe: renders fully visible.
 *
 * Visibility is tracked with `useInView` on the outer (unclipped) wrapper
 * rather than `whileInView` on the masked line itself: IntersectionObserver
 * computes the masked line's intersection as zero for as long as the
 * `overflow-hidden` clip excludes it, so a direct `whileInView` would never
 * fire.
 */
export function TextReveal({
  children,
  started,
  delay = 0,
  duration = 0.7,
  className,
  innerClassName,
  as: Tag = "div",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  if (reduce) return <Tag className={className}>{children}</Tag>;

  const isGated = started !== undefined;
  const show = isGated ? started : inView;

  return (
    <Tag ref={ref as never} className={cn("overflow-hidden", className)}>
      <motion.span
        className={cn("block pb-[0.07em] -mb-[0.07em]", innerClassName)}
        initial={{ y: "110%" }}
        animate={show ? { y: "0%" } : { y: "110%" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
