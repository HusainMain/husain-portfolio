import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "../../lib/utils";

interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** Internal route; use instead of href for SPA navigation. */
  to?: string;
  /** Arrow direction. */
  dir?: "right" | "down";
  /** Rendered on a navy band. */
  tone?: "cream" | "navy";
}

/** Text link with an arrow that translates and turns orange on hover. */
export function ArrowLink({
  children,
  to,
  dir = "right",
  tone = "cream",
  className,
  ...rest
}: ArrowLinkProps) {
  const cls = cn(
    "arrow-link text-mono-label",
    tone === "navy" && "text-cream hover:text-orange-on-navy-hi",
    className,
  );
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className={cn("arrow", dir === "down" && "rotate-90")}>
        →
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={cls} {...rest}>
      {inner}
    </a>
  );
}
