export interface LinkItem {
  label: string;
  url: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortraitAsset {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  /** Provenance of the hero portrait asset. */
  sourceNote: string;
}

export interface Project {
  number: string;
  slug: string;
  title: string;
  oneLiner: string;
  stack: string[];
  repoUrl: string;
  /** Verified one-liner for the case-study header CONTEXT meta. */
  context?: string;
}

export interface ConstraintItem {
  number: string;
  text: string;
}

export interface DecisionRowItem {
  number: string;
  decision: string;
  reason: string;
  tradeOff?: string;
}

export interface MarginAnnotation {
  anchor: string;
  note: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  accent?: boolean;
}

export interface DiagramLayer {
  label: string;
  nodes: DiagramNode[];
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

export interface ArchitectureDiagram {
  title: string;
  desc: string;
  layers: DiagramLayer[];
  edges: DiagramEdge[];
  /**
   * Verified topology note rendered under the diagram (falls back to the
   * IdeaBridge caption for studies that predate this field).
   */
  note?: string;
}

export interface CaseStudyStack {
  group: string;
  tags: string[];
}

/** A compact data figure attached to a case study (the IPL season strip). */
export interface CaseDataPlate {
  /** Visible caption above the figure. */
  title: string;
  /** One line of framing under the title. */
  desc: string;
  /** Bars are read against this fixed reference. */
  reference: number;
  referenceLabel: string;
  bars: { label: string; value: number }[];
  note: string;
}

export interface CaseStudy {
  slug: string;
  problem: string[];
  /** Optional data figure rendered with the problem, before the constraints. */
  dataPlate?: CaseDataPlate;
  constraints: ConstraintItem[];
  decisions: DecisionRowItem[];
  implementation: { body: string[]; annotations: MarginAnnotation[] };
  architecture: ArchitectureDiagram;
  stack: CaseStudyStack[];
  repository: { url: string; evidence: string };
  reflection: { pullLine: string; body: string };
}

export interface CapabilityGroup {
  title: string;
  statement: string;
  tags: string[];
}

export interface Contribution {
  label: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface BuildStatement {
  number: string;
  statement: string;
  /** Word(s) rendered in serif italic. */
  accent: string;
}

export interface PhilosophySegment {
  text: string;
  /** Word(s) rendered in serif italic (orange-deep). */
  accent?: boolean;
}

export interface EngineeringProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface AiEngineering {
  prose: string[];
  /** Mono annotation column — where human engineering judgment remains. */
  judgment: string[];
}

export interface CompetitiveProgramming {
  label: string;
  statement: string;
  url: string;
  linkLabel: string;
}

export interface ToolkitGroup {
  group: string;
  tags: string[];
}

export interface SystemFlowStage {
  name: string;
  /** What the stage produces, shown in the technical right margin. */
  output: string;
  /** One short line under the stage name — the intent of the stage. */
  note: string;
}

export interface AboutFact {
  label: string;
  value: string;
}

/** One beat on the About path — a stage of the work, not a job title. */
export interface PathBeat {
  year: string;
  stage: string;
  title: string;
  /** One factual line: the evidence for the stage. */
  note: string;
  /** Short mono label carried in the diagram margin. */
  outcome: string;
}

export interface PathStatus {
  label: string;
  value: string;
}

export interface PathNext {
  label: string;
  status: PathStatus[];
  ctaLabel: string;
  ctaHref: string;
}

/* ---- IPL data study -------------------------------------------------------
   Every figure below is computed from the committed matches.csv in
   github.com/HusainMain/IPL_Analysis (1,095 rows, 2008–2024). Nothing here is
   estimated or copied from a summary. */

/** One side of a two-way split, as a share of its own denominator. */
export interface IplShare {
  label: string;
  value: number;
  wins: number;
  total: number;
  /** Line rendered under the figure. */
  note: string;
}

export interface IplSeason {
  season: string;
  matches: number;
  chasePct: number;
}

export interface IplStudy {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  lead: string;
  /** The two states of the interactive plate. */
  views: IplShare[];
  /** Fixed reference the bars are read against. */
  baseline: number;
  baselineLabel: string;
  /** Dataset facts shown under the copy — what the numbers were computed from. */
  provenance: { label: string; value: string }[];
  seasons: IplSeason[];
  /** Public source of the underlying dataset. */
  source: string;
  ctaLabel: string;
  ctaHref: string;
}

