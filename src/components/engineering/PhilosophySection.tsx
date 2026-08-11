import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";

/**
 * 01 / HOW I THINK — the verified philosophy statement: large editorial
 * paragraph, Instrument Serif italic accents in restrained orange, contained
 * readable measure. No decorative animation in Phase 5.
 */
export function PhilosophySection() {
  return (
    <CaseSection eyebrow="01 / HOW I THINK" contentClassName="lg:col-span-10 lg:col-start-2">
      <p className="engineering-philosophy max-w-[46ch] text-navy-900">
        {engineering.philosophy.map((segment) =>
          segment.accent ? (
            <em key={segment.text} className="text-serif-accent text-orange-deep">
              {segment.text}
            </em>
          ) : (
            <span key={segment.text}>{segment.text}</span>
          ),
        )}
      </p>
    </CaseSection>
  );
}
