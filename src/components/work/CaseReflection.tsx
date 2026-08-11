interface CaseReflectionProps {
  reflection: { pullLine: string; body: string };
}

/** Reflection section — serif-italic pull-line + muted sentences. Calm. */
export function CaseReflection({ reflection }: CaseReflectionProps) {
  return (
    <div>
      <p className="font-serif text-[clamp(1.375rem,2.2vw,1.75rem)] font-normal italic leading-[1.35] text-orange-deep">
        {reflection.pullLine}
      </p>
      <p className="case-body mt-5 max-w-[72ch] text-muted">{reflection.body}</p>
    </div>
  );
}
