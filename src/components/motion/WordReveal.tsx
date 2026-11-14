import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../../lib/motion";

interface WordRevealProps {
  children: ReactNode;
  className?: string;
  /**
   * When provided, the animation waits until this flips true (brand transition
   * hand-off). Undefined means the reveal is driven purely by scroll.
   */
  started?: boolean;
  /** Pin the text while the words light. On by default. */
  pin?: boolean;
  /** Closest ancestor selector to pin instead of the text block itself. */
  pinClosest?: string;
  /** Scroll distance per word, in px. */
  step?: number;
  as?: "p" | "div";
}

/**
 * Wrap every word in an inline `[data-word]` span while leaving the original
 * text nodes, whitespace, and nested elements (serif `<em>` accents) in place.
 * React does the slicing, so the DOM stays valid and assistive tech reads the
 * sentence normally — no aria overlay needed.
 */
function sliceWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((part, index) =>
        /^\s*$/.test(part) ? (
          part
        ) : (
          <span data-word key={`w${index}`}>
            {part}
          </span>
        ),
      );
    }
    if (typeof child === "number") {
      return <span data-word>{child}</span>;
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      return cloneElement(child, { children: sliceWords(child.props.children) });
    }
    return child;
  });
}

/**
 * Word-by-word text reveal. The block pins once its top reaches 30% of the
 * viewport and holds there while the words light one at a time; scrolling
 * drives the ramp, so it pauses and reverses with the reader. The pin releases
 * after the last word, then the page continues.
 *
 * Word fades are short relative to their step (0.16 vs 0.3 in timeline units),
 * so roughly one word is in motion at a time — not a whole line at once.
 * Only opacity changes: no transform, no reflow, nested accent styling is
 * untouched. Content already past the pin point at mount runs a one-shot
 * stagger instead of jumping; reduced-motion users get static text.
 */
export function WordReveal({
  children,
  className,
  started,
  pin = true,
  pinClosest,
  step = 28,
  as: Tag = "p",
}: WordRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (started === false) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    /* Already past the pin line at mount (above the fold): light on a timer
       instead of pinning, so nothing jumps. */
    if (el.getBoundingClientRect().top < window.innerHeight * 0.3) {
      const tween = gsap.fromTo(
        words,
        { opacity: 0.22 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.045,
          delay: 0.15,
        },
      );
      return () => tween.kill();
    }

    const pinEl = pinClosest ? el.closest<HTMLElement>(pinClosest) : null;
    const triggerEl = pinEl ?? el;

    const distance = () =>
      Math.round(
        Math.min(
          Math.max(window.innerHeight * 1.2, words.length * step),
          window.innerHeight * 2.4,
        ),
      );

    const tl = gsap.timeline({
      scrollTrigger: pin
        ? {
            trigger: triggerEl,
            start: "top 30%",
            end: () => `+=${distance()}`,
            pin: pinEl ?? true,
            pinSpacing: true,
            scrub: 0.5,
            anticipatePin: 1,
          }
        : {
            trigger: el,
            start: "top 82%",
            end: "bottom 55%",
            scrub: 0.4,
          },
    });

    tl.fromTo(
      words,
      { opacity: 0.22 },
      {
        opacity: 1,
        duration: pin ? 0.16 : 0.4,
        ease: pin ? "power1.out" : "none",
        stagger: pin ? 0.3 : 0.1,
      },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [started, pin, pinClosest, step]);

  return (
    <Tag ref={ref as never} className={className}>
      {sliceWords(children)}
    </Tag>
  );
}
