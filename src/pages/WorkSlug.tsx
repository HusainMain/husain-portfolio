import { useParams } from "react-router";
import { getProjectBySlug } from "../content/projects";
import { getCaseStudy } from "../content/caseStudies";
import { CaseSection } from "../components/work/CaseSection";
import { CaseStudyMeta } from "../components/work/CaseStudyMeta";
import { CaseStack } from "../components/work/CaseStack";
import { CaseRepository } from "../components/work/CaseRepository";
import { CaseReflection } from "../components/work/CaseReflection";
import { DecisionRows } from "../components/work/DecisionRows";
import { ArchitectureDiagram } from "../components/work/ArchitectureDiagram";
import { PrevNextNav } from "../components/work/PrevNextNav";
import { NotFoundPlaceholder } from "./placeholders";

export default function WorkSlug() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const caseStudy = slug ? getCaseStudy(slug) : undefined;

  if (!project || !caseStudy) {
    return <NotFoundPlaceholder />;
  }

  return (
    <>
      <CaseStudyMeta project={project} />

      <CaseSection eyebrow="02 / PROBLEM">
        <div className="flex flex-col gap-4">
          {caseStudy.problem.map((paragraph) => (
            <p key={paragraph} className="case-body max-w-[72ch] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </CaseSection>

      <CaseSection eyebrow="03 / CONSTRAINTS">
        <div className="case-well">
          <ol className="flex flex-col gap-4">
            {caseStudy.constraints.map((constraint) => (
              <li key={constraint.number} className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className="text-mono-label shrink-0 text-orange"
                >
                  {constraint.number}
                </span>
                <span className="text-mono-meta text-muted">{constraint.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="04 / DESIGN DECISIONS"
        contentClassName="lg:col-span-10 lg:col-start-3"
      >
        <DecisionRows items={caseStudy.decisions} />
      </CaseSection>

      <CaseSection
        eyebrow="05 / IMPLEMENTATION"
        contentClassName="lg:col-span-12 lg:col-start-1"
      >
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-4 flex flex-col gap-4 md:col-span-12 lg:col-span-8 lg:col-start-3">
            {caseStudy.implementation.body.map((paragraph) => (
              <p key={paragraph} className="case-body max-w-[72ch] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <aside className="hidden lg:col-span-2 lg:col-start-11 lg:flex lg:flex-col lg:gap-6">
            {caseStudy.implementation.annotations.map((annotation) => (
              <p key={annotation.note} className="case-margin-note">
                — {annotation.note}
              </p>
            ))}
          </aside>
          <div className="col-span-4 flex flex-col gap-2 md:col-span-12 lg:hidden">
            {caseStudy.implementation.annotations.map((annotation) => (
              <p key={annotation.note} className="case-margin-note">
                — {annotation.note}
              </p>
            ))}
          </div>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="06 / ARCHITECTURE"
        contentClassName="lg:col-span-10 lg:col-start-3"
      >
        <figure className="case-well">
          <ArchitectureDiagram diagram={caseStudy.architecture} />
          <figcaption className="case-caption mt-5">
            Architecture — conceptual diagram
          </figcaption>
        </figure>
        <p className="text-mono-meta mt-6 max-w-[72ch] text-muted">
          {caseStudy.architecture.note ??
            "Topology verified against the repository's source files — the SPA journey, the analysis pipeline, and the service boundary."}
        </p>
      </CaseSection>

      <CaseSection eyebrow="07 / STACK">
        <CaseStack stack={caseStudy.stack} />
      </CaseSection>

      <CaseSection eyebrow="08 / REPOSITORY">
        <CaseRepository repository={caseStudy.repository} />
      </CaseSection>

      <CaseSection eyebrow="09 / REFLECTION">
        <CaseReflection reflection={caseStudy.reflection} />
      </CaseSection>

      <PrevNextNav currentSlug={project.slug} />
    </>
  );
}
