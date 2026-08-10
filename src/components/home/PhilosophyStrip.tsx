import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { Reveal } from "../motion/Reveal";

/** How I Think — compressed philosophy + process micro-line (§7.5). */
export function PhilosophyStrip() {
  return (
    <Section eyebrow={home.philosophyEyebrow} className="bg-canvas">
      <div className="col-span-12 md:col-span-8 lg:col-span-11">
        <Reveal>
          <p className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-navy-900">
            {home.philosophy}
            <em className="text-serif-accent text-orange-deep">{home.philosophyAccent1}</em>
            {home.philosophyAccent2}
            <em className="text-serif-accent text-orange-deep">{home.philosophyAccent3}</em>
            {home.philosophyTail}
          </p>
        </Reveal>
      </div>

      <div className="col-span-12 md:col-span-8 lg:col-span-10">
        <Reveal delay={120}>
          <ol className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-mono-meta text-muted">
            {home.process.map((step) => (
              <li key={step.number} className="flex items-baseline gap-2">
                <span aria-hidden="true" className="text-orange">
                  {step.number}
                </span>
                <span className="uppercase tracking-[0.06em]">{step.title}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
