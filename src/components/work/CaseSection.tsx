import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Eyebrow } from "../ui/Eyebrow";

interface CaseSectionProps {
  eyebrow: string;
  children: ReactNode;
  className?: string;
  /**
   * Override the lg placement of the content cell inside the frame-aligned
   * inner grid. Default: frame cols 3–10 (the reading spine). Sections with
   * wide content use:
   * - 04 / 06 → "lg:col-span-10 lg:col-start-3" (frame cols 3–12)
   * - 05      → "lg:col-span-12 lg:col-start-1" (frame cols 1–12, so its own
   *             inner grid aligns exactly with the frame columns)
   */
  contentClassName?: string;
}

/**
 * Numbered document section — the section label anchors the left spine at the
 * top of the section and carries a full-frame hairline (the "02 / PROBLEM ────"
 * header row) at md+. The reading content sits below on the wide spine
 * (default frame cols 3–10). Below lg the label stacks above the body.
 * Hairline transition via .case-section.
 */
export function CaseSection({
  eyebrow,
  children,
  className,
  contentClassName,
}: CaseSectionProps) {
  const content = contentClassName
    ? cn("col-span-12 mt-6 md:mt-8 lg:mt-10", contentClassName)
    : "col-span-12 mt-6 md:mt-8 lg:col-span-8 lg:col-start-3 lg:mt-10";
  return (
    <section className={cn("case-section", className)}>
      <div className="grid-frame">
        <div className="col-span-4 mt-6 md:col-span-6 md:col-start-2 md:mt-8 lg:col-span-12 lg:col-start-1 lg:mt-0">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 flex items-baseline gap-6">
              <Eyebrow as="h2" className="shrink-0">
                {eyebrow}
              </Eyebrow>
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-rule-on-cream md:block"
              />
            </div>
            <div className={content}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
