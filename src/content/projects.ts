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
    context:
      "React SPA with an Express AI-analysis API; deployed on Vercel — ideabridge-six.vercel.app",
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
    oneLiner: "Java CLI Appointment Management System",
    context:
      "Educational Java project — console appointment manager with per-doctor FIFO queues",
    stack: ["Java", "OOP", "Queues", "CLI"],
    repoUrl: "https://github.com/HusainMain/Healthcare_Appointment_System",
  },
  {
    number: "03",
    slug: "iems",
    title: "iEMS",
    oneLiner: "Integrated Education Management System\nCVMU Hackathon",
    context:
      "React + Firebase education platform — developed at the CVMU hackathon as team lead",
    stack: ["React", "Firebase", "Tailwind"],
    repoUrl: "https://github.com/HusainMain/iems",
  },
  {
    number: "04",
    slug: "buildex-website",
    title: "BuildEx Website",
    oneLiner: "Official BuildEx Startup & Entrepreneurship Club website",
    context:
      "Official club website of BuildEx, SVIT Vasad — live at buildex-website-sooty.vercel.app",
    stack: ["React 19", "TypeScript", "GSAP", "Tailwind"],
    repoUrl: "https://github.com/HusainMain/buildex-website",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
