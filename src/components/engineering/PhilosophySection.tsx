import { motion, useReducedMotion } from "motion/react";
import { engineering } from "../../content/engineering";
import { Parallax } from "../motion/Parallax";
import { TextReveal } from "../motion/TextReveal";
import { CaseSection } from "../work/CaseSection";

/**
 * 01 / HOW I THINK — the verified philosophy statement: large editorial
 * paragraph, Instrument Serif italic accents in restrained orange, contained
 * readable measure. Reveals as a single masked block (Phase 6); the serif
 * accents receive a slightly delayed emphasis. Very small parallax depth on
 * desktop only (halved on tablet, disabled on mobile and reduced-motion).
 */
export function PhilosophySection() {
  const reduce = useReducedMotion();

  return (
    <CaseSection eyebrow="01 / HOW I THINK" contentClassName="lg:col-span-10 lg:col-start-2">
      <Parallax distance={7}>
        <TextReveal
          as="p"
          duration={0.8}
          className="engineering-philosophy max-w-[46ch] text-navy-900"
        >
          {engineering.philosophy.map((segment) =>
            segment.accent ? (
              <motion.em
                key={segment.text}
                className="text-serif-accent text-orange-deep"
                initial={reduce ? undefined : { opacity: 0.25 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
              >
                {segment.text}
              </motion.em>
            ) : (
              <span key={segment.text}>{segment.text}</span>
            ),
          )}
        </TextReveal>
      </Parallax>
    </CaseSection>
  );
}
