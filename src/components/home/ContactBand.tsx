import { site } from "../../content/site";
import { home } from "../../content/home";
import { FadeIn } from "../motion/FadeIn";
import { Marquee } from "../motion/Marquee";

/** Contact band — the site's only full-orange surface (§7.8, §13). */
export function ContactBand() {
  return (
    <section className="bg-orange-deep">
      <div className="grid-frame section-pad">
        <div className="col-span-12 md:col-span-8 lg:col-span-12">
          <FadeIn>
            <p className="text-mono-label text-cream/90">{home.contactEyebrow}</p>
          </FadeIn>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-10">
          <FadeIn delay={0.08}>
            <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.02em] text-cream">
              {home.contactHeadline}
              <em className="text-serif-accent">{home.contactHeadlineAccent}</em>
              {home.contactHeadlineTail}
            </h2>
          </FadeIn>
        </div>
        <div className="col-span-12 flex flex-wrap items-center gap-x-10 gap-y-6 md:col-span-8 lg:col-span-12">
          <FadeIn delay={0.16}>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-[4px] bg-navy-900 px-6 py-4 text-mono-label text-cream transition-colors hover:bg-navy-800"
            >
              <span>Email me</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </FadeIn>
          <FadeIn delay={0.22}>
            <a
              href={`mailto:${site.email}`}
              className="text-mono-meta text-cream underline decoration-cream/50 underline-offset-4 transition-colors hover:decoration-cream"
            >
              {site.email}
            </a>
          </FadeIn>
          <FadeIn delay={0.28}>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="group text-mono-label text-cream/90 transition-colors hover:text-cream"
                  >
                    {social.label}{" "}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <div className="col-span-12 mt-6 md:col-span-8 md:mt-8 lg:col-span-12">
          <FadeIn delay={0.34}>
            <hr aria-hidden="true" className="rule-orange mb-5" />
            <Marquee
              items={home.identityMarquee}
              speed={48}
              repeats={10}
              className="mt-5"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
