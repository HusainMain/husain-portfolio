import type { Project } from "../../content/types";
import { ArrowLink } from "../ui/ArrowLink";
import { MetaTags } from "../ui/Tag";
import { Reveal } from "../motion/Reveal";

/** Case header — 3px orange rule, eyebrow, title, lead, technical meta margin. */
export function CaseStudyMeta({ project }: { project: Project }) {
  return (
    <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
      <div className="grid-frame items-start">
        <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-8 lg:py-20">
          <Reveal>
            <span aria-hidden="true" className="case-kicker-rule" />
          </Reveal>
          <Reveal delay={60}>
            <p className="text-mono-label mt-6 text-orange-deep">
              {project.number} / PROJECT
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="case-title mt-4 text-navy-900">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-lead mt-5 max-w-[55ch] text-muted">{project.oneLiner}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="case-meta-row mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:hidden">
              <p className="text-mono-tag text-orange-deep">
                {project.stack.join(" · ")}
              </p>
              <span aria-hidden="true" className="text-mono-meta text-muted">
                ·
              </span>
              <ArrowLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Repository
              </ArrowLink>
              {project.context && (
                <>
                  <span aria-hidden="true" className="text-mono-meta text-muted">
                    ·
                  </span>
                  <p className="text-mono-meta text-muted">{project.context}</p>
                </>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={240}
          className="hidden lg:block lg:col-span-3 lg:col-start-10 lg:self-stretch"
        >
          <aside className="case-meta-col pt-20 lg:h-full lg:border-l lg:border-rule-on-cream lg:pl-6">
            <div className="flex flex-col gap-2">
              <p className="text-mono-label text-muted">Stack</p>
              <MetaTags items={project.stack} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-mono-label text-muted">Repository</p>
              <ArrowLink href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Repository
              </ArrowLink>
            </div>
            {project.context && (
              <div className="flex flex-col gap-2">
                <p className="text-mono-label text-muted">Context</p>
                <p className="text-mono-meta text-muted">{project.context}</p>
              </div>
            )}
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
