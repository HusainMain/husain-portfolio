import { cn } from "../../lib/utils";

interface RuleProps {
  tone?: "cream" | "navy" | "orange";
  className?: string;
}

/** Hairline divider. */
export function Rule({ tone = "cream", className }: RuleProps) {
  const cls =
    tone === "navy" ? "rule-navy" : tone === "orange" ? "rule-orange" : "rule-cream";
  return <hr aria-hidden="true" className={cn(cls, "w-full", className)} />;
}
