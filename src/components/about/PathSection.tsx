import { about } from "../../content/about";
import { CaseSection } from "../work/CaseSection";
import { Button } from "../ui/Button";
import { FadeIn } from "../motion/FadeIn";
import { PathDiagram } from "./PathDiagram";

/**
 * 02 / THE PATH — the dated record of the work, then the opening.
 *
 * Replaces the old NOW + APPROACH pair. NOW duplicated Work and the Home
 * contributions; APPROACH duplicated the engineering process. What About was
 * actually missing was a human sequence — 2024 START → 2026 BUILD → 2026
 * LEAD — and a conversion close, so this section carries both and leaves the
 * process to /engineering and the loop to the system-flow plate above.
 *
 * The timeline plate is desktop-only; below lg the same beats render as
 * stacked rows, because a 1100px rail cannot shrink to a phone without
 * dropping below reading size.
 */
export function PathSection() {
  const { path } = about;

  return (
    <CaseSection eyebrow={path.eyebrow} contentClassName="lg:col-span-12 lg:col-start-1">
      <div className="grid grid-cols-12 gap-x-6">
        <p className="col-span-12 max-w-[58ch] text-lead text-muted md:col-span-9 lg:col-span-7">
          {path.lead}
        </p>
      </div>

      <FadeIn y={12} delay={0.1}>
        <figure className="mt-10 border border-rule-on-cream bg-surface-2 p-6 md:p-10">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-mono-label text-muted">PATH / 2024—TODAY</p>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              {String(path.beats.length).padStart(2, "0")} STAGES
            </p>
          </div>

          <PathDiagram beats={path.beats} />

          {/* Below lg: the same information as a stacked record. */}
          <ol className="mt-8 flex flex-col gap-7 xl:hidden">
            {path.beats.map((beat) => (
              <li
                key={beat.stage}
                className="border-b border-rule-on-cream pb-7 last:border-0 last:pb-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-navy-900">
                    {beat.year}
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-orange-deep">
                    {beat.stage}
                  </span>
                </div>
                <h3 className="text-subsection mt-3 text-navy-900">{beat.title}</h3>
                <p className="mt-2 max-w-[46ch] text-muted">{beat.note}</p>
                <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                  {beat.outcome}
                </p>
              </li>
            ))}
          </ol>

          <figcaption className="mt-8 border-t border-rule-on-cream pt-4 text-mono-meta text-muted">
            {path.diagramCaption}
          </figcaption>
        </figure>
      </FadeIn>

      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 border-t border-rule-on-cream pt-10 md:mt-16">
        <div className="col-span-12 lg:col-span-3">
          <p className="text-mono-label text-orange-deep">{path.next.label}</p>
          <p className="text-serif-accent mt-3 max-w-[24ch] text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.25] text-navy-900">
            Where this goes next.
          </p>
        </div>

        <dl className="col-span-12 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-3 lg:col-span-6">
          {path.next.status.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-2 max-w-[24ch] text-navy-900">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 lg:col-span-3 lg:flex lg:justify-end">
          <Button to={path.next.ctaHref} className="w-fit">
            {path.next.ctaLabel}
          </Button>
        </div>
      </div>
    </CaseSection>
  );
}
