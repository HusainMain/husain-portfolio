import { Link } from "react-router";
import { projects } from "../../content/projects";
import { home } from "../../content/home";
import { Eyebrow } from "../ui/Eyebrow";
import { Rule } from "../ui/Rule";
import { Reveal } from "../motion/Reveal";

/** Selected Work — numbered editorial index on a full-bleed navy band (§7.4). */
export function WorkIndex() {
  return (
    <section className="bg-navy-900">
      <div className="grid-frame section-pad">
        <div className="col-span-12 md:col-span-8 lg:col-span-12">
          <Reveal>
            <Eyebrow as="h2" tone="navy">
              {home.workEyebrow}
            </Eyebrow>
          </Reveal>
        </div>

        <ul className="col-span-12 md:col-span-8 lg:col-span-12">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={index * 70}>
                <Link
                  to={`/work/${project.slug}`}
                  className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 py-8 transition-colors duration-200 hover:bg-cream/[0.05] max-md:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="text-mono-label col-span-2 text-orange-on-navy md:col-span-1 lg:col-span-1"
                  >
                    {project.number}
                  </span>
                  <span className="col-span-10 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em] text-cream transition-transform duration-200 group-hover:translate-x-1 md:col-span-4 lg:col-span-4">
                    {project.title}
                  </span>
                  <span className="col-span-10 col-start-3 text-muted-on-navy md:col-span-4 md:col-start-auto lg:col-span-4">
                    {project.oneLiner}
                  </span>
                  <span className="col-span-10 col-start-3 flex flex-wrap gap-x-4 gap-y-1 md:col-span-2 md:col-start-auto lg:col-span-2">
                    {project.stack.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-mono-tag text-orange-on-navy">
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-span-1 hidden justify-end text-cream transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-on-navy-hi lg:col-span-1 lg:flex"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
              {index < projects.length - 1 && <Rule tone="navy" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
