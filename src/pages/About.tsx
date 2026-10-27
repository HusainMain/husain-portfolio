import { AboutIntro } from "../components/about/AboutIntro";
import { ApproachSection } from "../components/about/ApproachSection";
import { FactsRow } from "../components/about/FactsRow";
import { NowSection } from "../components/about/NowSection";
import { Rule } from "../components/ui/Rule";
import { BrandTransition } from "../components/motion/BrandTransition";
import { useBrandReveal } from "../lib/brandReveal";
import { usePageMeta } from "../lib/meta";

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
  usePageMeta({
    title: "About — Husain Bardanwala",
    description:
      "Who Husain Bardanwala is: what he is building now, the profile facts behind the work, and the engineering approach he brings to every project.",
    path: "/about",
  });

  const { brandVisible, heroStarted, handleHero, handleComplete } = useBrandReveal();

  return (
    <>
      <AboutIntro started={heroStarted} />
      <FactsRow />
      <NowSection />
      <Rule />
      <ApproachSection />
      {brandVisible && (
        <BrandTransition onHero={handleHero} onComplete={handleComplete} />
      )}
    </>
  );
}