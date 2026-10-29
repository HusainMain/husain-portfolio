import type {
  AboutFact,
  PathBeat,
  PathNext,
  PhilosophySegment,
  SystemFlowStage,
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
 *
 * `path` replaces the old NOW + APPROACH pair: three dated beats of real work
 * (resume facts, no forecasts) and one NEXT block that states what he is
 * looking for. The engineering process is explained on /engineering; the
 * system-flow plate above carries the loop visually.
 */
export const about = {
  eyebrow: "ABOUT",
  headline: "I build software by turning ideas into working systems.",
  lead: "Computer engineering student focused on AI-assisted products, real-time applications, and system design — AWS Academy Cloud Foundations (82%) and a state-level hackathon finalist. I like taking projects from the first prototype through architecture, implementation, and deployment.",
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
  /**
   * The About right-spine loop. `output` is the artifact each stage leaves
   * behind; `note` is the intent of the stage, not a claim of tooling.
   * LEARN closes the cycle back to IDEA — the prose's "ship to learn".
   */
  systemFlow: [
    { name: "IDEA", output: "INTENT", note: "start from a real problem" },
    { name: "PROTOTYPE", output: "EVIDENCE", note: "make it work once, end to end" },
    { name: "SYSTEM", output: "ARCHITECTURE", note: "make it hold under real use" },
    { name: "SHIP", output: "USAGE", note: "put it in front of people" },
    { name: "LEARN", output: "NEXT PASS", note: "keep what the pass proved" },
  ] satisfies SystemFlowStage[],
  facts: [
    { label: "DEGREE", value: "B.E. Computer Engineering" },
    { label: "INSTITUTION", value: "SVIT, Vasad" },
    { label: "YEARS", value: "2024–2028" },
    { label: "CGPA", value: "8.48/10" },
  ] satisfies AboutFact[],
  path: {
    eyebrow: "02 / THE PATH",
    lead: "A short record of how the work moved from a first build to leading a team — and what comes next.",
    diagramCaption:
      "2024 to today — four projects, one hackathon final, and the next opening.",
    beats: [
      {
        year: "2024",
        stage: "START",
        title: "Computer engineering at SVIT, Vasad",
        note: "Started the B.E. and moved from coursework into building full-stack projects end to end.",
        outcome: "FOUNDATION",
      },
      {
        year: "2026",
        stage: "BUILD",
        title: "Shipped products, not exercises",
        note: "IdeaBridge, BuildEx, and an IPL analysis across 1,095 matches — each carried from idea through deployment.",
        outcome: "FULL-STACK",
      },
      {
        year: "2026",
        stage: "LEAD",
        title: "Led a four-person team to a state final",
        note: "At CVMU Hackathon 4.0, owned authentication, the role-based data model, and default-deny rules across three dashboards in 24 hours.",
        outcome: "TEAM LEAD",
      },
    ] satisfies PathBeat[],
    next: {
      label: "NEXT",
      status: [
        { label: "SEEKING", value: "Software engineering internship" },
        { label: "FOCUS", value: "Full-stack and AI-enabled products" },
        { label: "BASED IN", value: "India" },
      ],
      ctaLabel: "Start a conversation",
      ctaHref: "/contact",
    } satisfies PathNext,
  },
};
