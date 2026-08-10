import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { Rule } from "../ui/Rule";
import { Reveal } from "../motion/Reveal";

/** What I Build — three verb statements (DESIGN_SYSTEM.md §7.3). */
export function BuildStatements() {
  return (
    <Section eyebrow={home.whatIBuildEyebrow} className="bg-canvas">
      <ul className="col-span-12 md:col-span-8 lg:col-span-12">
        {home.whatIBuild.map((item, index) => (
          <li key={item.number}>
            <Reveal delay={index * 80}>
              <div className="flex items-baseline gap-6 py-7 md:gap-10 md:py-8">
                <span aria-hidden="true" className="text-mono-label shrink-0 text-orange">
                  {item.number}
                </span>
                <p className="text-lead text-navy-900 md:text-[clamp(1.375rem,2.4vw,2rem)] md:leading-[1.2]">
                  {item.statement}
                  <em className="text-serif-accent text-orange-deep">{item.accent}</em>
                </p>
              </div>
            </Reveal>
            {index < home.whatIBuild.length - 1 && <Rule />}
          </li>
        ))}
      </ul>
    </Section>
  );
}
