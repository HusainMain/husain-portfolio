import { engineering } from "../content/engineering";
import { AiEngineeringSection } from "../components/engineering/AiEngineeringSection";
import { CompetitiveProgrammingSection } from "../components/engineering/CompetitiveProgrammingSection";
import { PhilosophySection } from "../components/engineering/PhilosophySection";
import { ProcessSection } from "../components/engineering/ProcessSection";
import { ToolkitSection } from "../components/engineering/ToolkitSection";
import { Rule } from "../components/ui/Rule";
import { FadeIn } from "../components/motion/FadeIn";
import { TextReveal } from "../components/motion/TextReveal";
import { usePageMeta } from "../lib/meta";

/**
 * /engineering — how Husain thinks and works. Page opening uses the approved
 * case-header grammar without a metadata rail; five numbered sections follow.
 */
export default function EngineeringPage() {
  usePageMeta({
    title: "Engineering — Husain Bardanwala",
    description:
      "How Husain Bardanwala works: problem framing, system architecture, AI as an accelerator, competitive programming, and verification by engineering judgment.",
    path: "/engineering",
  });

  return (
    <>
      <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
        <div className="grid-frame items-start">
          <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-8 lg:py-20">
            <FadeIn y={0} delay={0} duration={0.4}>
              <span aria-hidden="true" className="case-kicker-rule" />
            </FadeIn>
            <FadeIn y={8} delay={0.1} duration={0.45}>
              <p className="text-mono-label mt-6 text-orange-deep">{engineering.eyebrow}</p>
            </FadeIn>
            <TextReveal
              as="h1"
              delay={0.2}
              duration={0.55}
              className="case-title mt-4 text-navy-900"
            >
              Engineering
            </TextReveal>
            <FadeIn y={16} delay={0.36} duration={0.6}>
              <p className="text-lead mt-5 max-w-[55ch] text-muted">{engineering.lead}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <PhilosophySection />
      <ProcessSection />
      <AiEngineeringSection />
      <Rule />
      <CompetitiveProgrammingSection />
      <Rule />
      <ToolkitSection />
    </>
  );
}
