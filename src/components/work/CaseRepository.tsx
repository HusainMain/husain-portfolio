import { ArrowLink } from "../ui/ArrowLink";
import { FadeIn } from "../motion/FadeIn";

interface CaseRepositoryProps {
  repository: { url: string; evidence: string };
}

/** Repository section — verified link + evidence line, single entrance reveal. */
export function CaseRepository({ repository }: CaseRepositoryProps) {
  return (
    <FadeIn y={12} duration={0.5}>
      <ArrowLink href={repository.url} target="_blank" rel="noopener noreferrer">
        Repository
      </ArrowLink>
      <p className="text-mono-meta mt-4 max-w-[65ch] text-muted">
        {repository.evidence}
      </p>
    </FadeIn>
  );
}