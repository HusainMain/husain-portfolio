import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { about } from "../../content/about";
import { FadeIn } from "../motion/FadeIn";
import { Parallax } from "../motion/Parallax";
import { TextReveal } from "../motion/TextReveal";
import { SystemFlowDiagram } from "./SystemFlowDiagram";

/**
 * About page opening — editorial two-column composition: kicker rule + ABOUT
 * eyebrow + large headline + lead + philosophy on the left reading spine, and
 * a quiet SYSTEM FLOW cycle (IDEA → PROTOTYPE → SYSTEM → SHIP → LEARN, then
 * back to IDEA) on the right at lg+. The cycle reflows below the prose on
 * smaller viewports. Decorative only (aria-hidden), typed in the content layer.
 *
 * Entrance (Phase 6): kicker → eyebrow → masked heading → lead → paragraphs,
 * gated on `started` so the global one-shot brand transition can hand over
 * to the editorial hero on first visit. Parallax is desktop-only, ≤10px,
 * and never touches the body paragraphs.
 *
 * Serif accents inside the philosophy paragraphs receive the same delayed
 * emphasis as engineering's 01 / HOW I THINK (0.25 → 1 opacity, ~0.45s after
 * the paragraph lands); reduced-motion users see them at full opacity.
 *
 * The phrase "engineering judgment" receives a single hand-drawn underline
 * (rough-notation) when it scrolls into view — the only hand-drawn mark on
 * the site.
 */
export function AboutIntro({ started = true }: { started?: boolean }) {
  const reduce = useReducedMotion();
  const judgmentRef = useRef<HTMLElement>(null);
  const judgmentInView = useInView(judgmentRef, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    const el = judgmentRef.current;
    if (!el || !judgmentInView) return;

    /* One stroke, drawn just under the descenders. Negative right/bottom
       padding keeps the line flush with the last glyph and close to the
       baseline — the default box leaves it floating in the leading. */
    const annotation = annotate(el, {
      type: "underline",
      color: "#c4571f",
      strokeWidth: 2,
      iterations: 1,
      padding: [0, -5, -3, 0],
      animate: !reduce,
      animationDuration: reduce ? 0 : 650,
    });
    annotation.show();
    return () => annotation.remove();
  }, [judgmentInView, reduce]);

  return (
    <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame items-start">
        <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-7 lg:py-24">
          {/* Upper editorial marker: kicker + eyebrow travel together,
              at a slightly different scroll rate than the body. */}
          <Parallax distance={6} className="w-fit">
            <FadeIn started={started} duration={0.3} y={8}>
              <span aria-hidden="true" className="case-kicker-rule" />
            </FadeIn>
            <FadeIn started={started} delay={0.1} duration={0.3} y={8}>
              <p className="text-mono-label mt-6 text-orange-deep">{about.eyebrow}</p>
            </FadeIn>
          </Parallax>

          {/* Headline: masked line reveal on its own plane. */}
          <Parallax distance={10} className="mt-4">
            <TextReveal
              as="h1"
              started={started}
              delay={0.15}
              duration={0.55}
              className="case-title text-navy-900"
              innerClassName="max-w-[18em]"
            >
              {about.headline}
            </TextReveal>
          </Parallax>

          {/* Lead: barely-perceptible differential against the heading. */}
          <Parallax distance={7} className="mt-5">
            <FadeIn started={started} delay={0.35} duration={0.42} y={8}>
              <p className="text-lead max-w-[52ch] text-muted">{about.lead}</p>
            </FadeIn>
          </Parallax>

          {/* Body paragraphs: subtle fade + ≤12px rise, no parallax.
              Serif accents emphasize with the engineering choreography. */}
          <div className="mt-10 flex flex-col gap-4">
            {about.intro.map((paragraph, index) => (
              <FadeIn
                key={paragraph[0].text}
                started={started}
                delay={0.5 + index * 0.1}
                duration={0.4}
                y={12}
              >
                <p className="about-intro max-w-[58ch] text-muted">
                  {paragraph.map((segment) =>
                    segment.accent ? (
                      <motion.em
                        ref={segment.text === "engineering judgment" ? judgmentRef : undefined}
                        key={segment.text}
                        className="text-serif-accent text-orange-deep"
                        initial={reduce ? undefined : { opacity: 0.25 }}
                        animate={started ? { opacity: 1 } : { opacity: 0.25 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.45 + index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        {segment.text}
                      </motion.em>
                    ) : (
                      <span key={segment.text}>{segment.text}</span>
                    ),
                  )}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Right spine at lg+: the system-flow cycle. Flows below the prose
            on mobile/tablet (DOM order), never dominates the content. */}
        <div className="col-span-4 pb-12 md:col-span-8 md:pb-16 lg:col-span-4 lg:col-start-9 lg:pt-52 lg:pb-16">
          <FadeIn started={started} delay={0.45} duration={0.5} y={10}>
            <SystemFlowDiagram stages={about.systemFlow} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}