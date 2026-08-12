import { FadeIn } from "../motion/FadeIn";

interface CaseReflectionProps {
  reflection: { pullLine: string; body: string };
}

/** Reflection section — pull-line first, supporting body after. Calm. */
export function CaseReflection({ reflection }: CaseReflectionProps) {
  return (
    <div>
      <FadeIn y={12} duration={0.5}>
        <p className="font-serif text-[clamp(1.375rem,2.2vw,1.75rem)] font-normal italic leading-[1.35] text-orange-deep">
          {reflection.pullLine}
        </p>
      </FadeIn>
      <FadeIn y={12} delay={0.14} duration={0.5}>
        <p className="case-body mt-5 max-w-[72ch] text-muted">{reflection.body}</p>
      </FadeIn>
    </div>
  );
}