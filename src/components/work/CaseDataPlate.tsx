import type { CaseDataPlate } from "../../content/types";

/**
 * CaseDataPlate — a compact season-by-season figure for the IPL data study.
 *
 * The bars share the grammar of the Home evidence plate: left-anchored on a
 * 40–70% track with a fixed dashed rule at 50%, so "above the coin flip" reads
 * the same way in both places. Bars above the rule are orange; bars below are
 * muted, which encodes direction without a second legend.
 *
 * Deliberately static — the values are the point, and a 17-row animated chart
 * would spend the reader's attention on the transition instead of the spread.
 */
export function CaseDataPlate({ plate }: { plate: CaseDataPlate }) {
  const MIN = 40;
  const MAX = 70;
  const toPct = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;
  const referenceLeft = toPct(plate.reference);

  return (
    <figure className="case-well">
      <figcaption>
        <p className="text-mono-label text-orange-deep">THE SAME QUESTION, SEASON BY SEASON</p>
        <h3 className="mt-3 max-w-[46ch] font-display text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-tight text-navy-900">
          {plate.title}
        </h3>
        <p className="mt-3 max-w-[64ch] text-muted">{plate.desc}</p>
      </figcaption>

      <div className="mt-8">
        <ul className="flex flex-col gap-[3px]">
          {plate.bars.map((bar) => {
            const above = bar.value >= plate.reference;
            return (
              <li
                key={bar.label}
                className="grid grid-cols-[2.25rem_1fr_3.25rem] items-center gap-3 sm:grid-cols-[2.75rem_1fr_3.75rem]"
              >
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {bar.label}
                </span>
                <span aria-hidden="true" className="relative block h-2.5 w-full rounded-full bg-canvas">
                  <span
                    className={
                      above
                        ? "absolute inset-y-0 left-0 rounded-full bg-orange"
                        : "absolute inset-y-0 left-0 rounded-full bg-navy-900/35"
                    }
                    style={{ width: `${toPct(bar.value)}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-5 w-px -translate-y-1/2 border-l border-dashed border-navy-900/45"
                    style={{ left: `${referenceLeft}%` }}
                  />
                </span>
                <span className="text-right font-mono text-[11px] tabular-nums text-navy-900">
                  {bar.value.toFixed(1)}%
                </span>
              </li>
            );
          })}
        </ul>

        <div
          aria-hidden="true"
          className="mt-2 grid grid-cols-[2.25rem_1fr_3.25rem] gap-3 sm:grid-cols-[2.75rem_1fr_3.75rem]"
        >
          <span />
          <span className="relative block h-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <span className="absolute left-0">{MIN}%</span>
            <span
              className="absolute -translate-x-1/2 text-navy-900"
              style={{ left: `${referenceLeft}%` }}
            >
              {plate.reference}%
            </span>
            <span className="absolute right-0">{MAX}%</span>
          </span>
          <span />
        </div>
      </div>

      <p className="mt-6 max-w-[64ch] border-t border-rule-on-cream pt-4 text-mono-meta text-muted">
        {plate.note}
      </p>
    </figure>
  );
}
