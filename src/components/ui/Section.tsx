import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionProps {
  eyebrow?: string;
  eyebrowTone?: "cream" | "navy";
  title?: ReactNode;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  id?: string;
}

/** Editorial page section: optional eyebrow + heading + hairline discipline. */
export function Section({
  eyebrow,
  eyebrowTone = "cream",
  title,
  className,
  containerClassName,
  children,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("section-pad", className)}>
      <div className={cn("grid-frame", containerClassName)}>
        {(eyebrow || title) && (
          <div className="col-span-12 md:col-span-8 lg:col-span-12">
            {eyebrow ? (
              <Eyebrow as="h2" tone={eyebrowTone}>
                {eyebrow}
              </Eyebrow>
            ) : null}
            {title ? <h2 className="text-section-title mt-4">{title}</h2> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
