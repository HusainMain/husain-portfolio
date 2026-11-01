import { useEffect, useRef, useMemo } from "react";
import { formatToData } from "number-flow/lite";
import { define } from "number-flow";
import type { Data } from "number-flow/lite";

// Define the custom element
define("number-flow", class extends HTMLElement {});

interface NumberFlowElement extends HTMLElement {
  data: Data | undefined;
  animated: boolean;
  respectMotionPreference: boolean;
  willUpdate(): void;
  didUpdate(): void;
}

interface AnimatedNumberProps {
  value: number;
  format?: Intl.NumberFormatOptions;
  prefix?: string;
  suffix?: string;
  className?: string;
  respectMotionPreference?: boolean;
  isInView?: boolean;
}

/**
 * AnimatedNumber — thin wrapper around the vanilla number-flow custom element.
 * Uses a ref to directly set the `data` property, bypassing React 19's
 * buggy prop forwarding for custom elements.
 *
 * Animates when `isInView` becomes true (passed from parent to share one
 * IntersectionObserver). Re-animates when `value` changes.
 */
export function AnimatedNumber({
  value,
  format = {},
  prefix = "",
  suffix = "",
  className = "",
  respectMotionPreference = true,
  isInView = true, // Default to true for cases without scroll trigger
}: AnimatedNumberProps) {
  const elRef = useRef<NumberFlowElement>(null);
  const hasAnimatedRef = useRef(false);
  const prevValueRef = useRef(value);

  // Create formatter and data once
  const data = useMemo(() => {
    const formatter = new Intl.NumberFormat(undefined, format);
    return formatToData(value, formatter, prefix, suffix);
  }, [value, format, prefix, suffix]);

  // Reset animation flag when value changes (e.g., user toggles view)
  useEffect(() => {
    if (value !== prevValueRef.current) {
      hasAnimatedRef.current = false;
      prevValueRef.current = value;
    }
  }, [value]);

  // Set data on the custom element when in view
  useEffect(() => {
    const el = elRef.current;
    if (!el || !isInView || hasAnimatedRef.current) return;

    // Check prefers-reduced-motion
    if (respectMotionPreference) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        // Still set data so the final value shows, but animation is disabled
        el.data = data;
        el.animated = false;
        hasAnimatedRef.current = true;
        return;
      }
    }

    el.data = data;
    el.willUpdate?.();
    el.didUpdate?.();
    hasAnimatedRef.current = true;
  }, [data, isInView, respectMotionPreference]);

  return (
    // @ts-expect-error - custom element not in JSX.IntrinsicElements
    <number-flow
      ref={elRef}
      className={className}
      data-will-change=""
      aria-hidden="true"
      style={{ display: "inline-block" }}
    />
  );
}