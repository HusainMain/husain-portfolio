import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { TagRow } from "../ui/Tag";
import { ArrowLink } from "../ui/ArrowLink";
import { FadeIn } from "../motion/FadeIn";
import { Stagger } from "../motion/Stagger";

/**
 * Capabilities — four grouped statements with mono tags, on a surface well (§7.6).
 *
 * Entrance (Phase 6): one container stagger, not four independent viewport
 * observers. Four `FadeIn`s with `index * 60ms` only read as a sequence while
 * all four happen to be on screen together; on a phone each item enters alone,
 * so the step becomes a lag after arrival. A single `Stagger` keeps the
 * sequence intact at every viewport. Tier C: 24px rise, 70ms step.
 */
export function Capabilities() {
  return (
    <Section eyebrow={home.capabilitiesEyebrow} className="bg-canvas">
      <div className="col-span-12 border border-rule-on-cream bg-surface-2 p-6 md:col-span-8 md:p-10 lg:col-span-12">
        <Stagger
          step={70}
          y={24}
          className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2"
        >
          {home.capabilities.map((group) => (
            <div key={group.title}>
              <div className="border-b border-rule-on-cream pb-8 md:border-0 md:pb-0 hover:-translate-y-[2px] transition-transform duration-200">
                <h3 className="text-subsection text-navy-900">{group.title}</h3>
                <p className="mt-3 max-w-[46ch] text-muted">{group.statement}</p>
                <TagRow items={group.tags} className="mt-5" />
              </div>
            </div>
          ))}
        </Stagger>

        <FadeIn delay={0.3} y={16} duration={0.6}>
          <div className="mt-10 flex justify-end border-t border-rule-on-cream pt-5">
            <ArrowLink to={home.capabilitiesToolkitLink.href} className="min-h-11 items-center">
              {home.capabilitiesToolkitLink.label}
            </ArrowLink>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
