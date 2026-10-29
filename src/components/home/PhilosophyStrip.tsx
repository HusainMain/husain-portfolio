import { useEffect, useRef } from "react";
import gsap from "gsap";
import { home } from "../../content/home";
import { Section } from "../ui/Section";
import { prefersReducedMotion } from "../../lib/motion";

/** How I Think — the compressed engineering philosophy (§7.5). */
export function PhilosophyStrip() {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = maskRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mask = root.querySelector(".phil-mask");
      if (!mask) return;
      gsap.fromTo(
        mask,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <Section eyebrow={home.philosophyEyebrow} className="bg-canvas">
      <div className="col-span-12 md:col-span-8 lg:col-span-11">
        <div ref={maskRef} className="overflow-hidden">
          <p className="phil-mask font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-navy-900">
            {home.philosophy}
            <em className="text-serif-accent text-orange-deep">{home.philosophyAccent1}</em>
            {home.philosophyAccent2}
            <em className="text-serif-accent text-orange-deep">{home.philosophyAccent3}</em>
            {home.philosophyTail}
          </p>
        </div>
      </div>
    </Section>
  );
}
