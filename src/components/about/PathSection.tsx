import { useEffect, useRef } from "react";
import gsap from "gsap";
import { about } from "../../content/about";
import { CaseSection } from "../work/CaseSection";
import { Button } from "../ui/Button";
import { PathDiagram } from "./PathDiagram";
import { prefersReducedMotion } from "../../lib/motion";

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
 *
 * Entrance (Phase 6): the eyebrow draws via CaseSection's FadeIn. On xl the
 * spine is scrubbed at scroll speed and each stage lands as the line reaches
 * its tick — the sequence is driven by position, not by a timer. Below xl the
 * plate is not rendered and the stacked record keeps a one-shot row stagger.
 * Reduced-motion users see the whole section static.
 */
export function PathSection() {
  const { path } = about;
  const figureRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = figureRef.current;
    const list = listRef.current;
    if (!root && !list) return;

    const mm = gsap.matchMedia();

    /* xl+: draw the spine, then land each stage as the line passes its tick. */
    mm.add("(min-width: 1280px)", () => {
      if (!root) return;
      const spine = root.querySelector<SVGPathElement>(".path-spine");
      const terminal = root.querySelector<SVGPathElement>(".path-spine-terminal");
      const stages = root.querySelectorAll<SVGGElement>(".path-stage");
      if (!spine || !stages.length) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });

      tl.fromTo(
        spine,
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "50% 0%", duration: 1 },
        0,
      );

      if (terminal) {
        tl.fromTo(terminal, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.66);
      }

      tl.fromTo(
        stages,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.24,
          ease: "power2.out",
        },
        0.06,
      );
    });

    /* Below xl: the stacked record keeps its one-shot row stagger. */
    mm.add("(max-width: 1279.98px)", () => {
      if (!list) return;
      const rows = list.querySelectorAll<HTMLElement>("li");
      if (!rows.length) return;
      gsap.fromTo(
        rows,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: list, start: "top 80%", once: true },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <CaseSection eyebrow={path.eyebrow} contentClassName="lg:col-span-12 lg:col-start-1">
      <div className="grid grid-cols-12 gap-x-6">
        <p className="col-span-12 max-w-[58ch] text-lead text-muted md:col-span-9 lg:col-span-7">
          {path.lead}
        </p>
      </div>

      <div
        ref={figureRef}
        className="mt-10 border border-rule-on-cream bg-surface-2 p-6 md:p-10"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-mono-label text-muted">PATH / 2024—TODAY</p>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            {String(path.beats.length).padStart(2, "0")} STAGES
          </p>
        </div>

        <PathDiagram beats={path.beats} />

        {/* Below lg: the same information as a stacked record. */}
        <ol ref={listRef} className="mt-8 flex flex-col gap-7 xl:hidden">
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
      </div>

      {/* xl+: the diagram's terminal panel already states NEXT, so this is a
          single closing action rather than a repeat of the same three facts. */}
      <div className="mt-14 hidden items-center justify-between gap-8 border-t border-rule-on-cream pt-8 md:mt-16 xl:flex">
        <p className="text-serif-accent text-[1.375rem] leading-none text-navy-900">
          Ready when you are.
        </p>
        <Button to={path.next.ctaHref}>{path.next.ctaLabel}</Button>
      </div>

      {/* Below xl the diagram is not rendered, so this block carries the facts. */}
      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 border-t border-rule-on-cream pt-10 md:mt-16 xl:hidden">
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
