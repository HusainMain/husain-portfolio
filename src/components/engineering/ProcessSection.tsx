import { useEffect, useRef } from "react";
import gsap from "gsap";
import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";
import { Rule } from "../ui/Rule";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * 02 / PROCESS — four sequential engineering steps as editorial rows:
 * number | step title | supporting relationship, separated by hairlines.
 *
 * Entrance (Phase 6): the steps stagger in on scroll (GSAP, once,
 * power2.out), matching the landing page's BuildStatements / WorkIndex
 * choreography. Reduced-motion users see the rows static.
 */
export function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("li"));
      gsap.fromTo(
        rows,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          clearProps: "transform",
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <CaseSection eyebrow="02 / PROCESS" contentClassName="lg:col-span-10 lg:col-start-3">
      <ol ref={listRef}>
        {engineering.process.map((step, index) => (
          <li key={step.number}>
            <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 md:py-10">
              <span
                aria-hidden="true"
                className="text-mono-label col-span-2 text-orange-deep md:col-span-1"
              >
                {step.number}
              </span>
              <h3 className="col-span-10 text-subsection text-navy-900 md:col-span-5">
                {step.title}
              </h3>
              <p className="col-span-12 col-start-3 text-muted md:col-span-6 md:col-start-7">
                {step.body}
              </p>
            </div>
            {index < engineering.process.length - 1 && <Rule />}
          </li>
        ))}
      </ol>
    </CaseSection>
  );
}
