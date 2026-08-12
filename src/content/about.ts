import type {
  AboutCurrentItem,
  AboutFact,
  ApproachPrinciple,
  PhilosophySegment,
} from "./types";

/**
 * About page content — approved owner facts only (owner decisions #2/#3).
 * CGPA 8.48/10: the single site occurrence, inside the profile facts row.
 * The hero headline + lead + philosophy focus on HOW he builds (shipping
 * prototypes, architectural decisions, AI with intent) so degree/location
 * details appear only in PROFILE.
 *
 * `intro` mirrors engineering.philosophy: paragraphs split into segments so
 * key words render in serif italic with a delayed emphasis reveal (the same
 * choreography as 01 / HOW I THINK).
 */
export const about = {
  eyebrow: "ABOUT",
  headline: "I build software by turning ideas into working systems.",
  lead: "Computer engineering student focused on AI-assisted products, real-time applications, and system design. I like taking projects from the first prototype through architecture, implementation, and deployment.",
  intro: [
    [
      { text: "I ship to learn and learn to ship. An idea becomes a working " },
      { text: "prototype", accent: true },
      { text: " first, then a system that has to hold up under real use. That process forces architectural decisions, data flow, state, and boundaries to be tested against reality rather than assumptions." },
    ],
    [
      { text: "I use AI to remove mechanical work while keeping the " },
      { text: "engineering judgment", accent: true },
      { text: " mine — what to build, how to structure it, and where it can break." },
    ],
  ] satisfies PhilosophySegment[][],
  systemFlow: ["IDEA", "PROTOTYPE", "SYSTEM", "SHIP"],
  systemLabels: [["INTERFACE"], ["DATA"], ["ARCHITECTURE"], ["AI", "DEPLOYMENT"]],
  facts: [
    { label: "DEGREE", value: "B.E. Computer Engineering" },
    { label: "INSTITUTION", value: "SVIT, Vasad" },
    { label: "YEARS", value: "2024–2028" },
    { label: "CGPA", value: "8.48/10" },
  ] satisfies AboutFact[],
  currently: [
    {
      label: "BUILDING",
      title: "BuildEx — official club website",
      description:
        "The official website for SVIT's Startup & Entrepreneurship Club — a cinematic brand experience engineered as a product-grade online presence.",
      href: "/work/buildex-website",
      linkLabel: "VIEW CASE STUDY",
    },
    {
      label: "LEADING",
      title: "iEMS — hackathon team lead",
      description:
        "An AI-assisted education platform developed for a hackathon team, connecting administrators, teachers, and students in one Firebase-backed system.",
      href: "/work/iems",
      linkLabel: "VIEW CASE STUDY",
    },
  ] satisfies AboutCurrentItem[],
  interests: {
    label: "EXPLORING",
    items: [
      "LLM orchestration",
      "Real-time web applications",
      "AI-assisted product engineering",
      "System design",
    ],
  },
  approach: [
    {
      number: "01",
      title: "BUILD THE SYSTEM",
      description:
        "I think about architecture, boundaries, and data flow before complexity accumulates.",
    },
    {
      number: "02",
      title: "PROTOTYPE EARLY",
      description: "A working prototype exposes constraints faster than a polished idea on paper.",
    },
    {
      number: "03",
      title: "USE AI WITH INTENT",
      description:
        "I use AI to accelerate implementation and remove mechanical work, not to outsource engineering judgment.",
    },
    {
      number: "04",
      title: "SHIP TO LEARN",
      description: "Real usage reveals problems that planning alone cannot.",
    },
  ] satisfies ApproachPrinciple[],
};