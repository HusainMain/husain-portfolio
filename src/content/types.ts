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
