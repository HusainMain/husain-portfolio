import { motion, useReducedMotion } from "motion/react";
import { site } from "../../content/site";
import { Button } from "../ui/Button";
import { ArrowLink } from "../ui/ArrowLink";
import { TextReveal } from "../motion/TextReveal";
import { FadeIn } from "../motion/FadeIn";
import { Parallax } from "../motion/Parallax";

/**
 * Hero — "The System Frame" (DESIGN_SYSTEM.md §8).
 * Entrance choreography is gated on `started` (driven by the homepage brand
 * transition); without it the hero reveals itself on scroll / immediately.
 */
export function Hero({ started = true }: { started?: boolean }) {
  const { portrait } = site;
  const reduce = useReducedMotion();
  const clipHidden = !reduce ? { clipPath: "inset(0 0 100% 0)" } : undefined;
  const clipShown = !reduce && started ? { clipPath: "inset(0 0 0% 0)" } : undefined;

  return (
    <section className="bg-surface-page-subtle pt-[72px] max-md:pt-[60px]">
      <div
        className="grid-frame hero-grid items-stretch"
        style={{ minHeight: "calc(92svh - 72px)" }}
      >
        {/* Identity — cols 1–8 desktop, 1–5 tablet, full mobile */}
        <div className="col-span-12 flex flex-col justify-center py-16 md:col-span-5 md:py-14 lg:col-span-8">
          <TextReveal
            as="p"
            started={started}
            delay={0.05}
            duration={0.35}
            className="text-mono-label text-orange-deep"
          >
            {site.heroEyebrow}
          </TextReveal>

          <TextReveal
            as="h1"
            started={started}
            delay={0.15}
            duration={0.55}
            className="text-hero-name mt-6 text-navy-900"
          >
            {site.firstName.toUpperCase()}
            <br />
            {site.lastName.toUpperCase()}
          </TextReveal>

          <TextReveal
            as="p"
            started={started}
            delay={0.3}
            duration={0.45}
            className="text-hero-role mt-5 text-navy-900"
          >
            Software Engineer /{" "}
            <em className="text-serif-accent">{site.roleDescriptor}</em>
          </TextReveal>

          <TextReveal
            as="p"
            started={started}
            delay={0.42}
            duration={0.4}
            className="mt-5 max-w-[42ch] text-muted"
          >
            {site.heroPhilosophy}
          </TextReveal>

          <FadeIn started={started} delay={0.55} duration={0.35} y={16} className="mt-9">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button to="/work">View work</Button>
              <ArrowLink href={`mailto:${site.email}`}>Email me</ArrowLink>
            </div>
          </FadeIn>

          <FadeIn started={started} delay={0.68} duration={0.3} y={12} className="mt-16 md:mt-14">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-mono-meta text-muted">
              <li>{site.heroMeta.location}</li>
              <li aria-hidden="true">·</li>
              <li>
                <a
                  href="https://github.com/HusainMain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange-deep"
                >
                  {site.heroMeta.github}
                </a>
              </li>
              <li aria-hidden="true">·</li>
              <li aria-hidden="true">{site.heroMeta.scroll}</li>
            </ul>
          </FadeIn>
        </div>

        {/* Portrait panel — cols 9–12 desktop, 6–8 tablet, full-width 4:5 mobile */}
        <div className="col-span-12 md:col-span-3 lg:col-span-4 max-md:pb-16">
          <motion.div
            className="hero-panel relative aspect-[4/5] w-full overflow-hidden bg-navy-900 md:aspect-auto md:h-full"
            initial={clipHidden}
            animate={clipShown}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* System line: horizontal on mobile, vertical on md+ */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-1 bg-orange md:inset-x-auto md:inset-y-0 md:left-0 md:h-full md:w-1"
            />
            <Parallax distance={10} scale={1.06} className="absolute inset-0">
              <img
                src={portrait.src}
                srcSet={portrait.srcSet}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 34vw, 100vw"
                width={portrait.width}
                height={portrait.height}
                alt={portrait.alt}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[50%_15%]"
              />
            </Parallax>
            <p className="text-mono-meta absolute bottom-4 left-6 z-10 text-orange-on-navy">
              {site.portraitCaption}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
