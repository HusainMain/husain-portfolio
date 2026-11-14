import { useEffect, useRef } from "react";
import gsap from "gsap";
import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * 05 / ENGINEERING TOOLKIT — six verified groups as compact mono chips that
 * wrap naturally. Full-frame content cell so the three 4-column groups align
 * to the frame.
 * No bars, no percentages, no proficiency levels.
 *
 * Entrance (Phase 6): the toolkit groups stagger in on scroll (GSAP, once,
 * power2.out), matching the landing page's BuildStatements / WorkIndex
 * choreography. Reduced-motion users see the groups static.
 */
export function ToolkitSection() {
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = groupsRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(root.children);
      gsap.fromTo(
        groups,
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
    <CaseSection eyebrow="05 / ENGINEERING TOOLKIT" contentClassName="lg:col-span-12 lg:col-start-1">
      <div ref={groupsRef} className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {engineering.toolkit.groups.map((group) => (
          <div key={group.group}>
            <h3 className="text-mono-label text-muted">{group.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.tags.map((tag) => (
                <li key={tag}>
                  <span className="chip inline-block">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CaseSection>
  );
}
