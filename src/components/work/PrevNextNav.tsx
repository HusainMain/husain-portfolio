import { Link } from "react-router";
import { projects } from "../../content/projects";
import { Stagger } from "../motion/Stagger";

interface PrevNextNavProps {
  currentSlug: string;
}

interface NavTarget {
  to: string;
  title: string;
  kind: "project" | "index";
}

function targetFor(index: number, offset: -1 | 1): NavTarget {
  const neighbor = projects[index + offset];
  if (neighbor) {
    return { to: `/work/${neighbor.slug}`, title: neighbor.title, kind: "project" };
  }
  return { to: "/work", title: "All work", kind: "index" };
}

/** Prev/Next navy band — locked project order, edges wrap to /work. */
export function PrevNextNav({ currentSlug }: PrevNextNavProps) {
  const index = projects.findIndex((project) => project.slug === currentSlug);
  if (index < 0) return null;
  const prev = targetFor(index, -1);
  const next = targetFor(index, 1);
  return (
    <section className="bg-navy-900">
      <Stagger as="nav" aria-label="More projects" step={120} className="grid-frame py-12 md:py-16">
        <Link
          to={prev.to}
          aria-label={`Previous — ${prev.title}`}
          className="prevnext-cell navy-focus group col-span-4 flex flex-col gap-3 py-8 md:col-span-4 md:py-10 md:pr-8 lg:col-span-6 lg:py-12"
        >
          <span className="text-mono-label flex items-center gap-2 text-muted-on-navy">
            <span
              aria-hidden="true"
              className="text-orange-on-navy transition-transform duration-200 group-hover:-translate-x-1"
            >
              ←
            </span>
            Previous
          </span>
          <span className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-cream transition-transform duration-200 group-hover:-translate-x-1">
            {prev.title}
          </span>
        </Link>
        <Link
          to={next.to}
          aria-label={`Next — ${next.title}`}
          className="prevnext-cell navy-focus group col-span-4 flex flex-col gap-3 border-t border-rule-on-navy py-8 md:col-span-4 md:border-l md:border-t-0 md:py-10 md:pl-8 md:text-right lg:col-span-6 lg:py-12"
        >
          <span className="text-mono-label flex items-center gap-2 text-muted-on-navy md:justify-end">
            Next
            <span
              aria-hidden="true"
              className="text-orange-on-navy transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <span className="font-display text-[clamp(1.25rem,2vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] text-cream transition-transform duration-200 group-hover:translate-x-1">
            {next.title}
          </span>
        </Link>
      </Stagger>
    </section>
  );
}
