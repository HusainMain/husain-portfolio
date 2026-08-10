import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface TagProps {
  children: string;
  tone?: "cream" | "navy";
  className?: string;
}

/** Mono chip with hairline border. DESIGN_SYSTEM.md §3.4. */
export function Tag({ children, tone = "cream", className }: TagProps) {
  return (
    <span className={cn("chip", tone === "navy" && "chip-navy", className)}>{children}</span>
  );
}

export function TagRow({
  items,
  tone = "cream",
  className,
}: {
  items: string[];
  tone?: "cream" | "navy";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <Tag key={item} tone={tone}>
          {item}
        </Tag>
      ))}
    </div>
  );
}

export function MetaTags({ items, tone }: { items: ReactNode[]; tone?: "cream" | "navy" }) {
  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-1")}>
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "text-mono-tag",
            tone === "navy" ? "text-orange-on-navy" : "text-orange-deep",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
