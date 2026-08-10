# IMPLEMENTATION PLAN — Husain Bardanwala Portfolio

**Status:** LOCKED SPECIFICATION (Phase 0 planning readiness)
**Owner:** Husain Bardanwala
**Repository:** github.com/HusainMain/husain-portfolio
**Source of truth hierarchy:** `DESIGN_SYSTEM.md` (visual design) → `SITE_MAP.md` (routes/IA) → **this document** (technical architecture, phases, motion, performance, accessibility) → `MCP_WORKFLOW.md` (MCP usage) → source code.
**Superseded color note:** the dark palette previously documented here (`#0B0B0C` / `#E8FF5C` etc.) was explicitly revised by the project owner and is superseded by `DESIGN_SYSTEM.md` §3 (light cream/navy/burnt-orange system).

---

## 1. Project Objective

A personal portfolio for **Husain Bardanwala** — Software Engineer | Intelligent Systems Builder.

**Positioning: Proof of engineering judgment.**

The portfolio must communicate:

- what he builds
- how he thinks
- engineering decisions
- architecture
- implementation depth
- AI-assisted engineering
- leadership/ownership
- competitive programming discipline

The site must prioritize **credibility over decoration**. It must not read as a generic student portfolio or a website version of a resume. It should answer: *"What does Husain actually build, and how does he think?"*

---

## 2. Locked Product Decisions

The following decisions are **NON-NEGOTIABLE**. They cannot be changed during implementation unless the project owner explicitly revises this specification.

### Technology
- **Vite** (build tool)
- **React 19**
- **TypeScript**
- **React Router v7** (library mode, lazy routes)
- **Tailwind CSS v4** (CSS-first `@theme` tokens, `@tailwindcss/vite`)
- **GSAP + ScrollTrigger + useGSAP** (scroll narrative)
- **Motion** (`motion/react`) (transitions, entrances, micro-interactions)
- **Lenis** (`lenis/react`) (smooth scroll, GSAP-ticker synchronized)
- **@fontsource** (self-hosted fonts)
- **Vercel** (deployment)

### Design
- **Light editorial system** — warm cream canvas, deep navy structure, restrained burnt-orange accent (primarily light, NOT dark). Exact tokens and rules: `DESIGN_SYSTEM.md` §3, which is the visual design authority.
- One accent only — burnt orange. No competing colors.
- No gradients
- No glow
- No glassmorphism
- No excessive shadows
- No giant skill-card grids
- No rounded cards (max 4–6px radius)

### Exclusions
- **No WebGL**
- **No Three.js / React Three Fiber** (v1 — spatial depth via CSS/SVG only)
- **No shadcn**
- **No CMS**
- **No backend**
- **No analytics SDKs**

### Content Integrity
- No fake screenshots
- No fabricated project UI
- No invented metrics/outcomes/users/clients/rankings/testimonials
- No skill bars
- No percentage proficiency indicators
- No generic AI imagery
- No terminal/CLI parody hero
- No animation for animation's sake

Any conflict between implementation activity and these decisions must be **stopped and reported**, not silently resolved.

---

## 3. Design System

### Color System

**Exact tokens, semantic roles, contrast ratios, and usage rules are locked in `DESIGN_SYSTEM.md` §3** (visual design authority). Summary of the current locked palette:

```text
Canvas (primary background)  #F8F4EB   warm cream
Surface (panels/wells)       #F1EBE0   deep cream
Navy (structure + text)      #16243D   14.13:1 on canvas (AAA)
Muted text                   #4E5E78   5.99:1 on canvas (AA)
Burnt orange (signature)     #C4571F   display/UI scale on cream only (4.04:1)
Orange deep (small text)     #A64518   5.49:1 on canvas (AA)
Orange on navy               #E07F3F   5.38:1 on navy (AA)
Rule (hairline)              rgba(22,36,61,0.16) on cream · rgba(248,244,235,0.18) on navy
```

All color decisions in this plan defer to `DESIGN_SYSTEM.md`; on any visual conflict, `DESIGN_SYSTEM.md` wins.

### Typography

```text
Display/UI: Space Grotesk
Mono:       JetBrains Mono
Editorial:  Instrument Serif
```

- **Space Grotesk** — primary display and UI type. Carries hierarchy in oversized display sizes (fluid `clamp()`, ~3rem–8rem).
- **JetBrains Mono** — the "documentation layer": section numbers, labels, metadata, tags, URLs. Technical authenticity.
- **Instrument Serif** — restrained editorial accent only: max 2–3 emphasized words per page (e.g., "I *actually* build things"). Never a decorative theme.

All three self-hosted via `@fontsource`. Maximum font families: 3. `display: swap`.

### Spacing & Layout

- 8px base spacing rhythm
- 12-column desktop grid
- ~1200px max content width
- Fluid `clamp()` sizing for type and spacing
- Section spacing: 128–160px desktop, ~80px mobile
- Maximum radius: 4–6px (tags, chips only)
- Hairline rules (`Rule` token) separate sections instead of card-heavy visual design
- No unnecessary shadows; elevation only where physical (overlays, menus)

### Accent Usage (exact)

Burnt orange is used ONLY for:

- labels (mono eyebrows) — `orange-deep` at small sizes
- mono metadata / section numbers
- focus rings
- selected states
- display emphasis (large text — signature `#C4571F` only at ≥ display scale on cream)
- the wordmark mark, system lines, the scroll-progress hairline, and the single deep-orange contact band (`#A64518`)

**Primary CTA:** navy fill + cream text (14.13:1). Small orange text on cream must use `orange-deep` (5.49:1); signature `#C4571F` on cream is large-text/UI-only (4.04:1). Never use accent as bulk body text. One accent only — no competing colors. Full rules: `DESIGN_SYSTEM.md` §3.

---

## 4. Information Architecture

```text
/
├── /work
│   ├── /work/ideabridge
│   ├── /work/healthcare-appointment-system
│   ├── /work/iems
│   └── /work/buildex-website
├── /engineering
├── /about
├── /contact
└── /* → 404
```

**Top-level navigation:** `Work · Engineering · About · Contact` (no dropdowns). Wordmark/logo returns to `/`.

**Route responsibilities:**

| Route | Responsibility |
|---|---|
| `/` | Compressed narrative of the whole site (see §5) |
| `/work` | Numbered index (01–04), gateway to case studies |
| `/work/[slug]` | Deep engineering proof — one case study per project |
| `/engineering` | How Husain thinks and works (see §8) |
| `/about` | Human/personal context, concise |
| `/contact` | Single conversion intent |
| `*` | On-brand 404 recovery page |

No additional routes. No dropdown navigation.

---

## 5. Homepage Structure

Seven beats, in order, each concise:

| # | Beat | Content purpose | Motion intensity |
|---|---|---|---|
| 1 | Identity | Name + "Software Engineer / Intelligent Systems Builder" + one-line philosophy. Instant signal in <3s. | Cinematic (brand transition, TextReveal, system line) |
| 2 | What I Build | 3 short capability statements as verbs (full-stack products, AI-enabled systems, interactive experiences) | Controlled entrance |
| 3 | Selected Work | Numbered editorial index of the 4 projects → case studies | Expressive (hover, progressive reveal) |
| 4 | How I Think | Compressed engineering philosophy (2–3 sentences) | One ScrollTrigger sequence |
| 5 | Capabilities | 4 grouped capability statements in prose with mono tags — NOT a skill grid | Restrained reveal |
| 6 | Contributions | iEMS hackathon lead + BuildEx ownership. No stat counters | Editorial reveal |
| 7 | Contact | "Have a problem worth building?" + email + links | Minimal, strong final reveal |

The homepage must remain concise. Depth belongs in case studies and dedicated pages. Sections exceeding their budget move to their own page.

---

## 6. Work Architecture

- `/work` is a **numbered index** (01–04): title, one-line description, stack tags. Typographic, no thumbnails required.
- Four case studies, one consistent template with project-specific visual treatments.

**Case study structure (consistent order):**

1. Meta header (number, title, one-line description, stack tags, repository link)
2. Problem
3. Constraints
4. Design decisions
5. Implementation notes
6. Architecture (SVG diagram)
7. Stack (mono tag list)
8. Repository (verified link)
9. Reflection (2–3 honest sentences from verified work)
10. Previous/Next navigation

**Core principle:**

> A case study is a document about a system, not a blog post with screenshots.

**Core credibility mechanism:**

```text
decision → reasoning → implementation
```

The four projects (all repository info verified):

1. **IdeaBridge** — AI-Powered Startup Validation Platform (React 18, TS, Vite, Three.js/R3F, Zustand, Framer Motion, Tailwind, Groq API)
2. **Healthcare Appointment System** — Java OOP appointment management (6 classes, File I/O, queues, exception handling)
3. **iEMS** — Integrated Education Management System, CVMU Hackathon team lead (React, Firebase, Tailwind)
4. **BuildEx Website** — Official BuildEx club site (React 19, TS, GSAP, Tailwind)

---

## 7. Evidence Policy

**Only verified information may be presented as fact.**

Project visual priority:

```text
Real screenshots/media
        ↓
SVG architecture diagrams
        ↓
Explicitly labeled conceptual visualizations
```

- Never present conceptual visualizations as actual product screenshots.
- Never invent: users, metrics, performance results, business outcomes, clients, adoption, revenue, rankings, deployment claims, testimonials, impact.
- Repository links used only when verified (github.com/HusainMain/* — verified).
- If a project has no verified screenshot, its visual is an SVG architecture diagram and/or an explicitly labeled conceptual/architectural visualization.
- Visuals must never imply functionality that has not been verified.
- Content may be added later only after verification.

---

## 8. Engineering Page

The Engineering page is **NOT** a generic skills page. It answers *"how does he think?"*

1. **Philosophy** — the verified statement: "I believe great engineering begins with understanding the problem before writing code. I build scalable systems grounded in first principles, using AI to accelerate development while relying on engineering judgment to deliver practical, maintainable solutions."
2. **Process** — 4-step sequence:
   ```text
   Understand the problem
   → Design from first principles
   → Build with AI as accelerator
   → Verify with engineering judgment
   ```
3. **AI-assisted engineering** — honest statement of how AI is used (acceleration, rapid prototyping, prompt engineering, REST/MCP integration) and where human judgment remains.
4. **Competitive programming / problem solving** — "40+ LeetCode problems across data structures, algorithms, recursion, trees, queues, dynamic programming" + LeetCode link, as discipline, not a badge.
5. **Engineering toolkit** — mono-tag appendix grouped by category (languages, frameworks, CS core, AI tools, dev tools).

**Content rule:** CGPA `8.48/10` and LeetCode `40+` each appear **exactly once** across the entire website (About page, plain facts row). Never as badges, counters, statistic animations, or progress indicators.

---

## 9. About Page

Human and concise. Content:

- Computer Engineering student
- SVIT, Vasad
- 2024–2028
- CGPA 8.48 (the single site occurrence)
- What he builds
- Experimentation
- BuildEx ownership (official developer)
- Hackathon leadership (CVMU, iEMS team lead)
- Interest: software systems, AI-enabled products, interactive web experiences

No autobiography. No repeated resume facts.

---

## 10. Contact Page

- Header: **"HAVE A PROBLEM WORTH BUILDING?"**
- Primary: **Email** (`husainbardanwala65@gmail.com`), mailto link
- Secondary: LinkedIn · GitHub · LeetCode
- **No contact form.**
- Footer carries the same links everywhere.

---

## 11. Motion Architecture — Six Locked Systems

### System 01 — Hover Effects (respond to user intent)

- **Work index rows:** subtle row shift (≤2px Y), minimal surface change, metadata prominence increases, arrow responds, optional context reveal on desktop.
- **Navigation:** active/hover indicator draws or shifts (accent underline sweep); no exaggerated scaling.
- **Arrow links:** arrow translation, direction-aware.
- **Buttons:** directional background transition + subtle press state.
- **Magnetic primary CTA:** desktop only, maximum ~6px attraction, disabled on touch devices and under reduced motion.
- **Rule:** hover must never be the sole information channel.

### System 02 — Parallax (depth, selectively)

- Maximum displacement ~24px desktop. Transform-only. Never interferes with reading.
- Locations: hero metadata, selected project visuals, philosophy sequence, one architecture diagram.
- Responsive:
  ```text
  Desktop → full
  Tablet  → 50%
  Mobile  → disabled
  ```

### System 03 — Brand Transition (first-visit only)

- **NOT a fake loading screen.** No percentages, no spinner, no asset waiting, no content blocking.
- Duration: ~1.0–1.5s.
- Sequence:
  ```text
  BRAND
  ↓
  SYSTEM LINE
  ↓
  IDENTITY
  ↓
  HERO
  ```
- Gated by `sessionStorage`: never replays within the same session; not replayed on every navigation; skipped under reduced motion.
- Line continues visually into the hero's own system line.

### System 04 — Spatial Motion (perceived depth, NO WebGL)

- CSS perspective
- Layered transforms
- SVG depth (diagram planes on staggered z)
- Perspective-aware diagram interactions
- Masked transitions (clip-path reveals)
- Parallax planes

### System 05 — Entrance Reveals (primary narrative system)

- Headings: masked line reveal
- Project titles: controlled stagger (~80ms)
- Architecture diagrams: progressive construction (nodes/edges draw; stroke-dashoffset)
- Body copy: subtle fade + ≤16px translate
- Sections: one-shot reveals (`once: true`)
- Content must never be hidden behind excessive animation (≤600ms per reveal).

### System 06 — Micro-interactions (make the interface feel finished)

- arrows · nav underline · focus transitions · button press · copy-email state · mobile menu · scroll progress · tag states · external-link indicators (↗) · previous/next navigation · active section state
- ~150–250ms, subtle, predictable.

---

## 12. Motion Hierarchy

```text
L1 Narrative  — entrance reveals, scroll storytelling, page transitions
L2 Depth      — parallax, spatial motion, architecture visualization
L3 Response   — hover effects, micro-interactions
L4 Brand      — first-visit brand transition
```

Intensity by page:

```text
Hero          → cinematic
Work          → expressive
Engineering   → controlled
About         → calm
Contact       → minimal
```

**Core principle:**

> Animation must communicate relationships and progression, not advertise the developer's ability to animate.

Every animation must answer: **"What does this clarify?"** If the answer is nothing — remove it.

---

## 13. Motion Library Ownership (strict division)

```text
GSAP
→ ScrollTrigger
→ pins
→ scroll choreography
→ system-line sequences

Motion
→ page transitions
→ component entrances
→ UI state transitions
→ micro-interactions

Lenis
→ smooth scrolling only
→ synchronized with GSAP ticker (autoRaf: false)

CSS
→ basic hover states
→ transitions
→ focus states
```

- No additional animation library.
- Do not cross responsibilities without a specific architectural reason.

---

## 14. Reduced Motion (architectural requirement)

When `prefers-reduced-motion: reduce` is active, **disable**:

- Lenis smoothing
- ScrollTrigger pins
- Magnetic effects
- Parallax
- Spatial movement
- Brand transition
- Complex reveals (replace with minimal opacity transitions)
- Page transitions (instant swap)

**Never remove:** content, navigation, functionality, accessibility.

Implemented centrally via `lib/motion.ts` (single reduced-motion flag, `gsap.matchMedia()`, `MotionConfig reducedMotion="user"`).

---

## 15. Responsive Motion

```text
Desktop >=1024 : complete motion system — hover, magnetic CTA, pins, parallax
Tablet 768–1023: parallax 50%, no magnetic, simplified pins, one-column case-study body
Mobile <768    : no pins, no parallax, no magnetic — reveals + micro-interactions only
```

- Touch targets ≥44px on mobile.
- Hover never the only mechanism.
- Mobile-first in behavior; desktop-first in experience.

---

## 16. Performance Budgets (hard targets)

```text
LCP              < 2.0s
CLS              < 0.05
TBT              < 150ms
Initial JS       < 250KB gzipped
```

Rules:

- transform/opacity animations only
- scoped `will-change`
- route-level lazy loading (React Router `lazy`)
- destroy ScrollTriggers on unmount
- one GSAP ticker (drives Lenis)
- no unnecessary RAF loops
- no WebGL
- **Hero portrait is intentional:** exactly one optimized real portrait asset (AVIF/WebP, responsive srcset, explicit width/height or aspect-ratio to prevent CLS, preload/`fetchpriority` if LCP testing requires it). No decorative stock imagery; no other large raster imagery
- self-hosted fonts (`@fontsource`, `display: swap`, preload display font only)
- no layout thrashing
- brand transition never waits for assets; never delays first contentful paint

---

## 17. Accessibility

- Semantic landmarks (`header/main/footer`)
- One `h1` per page
- Proper heading hierarchy
- Skip link
- Keyboard navigation (full reachability)
- Visible focus states (accent rings, 2px)
- Mobile menu keyboard handling — Escape closes, focus restoration
- Reduced motion (see §14)
- SVG diagrams: `title`, `desc`, decorative parts `aria-hidden`
- No hover-only content
- 44px touch targets
- Accessible copy-email feedback (live region / announced state)
- Route transition accessibility (no focus loss; focus moves to `main`)
- Animations never cause loss of focus, unexpected scrolling, disappearing content, or interaction locks

---

## 18. Component Architecture

```text
components/ui/      → presentational primitives (Container, Section, Eyebrow, Heading, Tag, ArrowLink, Button, Rule)
components/motion/  → ALL motion logic (Reveal, Stagger, TextReveal, ScrollProgress, ScrollPin, MagneticHover, Parallax, BrandTransition, PageTransition, MicroInteraction)
components/layout/  → SiteHeader, SiteFooter, SkipLink, PageTransition wrapper
components/home/    → 7 homepage sections
components/work/    → case-study building blocks + per-project SVG diagrams
pages/              → route components (Home, Work, WorkSlug, Engineering, About, Contact, NotFound)
content/            → typed content layer (site.ts, projects.ts, engineering.ts)
lib/                → motion.ts (Lenis+GSAP+reduced-motion gate), utils.ts (cn())
styles/             → tokens.css (@theme), global.css
```

**Hard rules:**

- Motion logic lives in `src/components/motion/` — never scattered in pages.
- Resume/project facts live in `src/content/` — pages must NOT hardcode resume facts.
- Motion components: typed, reusable, reduced-motion aware, transform/opacity only, clean up on unmount, no layout thrash.

---

## 19. Directory Structure (final intended)

```text
husain-portfolio/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ vercel.json
├─ public/
│  ├─ favicon.svg
│  ├─ og-image.png
│  ├─ robots.txt
│  └─ sitemap.xml
└─ src/
   ├─ main.tsx
   ├─ app.tsx
   ├─ styles/
   │  ├─ tokens.css
   │  └─ global.css
   ├─ content/
   │  ├─ site.ts
   │  ├─ projects.ts
   │  └─ engineering.ts
   ├─ lib/
   │  ├─ motion.ts
   │  └─ utils.ts
   ├─ components/
   │  ├─ ui/
   │  ├─ motion/
   │  ├─ layout/
   │  ├─ home/
   │  └─ work/
   ├─ pages/
   └─ types.ts
```

---

## 20. Implementation Phases

**Important: Phase 0 is documented only. It must NOT be implemented in this task.**

### Phase 0 — Scaffold + tokens + routing + shell
- **Objective:** working buildable shell with design system tokens and routing, no sophisticated animation.
- **Major work:** Vite + React + TS scaffold; Tailwind v4 + `@theme` tokens; @fontsource install; React Router v7 lazy routes; `vercel.json` SPA rewrite; header/footer/skip-link/404.
- **Expected output:** buildable shell, tokens render, all routes resolve.
- **MCPs:** Context7 (API verification), Filesystem.
- **Validation:** `npm run build` clean; dev server loads; no console errors.

### Phase 1 — Primitives + typed content
- **Objective:** reusable UI primitives and the typed content layer.
- **Major work:** `ui/` primitives; `content/` site/projects/engineering; types; evidence matrix applied.
- **Expected output:** content matches resume exactly — zero invented facts.
- **MCPs:** Filesystem; Context7 when API verification needed.
- **Validation:** TypeScript strict passes; content diffed against resume.

### Phase 2 — Homepage
- **Objective:** all seven homepage sections with basic entrance states only.
- **Major work:** Hero, BuildStatements, WorkIndex, PhilosophyStrip, Capabilities, Contributions, ContactBand.
- **Expected output:** complete, readable homepage (advanced motion deferred).
- **MCPs:** Filesystem, Playwright, DevTools.
- **Validation:** readable at 375/768/1024/1280/1920; no overflow.

### Phase 3 — Case-study template + IdeaBridge
- **Objective:** the proof engine.
- **Major work:** `WorkSlug` template, DecisionRows, SVG architecture diagram, reflection; IdeaBridge content.
- **Expected output:** first complete case study.
- **MCPs:** Filesystem, Playwright; Context7 for GSAP pin verification.
- **Validation:** full read-through; diagram renders; repo link verified.

### Phase 4 — Remaining case studies
- **Objective:** full proof layer.
- **Major work:** Healthcare, iEMS, BuildEx studies + `/work` index.
- **Expected output:** 4/4 case studies, template-consistent.
- **MCPs:** Filesystem, Playwright.
- **Validation:** consistency check across all four studies.

### Phase 5 — Engineering + About + Contact + 404
- **Objective:** the differentiator + remaining routes.
- **Major work:** Engineering page, About, Contact, 404.
- **Expected output:** all routes complete.
- **MCPs:** Filesystem, Playwright.
- **Validation:** full route walkthrough.

### Phase 6 — Full motion system
- **Objective:** implement all six motion systems.
- **Major work:** hover, parallax, brand transition, spatial motion, entrance reveals, micro-interactions; Lenis+GSAP integration; reduced-motion gate; responsive motion rules.
- **Expected output:** polished motion, safe under reduced motion.
- **MCPs:** Context7, Filesystem, DevTools, Playwright.
- **Validation:** frame traces clean; reduced-motion verified; no layout thrash.

### Phase 7 — Accessibility + SEO + performance
- **Objective:** quality gate.
- **Major work:** contrast pass, keyboard pass, meta/OG/sitemap/robots, bundle analysis, CLS/overflow checks.
- **Expected output:** Lighthouse a11y/SEO/perf ≥95.
- **MCPs:** Playwright, DevTools.
- **Validation:** Lighthouse + keyboard-only walkthrough.

### Phase 8 — Visual QA
- **Objective:** final polish.
- **Major work:** annotation loop, responsive matrix, console-clean, motion-scope audit (every animation has a purpose).
- **Expected output:** sign-off ready.
- **MCPs:** Agentation (primary), Playwright, DevTools.
- **Validation:** all annotations resolved; zero console errors.

### Phase 9 — Deployment
- **Objective:** ship.
- **Major work:** Vercel deploy, post-deploy checks.
- **Expected output:** live site.
- **MCPs:** Playwright, DevTools.
- **Validation:** live Lighthouse + smoke test.

---

## 21. QA Matrix

**Viewports:** 375 · 768 · 1024 · 1280 · 1920
**Modes:** Normal motion · Reduced motion · Keyboard-only · Touch
**Routes:** `/` `/work` `/work/ideabridge` `/work/healthcare-appointment-system` `/work/iems` `/work/buildex-website` `/engineering` `/about` `/contact` `/404`

**Checks (all cells):**

- no console errors
- no broken links
- no horizontal overflow
- no layout shifts
- no hover-only information
- no animation jank
- no scroll locking
- no mobile menu bugs
- no focus loss
- no reduced-motion violations
- no fabricated content
- case-study template consistency
- CGPA appears exactly once
- LeetCode appears exactly once
