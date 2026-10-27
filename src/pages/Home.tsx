import { Hero } from "../components/home/Hero";
import { BuildStatements } from "../components/home/BuildStatements";
import { WorkIndex } from "../components/home/WorkIndex";
import { PhilosophyStrip } from "../components/home/PhilosophyStrip";
import { Capabilities } from "../components/home/Capabilities";
import { Contributions } from "../components/home/Contributions";
import { ContactBand } from "../components/home/ContactBand";
import { BrandTransition } from "../components/motion/BrandTransition";
import { useBrandReveal } from "../lib/brandReveal";
import { usePageMeta } from "../lib/meta";

export default function Home() {
  usePageMeta({
    title: "Husain Bardanwala — Software Engineer | Intelligent Systems Builder",
    description:
      "Software engineer building full-stack products and AI-enabled systems. Four projects documented as case studies with context, constraints, decisions and trade-offs.",
    path: "/",
  });

  const { brandVisible, heroStarted, handleHero, handleComplete } = useBrandReveal();

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
