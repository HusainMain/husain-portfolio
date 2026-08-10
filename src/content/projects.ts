import type { Project } from "./types";

/**
 * All four projects verified against github.com/HusainMain/* (IMPLEMENTATION_PLAN.md §6).
 * Order is locked: IdeaBridge → Healthcare Appointment System → iEMS → BuildEx Website.
 */
export const projects: Project[] = [
  {
    number: "01",
    slug: "ideabridge",
    title: "IdeaBridge",
    oneLiner: "AI-Powered Startup Validation Platform",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Three.js / R3F",
      "Zustand",
      "Framer Motion",
      "Tailwind",
      "Groq API",
    ],
    repoUrl: "https://github.com/HusainMain/ideabridge",
  },
  {
    number: "02",
    slug: "healthcare-appointment-system",
    title: "Healthcare Appointment System",
    oneLiner: "Java-Based Appointment Management System",
    stack: ["Java", "OOP", "File I/O", "Queues", "Exception Handling"],
    repoUrl: "https://github.com/HusainMain/healthcare-appointment-system",
  },
  {
    number: "03",
    slug: "iems",
    title: "iEMS",
    oneLiner: "Integrated Education Management System (CVMU Hackathon)",
    stack: ["React", "Firebase", "Tailwind"],
    repoUrl: "https://github.com/HusainMain/iems",
  },
  {
    number: "04",
    slug: "buildex-website",
    title: "BuildEx Website",
    oneLiner: "Official BuildEx Startup & Entrepreneurship Club website",
    stack: ["React 19", "TypeScript", "GSAP", "Tailwind"],
    repoUrl: "https://github.com/HusainMain/buildex-website",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
