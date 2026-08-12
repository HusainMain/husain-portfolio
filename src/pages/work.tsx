import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "../content/projects";
import { Rule } from "../components/ui/Rule";
import { BrandTransition } from "../components/motion/BrandTransition";
import { FadeIn } from "../components/motion/FadeIn";
import { Parallax } from "../components/motion/Parallax";
import { TextReveal } from "../components/motion/TextReveal";
import { CaseSection } from "../components/work/CaseSection";
import { prefersReducedMotion } from "../lib/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const railLineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

const railGroupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const railListVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.3, staggerChildren: 0.06 } },
};

/**
 * /work — numbered editorial index (SITE_MAP.md §6). Same document grammar as
 * the case-study pages: kicker rule, frame-aligned header, hairline sections.
 * Phase 6: hero gated on the global first-visit brand transition; the right
 * contextual block ("what kind of work is collected here") draws its divider
 * then reveals its lines (md+; tablet parallax at 50%, mobile stacks below the
 * hero copy); project rows reveal 01 → 04 with a small stagger; rows respond
 * to hover/focus with a restrained lift, title nudge and arrow.
 */
export default function WorkPage() {
  const reduce = useReducedMotion();
  const [heroStarted, setHeroStarted] = useState(false);
  const [brandVisible, setBrandVisible] = useState(false);
  const decidedRef = useRef(false);

  useEffect(() => {
    if (decidedRef.current) return;
    decidedRef.current = true;
    if (prefersReducedMotion()) {
      setHeroStarted(true);
      return;
    }
    if (sessionStorage.getItem("hp-brand-shown")) {
      setHeroStarted(true);
      return;
    }
    sessionStorage.setItem("hp-brand-shown", "1");
    setBrandVisible(true);
  }, []);

  const handleHero = useCallback(() => setHeroStarted(true), []);
  const handleComplete = useCallback(() => setBrandVisible(false), []);

  const railShown = heroStarted && !reduce;

  return (
    <>
      <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
        <div className="grid-frame items-start">
          <div className="col-span-4 py-12 md:col-span-5 md:py-16 lg:col-span-8 lg:py-20">
            <FadeIn started={heroStarted} delay={0} duration={0.4} y={0}>
              <span aria-hidden="true" className="case-kicker-rule" />
            </FadeIn>
            <FadeIn started={heroStarted} delay={0.1} duration={0.45} y={8}>
              <p className="text-mono-label mt-6 text-orange-deep">INDEX</p>
            </FadeIn>
            <TextReveal
              as="h1"
              started={heroStarted}
              delay={0.2}
              duration={0.55}
              className="case-title mt-4 text-navy-900"
            >
              Work
            </TextReveal>
            <FadeIn started={heroStarted} delay={0.36} duration={0.45} y={14}>
              <p className="text-lead mt-5 max-w-[55ch] text-muted">
                Four projects that reflect how I design, build, and ship
                software.
              </p>
            </FadeIn>
          </div>

          <Parallax
            distance={5}
            className="col-span-4 md:col-span-3 md:col-start-6 md:block md:self-stretch lg:col-span-3 lg:col-start-10"
          >
            <aside className="case-meta-col relative h-full pt-12 md:pl-6 md:pt-16 lg:pt-20">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 hidden h-full w-px origin-top bg-rule-on-cream md:block"
                initial={reduce ? undefined : { scaleY: 0 }}
                animate={railShown ? { scaleY: 1 } : reduce ? undefined : { scaleY: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
              />
              <motion.div
                initial={reduce ? undefined : "hidden"}
                animate={reduce ? undefined : railShown ? "visible" : "hidden"}
                variants={reduce ? undefined : railListVariants}
              >
                <motion.div
                  variants={reduce ? undefined : railGroupVariants}
                  className="flex flex-col gap-2"
                >
                  <motion.p
                    variants={reduce ? undefined : railLineVariants}
                    className="text-mono-label text-muted"
                  >
                    Selected Work
                  </motion.p>
                  <motion.p
                    variants={reduce ? undefined : railLineVariants}
                    className="text-mono-meta text-muted"
                  >
                    Product engineering
                  </motion.p>
                  <motion.p
                    variants={reduce ? undefined : railLineVariants}
                    className="text-mono-meta text-muted"
                  >
                    AI-assisted systems
                  </motion.p>
                  <motion.p
                    variants={reduce ? undefined : railLineVariants}
                    className="text-mono-meta text-muted"
                  >
                    Interactive web experiences
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={reduce ? undefined : railGroupVariants}
                  className="mt-6 flex flex-col gap-2"
                >
                  <motion.div variants={reduce ? undefined : railLineVariants}>
                    <Rule />
                  </motion.div>
                  <motion.p
                    variants={reduce ? undefined : railLineVariants}
                    className="text-mono-meta text-muted"
                  >
                    2024 — PRESENT
                  </motion.p>
                </motion.div>
              </motion.div>
            </aside>
          </Parallax>
        </div>
      </section>

      <CaseSection eyebrow="PROJECTS" contentClassName="col-span-12 mt-6 md:mt-8 lg:col-span-12 lg:col-start-1 lg:mt-10">
        <motion.ul
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {projects.map((project, index) => (
            <motion.li key={project.slug} variants={reduce ? undefined : rowVariants}>
              <Link
                to={`/work/${project.slug}`}
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 transition-[transform,background-color] duration-200 hover:translate-y-px hover:bg-[rgba(22,36,61,0.03)] focus-visible:translate-y-px focus-visible:bg-[rgba(22,36,61,0.03)] max-md:py-6"
              >
                <span
                  aria-hidden="true"
                  className="text-mono-label col-span-2 text-orange md:col-span-1 lg:col-span-1"
                >
                  {project.number}
                </span>
                <span className="col-span-10 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] text-navy-900 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 md:col-span-4 lg:col-span-4">
                  {project.title}
                </span>
                <span className="col-span-10 col-start-3 text-muted md:col-span-4 md:col-start-auto lg:col-span-4">
                  {project.oneLiner}
                </span>
                <span className="col-span-10 col-start-3 flex flex-wrap gap-x-4 gap-y-1 md:col-span-2 md:col-start-auto lg:col-span-2">
                  {project.stack.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-mono-tag text-orange-deep">
                      {tag}
                    </span>
                  ))}
                </span>
                <span
                  aria-hidden="true"
                  className="col-span-1 hidden justify-end text-navy-900 transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-orange-deep group-focus-visible:translate-x-1.5 group-focus-visible:text-orange-deep lg:col-span-1 lg:flex"
                >
                  →
                </span>
              </Link>
              {index < projects.length - 1 && <Rule />}
            </motion.li>
          ))}
        </motion.ul>
      </CaseSection>

      {brandVisible && (
        <BrandTransition onHero={handleHero} onComplete={handleComplete} />
      )}
    </>
  );
}