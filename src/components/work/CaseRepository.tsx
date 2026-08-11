import { ArrowLink } from "../ui/ArrowLink";

interface CaseRepositoryProps {
  repository: { url: string; evidence: string };
}

/** Repository section — verified link + evidence line. */
export function CaseRepository({ repository }: CaseRepositoryProps) {
  return (
    <div>
      <ArrowLink href={repository.url} target="_blank" rel="noopener noreferrer">
        Repository
      </ArrowLink>
      <p className="text-mono-meta mt-4 max-w-[65ch] text-muted">
        {repository.evidence}
      </p>
    </div>
  );
}
