import { useCallback, useEffect, useState } from "react";
import { prefersReducedMotion } from "./motion";

const KEY = "hp-brand-shown";

/**
 * Read-only check — safe to call during render and in StrictMode (which
 * double-invokes state initialisers). Never writes.
 */
function brandAlreadyShown(): boolean {
  if (typeof window === "undefined") return true;
  if (prefersReducedMotion()) return true;
  return window.sessionStorage.getItem(KEY) === "1";
}

export interface BrandReveal {
  /** Render the one-shot brand overlay. */
  brandVisible: boolean;
  /** The hero's entrance may run. */
  heroStarted: boolean;
  /** Fired when the overlay's wipe begins. */
  handleHero: () => void;
  /** Fired when the overlay has fully left. */
  handleComplete: () => void;
}

/**
 * First-visit choreography shared by Home, About and Work: the brand stamp
 * plays once per session and the hero waits for it; returning visitors and
 * reduced-motion users get the hero immediately.
 *
 * The decision is made during the first render rather than in an effect, so
 * the overlay and the hero mount in the same frame. Deciding in an effect
 * renders one frame of un-revealed page before the overlay appears.
 */
export function useBrandReveal(): BrandReveal {
  const [brandVisible, setBrandVisible] = useState(() => !brandAlreadyShown());
  const [heroStarted, setHeroStarted] = useState(() => brandAlreadyShown());

  useEffect(() => {
    if (brandVisible) window.sessionStorage.setItem(KEY, "1");
  }, [brandVisible]);

  const handleHero = useCallback(() => setHeroStarted(true), []);
  const handleComplete = useCallback(() => setBrandVisible(false), []);

  return { brandVisible, heroStarted, handleHero, handleComplete };
}
