import { engineering } from "../content/engineering";
import { AiEngineeringSection } from "../components/engineering/AiEngineeringSection";
import { CompetitiveProgrammingSection } from "../components/engineering/CompetitiveProgrammingSection";
import { PhilosophySection } from "../components/engineering/PhilosophySection";
import { ProcessSection } from "../components/engineering/ProcessSection";
import { ToolkitSection } from "../components/engineering/ToolkitSection";
import { Reveal } from "../components/motion/Reveal";

/**
 * /engineering — how Husain thinks and works. Page opening uses the approved
 * case-header grammar without a metadata rail; five numbered sections follow.
 */
export default function EngineeringPage() {
  return (
    <>
      <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
        <div className="grid-frame items-start">
          <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-8 lg:py-20">
            <Reveal>
              <span aria-hidden="true" className="case-kicker-rule" />
            </Reveal>
            <Reveal delay={60}>
              <p className="text-mono-label mt-6 text-orange-deep">{engineering.eyebrow}</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="case-title mt-4 text-navy-900">Engineering</h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-lead mt-5 max-w-[55ch] text-muted">{engineering.lead}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <PhilosophySection />
      <ProcessSection />
      <AiEngineeringSection />
      <CompetitiveProgrammingSection />
      <ToolkitSection />
    </>
  );
}
