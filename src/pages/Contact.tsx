import { site } from "../content/site";
import { home } from "../content/home";
import { FadeIn } from "../components/motion/FadeIn";
import { Marquee } from "../components/motion/Marquee";

/**
 * /contact — the site's conversion page, reusing the full-orange band
 * treatment from the home ContactBand (§7.8, §13): cream display headline
 * with serif accent, single conversion intent, mailto primary action.
 * Email and socials come from the centralized site content. A continuous
 * editorial marquee occupies the lower band space before the navy footer.
 */
export default function ContactPage() {
  return (
    <section className="bg-orange-deep pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame">
        <div className="col-span-4 pb-10 pt-20 md:col-span-8 md:pb-12 md:pt-24 lg:col-span-12 lg:pb-14 lg:pt-28">
          <FadeIn>
            <p className="text-mono-label text-cream/90">CONTACT</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-cream">
              {home.contactHeadline}
              <em className="text-serif-accent">{home.contactHeadlineAccent}</em>
              {home.contactHeadlineTail}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mt-6 max-w-[52ch] text-lead text-cream/85">
              One email is all it takes to start the conversation — describe the
              problem, and I&apos;ll take it from there.
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <hr aria-hidden="true" className="rule-navy mt-14 max-w-[1440px]" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-mono-label mt-14 text-cream/80">EMAIL</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <a
              href={`mailto:${site.email}`}
              className="group mt-4 inline-flex min-h-11 items-center gap-3 rounded-[4px] bg-navy-900 px-6 py-3 text-mono-label text-cream transition-colors hover:bg-navy-800"
            >
              {site.email}
              <span
                aria-hidden="true"
                className="text-orange-on-navy transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </FadeIn>

          <FadeIn delay={0.28}>
            <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex min-h-11 items-center text-mono-label text-cream/90 transition-colors hover:text-cream"
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

        <div className="col-span-4 pb-10 md:col-span-8 md:pb-12 lg:col-span-12 lg:pb-14">
          <FadeIn delay={0.34}>
            <hr aria-hidden="true" className="rule-orange mb-5" />
            <Marquee
              items={home.contactMarquee}
              speed={48}
              repeats={12}
              className="mt-5"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
