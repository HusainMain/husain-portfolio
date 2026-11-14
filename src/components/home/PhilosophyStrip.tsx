import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { WordReveal } from "../motion/WordReveal";

/**
 * How I Think — the compressed engineering philosophy (§7.5).
 *
 * Phase 7: the statement lights word by word as it scrolls (the reel's
 * "Text reveal" idiom) instead of sliding in as one masked block. The ramp is
 * scrubbed, so the sentence lands at reading speed. Serif accents keep their
 * colour; the words around them dim and light with the rest.
 */
export function PhilosophyStrip() {
  return (
    <Section eyebrow={home.philosophyEyebrow} className="bg-canvas">
      <div className="col-span-12 md:col-span-8 lg:col-span-11">
        <WordReveal className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-navy-900">
          {home.philosophy}
          <em className="text-serif-accent text-orange-deep">{home.philosophyAccent1}</em>
          {home.philosophyAccent2}
          <em className="text-serif-accent text-orange-deep">{home.philosophyAccent3}</em>
          {home.philosophyTail}
        </WordReveal>
      </div>
    </Section>
  );
}
