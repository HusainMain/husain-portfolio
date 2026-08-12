import { useCallback, useEffect, useRef, useState } from "react";
import { AboutIntro } from "../components/about/AboutIntro";
import { ApproachSection } from "../components/about/ApproachSection";
import { FactsRow } from "../components/about/FactsRow";
import { NowSection } from "../components/about/NowSection";
import { BrandTransition } from "../components/motion/BrandTransition";
import { prefersReducedMotion } from "../lib/motion";

/**
 * /about — who I am (intro + system flow), profile facts, what I am building
 * now, and how I approach engineering. No biography beyond the approved
 * owner facts.
 *
 * The global one-shot brand transition (Phase 6) participates here with the
 * same sessionStorage gate as the homepage, so it plays only on the very
 * first page visited per session and never replays on navigation. Reduced
 * motion skips it entirely and the hero renders immediately.
 */
export default function AboutPage() {
  const [heroStarted, setHeroStarted] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const decidedRef = useRef(false);

  useEffect(() => {
    if (decidedRef.current) return;
    decidedRef.current = true;
    if (prefersReducedMotion() || window.sessionStorage.getItem("hp-brand-shown")) {
      setHeroStarted(true);
      return;
    }
    window.sessionStorage.setItem("hp-brand-shown", "1");
    setBrandVisible(true);
  }, []);

  const handleHero = useCallback(() => setHeroStarted(true), []);
  const handleComplete = useCallback(() => setBrandVisible(false), []);

  return (
    <>
      <AboutIntro started={heroStarted} />
      <FactsRow />
      <NowSection />
      <ApproachSection />
      {brandVisible && (
        <BrandTransition onHero={handleHero} onComplete={handleComplete} />
      )}
    </>
  );
}