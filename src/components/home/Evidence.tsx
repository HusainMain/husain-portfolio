import { useState, useRef } from "react";
import { ipl } from "../../content/ipl";
import { Section } from "../ui/Section";
import { ArrowLink } from "../ui/ArrowLink";
import { FadeIn } from "../motion/FadeIn";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { useInView } from "motion/react";

/**
 * Evidence — the IPL data study, compressed to one argument.
 *
 * The plate is a zoomed 40–60% track rather than a 0–100% bar, because the whole
 * finding lives inside four percentage points: a full-width bar would render both
 * states as visually identical. The 50% "coin flip" rule is the anchor the two
 * states are read against, so the toggle carries the argument instead of
 * decorating it.
 *
 * The percentage values animate into view when the plate enters the viewport
 * (respecting prefers-reduced-motion).
 */
export function Evidence() {
  const [active, setActive] = useState(0);
  const view = ipl.views[active];
  const plateRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(plateRef, { once: true, margin: "0px 0px -100px 0px" });

  /* Track domain. 50% sits exactly mid-track (domain 40–60), so the coin-flip
     rule is a fixed reference line rather than a moving label. */
  const MIN = 40;
  const MAX = 60;
  const toPct = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

  return (
    <Section eyebrow={ipl.eyebrow} className="bg-canvas">
      <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <FadeIn>
            <h2 className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.02em] text-navy-900">
              {ipl.headline}
              <em className="text-serif-accent">{ipl.headlineAccent}</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="mt-6 max-w-[46ch] text-muted">{ipl.lead}</p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="mt-8 flex flex-col items-start gap-y-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
              <ArrowLink to={ipl.ctaHref} className="items-center">
                {ipl.ctaLabel}
              </ArrowLink>
              <span aria-hidden="true" className="hidden h-4 w-px bg-navy-900/20 sm:block" />
              <a
                href={ipl.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted underline decoration-navy-900/20 underline-offset-4 transition-colors hover:text-orange-deep"
              >
                Data & notebook
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.18}>
            <dl className="mt-12 max-w-[34rem] border-t border-rule-on-cream pt-6">
              {ipl.provenance.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule-on-cream/60 py-3 last:border-b-0"
                >
                  <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                    {row.label}
                  </dt>
                  <dd className="text-[13px] text-navy-900">{row.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <FadeIn delay={0.08}>
            <div ref={plateRef} className="border border-rule-on-cream bg-surface-2 p-6 md:p-8">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Compare the toss against the chase">
                {ipl.views.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-pressed={index === active}
                    onClick={() => setActive(index)}
                    className={
                      index === active
                        ? "min-h-11 rounded-[4px] bg-navy-900 px-4 text-mono-label text-cream"
                        : "min-h-11 rounded-[4px] border border-rule-on-cream px-4 text-mono-label text-navy-900 transition-colors hover:border-navy-900"
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div aria-live="polite">
                <p className="mt-8 font-display text-[clamp(2.75rem,5vw,3.75rem)] font-medium leading-none tracking-[-0.03em] text-navy-900">
                  <AnimatedNumber
                    value={view.value}
                    format={{ maximumFractionDigits: 1 }}
                    suffix="%"
                    className="text-orange-deep"
                    respectMotionPreference
                    isInView={isInView}
                  />
                </p>

                <div className="mt-6">
                  <div
                    aria-hidden="true"
                    className="relative h-3 w-full overflow-visible rounded-full bg-canvas"
                  >
                    <div
                      className="h-3 rounded-full bg-orange motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-out"
                      style={{ width: `${toPct(isInView ? view.value : 0)}%` }}
                    />
                    <span
                      className="absolute top-1/2 h-6 w-px -translate-y-1/2 border-l border-dashed border-navy-900/45"
                      style={{ left: `${((ipl.baseline - MIN) / (MAX - MIN)) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                    <span>{MIN}%</span>
                    <span className="text-navy-900">{ipl.baselineLabel}</span>
                    <span>{MAX}%</span>
                  </div>
                </div>

                <p className="mt-6 max-w-[44ch] text-muted">{view.note}</p>
                <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                  <AnimatedNumber
                    value={view.wins}
                    format={{ useGrouping: true }}
                    respectMotionPreference
                    isInView={isInView}
                  />
                  {" of "}
                  <AnimatedNumber
                    value={view.total}
                    format={{ useGrouping: true }}
                    respectMotionPreference
                    isInView={isInView}
                  />
                  {" matches"}
                </p>
              </div>

              <p className="mt-6 border-t border-rule-on-cream pt-4 text-mono-meta text-muted">
                Descriptive, not causal — chase outcomes track era, venue and team
                strength.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}