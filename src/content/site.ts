import type { LinkItem, NavItem, PortraitAsset } from "./types";

export const site = {
  firstName: "Husain",
  lastName: "Bardanwala",
  name: "Husain Bardanwala",
  role: "Software Engineer",
  roleDescriptor: "Intelligent Systems Builder",
  roleLine: "Software Engineer / Intelligent Systems Builder",
  location: "Bharuch, India",
  email: "husainbardanwala65@gmail.com",
  heroEyebrow: "Software Engineer — Intelligent Systems Builder",
  heroPhilosophy:
    "I design and build software systems end to end — with AI as an accelerator and engineering judgment as the final filter.",
  heroMeta: {
    location: `LOCATION — ${"BHARUCH, INDIA"}`,
    github: "GITHUB →",
    scroll: "SCROLL ↓",
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
      url: "https://linkedin.com/in/husain-bardanwala-93a56b376",
      external: true,
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/W9RFMcxTXL/",
      external: true,
    },
  ] satisfies LinkItem[],
  portrait: {
    src: "/images/hero-portrait.jpg",
    srcSet: "/images/hero-portrait.jpg 1023w",
    width: 1023,
    height: 1537,
    alt: "Monochrome editorial portrait of Husain Bardanwala",
    sourceNote:
      "Final owner photograph shot for the hero panel; monochrome to match the site's editorial aesthetic.",
  } satisfies PortraitAsset,
};
