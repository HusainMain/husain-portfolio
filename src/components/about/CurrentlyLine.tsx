import { about } from "../../content/about";
import { ArrowLink } from "../ui/ArrowLink";
import { CaseSection } from "../work/CaseSection";
import { Rule } from "../ui/Rule";

/**
 * 02 / CURRENTLY — editorial records with hairline separators: orange mono
 * category label, navy title, aligned case-study link (≥44px touch target).
 * On mobile the link moves below the title instead of squeezing into a column.
 */
export function CurrentlyLine() {
  return (
    <CaseSection eyebrow="02 / CURRENTLY" contentClassName="lg:col-span-10 lg:col-start-3">
      <ul>
        {about.currently.map((item, index) => (
          <li key={item.title}>
            <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-8 md:py-10">
              <p className="text-mono-label col-span-12 text-orange-deep md:col-span-2">
                {item.label}
              </p>
              <h3 className="col-span-12 text-subsection text-navy-900 md:col-span-5">
                {item.title}
              </h3>
              <div className="col-span-12 md:col-span-5 md:flex md:justify-end">
                <ArrowLink to={item.href} className="min-h-11 items-center">
                  {item.linkLabel}
                </ArrowLink>
              </div>
            </div>
            {index < about.currently.length - 1 && <Rule />}
          </li>
        ))}
        <li>
          <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-8 md:py-10">
            <p className="text-mono-label col-span-12 text-orange-deep md:col-span-2">
              {about.interests.label}
            </p>
            <p className="col-span-12 text-muted md:col-span-10">
              {about.interests.items.join(" · ")}
            </p>
          </div>
        </li>
      </ul>
    </CaseSection>
  );
}
