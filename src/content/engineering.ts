import type {
  AiEngineering,
  CompetitiveProgramming,
  EngineeringProcessStep,
  PhilosophySegment,
  ToolkitGroup,
} from "./types";

/**
 * Engineering page content — "how Husain thinks and works".
 * Philosophy is the verified statement (byte-exact, IMPLEMENTATION_PLAN.md §8);
 * process bodies and AI prose are restatements of that statement — no new claims.
 * LeetCode "40+" statement: the single site occurrence (owner decision #1).
 */
export const engineering = {
  eyebrow: "01 / APPROACH",
  lead: "How I think and work — philosophy, process, and engineering practice.",
  philosophy: [
    {
      text: "I believe great engineering begins with understanding the problem before writing code. I build scalable systems grounded in ",
    },
    { text: "first principles", accent: true },
    { text: ", using AI to accelerate development while relying on " },
    { text: "engineering judgment", accent: true },
    { text: " to deliver practical, maintainable solutions." },
  ] satisfies PhilosophySegment[],
  process: [
    {
      number: "01",
      title: "Understand the problem",
      body: "Requirements, constraints, and failure modes come first — before any code is written.",
    },
    {
      number: "02",
      title: "Design from first principles",
      body: "Architecture derived from fundamentals, not borrowed patterns.",
    },
    {
      number: "03",
      title: "Build with AI as an accelerator",
      body: "AI speeds the build — prototyping, boilerplate, iteration — while design decisions stay mine.",
    },
    {
      number: "04",
      title: "Verify with engineering judgment",
      body: "The result is checked against requirements, tradeoffs, and maintainability.",
    },
  ] satisfies EngineeringProcessStep[],
  ai: {
    prose: [
      "AI accelerates the build: rapid prototyping, prompt-driven iteration, and boilerplate that would otherwise slow momentum. Every AI-assisted surface is treated as code — reviewed, tested, and verified like anything else I ship.",
      "Integration is practical: REST APIs and MCP tooling, each checked against its documentation before it is used. AI shortens the distance between idea and running system; it does not decide what the system should be.",
    ],
    judgment: [
      "REQUIREMENTS — defined before AI is involved",
      "ARCHITECTURE — decided by judgment, not generated",
      "VERIFICATION — every claim checked against source",
      "TRADEOFFS — weighed against the actual constraints",
      "MAINTAINABILITY — the final filter on what ships",
    ],
  } satisfies AiEngineering,
  competitive: {
    label: "PROBLEM SOLVING",
    statement:
      "40+ LeetCode problems across data structures, algorithms, recursion, trees, queues, dynamic programming",
    url: "https://leetcode.com/u/W9RFMcxTXL/",
    linkLabel: "LeetCode profile",
  } satisfies CompetitiveProgramming,
  toolkit: {
    groups: [
      {
        group: "Languages",
        tags: ["Java", "JavaScript", "TypeScript", "Python", "C"],
      },
      {
        group: "Frameworks / Frontend",
        tags: ["React", "Vite", "Tailwind CSS", "GSAP", "React Router"],
      },
      {
        group: "CS Core",
        tags: [
          "OOP",
          "Data Structures & Algorithms",
          "Recursion",
          "Trees",
          "Queues",
          "Dynamic Programming",
        ],
      },
      {
        group: "AI & Tools",
        tags: [
          "LLM APIs",
          "Prompt Engineering",
          "MCP",
          "REST APIs",
          "AI-Assisted Prototyping",
          "Git",
          "GitHub",
          "Vercel",
        ],
      },
    ] satisfies ToolkitGroup[],
  },
};
