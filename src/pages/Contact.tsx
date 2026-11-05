import { home } from "../content/home";
import { FadeIn } from "../components/motion/FadeIn";
import { Marquee } from "../components/motion/Marquee";
import { ContactKeys } from "../components/contact/ContactKeys";
import { usePageMeta } from "../lib/meta";

/**
 * /contact — the site's conversion page, reusing the full-orange band
 * treatment from the home ContactBand (§7.8, §13): cream display headline
 * with serif accent, single conversion intent, mailto primary action.
 * The contact dock is the one expressive moment: four letterpress keys spell
 * TALK and turn over to reveal the channel. A direct email line below keeps
 * the address selectable and copyable. A continuous editorial marquee
 * occupies the lower band space before the navy footer.
 */
export default function ContactPage() {
  usePageMeta({
    title: "Contact — Husain Bardanwala",
    description:
      "Get in touch with Husain Bardanwala — software engineer and intelligent systems builder based in India. Open to full-stack and AI engineering work.",
    path: "/contact",
  });

  return (
    <section className="bg-orange-deep pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame">
        <div className="col-span-4 pb-10 pt-16 md:col-span-8 md:pb-12 md:pt-20 lg:col-span-12 lg:pb-14 lg:pt-24">
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
            <p className="mt-6 max-w-[52ch] text-lead text-cream">
              One email is all it takes to start the conversation — describe the
              problem, and I&apos;ll take it from there.
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <hr aria-hidden="true" className="rule-navy mt-14 max-w-[1440px]" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactKeys />
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
