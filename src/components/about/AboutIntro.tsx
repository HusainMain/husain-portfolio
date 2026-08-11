import { about } from "../../content/about";
import { Reveal } from "../motion/Reveal";

/**
 * About page opening — the approved case-header grammar (orange kicker rule,
 * mono eyebrow, large navy title, muted lead) with the metadata rail removed:
 * the section uses the main content column only, facts live in 01 / FACTS.
 */
export function AboutIntro() {
  return (
    <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame items-start">
        <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-8 lg:py-20">
          <Reveal>
            <span aria-hidden="true" className="case-kicker-rule" />
          </Reveal>
          <Reveal delay={60}>
            <p className="text-mono-label mt-6 text-orange-deep">{about.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="case-title mt-4 text-navy-900">About</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-lead mt-5 max-w-[55ch] text-muted">{about.lead}</p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4">
            {about.intro.map((paragraph) => (
              <p key={paragraph} className="about-intro max-w-[62ch] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
