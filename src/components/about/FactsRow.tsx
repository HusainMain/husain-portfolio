import { about } from "../../content/about";
import { CaseSection } from "../work/CaseSection";

/**
 * 01 / FACTS — hairline-separated facts row spanning the full frame width.
 * CGPA 8.48/10 lives here: the single site occurrence.
 * Desktop 4 columns · tablet 2×2 · mobile 2×2, no horizontal overflow.
 */
export function FactsRow() {
  return (
    <CaseSection eyebrow="01 / FACTS" contentClassName="lg:col-span-12 lg:col-start-1">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-rule-on-cream pt-10 lg:grid-cols-4">
        {about.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-mono-label text-muted">{fact.label}</dt>
            <dd className="mt-3 text-subsection text-navy-900">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </CaseSection>
  );
}
