import { cn } from "../../lib/utils";

interface EyebrowProps {
  children: string;
  /** "navy" renders orange-on-navy (for use on navy bands); otherwise orange-deep on cream. */
  tone?: "cream" | "navy";
  /** Render as a heading (section label) or paragraph. */
  as?: "p" | "h2";
  className?: string;
}

/** Mono uppercase section label. DESIGN_SYSTEM.md §4 — text-mono-label. */
export function Eyebrow({
  children,
  tone = "cream",
  as: Tag = "p",
  className,
}: EyebrowProps) {
  const color = tone === "navy" ? "text-orange-on-navy" : "text-orange-deep";
  return <Tag className={cn("text-mono-label", color, className)}>{children}</Tag>;
}
