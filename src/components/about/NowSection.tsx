import { useEffect, useRef } from "react";
import gsap from "gsap";
import { about } from "../../content/about";
import { ArrowLink } from "../ui/ArrowLink";
import { CaseSection } from "../work/CaseSection";
import { Rule } from "../ui/Rule";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * 02 / NOW — what is actively being built and explored, framed as current
 * work rather than employment history: BUILDING (BuildEx), LEADING (iEMS),
 * then a quiet EXPLORING line of technical interests.
 *
 * Project rows are subtly interactive on hover (restrained shift + accent on
 * the title, arrow nudge from ArrowLink) — pages.css `.now-project`.
 *
 * Entrance (Phase 6): the rows disclose progressively like an editorial
 * document (~80ms apart, ≤10px rise) — boundary, label, content and CTA
 * arrive with each row. Inline transforms are cleared once visible so the
 * CSS hover transform owns the row afterwards. Reduced-motion users see
 * the section static and can still hover.
 */
export function NowSection() {
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
        onComplete: () => gsap.set(".now-row", { clearProps: "all" }),
      });
      tl.fromTo(
        ".now-row",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <CaseSection eyebrow="02 / NOW" contentClassName="lg:col-span-10 lg:col-start-3">
        <ul>
          {about.currently.map((item, index) => (
            <li key={item.title} className="now-row now-project">
              <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-8 md:py-10">
                <p className="text-mono-label col-span-12 text-orange-deep md:col-span-2">
                  {item.label}
                </p>
                <div className="col-span-12 md:col-span-6">
                  <h3 className="now-title text-subsection text-navy-900">{item.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-muted">{item.description}</p>
                </div>
                <div className="col-span-12 md:col-span-4 md:flex md:justify-end">
                  <ArrowLink to={item.href} className="min-h-11 items-center">
                    {item.linkLabel}
                  </ArrowLink>
                </div>
              </div>
              {index < about.currently.length - 1 && <Rule />}
            </li>
          ))}
          <li className="now-row">
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
    </div>
  );
}