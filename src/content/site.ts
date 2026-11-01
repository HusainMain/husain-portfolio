import type { LinkItem, NavItem, PortraitAsset } from "./types";

export const site = {
  firstName: "Husain",
  lastName: "Bardanwala",
  name: "Husain Bardanwala",
  role: "Software Engineer",
  roleDescriptor: "Intelligent Systems Builder",
  roleLine: "Software Engineer / Intelligent Systems Builder",
  location: "India",
  email: "husainbardanwala65@gmail.com",
  heroEyebrow: "Software Engineer — Intelligent Systems Builder",
  heroPhilosophy:
    "I design and build software systems end to end — with AI as an accelerator and engineering judgment as the final filter.",
  heroMeta: {
    location: "LOCATION — INDIA",
    github: "GITHUB →",
  },
  portraitCaption: "ENGINEERING, END TO END",
  nav: [
    { label: "About", href: "/about" },
    { label: "Engineering", href: "/engineering" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  socials: [
    {
      label: "GitHub",
      url: "https://github.com/HusainMain",
      external: true,
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/husain-bardanwala",
      external: true,
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/W9RFMcxTXL/",
      external: true,
    },
  ] satisfies LinkItem[],
  /** Availability line — the one thing a recruiter needs above the fold. */
  availability: "Open to software engineering internships",
  resumeUrl: "/husain-bardanwala-resume.pdf",
  resumeLabel: "Résumé",
  sourceUrl: "https://github.com/HusainMain/husain-portfolio",
  portrait: {
    src: "/images/hero-portrait-1024.webp",
    srcSet:
      "/images/hero-portrait-640.webp 640w, /images/hero-portrait-1024.webp 1024w",
    width: 1024,
    height: 1538,
    alt: "Monochrome editorial portrait of Husain Bardanwala",
    sourceNote:
      "Final owner photograph shot for the hero panel; monochrome to match the site's editorial aesthetic.",
  } satisfies PortraitAsset,
};
