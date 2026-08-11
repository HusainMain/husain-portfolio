import { site } from "../../content/site";
import { Button } from "../ui/Button";
import { ArrowLink } from "../ui/ArrowLink";
import { Reveal } from "../motion/Reveal";

/** Hero — "The System Frame" (DESIGN_SYSTEM.md §8). */
export function Hero() {
  const { portrait } = site;
  return (
    <section className="bg-surface-page-subtle pt-[72px] max-md:pt-[60px]">
      <div
        className="grid-frame hero-grid items-stretch"
        style={{ minHeight: "calc(92svh - 72px)" }}
      >
        {/* Identity — cols 1–8 desktop, 1–5 tablet, full mobile */}
        <div className="col-span-12 flex flex-col justify-center py-16 md:col-span-5 md:py-14 lg:col-span-8">
          <Reveal>
            <p className="text-mono-label text-orange-deep">{site.heroEyebrow}</p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="text-hero-name mt-6 text-navy-900">
              {site.firstName.toUpperCase()}
              <br />
              {site.lastName.toUpperCase()}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-hero-role mt-5 text-navy-900">
              Software Engineer /{" "}
              <em className="text-serif-accent">{site.roleDescriptor}</em>
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 max-w-[42ch] text-muted">{site.heroPhilosophy}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button to="/work">View work</Button>
              <ArrowLink href={`mailto:${site.email}`}>Email me</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-16 flex flex-wrap items-center gap-x-5 gap-y-2 text-mono-meta text-muted md:mt-14">
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
          </Reveal>
        </div>

        {/* Portrait panel — cols 9–12 desktop, 6–8 tablet, full-width 4:5 mobile */}
        <div className="col-span-12 md:col-span-3 lg:col-span-4 max-md:pb-16">
          <div className="hero-panel relative aspect-[4/5] w-full overflow-hidden bg-navy-900 md:aspect-auto md:h-full">
            {/* System line: horizontal on mobile, vertical on md+ */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-1 bg-orange md:inset-x-auto md:inset-y-0 md:left-0 md:h-full md:w-1"
            />
            <img
              src={portrait.src}
              srcSet={portrait.srcSet}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 34vw, 100vw"
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_15%]"
            />
            <p className="text-mono-meta absolute bottom-4 left-6 z-10 text-orange-on-navy">
              {site.portraitCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
