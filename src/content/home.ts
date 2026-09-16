import type { BuildStatement, CapabilityGroup, Contribution, ProcessStep } from "./types";

export const home = {
  whatIBuildEyebrow: "WHAT I BUILD",
  whatIBuild: [
    {
      number: "01",
      statement: "I architect full-stack ",
      accent: "products",
    },
    {
      number: "02",
      statement: "I build AI-enabled ",
      accent: "systems",
    },
    {
      number: "03",
      statement: "I engineer interactive ",
      accent: "experiences",
    },
  ] satisfies BuildStatement[],
  workEyebrow: "SELECTED WORK",
  philosophyEyebrow: "HOW I THINK",
  philosophy:
    "Great engineering begins with understanding the problem before writing code. I build scalable systems grounded in ",
  philosophyAccent1: "first principles",
  philosophyAccent2: ", using AI to accelerate development while relying on ",
  philosophyAccent3: "engineering judgment",
  philosophyTail: " to deliver practical, maintainable solutions.",
  process: [
    { number: "01", title: "Understand the problem" },
    { number: "02", title: "Design from first principles" },
    { number: "03", title: "Build with AI as an accelerator" },
    { number: "04", title: "Verify with engineering judgment" },
  ] satisfies ProcessStep[],
  capabilitiesEyebrow: "CAPABILITIES",
  capabilities: [
    {
      title: "Systems",
      statement: "Designing, building, and shipping full-stack products end to end.",
      tags: ["React", "TypeScript", "Vite", "Firebase", "REST APIs"],
    },
    {
      title: "AI-Assisted Engineering",
      statement: "Accelerating development with AI without surrendering engineering judgment.",
      tags: ["LLM APIs", "Prompt Engineering", "MCP", "AI-Assisted Prototyping"],
    },
    {
      title: "Interaction",
      statement: "Engineering interfaces that feel considered, responsive, and accessible.",
      tags: ["GSAP", "Motion", "Tailwind CSS", "Responsive Design", "Accessibility"],
    },
    {
      title: "Engineering Practice",
      statement: "Discipline in process — from first principles to verified delivery.",
      tags: ["Java", "OOP", "Data Structures", "Algorithms", "Git"],
    },
  ] satisfies CapabilityGroup[],
  contributionsEyebrow: "CONTRIBUTIONS",
  contributions: [
    {
      label: "LEADERSHIP",
      title: "iEMS — 24-hour hackathon team lead",
      description:
        "Led the build of the Integrated Education Management System at the CVMU hackathon — React, Firebase, and Tailwind, delivered in a day.",
      href: "/work/iems",
      linkLabel: "Read the case study",
    },
    {
      label: "OWNERSHIP",
      title: "BuildEx — official club website",
      description:
        "Official developer of the BuildEx Startup & Entrepreneurship Club website — React 19, TypeScript, GSAP, and Tailwind.",
      href: "/work/buildex-website",
      linkLabel: "Read the case study",
    },
  ] satisfies Contribution[],
  contactEyebrow: "CONTACT",
  contactHeadline: "Have a problem worth ",
  contactHeadlineAccent: "building",
  contactHeadlineTail: "?",
  identityMarquee: ["SYSTEMS", "PRODUCTS", "AI", "ENGINEERING", "BUILD"],
  contactMarquee: ["BUILD", "SHIP", "LEARN", "ITERATE", "ENGINEER", "REPEAT"],
};
