import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import {
  prefersReducedMotion,
  syncLenisWithGsap,
  unsyncLenisWithGsap,
} from "../../lib/motion";

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    syncLenisWithGsap(lenis);
    return () => unsyncLenisWithGsap(lenis);
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced] = useState(prefersReducedMotion);

  if (reduced) return children;

  return (
    <ReactLenis root options={{ autoRaf: false }}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
