import { Link } from "react-router";
import { projects } from "../content/projects";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Rule } from "../components/ui/Rule";
import { MetaTags } from "../components/ui/Tag";
import { Reveal } from "../components/motion/Reveal";

/**
 * /work — numbered editorial index (SITE_MAP.md §6). Same document grammar as
 * the case-study pages: kicker rule, frame-aligned header, hairline sections.
 */
export default function WorkPage() {
  return (
    <>
      <section className="case-meta bg-canvas pt-[72px] max-md:pt-[60px]">
        <div className="grid-frame items-start">
          <div className="col-span-4 py-12 md:col-span-8 md:py-16 lg:col-span-8 lg:py-20">
            <Reveal>
              <span aria-hidden="true" className="case-kicker-rule" />
            </Reveal>
            <Reveal delay={60}>
              <p className="text-mono-label mt-6 text-orange-deep">01 / INDEX</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="case-title mt-4 text-navy-900">Work</h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-lead mt-5 max-w-[55ch] text-muted">
                Four projects, documented as engineering case studies — every
                claim verified against the repositories' source code before it
                was written here.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="case-meta-row mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:hidden">
                <p className="text-mono-tag text-orange-deep">04 PROJECTS</p>
                <span aria-hidden="true" className="text-mono-meta text-muted">
                  ·
                </span>
                <p className="text-mono-meta text-muted">VERIFIED — SOURCE</p>
              </div>
            </Reveal>
          </div>

          <Reveal
            delay={240}
            className="hidden lg:block lg:col-span-3 lg:col-start-10 lg:self-stretch"
          >
            <aside className="case-meta-col pt-20 lg:h-full lg:border-l lg:border-rule-on-cream lg:pl-6">
              <div className="flex flex-col gap-2">
                <p className="text-mono-label text-muted">Projects</p>
                <MetaTags items={["01 — 04"]} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-mono-label text-muted">Evidence</p>
                <p className="text-mono-meta text-muted">
                  Verified against github.com/HusainMain
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="case-section">
        <div className="grid-frame">
          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-12 lg:col-start-1">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 flex items-baseline gap-6">
                <Eyebrow as="h2" className="shrink-0">
                  02 / PROJECTS
                </Eyebrow>
                <span
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-rule-on-cream md:block"
                />
              </div>
              <ul className="col-span-12 mt-6 md:mt-8 lg:mt-10">
                {projects.map((project, index) => (
                  <li key={project.slug}>
                    <Link
                      to={`/work/${project.slug}`}
                      className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 transition-colors duration-200 hover:bg-[rgba(22,36,61,0.03)] max-md:py-6"
                    >
                      <span
                        aria-hidden="true"
                        className="text-mono-label col-span-2 text-orange md:col-span-1 lg:col-span-1"
                      >
                        {project.number}
                      </span>
                      <span className="col-span-10 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] text-navy-900 transition-transform duration-200 group-hover:translate-x-1 md:col-span-4 lg:col-span-4">
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
                        className="col-span-1 hidden justify-end text-navy-900 transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-deep lg:col-span-1 lg:flex"
                      >
                        →
                      </span>
                    </Link>
                    {index < projects.length - 1 && <Rule />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
