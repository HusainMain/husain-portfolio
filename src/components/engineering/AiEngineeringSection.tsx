import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";

/**
 * 03 / AI-ASSISTED ENGINEERING — honest practice statement. Prose column
 * (frame cols 3–8) states how AI fits the workflow; the well (frame cols
 * 9–12) lists where human judgment stays. On tablet/mobile the well stacks.
 */
export function AiEngineeringSection() {
  return (
    <CaseSection eyebrow="03 / AI-ASSISTED ENGINEERING" contentClassName="lg:col-span-12 lg:col-start-1">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-3">
          <p className="text-mono-label text-orange-deep">AI ACCELERATES</p>
          {engineering.ai.prose.map((paragraph) => (
            <p key={paragraph} className="case-body max-w-[72ch] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="case-well">
            <p className="text-mono-label text-muted">JUDGMENT STAYS HUMAN</p>
            <ul className="mt-5 flex flex-col gap-3">
              {engineering.ai.judgment.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="text-orange">
                    —
                  </span>
                  <span className="text-mono-meta text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
