import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { ArrowLink } from "../ui/ArrowLink";
import { Rule } from "../ui/Rule";
import { FadeIn } from "../motion/FadeIn";

/** Contributions — iEMS leadership + BuildEx ownership (§7.7). */
export function Contributions() {
  return (
    <Section eyebrow={home.contributionsEyebrow} className="bg-canvas">
      <div className="col-span-12 md:col-span-8 lg:col-span-12">
        <ul>
          {home.contributions.map((contribution, index) => (
            <li key={contribution.title}>
              <FadeIn delay={index * 0.08}>
                <div className="contrib-row grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 md:py-10">
                  <span className="text-mono-label col-span-12 text-orange-deep md:col-span-2">
                    {contribution.label}
                  </span>
                  <div className="col-span-12 md:col-span-7">
                    <h3 className="text-subsection text-navy-900">{contribution.title}</h3>
                    <p className="mt-2 max-w-[58ch] text-muted">{contribution.description}</p>
                  </div>
                  <div className="col-span-12 flex justify-start md:col-span-3 md:justify-end">
                    <ArrowLink to={contribution.href}>{contribution.linkLabel}</ArrowLink>
                  </div>
                </div>
              </FadeIn>
              {index < home.contributions.length - 1 && <Rule />}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
