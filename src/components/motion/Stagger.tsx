import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";

interface StaggerProps {
  children: ReactNode | ReactNode[];
  className?: string;
  /** Delay between items in ms. */
  step?: number;
  /** Base delay in ms applied before the first item starts. */
  delay?: number;
  /** Travel distance in px while fading in. */
  y?: number;
  as?: "div" | "ol" | "ul" | "nav" | "section";
}

/**
 * Staggered entrance reveal: direct children fade + rise in sequence when the
 * container scrolls into view. Children are cloned, not wrapped — the list /
 * grid semantics of the container and each child's own classes are preserved
 * (each child receives `.stagger-item` and an `--i` delay index). Timing is
 * driven by CSS custom properties, so it composes with `.reveal`-style
 * transitions and the global reduced-motion gate. Reduced-motion safe:
 * renders fully visible.
 */
export function Stagger({
  children,
  className,
  step = 80,
  delay = 0,
  y = 16,
  as: Tag = "div",
}: StaggerProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const items = Children.toArray(children);
  const style = {
    "--stagger-step": `${step}ms`,
    "--stagger-delay": `${delay}ms`,
    "--stagger-y": `${y}px`,
  } as CSSProperties;

  return (
    <Tag ref={ref as never} className={cn("stagger", visible && "is-visible", className)} style={style}>
      {items.map((child, i) => {
        if (!isValidElement(child) || child.type === Fragment) return child;
        const element = child as ReactElement<{ className?: string; style?: CSSProperties }>;
        return cloneElement(element, {
          className: cn(element.props.className, "stagger-item"),
          style: { "--i": i, ...(element.props.style ?? {}) } as CSSProperties,
        });
      })}
    </Tag>
  );
}