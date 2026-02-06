import type { MetadataRoute } from "next";
import { portfolioData } from "./data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";
  const now = new Date().toISOString();

  const baseEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const projectEntries: MetadataRoute.Sitemap = portfolioData.projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseEntries, ...projectEntries];
}
