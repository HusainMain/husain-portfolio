import { useEffect, useRef } from "react";
import gsap from "gsap";
import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { Rule } from "../ui/Rule";
import { prefersReducedMotion } from "../../lib/motion";

/** What I Build — three verb statements (DESIGN_SYSTEM.md §7.3). */
export function BuildStatements() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".build-row"));
      gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
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
    <Section eyebrow={home.whatIBuildEyebrow} className="bg-canvas">
      <ul ref={listRef} className="col-span-12 md:col-span-8 lg:col-span-12">
        {home.whatIBuild.map((item, index) => (
          <li key={item.number}>
            <div className="build-row flex items-baseline gap-6 py-7 md:gap-10 md:py-8">
              <span aria-hidden="true" className="text-mono-label shrink-0 text-orange">
                {item.number}
              </span>
              <p className="text-lead text-navy-900 md:text-[clamp(1.375rem,2.4vw,2rem)] md:leading-[1.2]">
                {item.statement}
                <em className="text-serif-accent text-orange-deep">{item.accent}</em>
              </p>
            </div>
            {index < home.whatIBuild.length - 1 && <Rule />}
          </li>
        ))}
      </ul>
    </Section>
  );
}
