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
  portraitCaption: "HUSAIN BARDANWALA — BHARUCH, INDIA",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Engineering", href: "/engineering" },
    { label: "About", href: "/about" },
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
    src: "/images/hero-portrait-demo-960.jpg",
    srcSet:
      "/images/hero-portrait-demo-480.jpg 480w, /images/hero-portrait-demo-960.jpg 960w, /images/hero-portrait-demo-1600.jpg 1600w",
    width: 960,
    height: 1280,
    alt: "Editorial portrait placeholder — to be replaced with the owner's photograph",
    sourceNote:
      "Temporary demo image: Pexels photo 16538151 (free to use, no attribution required). Replace with Husain's own photograph before launch. Swap the three hero-portrait-demo-*.jpg files and this entry.",
  } satisfies PortraitAsset,
};
