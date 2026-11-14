import { useEffect, useRef } from "react";
import gsap from "gsap";
import { engineering } from "../../content/engineering";
import { CaseSection } from "../work/CaseSection";
import { FadeIn } from "../motion/FadeIn";
import { WordReveal } from "../motion/WordReveal";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * 03 / AI-ASSISTED ENGINEERING — honest practice statement. Prose column
 * (frame cols 3–8) states how AI fits the workflow; the well (frame cols
 * 9–12) lists where human judgment stays. On tablet/mobile the well stacks.
 *
 * Entrance (Phase 7): the prose lights word by word as it scrolls (the reel's
 * "Text reveal"), so the argument is read at reading speed instead of fading
 * in as a block. The judgment items are four separate claims, so they keep the
 * tier C row stagger. Reduced motion renders everything static.
 */
export function AiEngineeringSection() {
  const judgmentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = judgmentRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("li"));
      gsap.fromTo(
        items,
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
    <CaseSection eyebrow="03 / AI-ASSISTED ENGINEERING" contentClassName="lg:col-span-12 lg:col-start-1">
      <div className="ai-reveal-grid grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-6 lg:col-start-3">
          <FadeIn y={16} duration={0.6}>
            <p className="text-mono-label text-orange-deep">AI ACCELERATES</p>
          </FadeIn>
          <WordReveal
            as="div"
            className="flex flex-col gap-6"
            pinClosest=".ai-reveal-grid"
            step={26}
          >
            {engineering.ai.prose.map((paragraph) => (
              <p key={paragraph} className="case-body max-w-[72ch] text-muted">
                {paragraph}
              </p>
            ))}
          </WordReveal>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="case-well">
            <p className="text-mono-label text-muted">JUDGMENT STAYS HUMAN</p>
            <ul ref={judgmentRef} className="mt-5 flex flex-col gap-3">
              {engineering.ai.judgment.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="text-orange">
                    —
                  </span>
                  <span className="text-mono-meta text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
