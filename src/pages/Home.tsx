import { Hero } from "../components/home/Hero";
import { BuildStatements } from "../components/home/BuildStatements";
import { WorkIndex } from "../components/home/WorkIndex";
import { PhilosophyStrip } from "../components/home/PhilosophyStrip";
import { Capabilities } from "../components/home/Capabilities";
import { Contributions } from "../components/home/Contributions";
import { ContactBand } from "../components/home/ContactBand";

export default function Home() {
  return (
    <>
      <Hero />
      <BuildStatements />
      <WorkIndex />
      <PhilosophyStrip />
      <Capabilities />
      <Contributions />
      <ContactBand />
    </>
  );
}
