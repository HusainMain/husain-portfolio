import { useEffect, useRef, useMemo } from "react";
import { formatToData } from "number-flow/lite";
import { define } from "number-flow";
import type { Data } from "number-flow/lite";

/* The vanilla element is registered once by the library; `define` is a no-op
   if another module already claimed the tag. */
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
  /** Gate the first animation on a parent's IntersectionObserver. */
  isInView?: boolean;
  /**
   * Text handed to screen readers while the odometer itself stays hidden.
   * Required whenever the number is not immediately followed by readable
   * text that supplies its unit (e.g. "%").
   */
  srLabel?: string;
}

/**
 * AnimatedNumber — odometer digits for a figure that changes in place.
 *
 * The rendered digits are decorative: they are a stack of every numeral and a
 * screen reader would read the whole stack. The element is therefore
 * aria-hidden and `srLabel` carries the value instead. The value is only
 * written once the component is in view, so the number counts up rather than
 * appearing finished and then jumping.
 */
export function AnimatedNumber({
  value,
  format = {},
  prefix = "",
  suffix = "",
  className = "",
  respectMotionPreference = true,
  isInView = true,
  srLabel,
}: AnimatedNumberProps) {
  const elRef = useRef<NumberFlowElement>(null);
  const hasAnimatedRef = useRef(false);
  const prevValueRef = useRef(value);

  const data = useMemo(() => {
    const formatter = new Intl.NumberFormat("en-IN", format);
    return formatToData(value, formatter, prefix, suffix);
  }, [value, format, prefix, suffix]);

  /* A new value (toggling Toss Winner ↔ Chasing Side) re-arms the effect so the
     digits travel to the new figure instead of snapping. */
  useEffect(() => {
    if (value !== prevValueRef.current) {
      hasAnimatedRef.current = false;
      prevValueRef.current = value;
    }
  }, [value]);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !isInView || hasAnimatedRef.current) return;

    const reduced =
      respectMotionPreference &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.data = data;
    if (reduced) el.animated = false;
    el.willUpdate?.();
    el.didUpdate?.();
    hasAnimatedRef.current = true;
  }, [data, isInView, respectMotionPreference]);

  return (
    <>
      {/* @ts-expect-error - custom element not in JSX.IntrinsicElements */}
      <number-flow
        ref={elRef}
        className={className}
        aria-hidden="true"
        style={{ display: "inline-block" }}
      />
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
    </>
  );
}
