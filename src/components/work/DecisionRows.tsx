import type { DecisionRowItem } from "../../content/types";
import { Rule } from "../ui/Rule";
import { Stagger } from "../motion/Stagger";
import { FadeIn } from "../motion/FadeIn";

/** Decision → reason → trade-off rows. Sequential reveal; trade-off follows its row. */
export function DecisionRows({ items }: { items: DecisionRowItem[] }) {
  return (
    <Stagger as="ol" step={80}>
      {items.map((row, index) => (
        <li key={row.number}>
          <div className="decision-row grid grid-cols-12 gap-x-6 py-8 md:py-10">
            <span
              aria-hidden="true"
              className="decision-number text-mono-label col-span-2 text-orange-deep md:col-span-2 lg:col-span-1"
            >
              {row.number}
            </span>
            <div className="col-span-10 md:col-span-10 lg:col-span-11">
              <h3 className="text-subsection text-navy-900">{row.decision}</h3>
              <p className="case-body mt-4 max-w-[72ch] text-muted">{row.reason}</p>
              {row.tradeOff && (
                <FadeIn delay={0.15} duration={0.4} y={0} className="case-tradeoff-box mt-5">
                  <p className="text-mono-label text-orange-deep mb-1">TRADE-OFF</p>
                  <p className="text-mono-meta text-navy-900/80">{row.tradeOff}</p>
                </FadeIn>
              )}
            </div>
          </div>
          {index < items.length - 1 && <Rule />}
        </li>
      ))}
    </Stagger>
  );
}