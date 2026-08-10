import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  id?: string;
  style?: CSSProperties;
}

export function Container({
  children,
  className,
  as: Tag = "div",
  id,
  style,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn("grid-frame", className)} style={style}>
      {children}
    </Tag>
  );
}
