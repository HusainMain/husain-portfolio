import type { Project } from "../../content/types";
import { ArrowLink } from "../ui/ArrowLink";
import { MetaTags } from "../ui/Tag";
import { FadeIn } from "../motion/FadeIn";
import { TextReveal } from "../motion/TextReveal";
import { Parallax } from "../motion/Parallax";

/**
 * Case header — 3px orange rule, eyebrow, title, lead, structured metadata
 * panel. Entrance choreography (shared across all case studies): kicker →
 * eyebrow → masked title → lead → metadata (mobile panel rises; desktop panel
 * enters from the right and carries a subtle scroll parallax, desktop-only).
 */
export function CaseStudyMeta({ project }: { project: Project }) {
  return (
    <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame items-start">
        <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-8 lg:py-20">
          <FadeIn y={10} duration={0.4}>
            <span aria-hidden="true" className="case-kicker-rule" />
          </FadeIn>
          <FadeIn y={10} delay={0.06} duration={0.45}>
            <p className="text-mono-label mt-6 text-orange-deep">
              {project.number} / PROJECT
            </p>
          </FadeIn>
          <TextReveal as="h1" delay={0.12} duration={0.7} className="case-title mt-4 text-navy-900">
            {project.title}
          </TextReveal>
          <FadeIn y={12} delay={0.2} duration={0.5}>
            <p className="text-lead mt-5 max-w-[55ch] text-muted">{project.oneLiner}</p>
          </FadeIn>

          {/* Mobile / Tablet metadata panel */}
          <FadeIn y={14} delay={0.28} duration={0.5}>
            <aside aria-label="Project Metadata" className="case-meta-panel mt-10 lg:hidden">
              <div className="flex flex-col gap-2">
                <p className="text-mono-label text-muted">STACK</p>
                <MetaTags items={project.stack} />
              </div>
              <div className="h-px bg-rule-on-cream" />
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-mono-label text-muted">REPOSITORY</p>
                  <div className="mt-1">
                    <ArrowLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      Repository
                    </ArrowLink>
                  </div>
                </div>
                {project.context && (
                  <div>
                    <p className="text-mono-label text-muted">CONTEXT</p>
                    <p className="text-mono-meta mt-1 text-navy-900">{project.context}</p>
                  </div>
                )}
              </div>
            </aside>
          </FadeIn>
        </div>

        {/* Desktop metadata panel — enters from the right, parallax on scroll */}
        <FadeIn
          x={24}
          delay={0.28}
          duration={0.55}
          className="hidden lg:block lg:col-span-3 lg:col-start-10 lg:self-stretch"
        >
          <Parallax distance={6} className="lg:h-full">
            <aside className="case-meta-panel pt-20 lg:h-full lg:border-l lg:border-rule-on-cream lg:pl-6">
              <div className="flex flex-col gap-2">
                <p className="text-mono-label text-muted">STACK</p>
                <MetaTags items={project.stack} />
              </div>
              <div className="h-px bg-rule-on-cream" />
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-mono-label text-muted">REPOSITORY</p>
                  <ArrowLink
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Repository
                  </ArrowLink>
                </div>
                {project.context && (
                  <>
                    <div className="h-px bg-rule-on-cream" />
                    <div>
                      <p className="text-mono-label text-muted">CONTEXT</p>
                      <p className="text-mono-meta text-navy-900 font-medium leading-relaxed">{project.context}</p>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </Parallax>
        </FadeIn>
      </div>
    </section>
  );
}