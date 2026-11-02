import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useLenis } from "lenis/react";
import { site } from "../../content/site";
import { cn } from "../../lib/utils";

interface BrandTransitionProps {
  /** Fired once the overlay is on screen, so the page may begin underneath. */
  onHero: () => void;
  /** Fired when the overlay has fully left (unmount it). */
  onComplete: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;
/* The curtain starts and ends slowly. With a longer run, the expo-out curve
   would snap open and then hang; an even curve reads as a weighted reveal. */
const EASE_CURTAIN = [0.65, 0, 0.35, 1] as const;

/* A title card, not a loader: the caret waits, writes each line at a steady
   pace, lets the letters settle, draws the seam, then the two halves of the
   name part like a curtain. The page is already composed underneath; a veil
   of its own paper colour lifts with the curtain so the two names never
   collide. */
const BLINK_MS = 1000;
const FIRST_LINE_MS = 620;
const LINE_GAP_MS = 130;
const SECOND_LINE_MS = 900;
const SEAM_HOLD_MS = 120;
const SEAM_MS = 560;
const REVEAL_MS = 1000;

type Stage = "blink" | "first-line" | "second-line" | "seam" | "reveal";

const NAME_LINE =
  "font-display relative inline-block text-[clamp(3.25rem,10.5vw,7.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.03em]";

/** Word whose letters ripple once the caret has finished writing it. */
function WrittenWord({
  text,
  clipPath,
  settled,
}: {
  text: string;
  clipPath: MotionValue<string>;
  settled: boolean;
}) {
  return (
    <motion.span className="block whitespace-nowrap" style={{ clipPath }}>
      {Array.from(text).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={cn("inline-block", settled && "entry-letter-wave")}
          style={{ animationDelay: `${index * 28}ms` }}
        >
          {letter}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Cursor entry — first visit only.
 *
 * A single orange caret blinks on a navy field, writes the name across two
 * lines that meet at the centre of the screen, then draws the seam between
 * them. The name itself is the curtain: HUSAIN lifts with the top half,
 * BARDANWALA drops with the bottom half, and the page is revealed between
 * the two words. Writing becomes reading.
 *
 * Accessibility: the overlay is decorative and aria-hidden. The page behind
 * is fully rendered and available to assistive technology from the first
 * frame. Any unmodified key or any click skips straight to it. Reduced-motion
 * users never see the overlay (the page gates the component).
 */
export function BrandTransition({ onHero, onComplete }: BrandTransitionProps) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [stage, setStage] = useState<Stage>("blink");
  const [firstSettled, setFirstSettled] = useState(false);
  const [secondSettled, setSecondSettled] = useState(false);

  const first = useMotionValue(0);
  const second = useMotionValue(0);
  const seam = useMotionValue(0);

  const firstClip = useTransform(
    first,
    (value) => `inset(0 ${Math.max(0, 100 - value * 100)}% 0 0)`,
  );
  const secondClip = useTransform(
    second,
    (value) => `inset(0 ${Math.max(0, 100 - value * 100)}% 0 0)`,
  );
  const firstCursor = useTransform(first, (value) => `${value * 100}%`);
  const secondCursor = useTransform(second, (value) => `${value * 100}%`);
  const seamCursor = useTransform(
    seam,
    (value) => `min(${value * 100}%, calc(100% - 4px))`,
  );

  const timers = useRef<number[]>([]);
  const animations = useRef<{ stop: () => void }[]>([]);
  const completeFired = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const stopAnimations = useCallback(() => {
    animations.current.forEach((animation) => animation.stop());
    animations.current = [];
  }, []);

  const fireComplete = useCallback(() => {
    if (completeFired.current) return;
    completeFired.current = true;
    onComplete();
  }, [onComplete]);

  // A skip is a cut, not a shorter performance: get out of the way at once.
  const skip = useCallback(() => {
    clearTimers();
    stopAnimations();
    fireComplete();
  }, [clearTimers, stopAnimations, fireComplete]);

  // Hide the document scrollbar for the length of the card without shifting
  // the layout: the padding reproduces the width the scrollbar occupied.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.setProperty("--entry-scrollbar", `${scrollbar}px`);
    root.classList.add("entry-active");
    return () => {
      root.classList.remove("entry-active");
      root.style.removeProperty("--entry-scrollbar");
    };
  }, []);

  // The card is opaque, so the page can run its entrance underneath and be
  // composed by the time the curtain parts. This also means a skip at any
  // moment lands on a page that is already mostly in place.
  useEffect(() => {
    onHero();
  }, [onHero]);

  // Hold the page still while the title card is on screen.
  useEffect(() => {
    if (reduce) return;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [lenis, reduce]);

  useEffect(() => {
    if (reduce) return;

    let cancelled = false;

    const at = (delay: number, callback: () => void) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
      timers.current.push(timer);
    };

    const reveal = () => {
      setStage("reveal");
      at(REVEAL_MS, fireComplete);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      skip();
    };

    at(BLINK_MS, () => {
      setStage("first-line");
      animations.current.push(
        animate(first, 1, {
          duration: FIRST_LINE_MS / 1000,
          ease: "linear",
        }),
      );
    });

    at(BLINK_MS + FIRST_LINE_MS, () => {
      setFirstSettled(true);
    });

    at(BLINK_MS + FIRST_LINE_MS + LINE_GAP_MS, () => {
      setStage("second-line");
      animations.current.push(
        animate(second, 1, {
          duration: SECOND_LINE_MS / 1000,
          ease: "linear",
        }),
      );
    });

    at(BLINK_MS + FIRST_LINE_MS + LINE_GAP_MS + SECOND_LINE_MS, () => {
      setSecondSettled(true);
    });

    at(
      BLINK_MS +
        FIRST_LINE_MS +
        LINE_GAP_MS +
        SECOND_LINE_MS +
        SEAM_HOLD_MS,
      () => {
        setStage("seam");
        animations.current.push(
          animate(seam, 1, { duration: SEAM_MS / 1000, ease: EASE }),
        );
      },
    );

    at(
      BLINK_MS +
        FIRST_LINE_MS +
        LINE_GAP_MS +
        SECOND_LINE_MS +
        SEAM_HOLD_MS +
        SEAM_MS,
      reveal,
    );

    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKeyDown);
      clearTimers();
      stopAnimations();
    };
  }, [
    reduce,
    first,
    second,
    seam,
    fireComplete,
    skip,
    clearTimers,
    stopAnimations,
  ]);

  if (reduce) return null;

  const revealing = stage === "reveal";
  const firstCursorVisible = stage === "blink" || stage === "first-line";
  const secondCursorVisible =
    stage === "second-line" || stage === "seam" || stage === "reveal";
  const eyebrowVisible = stage !== "blink" && stage !== "first-line";

  return (
    <div
      aria-hidden="true"
      data-stage={stage}
      className="fixed inset-0 z-[80] overflow-hidden"
      onClick={(event) => {
        event.stopPropagation();
        skip();
      }}
    >
      {/* The page is already composed underneath; this veil lets it emerge
          from its own paper colour instead of fighting the title card's name
          in the opening gap. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-surface-page-subtle"
        initial={{ opacity: 1 }}
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: REVEAL_MS / 1000, ease: EASE_CURTAIN }}
      />

      {/* Top half: eyebrow and the first word, seated on the seam. */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[calc(50%+1px)] overflow-hidden bg-navy-900"
        animate={revealing ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: REVEAL_MS / 1000, ease: EASE_CURTAIN }}
      >
        <div className="grid-frame h-full">
          <div className="col-span-12 flex h-full flex-col items-start justify-end text-cream">
            <motion.p
              className="text-mono-label flex items-center gap-2.5 text-orange-on-navy"
              initial={{ opacity: 0 }}
              animate={{ opacity: eyebrowVisible ? 1 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-orange-on-navy" />
              {site.heroEyebrow.toUpperCase()}
            </motion.p>

            <span className={cn("mt-5", NAME_LINE)}>
              <WrittenWord
                text={site.firstName}
                clipPath={firstClip}
                settled={firstSettled}
              />
              <motion.span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-[0.04em] h-[0.78em] w-1 bg-orange-on-navy",
                  stage === "blink" && "entry-caret-blink",
                )}
                style={{ left: firstCursor }}
                animate={{ opacity: firstCursorVisible ? 1 : 0 }}
                transition={{ duration: 0.12, ease: EASE }}
              />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom half: the second word, hanging from the seam. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[calc(50%+1px)] overflow-hidden bg-navy-900"
        animate={revealing ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: REVEAL_MS / 1000, ease: EASE_CURTAIN }}
      >
        <div className="grid-frame h-full">
          <div className="col-span-12 flex h-full flex-col items-start justify-start text-cream">
            <span className={NAME_LINE}>
              <WrittenWord
                text={site.lastName}
                clipPath={secondClip}
                settled={secondSettled}
              />
              <motion.span
                aria-hidden="true"
                className="absolute bottom-[0.04em] h-[0.78em] w-1 bg-orange-on-navy"
                style={{ left: secondCursor }}
                animate={{ opacity: secondCursorVisible ? 1 : 0 }}
                transition={{ duration: 0.12, ease: EASE }}
              />
            </span>
          </div>
        </div>
      </motion.div>

      {/* The seam: the line the caret draws, and the playhead that draws it. */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-px origin-left bg-orange-on-navy"
        style={{ scaleX: seam }}
        animate={{ opacity: revealing ? 0 : 1 }}
        transition={{ duration: 0.15, ease: EASE }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-orange-on-navy"
        style={{ left: seamCursor }}
        animate={{ opacity: stage === "seam" && !revealing ? 1 : 0 }}
        transition={{ duration: 0.15, ease: EASE }}
      />
    </div>
  );
}
