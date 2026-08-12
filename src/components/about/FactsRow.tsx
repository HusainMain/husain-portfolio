import { useEffect, useRef } from "react";
import gsap from "gsap";
import { about } from "../../content/about";
import { CaseSection } from "../work/CaseSection";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * 01 / PROFILE — hairline-separated facts row spanning the full frame width.
 * The labelled mono metadata stays small; the values are the visual anchors
 * (noticeably larger than standard subsection). CGPA 8.48/10 lives here: the
 * single site occurrence, given the orange signature accent — a deliberate
 * highlight, not a giant statistic. Desktop 4 columns · tablet 2×2 ·
 * mobile 2×2, no horizontal overflow, no card treatment.
 *
 * Entrance (Phase 6): the top hairline draws, then the four groups stagger
 * in (~70ms apart, ≤10px rise, no scale). One-shot; reduced-motion users
 * see the row static.
 */
export function FactsRow() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });
      tl.fromTo(
        ".facts-hairline",
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "0% 50%", duration: 0.4, ease: "power2.out" },
        0,
      ).fromTo(
        ".facts-item",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out" },
        0.05,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <CaseSection eyebrow="01 / PROFILE" contentClassName="lg:col-span-12 lg:col-start-1">
        <div className="relative">
          <span
            aria-hidden="true"
            className="facts-hairline absolute inset-x-0 top-0 h-px bg-rule-on-cream"
          />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 pt-10 lg:grid-cols-4">
            {about.facts.map((fact) => (
              <div key={fact.label} className="facts-item">
                <dt className="text-mono-label text-muted">{fact.label}</dt>
                <dd
                  className={`mt-3 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.15] tracking-[-0.01em] ${
                    fact.label === "CGPA" ? "text-orange-deep" : "text-navy-900"
                  }`}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </CaseSection>
    </div>
  );
}