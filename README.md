# Husain Bardanwala — Portfolio

Personal software engineering portfolio of Husain Bardanwala — a software engineer and intelligent systems builder. The site presents an engineering philosophy, case studies, and technical work as an editorial, typography-driven reading experience.

Built as a Vite + React single-page application with a custom motion system, and deployed as a static site on Vercel.

## Overview

The portfolio communicates how Husain designs and builds software end to end — with AI as an accelerator and engineering judgment as the final filter. It covers a full-stack engineering practice, competitive programming, and the process behind four verified projects, each documented as a structured case study.

## Highlights

- **Home** — hero with the owner's monochrome portrait, engineering philosophy, capabilities, selected work
- **About** — biography, current work, facts, and approach
- **Engineering** — how Husain thinks about problems and the build process
- **Work / Case Studies** — four projects documented as case studies with context, constraints, decisions, architecture diagrams, and stack
- **Contact** — email and social links (GitHub, LinkedIn, LeetCode)
- **Motion system** — brand transition, smooth scrolling (Lenis), GSAP scroll choreography, and text/stagger/clip reveals with `prefers-reduced-motion` support

## Featured Projects

All four case studies are verified against github.com/HusainMain.

1. **IdeaBridge** — AI-powered startup validation platform. React SPA with an Express AI-analysis API (Three.js / R3F, Zustand, Framer Motion, Tailwind, Groq API), deployed on Vercel.
2. **Healthcare Appointment System** — Java CLI appointment management system with per-doctor FIFO queues.
3. **iEMS** — Integrated Education Management System, a React + Firebase education platform developed at the CVMU hackathon, led as team lead.
4. **BuildEx Website** — official club website for the BuildEx Startup & Entrepreneurship Club, SVIT Vasad (React 19, TypeScript, GSAP, Tailwind), live on Vercel.

## Tech Stack

- **React 19** with TypeScript (strict)
- **Vite 8** build tooling
- **Tailwind CSS v4** utility styling with CSS tokens
- **Motion** (Motion for React) for component-level animation
- **GSAP + ScrollTrigger** for scroll choreography
- **Lenis** for smooth scrolling, synced with GSAP
- **React Router 8** for client-side routing with route-level code splitting
- Fonts: Space Grotesk (display), JetBrains Mono (mono), Instrument Serif (accent)

## Design & Motion

- Editorial engineering aesthetic: navy ink, warm-paper backgrounds, orange accent
- Typography-driven layout with a structured 12/8/4 grid
- Case-study storytelling: context, constraints, decisions, trade-offs
- Purposeful motion — brand reveal, masked text, scroll-driven animations — gated on reduced-motion preferences

## Project Structure

```
public/                 Static assets: favicon, portrait, sitemap, robots, llms.txt
src/
  components/
    home/               Homepage sections: hero, capabilities, work index, contact band
    about/              About page sections
    engineering/        Engineering page sections
    work/               Case-study building blocks: meta, stack, decisions, repository, diagram
    motion/             Motion primitives: TextReveal, Stagger, FadeIn, Parallax, Marquee, BrandTransition, SmoothScroll
    layout/             SiteHeader, SiteFooter, SkipLink
    ui/                 Shared primitives: Button, ArrowLink, Container, Section, Tag, Rule, Eyebrow
  content/              All site content and types (site, home, about, engineering, projects, caseStudies)
  lib/                  Motion utilities (GSAP/Lenis sync) and helpers
  pages/                Route-level pages (lazy-loaded)
  styles/               CSS entry and layered stylesheets (tokens, global, pages, work)
  agentation/           Feedback overlay wrapper (dev tooling, lazy-loaded)
```

## Development

```bash
npm install        # install dependencies
npm run dev        # start the Vite dev server
npm run build      # type-check (tsc --noEmit) then production build to dist/
npm run preview    # preview the production build locally
npm run typecheck  # TypeScript check only (tsc --noEmit)
```

No lint script is configured; TypeScript strict mode (including `noUnusedLocals`/`noUnusedParameters`) is enforced by the build.

## Deployment

Deployed as a static SPA on **Vercel**. `vercel.json` rewrites all routes to `index.html` for client-side routing. `robots.txt`, `sitemap.xml` (placeholder domain), and `llms.txt` are served from `public/`.

## Author

Husain Bardanwala

- GitHub: https://github.com/HusainMain
- LinkedIn: https://linkedin.com/in/husain-bardanwala-93a56b376
- LeetCode: https://leetcode.com/u/W9RFMcxTXL/
- Email: husainbardanwala65@gmail.com