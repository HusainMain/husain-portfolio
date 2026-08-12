import { about } from "../../content/about";
import { CaseSection } from "../work/CaseSection";
import { Rule } from "../ui/Rule";
import { FadeIn } from "../motion/FadeIn";

/**
 * 03 / APPROACH — four compact engineering principles as an editorial
 * numbered list (hairline-separated, no cards): number in orange mono,
 * principle in display type, one-line statement on the reading spine.
 *
 * Entrance: content rows fade in with a small rise (FadeIn stagger);
 * reduced-motion users see the list static and complete.
 */
export function ApproachSection() {
  return (
    <CaseSection eyebrow="03 / APPROACH" contentClassName="lg:col-span-10 lg:col-start-3">
      <ol>
        {about.approach.map((principle, index) => (
          <li key={principle.number}>
            <FadeIn y={10} delay={index * 0.08}>
              <div className="approach-row grid grid-cols-12 gap-x-6 gap-y-2 py-8 md:py-10">
                <p className="approach-num text-mono-label col-span-12 text-orange md:col-span-2 md:col-start-1">
                  {principle.number}
                </p>
                <h3 className="text-subsection col-span-12 text-navy-900 md:col-span-4 md:col-start-2">
                  {principle.title}
                </h3>
                <p className="col-span-12 max-w-[52ch] text-muted md:col-span-11 md:col-start-2">
                  {principle.description}
                </p>
              </div>
            </FadeIn>
            {index < about.approach.length - 1 && <Rule />}
          </li>
        ))}
      </ol>
    </CaseSection>
  );
}