import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const FONT_FILES: Record<string, string> = {
  "space-grotesk-latin-wght-normal.woff2":
    "@fontsource-variable/space-grotesk",
  "jetbrains-mono-latin-wght-normal.woff2":
    "@fontsource-variable/jetbrains-mono",
  "instrument-serif-latin-400-normal.woff2": "@fontsource/instrument-serif",
  "instrument-serif-latin-400-italic.woff2": "@fontsource/instrument-serif",
};

function fontPreload(): Plugin {
  return {
    name: "font-preload",
    transformIndexHtml(_html, ctx) {
      const hrefs = new Set<string>();
      if (ctx.bundle) {
        const files = Object.values(ctx.bundle);
        for (const file of files) {
          if (file.type !== "asset") continue;
          const basename = file.name?.split("/").pop() ?? "";
          if (basename && Object.keys(FONT_FILES).includes(basename)) {
            hrefs.add(`/${file.fileName}`);
          }
        }
      } else {
        for (const [file, pkg] of Object.entries(FONT_FILES)) {
          hrefs.add(`/node_modules/${pkg}/files/${file}`);
        }
      }
      if (hrefs.size === 0) return;
      const links = [...hrefs]
        .map(
          (href) =>
            `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin />`,
        )
        .join("");
      return {
        html: _html.replace("</head>", `${links}</head>`),
        tags: [],
      };
    },
  };
}

/** Case-study slugs, kept in sync with src/content/projects.ts. */
const ROUTES: Array<[path: string, priority: string]> = [
  ["/", "1.0"],
  ["/work", "0.9"],
  ["/work/ideabridge", "0.8"],
  ["/work/healthcare-appointment-system", "0.8"],
  ["/work/iems", "0.8"],
  ["/work/buildex-website", "0.8"],
  ["/about", "0.7"],
  ["/engineering", "0.7"],
  ["/contact", "0.6"],
];

/**
 * Resolve the deployed origin. `VITE_SITE_URL` wins (set it for a custom
 * domain); otherwise fall back to Vercel's own production URL so builds on
 * Vercel produce absolute canonical, OG image and sitemap URLs without any
 * hardcoded domain.
 */
function resolveOrigin(env: Record<string, string>): string {
  const explicit = env.VITE_SITE_URL || process.env.VITE_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return vercel ? `https://${vercel}` : "";
}

function sitemapXml(origin: string): string {
  const urls = ROUTES.map(
    ([path, priority]) =>
      `  <url>\n    <loc>${origin}${path}</loc>\n    <priority>${priority}</priority>\n  </url>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Injects the absolute site origin into index.html and generates
 * sitemap.xml + robots.txt. Without a known origin the placeholders collapse
 * to root-relative URLs instead of shipping a wrong domain.
 */
function siteMeta(origin: string): Plugin {
  return {
    name: "site-meta",
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_ORIGIN%", origin);
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ""}`,
      });
      if (!origin) return;
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemapXml(origin),
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), tailwindcss(), fontPreload(), siteMeta(resolveOrigin(env))],
    build: {
      target: "es2022",
    },
  };
});
