import { site } from "../content/site";
import { home } from "../content/home";

/**
 * /contact — the site's conversion page, reusing the full-orange band
 * treatment from the home ContactBand (§7.8, §13): cream display headline
 * with serif accent, single conversion intent, mailto primary action.
 * Email and socials come from the centralized site content.
 */
export default function ContactPage() {
  return (
    <section className="bg-orange-deep pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame">
        <div className="col-span-4 py-20 md:col-span-8 md:py-24 lg:col-span-12 lg:py-28">
          <p className="text-mono-label text-cream/90">CONTACT</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-cream">
            {home.contactHeadline}
            <em className="text-serif-accent">{home.contactHeadlineAccent}</em>
            {home.contactHeadlineTail}
          </h1>
          <p className="mt-6 max-w-[52ch] text-lead text-cream/85">
            One email is all it takes to start the conversation — describe the
            problem, and I&apos;ll take it from there.
          </p>

          <hr aria-hidden="true" className="rule-navy mt-14 max-w-[1440px]" />

          <p className="text-mono-label mt-14 text-cream/80">EMAIL</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-[4px] bg-navy-900 px-6 py-3 text-mono-label text-cream transition-colors hover:bg-navy-800"
          >
            {site.email}
            <span aria-hidden="true" className="text-orange-on-navy">
              →
            </span>
          </a>

          <ul className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center text-mono-label text-cream/90 transition-colors hover:text-cream"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
