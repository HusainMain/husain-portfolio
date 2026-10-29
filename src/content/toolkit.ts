import type { ToolkitGroup } from "./types";

/**
 * The single technical-toolkit source for the site.
 *
 * Engineering renders every group in `05 / ENGINEERING TOOLKIT`; Home curates a
 * subset into four capability statements and links here for the full list, so
 * a skill is never listed in one place and missing from the other.
 *
 * Tags mirror `HUSAIN_BARDANWALA_SWE.pdf` — no proficiency claims, no tools the
 * resume does not support.
 */
export const toolkit = [
  {
    group: "Languages",
    tags: ["Java", "Python", "C", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    group: "Frontend",
    tags: ["React", "Vite", "Tailwind CSS", "GSAP", "React Router", "Accessibility"],
  },
  {
    group: "Backend & Data",
    tags: [
      "Node.js",
      "Express",
      "REST APIs",
      "MongoDB Atlas",
      "pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Jupyter",
    ],
  },
  {
    group: "Cloud & Tools",
    tags: ["AWS", "Vercel", "Render", "Supabase", "Git", "GitHub"],
  },
  {
    group: "AI & Tools",
    tags: ["LLM APIs", "Prompt Engineering", "MCP", "AI-Assisted Prototyping"],
  },
  {
    group: "CS Core",
    tags: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management",
      "Operating Systems",
    ],
  },
] satisfies ToolkitGroup[];

/**
 * A curated Home tag row. Every tag must exist in `toolkit`, so the curated
 * view cannot drift from the appendix. Fails loudly in development only.
 */
export function pickTools(...tags: string[]): string[] {
  if (import.meta.env.DEV) {
    const known = new Set(toolkit.flatMap((group) => group.tags));
    const missing = tags.filter((tag) => !known.has(tag));
    if (missing.length > 0) {
      throw new Error(`Unknown toolkit tag(s): ${missing.join(", ")}`);
    }
  }
  return tags;
}
