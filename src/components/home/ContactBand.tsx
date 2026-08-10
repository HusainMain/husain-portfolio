import { site } from "../../content/site";
import { home } from "../../content/home";
import { Reveal } from "../motion/Reveal";

/** Contact band — the site's only full-orange surface (§7.8, §13). */
export function ContactBand() {
  return (
    <section className="bg-orange-deep">
      <div className="grid-frame section-pad">
        <div className="col-span-12 md:col-span-8 lg:col-span-12">
          <Reveal>
            <p className="text-mono-label text-cream/90">{home.contactEyebrow}</p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-10">
          <Reveal delay={80}>
            <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-cream">
              {home.contactHeadline}
              <em className="text-serif-accent">{home.contactHeadlineAccent}</em>
              {home.contactHeadlineTail}
            </h2>
          </Reveal>
        </div>
        <div className="col-span-12 flex flex-wrap items-center gap-x-10 gap-y-6 md:col-span-8 lg:col-span-12">
          <Reveal delay={160}>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-[4px] bg-navy-900 px-6 py-4 text-mono-label text-cream transition-colors hover:bg-navy-800"
            >
              <span>Email me</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
          <Reveal delay={220}>
            <a
              href={`mailto:${site.email}`}
              className="text-mono-meta text-cream underline decoration-cream/50 underline-offset-4 transition-colors hover:decoration-cream"
            >
              {site.email}
            </a>
          </Reveal>
          <Reveal delay={280}>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="text-mono-label text-cream/90 transition-colors hover:text-cream"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
