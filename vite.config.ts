import { defineConfig, type Plugin } from "vite";
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

export default defineConfig({
  plugins: [react(), tailwindcss(), fontPreload()],
  build: {
    target: "es2022",
  },
});