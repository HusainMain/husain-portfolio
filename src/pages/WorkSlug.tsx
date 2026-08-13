import { Fragment } from "react";
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
import { FadeIn } from "../components/motion/FadeIn";
import { Parallax } from "../components/motion/Parallax";
import { Stagger } from "../components/motion/Stagger";
import NotFoundPage from "./NotFound";

export default function WorkSlug() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const caseStudy = slug ? getCaseStudy(slug) : undefined;

  if (!project || !caseStudy) {
    return <NotFoundPage />;
  }

  return (
    <Fragment key={slug}>
      <CaseStudyMeta project={project} />

      <CaseSection eyebrow="02 / PROBLEM">
        <FadeIn y={14} duration={0.55}>
          <div className="flex flex-col gap-4">
            {caseStudy.problem.map((paragraph) => (
              <p key={paragraph} className="case-body max-w-[72ch] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </CaseSection>

      <CaseSection eyebrow="03 / CONSTRAINTS">
        <div className="case-well p-0 overflow-hidden">
          <Stagger
            as="ol"
            step={90}
            className="grid grid-cols-1 md:grid-cols-2 divide-y divide-rule-on-cream md:divide-y-0 md:divide-x md:divide-rule-on-cream"
          >
            {caseStudy.constraints.map((constraint) => (
              <li
                key={constraint.number}
                className="flex items-start gap-4 p-5 md:p-6 group transition-colors duration-200 hover:bg-orange/5"
              >
                <span
                  aria-hidden="true"
                  className="text-mono-label shrink-0 text-orange-deep font-semibold bg-orange/10 px-2 py-1 rounded text-[11px] transition-colors duration-200 group-hover:bg-orange/20"
                >
                  {constraint.number}
                </span>
                <p className="text-mono-meta text-navy-900 font-medium leading-relaxed text-sm">
                  {constraint.text}
                </p>
              </li>
            ))}
          </Stagger>
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
          <FadeIn y={12} duration={0.5} className="col-span-12 flex flex-col gap-4 lg:col-span-8 lg:col-start-3">
            <p className="text-mono-label text-orange-deep">IMPLEMENTATION NOTES</p>
            {caseStudy.implementation.body.map((paragraph) => (
              <p key={paragraph} className="case-body max-w-[72ch] text-muted">
                {paragraph}
              </p>
            ))}
          </FadeIn>
          <FadeIn y={12} delay={0.12} duration={0.5} className="hidden lg:block lg:col-span-2 lg:col-start-11">
            <aside className="flex flex-col gap-4">
              {caseStudy.implementation.annotations.map((annotation) => (
                <div key={annotation.note} className="case-margin-card">
                  <span className="block text-orange-deep font-semibold text-[11px]">
                    // {annotation.anchor}
                  </span>
                  <span className="text-[12px]">{annotation.note}</span>
                </div>
              ))}
            </aside>
          </FadeIn>
          <FadeIn y={12} delay={0.18} duration={0.5} className="col-span-12 flex flex-col gap-2 lg:hidden">
            {caseStudy.implementation.annotations.map((annotation) => (
              <div key={annotation.note} className="case-margin-card">
                <span className="block text-orange-deep font-semibold text-[11px]">
                  // {annotation.anchor}
                </span>
                <span className="text-[12px]">{annotation.note}</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </CaseSection>

      <CaseSection
        eyebrow="06 / ARCHITECTURE"
        contentClassName="lg:col-span-10 lg:col-start-3"
      >
        <figure className="case-well">
          <Parallax distance={4}>
            <ArchitectureDiagram diagram={caseStudy.architecture} />
          </Parallax>
          <figcaption className="case-caption mt-5">
            Architecture — conceptual diagram
          </figcaption>
        </figure>
        <p className="text-mono-meta mt-6 max-w-[72ch] text-muted">
          {caseStudy.architecture.note ??
            "Topology verified against the repository's source files — the SPA journey, the analysis pipeline, and the service boundary."}
        </p>
      </CaseSection>

      <CaseSection
        eyebrow="07 / STACK"
        contentClassName="lg:col-span-12 lg:col-start-1"
      >
        <CaseStack stack={caseStudy.stack} />
      </CaseSection>

      <CaseSection eyebrow="08 / REPOSITORY">
        <CaseRepository repository={caseStudy.repository} />
      </CaseSection>

      <CaseSection eyebrow="09 / REFLECTION">
        <CaseReflection reflection={caseStudy.reflection} />
      </CaseSection>

      <PrevNextNav currentSlug={project.slug} />
    </Fragment>
  );
}
