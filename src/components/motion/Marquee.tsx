import { type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface MarqueeProps {
  /** Items rendered in uppercase mono type. */
  items: string[];
  /** Travel direction: "left" scrolls right → left (default), "right" scrolls left → right. */
  direction?: "left" | "right";
  /** Seconds for one full loop. */
  speed?: number;
  /** Glyph rendered between items (rendered trailing too, keeping the seam seamless). */
  separator?: ReactNode;
  /** How many times the item set repeats per half — enough to exceed any viewport width. */
  repeats?: number;
  className?: string;
}

/**
 * Continuous editorial ticker. Pure CSS transform animation: the track holds
 * two identical halves and sweeps exactly half its own width, so the loop is
 * seamless (no jump, no reset, no drift). GPU-composited `translate3d` only —
 * nothing layout-based is animated. Static under prefers-reduced-motion; the
 * content stays visible and the layout is unchanged.
 */
export function Marquee({
  items,
  direction = "left",
  speed = 50,
  separator = "•",
  repeats = 10,
  className,
}: MarqueeProps) {
  const group = Array.from({ length: repeats }, (_, r) =>
    items.flatMap((item, i) => [
      <span key={`${r}-${i}`} className="marquee-item text-mono-label text-cream/80">
        {item}
      </span>,
      <span key={`${r}-${i}-sep`} className="marquee-sep text-cream/50" aria-hidden="true">
        {separator}
      </span>,
    ]),
  );

  return (
    <div className={cn("marquee", className)} data-direction={direction} aria-hidden="true">
      <div className="marquee-track" style={{ "--marquee-duration": `${speed}s` } as CSSProperties}>
        <div className="marquee-group">{group}</div>
        <div className="marquee-group" aria-hidden="true">
          {group}
        </div>
      </div>
    </div>
  );
}