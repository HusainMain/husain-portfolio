import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { TagRow } from "../ui/Tag";
import { FadeIn } from "../motion/FadeIn";

/** Capabilities — four grouped statements with mono tags, on a surface well (§7.6). */
export function Capabilities() {
  return (
    <Section eyebrow={home.capabilitiesEyebrow} className="bg-canvas">
      <div className="col-span-12 border border-rule-on-cream bg-surface-2 p-6 md:col-span-8 md:p-10 lg:col-span-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
          {home.capabilities.map((group, index) => (
            <FadeIn key={group.title} delay={index * 0.06}>
              <div className="border-b border-rule-on-cream pb-8 md:border-0 md:pb-0">
                <h3 className="text-subsection text-navy-900">{group.title}</h3>
                <p className="mt-3 max-w-[46ch] text-muted">{group.statement}</p>
                <TagRow items={group.tags} className="mt-5" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
