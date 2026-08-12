import { engineering } from "../../content/engineering";
import { ArrowLink } from "../ui/ArrowLink";
import { FadeIn } from "../motion/FadeIn";
import { CaseSection } from "../work/CaseSection";

/**
 * 04 / COMPETITIVE PROGRAMMING — problem-solving discipline, not a dashboard.
 * The "40+" statement is the single site occurrence. Link ≥44px touch target;
 * only a restrained underline sweep is added on hover (.cp-arrow-link).
 */
export function CompetitiveProgrammingSection() {
  return (
    <CaseSection eyebrow="04 / COMPETITIVE PROGRAMMING" contentClassName="lg:col-span-10 lg:col-start-3">
      <FadeIn delay={0} duration={0.5} y={12}>
        <p className="text-mono-label text-orange-deep">{engineering.competitive.label}</p>
      </FadeIn>
      <FadeIn delay={0.08} duration={0.5} y={12}>
        <p className="mt-4 max-w-[58ch] text-lead text-navy-900">
          {engineering.competitive.statement}
        </p>
      </FadeIn>
      <FadeIn delay={0.16} duration={0.5} y={12}>
        <ArrowLink
          href={engineering.competitive.url}
          target="_blank"
          rel="noopener noreferrer"
          className="cp-arrow-link mt-5 min-h-11 items-center"
        >
          {engineering.competitive.linkLabel}
        </ArrowLink>
      </FadeIn>
    </CaseSection>
  );
}
