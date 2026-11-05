import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "../../content/site";
import { cn } from "../../lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const FIRST = Array.from(site.firstName.toUpperCase());
const SECOND = Array.from(site.lastName.toUpperCase());
const TOTAL = FIRST.length + SECOND.length;

/* One slow circuit of the reading head, in seconds. It crosses HUSAIN, drops
   to the end of BARDANWALA, crosses back, and climbs to the start again. */
const CYCLE = 18;
const LINE_ONE_END = 7 / CYCLE;
const LINE_TWO_START = 9 / CYCLE;
const LINE_TWO_END = 16 / CYCLE;

/* The source is a light, not a cursor: it warms and pulls letters within this
   fraction of the headline's width. The floor keeps it usable on a phone. */
const RADIUS_RATIO = 0.24;
const RADIUS_MIN = 110;

/* At rest the name leans 2px toward the passing source; under the pointer it
   leans 12px. The jump is the whole interaction: same force, more of it. */
const PULL_REST = 2;
const PULL_HOVER = 12;

interface Point {
  x: number;
  y: number;
}

interface Metrics {
  letters: Point[];
  lineOne: { start: Point; end: Point };
  lineTwo: { start: Point; end: Point };
  width: number;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function easeInOutSine(value: number): number {
  return 0.5 - 0.5 * Math.cos(Math.PI * clamp01(value));
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function lerp(a: Point, b: Point, amount: number): Point {
  return {
    x: a.x + (b.x - a.x) * amount,
    y: a.y + (b.y - a.y) * amount,
  };
}

/** Position of the reading head after `time` seconds on the circuit. */
function pathAt(metrics: Metrics, time: number): Point {
  const progress = (((time % CYCLE) + CYCLE) % CYCLE) / CYCLE;

  if (progress <= LINE_ONE_END) {
    return lerp(
      metrics.lineOne.start,
      metrics.lineOne.end,
      easeInOutSine(progress / LINE_ONE_END),
    );
  }

  if (progress <= LINE_TWO_START) {
    return lerp(
      metrics.lineOne.end,
      metrics.lineTwo.end,
      easeInOutSine(
        (progress - LINE_ONE_END) / (LINE_TWO_START - LINE_ONE_END),
      ),
    );
  }

  if (progress <= LINE_TWO_END) {
    return lerp(
      metrics.lineTwo.end,
      metrics.lineTwo.start,
      easeInOutSine(
        (progress - LINE_TWO_START) / (LINE_TWO_END - LINE_TWO_START),
      ),
    );
  }

  return lerp(
    metrics.lineTwo.start,
    metrics.lineOne.start,
    easeInOutSine((progress - LINE_TWO_END) / (1 - LINE_TWO_END)),
  );
}

/**
 * Hero name — the seam keeps reading it.
 *
 * An invisible heat source travels a slow circuit through the name: across
 * HUSAIN, down, back across BARDANWALA, up. Letters inside its radius lean
 * toward it and warm to orange-deep. The motion is continuous, but it never
 * moves the name far enough to slow reading: 2px at rest, 12px under a pointer.
 *
 * Hovering the headline takes the source off its circuit: it eases to the
 * pointer, the radius tightens and the lean grows. Leaving hands it back to the
 * circuit. Touch taps hold the source for a moment. Reduced motion renders the
 * name as plain text with no loop at all.
 */
export function HeroName({ started = true }: { started?: boolean }) {
  const reduce = useReducedMotion() ?? false;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const heatRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const metricsRef = useRef<Metrics | null>(null);
  const sourceRef = useRef<Point>({ x: 0, y: 0 });
  const phaseRef = useRef(0);
  const heatValues = useRef<number[]>(Array(TOTAL).fill(0));
  const leanValues = useRef<Point[]>(
    Array.from({ length: TOTAL }, () => ({ x: 0, y: 0 })),
  );
  /* Last values written to the DOM. Most letters are cold on any given frame,
     so skipping unchanged writes keeps the loop cheap. */
  const writtenHeat = useRef<number[]>(Array(TOTAL).fill(-1));
  const writtenLean = useRef<Point[]>(
    Array.from({ length: TOTAL }, () => ({ x: Infinity, y: Infinity })),
  );

  const pointerRef = useRef<Point | null>(null);
  const hoveringRef = useRef(false);
  const holdRef = useRef(false);
  const hoverAmountRef = useRef(0);
  const tapRef = useRef<{ point: Point; until: number } | null>(null);

  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(true);

  const measure = useCallback(() => {
    const h1 = h1Ref.current;
    if (!h1) return;

    /* Measure the layout, not the current lean. Inline transforms would
       otherwise drift the recorded centres a few pixels every resize. */
    const elements = letterRefs.current;
    const saved = elements.map((element) => element?.style.transform ?? "");
    elements.forEach((element) => {
      if (element) element.style.transform = "none";
    });

    const h1Box = h1.getBoundingClientRect();
    const letters: Point[] = [];
    let complete = true;

    for (let index = 0; index < TOTAL; index += 1) {
      const element = elements[index];
      if (!element) {
        complete = false;
        break;
      }
      const box = element.getBoundingClientRect();
      letters.push({
        x: box.left + box.width / 2 - h1Box.left,
        y: box.top + box.height / 2 - h1Box.top,
      });
    }

    elements.forEach((element, index) => {
      if (element) element.style.transform = saved[index];
    });

    if (!complete) return;

    const lineOneStart = letters[0];
    const lineOneEnd = letters[FIRST.length - 1];
    const lineTwoStart = letters[FIRST.length];
    const lineTwoEnd = letters[TOTAL - 1];

    const firstMeasurement = metricsRef.current === null;
    metricsRef.current = {
      letters,
      lineOne: { start: lineOneStart, end: lineOneEnd },
      lineTwo: { start: lineTwoStart, end: lineTwoEnd },
      width: h1Box.width,
    };

    if (firstMeasurement) {
      sourceRef.current = { ...lineOneStart };
    }
  }, []);

  /* Release the reveal's clip once it has played: the letters lean outside the
     headline box, and the clip would slice them at the edges. */
  useLayoutEffect(() => {
    if (!revealed) return;

    measure();

    let cancelled = false;
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }

    const observer = new ResizeObserver(() => measure());
    if (h1Ref.current) observer.observe(h1Ref.current);
    window.addEventListener("resize", measure);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [revealed, measure]);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) hoveringRef.current = false;
      },
      { rootMargin: "160px" },
    );
    observer.observe(h1);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !revealed || !inView) return;

    let frame = 0;
    let running = true;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      phaseRef.current += dt;

      const metrics = metricsRef.current;
      if (metrics) {
        if (tapRef.current && now >= tapRef.current.until) {
          tapRef.current = null;
        }

        const tap = tapRef.current;
        const active =
          (hoveringRef.current && !holdRef.current) || tap !== null;
        const hoverK = 1 - Math.exp(-dt / 0.12);
        hoverAmountRef.current +=
          ((active ? 1 : 0) - hoverAmountRef.current) * hoverK;
        const hoverAmount = hoverAmountRef.current;

        const radius =
          Math.max(metrics.width * RADIUS_RATIO, RADIUS_MIN) *
          (1 - 0.2 * hoverAmount);
        const pull = PULL_REST + (PULL_HOVER - PULL_REST) * hoverAmount;

        let target = pathAt(metrics, phaseRef.current);
        if (tap) {
          target = tap.point;
        } else if (
          hoveringRef.current &&
          pointerRef.current &&
          !holdRef.current
        ) {
          target = pointerRef.current;
        }

        const sourceK = 1 - Math.exp(-dt / 0.15);
        const source = sourceRef.current;
        source.x += (target.x - source.x) * sourceK;
        source.y += (target.y - source.y) * sourceK;

        const heatK = 1 - Math.exp(-dt / 0.08);
        const leanK = 1 - Math.exp(-dt / 0.1);

        for (let index = 0; index < TOTAL; index += 1) {
          const letter = metrics.letters[index];
          const dx = source.x - letter.x;
          const dy = source.y - letter.y;
          const distance = Math.hypot(dx, dy);

          const targetHeat = smoothstep(
            clamp01(1 - distance / radius),
          );
          const heat = heatValues.current[index];
          heatValues.current[index] = heat + (targetHeat - heat) * heatK;

          let unitX = 0;
          let unitY = 0;
          if (distance > 0.5) {
            unitX = dx / distance;
            unitY = dy / distance;
          }

          const currentHeat = heatValues.current[index];
          const lean = leanValues.current[index];
          lean.x +=
            (unitX * pull * currentHeat - lean.x) * leanK;
          lean.y +=
            (unitY * pull * currentHeat - lean.y) * leanK;

          const element = letterRefs.current[index];
          const written = writtenLean.current[index];
          if (
            element &&
            (Math.abs(lean.x - written.x) > 0.01 ||
              Math.abs(lean.y - written.y) > 0.01)
          ) {
            element.style.transform = `translate3d(${lean.x.toFixed(2)}px, ${lean.y.toFixed(2)}px, 0)`;
            written.x = lean.x;
            written.y = lean.y;
          }

          const heatElement = heatRefs.current[index];
          if (
            heatElement &&
            Math.abs(currentHeat - writtenHeat.current[index]) > 0.002
          ) {
            heatElement.style.opacity = currentHeat.toFixed(3);
            writtenHeat.current[index] = currentHeat;
          }
        }
      }

      if (running) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, [reduce, revealed, inView]);

  /* A pointer held down is a text selection, not a hover. Releasing anywhere
     clears the hold so the magnet cannot stay inert after a drag. */
  useEffect(() => {
    const release = () => {
      holdRef.current = false;
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  const pointFromEvent = (event: ReactPointerEvent<HTMLHeadingElement>) => {
    const box = h1Ref.current?.getBoundingClientRect();
    if (!box) return null;
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  };

  if (reduce) {
    return (
      <h1 aria-label={site.name} className="text-hero-name mt-6 text-navy-900">
        {site.firstName.toUpperCase()}
        <br />
        {site.lastName.toUpperCase()}
      </h1>
    );
  }

  return (
    <h1
      ref={h1Ref}
      aria-label={site.name}
      className={cn(
        "hero-name text-hero-name mt-6 text-navy-900",
        !revealed && "overflow-hidden",
      )}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        pointerRef.current = pointFromEvent(event);
        hoveringRef.current = true;
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        pointerRef.current = pointFromEvent(event);
        hoveringRef.current = true;
      }}
      onPointerLeave={() => {
        hoveringRef.current = false;
        pointerRef.current = null;
      }}
      onPointerCancel={() => {
        holdRef.current = false;
        hoveringRef.current = false;
        pointerRef.current = null;
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch") {
          holdRef.current = true;
          return;
        }
        const point = pointFromEvent(event);
        if (point) {
          tapRef.current = {
            point,
            until: performance.now() + 1300,
          };
        }
      }}
      onPointerUp={() => {
        holdRef.current = false;
      }}
    >
      <motion.span
        className="block whitespace-nowrap pb-[0.07em] -mb-[0.07em]"
        initial={{ transform: "translateY(110%)" }}
        animate={
          started
            ? { transform: "translateY(0%)" }
            : { transform: "translateY(110%)" }
        }
        transition={{ duration: 0.42, delay: 0.06, ease: EASE }}
        onAnimationComplete={() => {
          if (started) setRevealed(true);
        }}
      >
        <span aria-hidden="true">
          {FIRST.map((letter, index) => (
            <span
              key={`first-${letter}-${index}`}
              ref={(element) => {
                letterRefs.current[index] = element;
              }}
              className="hero-name-letter"
            >
              <span className="hero-name-glyph">{letter}</span>
              <span
                ref={(element) => {
                  heatRefs.current[index] = element;
                }}
                aria-hidden="true"
                className="hero-name-heat"
              >
                {letter}
              </span>
            </span>
          ))}
          <br />
          {SECOND.map((letter, index) => {
            const slot = FIRST.length + index;
            return (
              <span
                key={`second-${letter}-${index}`}
                ref={(element) => {
                  letterRefs.current[slot] = element;
                }}
                className="hero-name-letter"
              >
                <span className="hero-name-glyph">{letter}</span>
                <span
                  ref={(element) => {
                    heatRefs.current[slot] = element;
                  }}
                  aria-hidden="true"
                  className="hero-name-heat"
                >
                  {letter}
                </span>
              </span>
            );
          })}
        </span>
      </motion.span>
    </h1>
  );
}
