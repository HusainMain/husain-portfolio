import type { DecisionRowItem } from "../../content/types";
import { Rule } from "../ui/Rule";

/** Decision → reason → trade-off rows. All content always visible. */
export function DecisionRows({ items }: { items: DecisionRowItem[] }) {
  return (
    <ol>
      {items.map((row, index) => (
        <li key={row.number}>
          <div className="decision-row grid grid-cols-12 gap-x-6 py-7 md:py-8">
            <span
              aria-hidden="true"
              className="decision-number text-mono-label col-span-2 text-orange md:col-span-2 lg:col-span-1"
            >
              {row.number}
            </span>
            <div className="col-span-10 md:col-span-10 lg:col-span-11">
              <h3 className="text-subsection text-navy-900">{row.decision}</h3>
              <p className="case-body mt-3 max-w-[72ch] text-muted">{row.reason}</p>
              {row.tradeOff && (
                <p className="text-mono-meta mt-3 text-orange-deep">
                  TRADE-OFF — {row.tradeOff}
                </p>
              )}
            </div>
          </div>
          {index < items.length - 1 && <Rule />}
        </li>
      ))}
    </ol>
  );
}
