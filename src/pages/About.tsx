import { AboutIntro } from "../components/about/AboutIntro";
import { CurrentlyLine } from "../components/about/CurrentlyLine";
import { FactsRow } from "../components/about/FactsRow";

/**
 * /about — facts and current ownership (SITE_MAP.md §8).
 * No biography beyond the approved owner facts.
 */
export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <FactsRow />
      <CurrentlyLine />
    </>
  );
}
