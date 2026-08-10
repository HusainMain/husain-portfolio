# SITE MAP — Husain Bardanwala Portfolio

**Source of truth hierarchy:** `DESIGN_SYSTEM.md` (visual design) → **this document** (routes/IA/page responsibilities/navigation) → `IMPLEMENTATION_PLAN.md` (technical architecture) → `MCP_WORKFLOW.md` (MCP usage) → source code.
This document specifies the routing and page hierarchy precisely enough to build without guessing.

---

## 1. Global Hierarchy

```text
HOME
├── WORK
│   ├── IdeaBridge
│   ├── Healthcare Appointment System
│   ├── iEMS
│   └── BuildEx Website
├── ENGINEERING
├── ABOUT
└── CONTACT
```

## 2. Exact Routes

| URL | Page |
|---|---|
| `/` | HOME |
| `/work` | WORK index |
| `/work/ideabridge` | Case study 01 — IdeaBridge |
| `/work/healthcare-appointment-system` | Case study 02 — Healthcare Appointment System |
| `/work/iems` | Case study 03 — iEMS |
| `/work/buildex-website` | Case study 04 — BuildEx Website |
| `/engineering` | ENGINEERING |
| `/about` | ABOUT |
| `/contact` | CONTACT |
| `*` | 404 (on-brand recovery) |

No additional routes. No dropdown navigation.

---

## 3. Route Specifications

### HOME — `/`

- **Type:** Compressed narrative.
- **Purpose:** Establish identity in <3 seconds; orient the visitor to everything the site offers.
- **Primary audience/question:** Anyone — "Who is this and what does he build?"
- **Sections (in order):**
  1. Identity (name, role, one-line philosophy)
  2. What I Build (3 verb statements)
  3. Selected Work (numbered index → case studies)
  4. How I Think (compressed philosophy)
  5. Capabilities (grouped statements + mono tags, not a grid)
  6. Contributions (iEMS hackathon lead, BuildEx ownership)
  7. Contact ("Have a problem worth building?" + email + links)
- **Important links:** nav links, work index → case studies, socials, email.
- **Navigation relationships:** parent of all routes via header/footer; index of work.
- **Allowed content:** verified resume-derived content only; concise statements; links to depth.
- **Must NOT appear:** full case-study detail, full engineering content, resume duplication, stats counters, skill bars.

### WORK — `/work`

- **Type:** Portfolio index / gateway to case studies.
- **Purpose:** List the four projects as a numbered editorial index.
- **Primary audience/question:** Hiring managers — "What has he built?"
- **Sections:** 4 numbered rows (01–04): number, title, one-line description, stack tags, hover context.
- **Important links:** four case-study routes; GitHub repositories (verified).
- **Navigation relationships:** child of `/`; parent of case studies.
- **Allowed content:** only the four verified projects, in template-consistent order.
- **Must NOT appear:** unlisted projects, invented outcomes, thumbnails implying unverified UI.

### CASE STUDIES — `/work/[slug]`

- **Type:** Deep engineering proof.
- **Purpose:** Document a system: decision → reasoning → implementation.
- **Primary audience/question:** Technical reviewers — "How does he think and decide?"
- **Sections (consistent template, 10 parts):**
  1. Meta header (number, title, one-line description, stack tags, repository link)
  2. Problem
  3. Constraints
  4. Design decisions
  5. Implementation notes
  6. Architecture (SVG diagram; progressive construction; labeled as architecture/visualization when no screenshot exists)
  7. Stack (mono tag list)
  8. Repository (verified GitHub link)
  9. Reflection (honest, verified-content only)
  10. Previous/Next navigation (case-study order: ideabridge → healthcare-appointment-system → iems → buildex-website; last wraps to `/work`)
- **Navigation relationships:** children of `/work`; prev/next chain.
- **Allowed content:** strictly verified work per `IMPLEMENTATION_PLAN.md` §7.
- **Must NOT appear:** fabricated screenshots, invented metrics/outcomes, unverified live URLs presented as fact.

#### Project data (all GitHub repos verified: `github.com/HusainMain/*`)

| # | Slug | Title | One-liner (verified scope) |
|---|---|---|---|
| 01 | `ideabridge` | IdeaBridge | AI-Powered Startup Validation Platform |
| 02 | `healthcare-appointment-system` | Healthcare Appointment System | Java-Based Appointment Management System |
| 03 | `iems` | iEMS | Integrated Education Management System (CVMU Hackathon) |
| 04 | `buildex-website` | BuildEx Website | Official BuildEx Startup & Entrepreneurship Club website |

### ENGINEERING — `/engineering`

- **Type:** How Husain thinks and works.
- **Purpose:** Communicate engineering philosophy, process, and AI practice — the site's differentiator.
- **Primary audience/question:** Technical reviewers — "How does he think?"
- **Sections:**
  1. Philosophy (verified statement, editorial weight)
  2. Process (4 steps: Understand the problem → Design from first principles → Build with AI as accelerator → Verify with engineering judgment)
  3. AI-assisted engineering (honest use of AI as accelerator; judgment stays human)
  4. Competitive programming / problem solving (40+ LeetCode; link; as discipline, not badge)
  5. Engineering toolkit (mono-tag appendix, grouped)
- **Navigation relationships:** child of `/`; sibling of Work/About/Contact.
- **Allowed content:** verified philosophy, process, and toolkit. CGPA/LeetCode each appear exactly once across the site — **not** here unless positioned as the single occurrence (locked placement: About page).
- **Must NOT appear:** skill grids, proficiency percentages, skill bars, generic "my stack" walls.

### ABOUT — `/about`

- **Type:** Human/personal context.
- **Purpose:** A concise, human introduction.
- **Primary audience/question:** Anyone — "Who is Husain as a person?"
- **Sections:** AboutIntro (student, SVIT Vasad, 2024–2028, what he builds, experimentation), FactsRow (CGPA 8.48/10 — the single site occurrence; degree; institution; years), CurrentlyLine (buildEx ownership, hackathon leadership, interest in software systems / AI-enabled products / interactive web experiences).
- **Navigation relationships:** child of `/`.
- **Allowed content:** verified identity/education info, human tone, concise.
- **Must NOT appear:** full resume dump, repeated CGPA/LeetCode (each exactly once on the entire site), fabricated achievements.

### CONTACT — `/contact`

- **Type:** Single conversion intent.
- **Purpose:** Make contact effortless.
- **Primary audience/question:** Recruiters/ collaborators — "How do I reach Husain?"
- **Sections:** Header ("HAVE A PROBLEM WORTH BUILDING?"), Email primary CTA (mailto, with copy-email micro-interaction), Secondary links (LinkedIn · GitHub · LeetCode).
- **Important links:** `mailto:husainbardanwala65@gmail.com`, linkedin.com/in/husain-bardanwala-93a56b376, github.com/HusainMain, leetcode.com/u/W9RFMcxTXL/.
- **Navigation relationships:** child of `/`.
- **Allowed content:** email + socials only.
- **Must NOT appear:** contact form, phone number, fabricated availability.

### 404 — `*`

- **Type:** On-brand recovery page.
- **Purpose:** Recover failed navigation with the site's identity intact.
- **Sections:** Editorial "404" treatment, short message, link back to `/` (and optionally `/work`).
- **Important links:** `/`, `/work`.
- **Navigation relationships:** catch-all; header/footer remain functional.
- **Allowed content:** on-brand, minimal.
- **Must NOT appear:** dead-end designs, decorative animation that blocks recovery links.

---

## 4. Global Navigation Behavior

- **Header (all routes):** fixed; wordmark (returns to `/`); nav links `Work · Engineering · About · Contact`; active-state indicator; scroll-progress hairline; mobile disclosure menu below 768px.
- **Footer (all routes):** identity echo, nav echo, email + socials (LinkedIn · GitHub · LeetCode), copyright line.
- **Logo behavior:** wordmark links to `/` on every route; on `/` it is a link (does not scroll-to-top).
- **Mobile navigation:** disclosure menu; Escape closes; focus managed; body scroll preserved; no dropdowns on desktop.
- **Breadcrumbs:** not used. Case studies carry prev/next chain instead.
- **Prev/Next case-study navigation:** order `ideabridge → healthcare-appointment-system → iems → buildex-website`; last item's "next" returns to `/work`.
- **Route transitions:** lightweight page transition (Motion) on every navigation; instant swap under reduced motion; brand transition runs once per session on first visit only.
