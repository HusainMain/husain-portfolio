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
  /** Provenance of the temporary demo asset; replace before launch. */
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

export interface CaseStudy {
  slug: string;
  problem: string[];
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

export interface ProcessStep {
  number: string;
  title: string;
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

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutCurrentItem {
  label: string;
  title: string;
  href: string;
  linkLabel: string;
}
