import type { AboutCurrentItem, AboutFact } from "./types";

/**
 * About page content — approved owner facts only (owner decisions #2/#3).
 * CGPA 8.48/10: the single site occurrence, inside the facts row.
 * No biography beyond the approved facts; no fabricated experiments/results.
 */
export const about = {
  eyebrow: "ABOUT",
  lead: "Computer engineering student at SVIT, Vasad — building software systems end to end.",
  intro: [
    "I'm a Computer Engineering student at SVIT, Vasad (2024–2028). I build full-stack products, AI-enabled systems, and interactive web experiences — and I learn by building.",
    "Experimentation drives my learning: exploring how software systems work by implementing them, and trying AI-enabled product ideas as working prototypes.",
  ],
  facts: [
    { label: "DEGREE", value: "B.E. Computer Engineering" },
    { label: "INSTITUTION", value: "SVIT, Vasad" },
    { label: "YEARS", value: "2024–2028" },
    { label: "CGPA", value: "8.48/10" },
  ] satisfies AboutFact[],
  currently: [
    {
      label: "OWNERSHIP",
      title: "BuildEx — official club website",
      href: "/work/buildex-website",
      linkLabel: "Read the case study",
    },
    {
      label: "LEADERSHIP",
      title: "iEMS — hackathon team lead",
      href: "/work/iems",
      linkLabel: "Read the case study",
    },
  ] satisfies AboutCurrentItem[],
  interests: {
    label: "INTERESTS",
    items: ["Software systems", "AI-enabled products", "Interactive web experiences"],
  },
};
