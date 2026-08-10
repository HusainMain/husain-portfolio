import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router";
import { cn } from "../../lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  /** Internal route; use instead of href for SPA navigation. */
  to?: string;
}

/** Primary CTA — navy fill, cream text, orange arrow. DESIGN_SYSTEM.md §3.4. */
export function Button({ children, className, to, ...rest }: ButtonProps) {
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="arrow">
        →
      </span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cn("btn-primary", className)}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={cn("btn-primary", className)} {...rest}>
      {inner}
    </a>
  );
}
