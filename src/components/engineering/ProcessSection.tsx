import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";
import { Rule } from "../ui/Rule";

/**
 * 02 / PROCESS — four sequential engineering steps as editorial rows:
 * number | step title | supporting relationship, separated by hairlines.
 */
export function ProcessSection() {
  return (
    <CaseSection eyebrow="02 / PROCESS" contentClassName="lg:col-span-10 lg:col-start-3">
      <ol>
        {engineering.process.map((step, index) => (
          <li key={step.number}>
            <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 md:py-10">
              <span
                aria-hidden="true"
                className="text-mono-label col-span-2 text-orange md:col-span-1"
              >
                {step.number}
              </span>
              <h3 className="col-span-10 text-subsection text-navy-900 md:col-span-5">
                {step.title}
              </h3>
              <p className="col-span-12 col-start-3 text-muted md:col-span-6 md:col-start-7">
                {step.body}
              </p>
            </div>
            {index < engineering.process.length - 1 && <Rule />}
          </li>
        ))}
      </ol>
    </CaseSection>
  );
}
