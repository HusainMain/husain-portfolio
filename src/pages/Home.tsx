import { useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "../components/home/Hero";
import { BuildStatements } from "../components/home/BuildStatements";
import { WorkIndex } from "../components/home/WorkIndex";
import { PhilosophyStrip } from "../components/home/PhilosophyStrip";
import { Capabilities } from "../components/home/Capabilities";
import { Contributions } from "../components/home/Contributions";
import { ContactBand } from "../components/home/ContactBand";
import { BrandTransition } from "../components/motion/BrandTransition";
import { prefersReducedMotion } from "../lib/motion";

export default function Home() {
  const [heroStarted, setHeroStarted] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const decidedRef = useRef(false);

  useEffect(() => {
    if (decidedRef.current) return;
    decidedRef.current = true;
    if (prefersReducedMotion()) {
      setHeroStarted(true);
      return;
    }
    if (sessionStorage.getItem("hp-brand-shown")) {
      setHeroStarted(true);
      return;
    }
    sessionStorage.setItem("hp-brand-shown", "1");
    setBrandVisible(true);
  }, []);

  const handleHero = useCallback(() => setHeroStarted(true), []);
  const handleComplete = useCallback(() => setBrandVisible(false), []);

  return (
    <>
      <Hero started={heroStarted} />
      <BuildStatements />
      <WorkIndex />
      <PhilosophyStrip />
      <Capabilities />
      <Contributions />
      <ContactBand />
      {brandVisible && (
        <BrandTransition onHero={handleHero} onComplete={handleComplete} />
      )}
    </>
  );
}
