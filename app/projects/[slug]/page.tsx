import { notFound } from "next/navigation";
import Link from "next/link";
import { portfolioData } from "@/app/data/portfolio";
import { ExternalLink } from "lucide-react";

export const dynamicParams = true;

export function generateStaticParams() {
  return portfolioData.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-4xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <Link
            href="/"
            className="text-slate-400 hover:text-white underline underline-offset-4"
          >
            Back
          </Link>
        </div>
        <p className="text-slate-300 leading-relaxed mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20"
            >
              {t}
            </span>
          ))}
        </div>
        <div>
          <a
            href={project.link}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white"
          >
            <ExternalLink className="w-5 h-5" />
            View Project
          </a>
        </div>
      </section>
    </main>
  );
}
