import { AboutIntro } from "../components/about/AboutIntro";
import { FactsRow } from "../components/about/FactsRow";
import { PathSection } from "../components/about/PathSection";
import { BrandTransition } from "../components/motion/BrandTransition";
import { useBrandReveal } from "../lib/brandReveal";
import { usePageMeta } from "../lib/meta";

/**
 * /about — who I am (intro + system flow), profile facts, and the dated path
 * of the work through to what comes next. No biography beyond the approved
 * owner facts; the engineering process lives on /engineering.
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
      "Who Husain Bardanwala is: computer engineering at SVIT, the path from a first build to leading a hackathon team, and the software engineering internship he is seeking next.",
    path: "/about",
  });

  const { brandVisible, heroStarted, handleHero, handleComplete } = useBrandReveal();

  return (
    <>
      <AboutIntro started={heroStarted} />
      <FactsRow />
      <PathSection />
      {brandVisible && (
        <BrandTransition onHero={handleHero} onComplete={handleComplete} />
      )}
    </>
  );
}
