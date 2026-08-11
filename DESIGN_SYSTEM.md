# DESIGN SYSTEM

**Status:** AUTHORITATIVE VISUAL-DESIGN SPECIFICATION
**Owner:** Husain Bardanwala
**Authority:** `IMPLEMENTATION_PLAN.md` → `SITE_MAP.md` → `MCP_WORKFLOW.md` → **`DESIGN_SYSTEM.md`** → source code

**Owner revision notice:** This document revises `IMPLEMENTATION_PLAN.md` §3. The project owner has explicitly revised the color direction: **dark palette (`#0B0B0C` base, `#E8FF5C` accent) is replaced by a primarily-light burnt-orange + navy + cream system.** All non-color decisions from the planning documents (motion systems, phases, QA matrix, content rules, exclusions) remain locked and are incorporated here unchanged. All color contrast figures below are **computed values (WCAG 2.1 relative luminance)** — not estimates.

---

## 1. Design Direction

### Overall concept

**"A technical editorial document."** The site reads like a well-printed engineering journal crossed with a premium personal magazine: warm paper canvas, deep navy structure, a single burnt-orange signature, oversized type, numbered systems, hairline rules, and a real editorial portrait as the human anchor.

### Visual personality

- **Premium** — generous whitespace, restrained palette, confident typography
- **Editorial** — asymmetric compositions, scale dissonance, intentional white space as structure
- **Technical** — mono documentation layer, numbered sections, hairline rules, grid discipline
- **Personal** — a real portrait integrated into the composition; serif italic human moments
- **Confident** — calm, uncluttered, deliberate; nothing is "busy"
- **Warm** — paper cream + terracotta; mature, not corporate, not "startup"

### Positioning

> "This person actually builds systems and cares deeply about how those systems are presented."

The design must make the visitor feel they have opened a carefully engineered document — not a template, not a dashboard, not a landing page.

### Design principles

1. **Typography is the interface.** Hierarchy is carried by type scale, not by decorative boxes.
2. **Structure over decoration.** Hairlines, numbering, mono metadata do the structuring.
3. **One accent, disciplined.** Burnt orange is a signature, never a floodlight.
4. **The grid is an instrument.** Asymmetric compositions live *within* grid discipline.
5. **Whitespace is load-bearing.** Empty space is structure, not emptiness.
6. **A person, not an avatar.** The portrait is an editorial subject, never a circle crop.
7. **Document language.** Mono labels, section numbers, and metadata make engineering visible.
8. **Color as narrative.** The cream/navy/orange rhythm tells a page-length story.

---

## 2. Research Summary

### Sources consulted (all documented honestly)

| Source | Availability | What it provided |
|---|---|---|
| **Mobbin MCP** | ❌ **UNAVAILABLE** — paid plan required (error: "Mobbin MCP requires a paid plan" observed 2026-08-10; also observed in prior session). Not used; not pretended to be used. | — |
| **Web research** (WeLoveDaily editorial 2026 review; envato portfolio trends; portfolio hero studies; B12 editorial-portfolio briefs; CSS Nectar orange-scheme galleries) | ✅ | Design patterns below |
| **OriginUI MCP** | ✅ searched in prior phase | Generic shadcn-style components; confirms what to avoid; no primitives adopted |

### Patterns discovered (useful)

1. **Asymmetric typographic weight** — display type sits heavy on one side; body negotiates around it (recurring across 30 editorial titles reviewed; Bloomberg Businessweek-scale dissonance, The Gentlewoman's full-bleed portrait + unmodulated display sans).
2. **White space as a structural element** — empty space treated as load-bearing, not leftover.
3. **Scale dissonance** — 100+pt display against ~9pt body; the defining editorial move.
4. **Full-bleed portrait with restrained typography** — The Gentlewoman pattern: portrait carries the emotional load; type stays disciplined.
5. **Magazine-style numbered index lists** — numbered project rows read as "a table of contents of real work" (portfolio trends research).
6. **Warm off-white canvas + burnt-orange accents** — independently corroborated as a premium editorial combination (B12 editorial-portfolio briefs explicitly describe "warm off-white background, burnt orange accents, asymmetrical magazine-inspired composition").
7. **Gridless/asymmetric emphasis within a grid** — "the grid as a compositional argument rather than a production shortcut."
8. **Single CTA discipline** — contact as a deliberate ending beat, not a form.

### Patterns rejected (with reasoning)

- **Terminal / IDE / VSCode-style portfolios** (CVfy "Terminal", "Editor" templates) — developer-template cliché; hero must not parody a terminal.
- **Bento grids with GitHub heatmaps** (CVfy "Bento") — generic template geometry; skill-grid ban in plan.
- **Glassmorphism / candy gradients** (CVfy "Candy Glass") — banned by plan.
- **Dark navy + indigo "Editor" chrome** — we already have a dark system in history; owner revision is explicit.
- **Card-grid portfolios** — every project in a rounded card; plan bans card-heavy design.
- **Circular avatar heroes** — banned by task.
- **Centered stacked hero (portrait above text)** — resume-like, low editorial value.
- **Full-bleed background portrait with overlaid type** — readability risk, corporate look.

### Synthesized principle applied

> Prove credibility through structure and restraint: type scale for hierarchy, hairline discipline for system feel, a single signature color for identity, one real portrait for humanity.

---

## 3. Color System

### 3.1 Exact palette (locked tokens)

```text
CANVAS
  canvas            #FAF6EC   primary background (warm paper cream)
  surface           #F1EBE0   secondary background (panels, diagram wells, toolkits)
  surface-2         #EAE2D4   recessed background (rare: inset wells)

NAVY (structure)
  navy-900          #16243D   primary navy — text, structure, CTA fill, footer
  navy-800          #1E2E4C   secondary navy — panels inside navy sections, hover fill

BURNT ORANGE (signature)
  orange            #C4571F   signature accent — display text, rules, numbers, selection
  orange-deep       #A64518   darker accent — small text on cream, link hover, deep band
  orange-ember      #9C3F1A   deepest accent — active/pressed state
  orange-on-navy    #E07F3F   accent on navy sections — small text, tags, focus
  orange-on-navy-hi #EE9658   accent hover on navy sections

TEXT
  text-primary      #16243D   (navy-900) body & headings on cream
  text-muted        #4E5E78   secondary text on cream
  text-on-navy      #FAF6EC   cream text on navy surfaces
  text-muted-on-navy #C9CED9  secondary text on navy (72% cream blend)

BORDERS
  rule-on-cream     rgba(22,36,61,0.16)   hairline on cream
  rule-on-navy      rgba(248,244,235,0.18) hairline on navy
  rule-on-orange    rgba(22,36,61,0.24)   hairline on orange band

INTERACTIVE
  focus             #C4571F   2px outline, 2px offset (on cream)
  focus-on-navy     #E07F3F   2px outline (on navy surfaces)
  selection-bg      #C4571F   ::selection background
  selection-text    #FAF6EC   ::selection text
  hover-text        #A64518   link/emphasis hover on cream
  hover-fill-navy   #1E2E4C   button hover on navy fill
  active            #9C3F1A   pressed state on cream
```

### 3.2 Semantic roles

| Role | Token | Where used | Where NOT used |
|---|---|---|---|
| Primary background | `canvas` | Page base everywhere except explicitly navy/orange sections | Never inside navy sections |
| Secondary background | `surface` | Architecture diagram wells, toolkit panels, About facts panel | Never as full-page background |
| Primary text | `text-primary` | Headings, body, all reading text on cream | On navy/orange surfaces |
| Secondary text | `text-muted` | Captions, descriptions, secondary paragraphs | For essential instructions |
| Structural color | `navy-900` | Text, footer, work band, hero portrait panel, CTA fill, focus on diagrams | As a decorative wash |
| Signature accent | `orange` | Display emphasis, section numbers, system lines, selection, focus, CTA arrow, wordmark mark | Body copy, large flat fills, backgrounds |
| Deep accent | `orange-deep` | Orange small text (links ≥ AA), contact band background, link hover | Decorative use |
| Inverse text | `text-on-navy` | All text on navy/portrait panel/footer | On cream |

### 3.3 Usage ratios (global discipline)

```text
Cream family        ~65–70%   canvas + surface
Navy family         ~20–25%   text, portrait panel, work band, footer, CTAs
Burnt orange        ~5–8%     accents only — numbers, rules, emphasis, selection, CTA, one band
```

### 3.4 Interactive states

| Element | Default | Hover | Active/Pressed | Focus |
|---|---|---|---|---|
| Primary button (navy fill) | `navy-900` bg, cream text | `navy-800` bg, orange arrow slides | `navy-900`, press translateY(1px) | `focus` outline |
| Text link (inline) | navy text, orange underline | text `orange-deep`, underline `orange` | `orange-ember` | `focus` outline |
| Arrow link | navy text + arrow | arrow translates, arrow turns `orange` | arrow `orange-ember` | `focus` outline |
| Work index row (navy band) | cream title | bg `rgba(248,244,235,0.05)`, arrow `orange-on-navy-hi` | bg 0.08 | `focus-on-navy` |
| Chip/tag (mono) | navy text, rule border | border `orange`, text `orange-deep` | — | `focus` |
| Nav link | navy, cream underline on active | underline `orange` sweep | — | `focus` |

### 3.5 Accessibility (computed, WCAG 2.1)

| Pair | Ratio | Verdict |
|---|---|---|
| `#16243D` navy on `#FAF6EC` cream | **14.37:1** | AAA |
| `#4E5E78` muted on `#FAF6EC` | **6.09:1** | AA |
| `#A64518` orange-deep on `#FAF6EC` | **5.58:1** | AA |
| `#9C3F1A` orange-ember on `#FAF6EC` | **6.20:1** | AA |
| `#C4571F` orange on `#FAF6EC` | **4.11:1** | Large text/UI only (≥3:1); NOT for small text |
| `#E07F3F` orange-on-navy on `#16243D` | **5.38:1** | AA |
| `#EE9658` on `#16243D` | **5.38:1+** | AA (lighter of same family) |
| `#FAF6EC` cream on `#16243D` navy | **14.37:1** | AAA |
| `#FAF6EC` cream on `#A64518` orange-deep | **5.58:1** | AA |
| `#16243D` navy on `#C4571F` | **3.49:1** | Large text/UI only (≥3:1) |
| `#C4571F` focus on `#F1EBE0` | **3.74:1** | ≥3:1 UI component ✓ |

*2026-08-11: canvas refined `#F8F4EB` → `#FAF6EC` (lighter, warmer paper) so the global noise/grid layers (§21) sit on a cleaner base. All ratios above were recomputed against the new value — every verdict is unchanged or improved.*

**Enforced rules derived from these numbers:**
- Signature `#C4571F` is allowed as text **only at display scale (≥24px) or ≥18.66px bold** on cream. All small orange text uses `orange-deep`.
- Navy text on orange is allowed **only at large display scale** (3.49:1); small text on orange surfaces must be cream (`5.49:1`).
- Orange is never the sole indicator — always paired with shape/underline/marker.
- All primary reading text is navy-on-cream or cream-on-navy (≥14:1).

### 3.6 Prohibited usage

- No orange gradients, no orange glow, no orange shadows.
- No orange as a full-section background except the **one** Contact band.
- No navy as a decorative wash behind arbitrary sections.
- No pure `#FFFFFF`, no pure `#000000` anywhere.
- No beige/brown washed-out tints beyond `surface-2`.
- No blue-violet "AI" hues; the palette is cream/navy/burnt-orange only.

---

## 4. Typography

### Fonts (locked; no additions)

| Font | Role | Detail |
|---|---|---|
| **Space Grotesk** | Display + UI | Variable 300–700; primary carrier of hierarchy |
| **JetBrains Mono** | Documentation layer | Labels, numbers, tags, metadata, URLs |
| **Instrument Serif** | Editorial accent | Italic only; 2–3 words per page max |

### Type scale (fluid, `clamp()`)

```text
hero-name      clamp(3.25rem, 9vw, 7.5rem)    Space Grotesk 500  ·  lh 0.95  ·  ls -0.03em
hero-role      clamp(1.25rem, 3vw, 2rem)      Space Grotesk 400 (+ serif accent words)
section-title  clamp(2rem, 4.5vw, 3.5rem)     Space Grotesk 500  ·  lh 1.02  ·  ls -0.02em
subsection     clamp(1.25rem, 2vw, 1.5rem)    Space Grotesk 500  ·  lh 1.2
lead           clamp(1.125rem, 1.6vw, 1.375rem)  Space Grotesk 400 · lh 1.55 · ls -0.01em
body           1.0625rem                       Space Grotesk 400  ·  lh 1.65  ·  ls -0.01em
mono-label     0.75rem uppercase               JetBrains Mono 500 · lh 1.4 · ls 0.14em
mono-meta      0.8125rem                       JetBrains Mono 400 · lh 1.5 · ls 0.02em
mono-tag       0.8125rem                       JetBrains Mono 400 · ls 0.04em
serif-accent   matches adjacent display size   Instrument Serif 400 italic · ls 0
```

### Usage rules

- Weights: Space Grotesk **500** for display (its strongest voice), 400 for body, 700 only for numerical emphasis (e.g., `01`).
- Display type is always navy on cream; orange reserved for numerals (`01–04`), select words in display emphasis (≥ display sizes), and the wordmark mark.
- Mono uppercase labels: section eyebrows (`01 / PROJECT`), nav, meta, captions.
- Serif italic: hero role-line accent words, 1 phrase in Philosophy, 1 phrase in Contact headline, Reflection pull-lines. Max ~2–3 instances per page. Never headings in serif; never lowercase serif body.
- Letter-spacing negatives tighten display only; mono is wide-tracked uppercase — never both on the same element.
- Fonts self-hosted via `@fontsource`; `display: swap`; preload the Space Grotesk variable font.

---

## 5. Grid System

```text
DESKTOP  ≥1024    12 columns · max-width 1200px · gutter 24px · outer margin auto (clamp 32–48px)
TABLET   768–1023 8 columns  · max-width 720px  · gutter 20px · outer margin 24px
MOBILE   <768     4 columns  · max-width 100%   · gutter 16px · outer margin 20px
```

### Spacing rhythm (8px base)

```text
section-space-desktop   clamp(96px, 12vw, 160px)   (plan: 128–160px honored)
section-space-mobile    clamp(64px, 10vw, 80px)
subsection-gap          desktop 48–64px · mobile 32–40px
heading-to-body         16–24px
row-gap (index rows)    28–32px desktop · 24px mobile
grid-gap                24px desktop · 16px mobile
nav-height              72px desktop · 60px mobile
```

### Grid rules

- The 12-column grid **stays canonical** on desktop; sections span 4/6/8/10/12 columns only.
- Asymmetry is created by *spans and offsets* within the grid (e.g., content in cols 1–7, portrait panel 8–12; index rows 1–12 with internal row splits 4/8).
- Full-bleed sections (navy work band, orange contact band, footer) ignore the container but keep an inner 12-column grid.
- The portrait panel may break the grid once: it bleeds to the viewport right edge at ≥1440px (see §8).
- Reading columns: body text max-width 65ch (approx cols 3–10); metadata margins use cols 11–12.

---

## 6. Navigation

### Desktop

- **Fixed** header, height 72px. Background: `canvas` with bottom `rule-on-cream` hairline. On scroll: background `rgba(248,244,235,0.9)` + `backdrop-blur(12px)` (functional read-behind treatment, not glassmorphism).
- **Left:** wordmark — 8px `orange` square + "Husain Bardanwala" (Space Grotesk 500, 1rem, navy).
- **Right:** `Work · Engineering · About · Contact` in `mono-label` (0.75rem, uppercase, 0.14em tracking, navy).
- **Active state:** current route link gets an `orange` underline (2px, offset 6px); other links show cream underline only on hover (underline sweep, `orange`).
- **Scroll progress:** 2px `orange` hairline pinned to the header bottom, width = scroll progress (System 06).
- No dropdowns. No search. No oversized buttons in the header.

### Mobile (<768)

- Wordmark left; right: menu button — two 2px `navy` lines, 44×44px target.
- Opens a **full-screen overlay** on `canvas`: wordmark top-left, close (×) top-right; links as large Space Grotesk 500 (clamp 2rem–3rem) stacked with `orange` mono numbers (01–04); below, mono contact line (email). Links reveal with 50ms stagger.
- Escape closes; focus moves into overlay on open and returns to the button on close; body scroll locked during open (lock, not hijack); `aria-expanded` managed.

---

## 7. Homepage Layout

Color journey: **cream/navy split (hero) → cream → navy band → cream → cream → cream → orange band → navy footer.**

### 1. Navigation — see §6. `canvas`.

### 2. Hero — see §8. Split: cream (left, cols 1–7) + navy portrait panel (right, cols 8–12). Cinematic.

### 3. What I Build
- **Purpose:** three verb statements of capability.
- **Layout:** `canvas`; three stacked rows, cols 3–11, each: `orange` mono number (01–03) + lead-type statement (clamp 1.375–2rem) in navy with a serif-italic key noun ("products", "systems", "experiences"). Hairline separators.
- **Spacing:** section-space 160/80.
- **Visual treatment:** none beyond type + hairlines; entrance = staggered masked reveals (System 05).

### 4. Selected Work
- **Purpose:** the proof index; gateway to case studies.
- **Layout:** **full-bleed `navy-900` band**. Inner 12-col container. Eyebrow `01 / SELECTED WORK` in `orange-on-navy`. Four rows: mono number (`orange-on-navy`), title (Space Grotesk 500, clamp 1.5–2.25rem, cream), one-line description (`text-muted-on-navy`), stack tags (mono 0.75rem, `orange-on-navy`), arrow (cream → `orange-on-navy-hi` on hover). Rows separated by `rule-on-navy` hairlines; row hover: `rgba(248,244,235,0.05)` fill + arrow translate (System 01).
- **Spacing:** 160/80; row-gap 32/24.
- **Why navy:** the "gallery moment" — the work list is the portfolio's centerpiece; navy makes it structurally distinct and gives the page its first full-color band.

### 5. How I Think (Philosophy)
- **Purpose:** compressed engineering philosophy; one ScrollTrigger sequence.
- **Layout:** `canvas`; a single oversized statement (section-title scale ×1.4, Space Grotesk 500 navy) on cols 2–11, with 1–2 serif-italic `orange-deep` accent words. Mono eyebrow `02 / HOW I THINK`. Below: 4-step process micro-line (mono, `text-muted`) revealed in sequence on scroll.
- **Motion:** System 05 (line/word reveal via GSAP ScrollTrigger), restrained; one sequence only.

### 6. Capabilities
- **Purpose:** grouped capability statements with mono tags — NOT a skill grid.
- **Layout:** `canvas`; four groups as two-column pairs (cols 1–6, 7–12) on desktop, stacked on mobile. Each group: lead-type statement + mono tag row (chips with rule border). Groups on `surface` panel with hairline inset, or on canvas with hairline separation — **panel treatment locked: `surface` well with `rule-on-cream` border** to differentiate from Work.
- **Motion:** restrained fade reveals (System 05); tag micro-interaction (System 06).

### 7. Contributions
- **Purpose:** iEMS hackathon lead + BuildEx ownership.
- **Layout:** `canvas`; two editorial rows, cols 2–11, each: mono label (`orange-deep`, e.g. `LEADERSHIP`), lead-type title, one-line muted description, arrow link to relevant context. Hairlines. No counters, no badges.
- **Motion:** editorial masked reveal (System 05).

### 8. Contact — see §13 for page; the home **band** is a compression: full-bleed `orange-deep` band, headline "Have a problem worth building?" (cream, serif italic accent), navy CTA chip + mono email. Spacing 160/80. Motion: strong final reveal + CTA micro-interaction.

### 9. Footer — see §14. `navy-900`.

---

## 8. Hero System (locked composition)

### Recommended composition — "The System Frame"

**Asymmetric editorial split: typography-left, portrait-in-a-navy-panel right.**

- **Canvas:** full viewport-height (min-height ~92vh), `canvas` background.
- **Left (cols 1–7):**
  1. Mono eyebrow (top, `orange-deep`): `SOFTWARE ENGINEER — INTELLIGENT SYSTEMS BUILDER`
  2. Name, two lines, `hero-name` scale, navy: **HUSAIN** / **BARDANWALA**
  3. Role line beneath: "Software Engineer / Intelligent Systems Builder" with serif-italic accent on the identity phrase — cream canvas, navy text
  4. One-line philosophy, `text-muted`, max-width 42ch
  5. CTA row: primary button "View work" (navy fill, cream text, orange arrow) + secondary arrow link "Email me" (magnetic on desktop, System 01)
  6. Bottom mono meta row (left-aligned, `text-muted`): `LOCATION — BHARUCH, INDIA` · `GITHUB →` · scroll cue `SCROLL ↓`
- **Right (cols 8–12):** a full-height `navy-900` panel:
  - A 4px vertical **`orange` rule** runs the full panel height at its left edge (the "system line"; the brand transition draws it on first visit, System 03).
  - The **portrait** sits inside the panel: 3:4 crop, `object-cover`, subject centered-left, ~10–15% headroom above the head, chin included, waist-up. Panel padding leaves navy air around the portrait (top and sides); the portrait's bottom is cropped by the viewport's bottom edge — it continues off-canvas (partially cropped by the viewport).
  - Bottom-left mono caption inside the panel (`orange-on-navy`): `HUSAIN BARDANWALA — BHARUCH, INDIA`.
  - At ≥1440px, the panel bleeds to the viewport's right edge (grid break, allowed once).

### Portrait placement & scale
- Occupies the right fifth–third of the viewport (cols 8–12 ≈ 42% width at 1280px). Full panel height. Large, real, editorial.
- The portrait is inside the navy frame but *not* boxed: it touches the panel's bottom edge (cropped) and keeps breathing room at top — reads as a figure in a system, not a headshot in a box.

### Crop strategy
- 3:4 vertical. Subject centered-left with headroom. Chin never cropped. No circular/rounded mask. Flat edges only. Slight warmth in color grading if any (tint toward the cream family is permitted; do not over-saturate).
- **No fake photography.** The asset is a future real photograph supplied by the owner; the system is specified around its placement, not its content.

### Color treatment
- Portrait panel `navy-900`; orange vertical rule; cream canvas on the left. No filters, no duotone, no gradients over the portrait.

### Typography relationship
- Name display sits optically centered against the panel's left rule; the rule is the visual hinge between type and portrait. The system line connects brand transition → name baseline → portrait rule.

### Responsive behavior

| Breakpoint | Composition |
|---|---|
| Desktop ≥1024 | Split as above; panel cols 8–12 (or 5 cols); portrait full panel height |
| Tablet 768–1023 | Split retained; identity occupies cols 1–5, portrait panel cols 6–8 (3 columns of the 8-column tablet grid); name at `clamp(2.75rem, 8vw, 4.5rem)`; metadata row wraps |
| Mobile <768 | **Stacked:** identity block first (eyebrow, name, role, philosophy, CTA), then portrait as a full-width block: `navy-900` panel, 4:5 crop, orange rule at panel top edge (4px horizontal), caption below inside panel. Name comes first — identity is instant; portrait is the second beat |

### Why this composition was selected
1. **Asymmetric typographic weight** — the proven editorial move for hierarchy (research pattern #1).
2. **Navy panel = engineered frame** — places the signature structural color in the most important composition; the portrait becomes "a subject inside a system," matching *engineered rather than decorated*.
3. **Orange system line** — gives the brand transition a destination and the accent a structural (not decorative) role.
4. **Credibility order** — name/role first (instant identity), portrait second (human anchor), philosophy third; <3s orientation.
5. **Performance** — one optimized image; no WebGL; no background video.

### Alternatives researched and rejected
| Alternative | Rejected because |
|---|---|
| Centered hero, portrait above name | Resume-like; zero editorial tension |
| Circular/avatar portrait | Explicitly banned; reads "LinkedIn" |
| Full-bleed background portrait + overlaid type | Readability risk; corporate; fights the cream canvas |
| Portrait overlapping typography on cream | Visual clutter; cream-on-cream loses contrast; navy panel gives the portrait a stronger anchor |
| Symmetric 50/50 split | Too symmetrical; weaker hierarchy; less memorable |
| Floating portrait card | Card-heavy; plan bans card-based design |
| Portrait only on About, none in hero | Task requires portrait in hero |

---

## 9. Work Layout

### Index (`/work` and home §4)

- **Numbered editorial rows** — locked. Not cards. Not image/text splits.
- Structure per row: `orange` mono number (01) · title (Space Grotesk 500, clamp 1.5–2.25rem, navy on cream / cream on navy band) · one-liner (muted) · stack tags (mono, `orange-deep` or `orange-on-navy`) · arrow (→, translates on hover).
- Hover (System 01): row background warms (`rgba(22,36,61,0.03)` on cream; `rgba(248,244,235,0.05)` on navy), title shifts 4px, arrow → orange + translate. Metadata prominence: tags brighten. Hover never sole information channel.
- Rows separated by hairlines (`rule-on-cream` / `rule-on-navy`).
- `/work` page: canvas background with the index in a 12-col frame (cols 1–10 for rows, cols 11–12 reserved mono margin), rows full-width within frame. The home version sits on the navy band. Both use identical row anatomy.
- Entrance: staggered masked reveals (System 05); one-shot.

### Case-study preview visuals
- No thumbnails on the index. Visual proof lives inside case studies (per evidence policy). The index is typographic — this is the differentiator.

---

## 10. Case Study Layout

The case study is **a technical editorial document**, predominantly cream (`canvas`), with one navy header block and hairline discipline throughout.

### Hero (case header)
- `canvas`; 3px `orange` rule (64px wide) above the title.
- Mono eyebrow `01 / PROJECT` (`orange-deep`).
- Title: section-title scale (clamp 2.5–4rem), navy.
- One-line description: `lead`, muted.
- **Metadata margin (desktop only):** cols 11–12 vertical mono column: `STACK` (tag list, `orange-deep`), `REPOSITORY` (arrow link), `CONTEXT` (verified one-liner). On tablet/mobile the margin collapses into a horizontal meta row beneath the description.
- Reading block: cols 3–10 (65ch).

### Content structure (sections in locked order)

| Section | Layout |
|---|---|
| Problem | Mono label + body (cols 3–10). No visual flourish. |
| Constraints | Numbered mono list (`01–04`) in `surface` well with hairlines; quiet. |
| Design decisions | **DecisionRows** — the core mechanism: each row = mono number (`orange`), decision (subsection, navy semibold), reasoning (muted, 65ch), hairline separators. Scroll-driven stagger (System 05). |
| Implementation notes | Body with mono inline annotations in the margin column (desktop); inline `<code>`-style mono marks on mobile. |
| Architecture | Full-width (12-col) `surface` well, hairline border, 3:2 SVG diagram with `title`/`desc`, labeled caption: "Architecture — conceptual diagram" (never implied as product screenshot). Progressive construction on scroll (System 05); perspective hover on nodes (System 04). |
| Stack | Mono tag row, cols 3–10. |
| Repository | One arrow link (verified URL), cols 3–10. |
| Reflection | Serif-italic pull-line (`orange-deep`) + 1–2 muted sentences. Calm. |
| Prev/Next | Full-width two-cell band (navy-900): previous (left) / next (right), mono labels + titles, arrows; hover shifts; last-next wraps to `/work`. |

### Section transitions
- Hairline rules + consistent mono eyebrows (`02 / PROBLEM`, `03 / CONSTRAINTS`…). No color band changes inside case studies — **case studies stay cream/navy/white-space**, giving them a "document" identity distinct from the colorful home page.

---

## 11. Engineering Layout

`canvas`, calmer than Work. Communicates *how he thinks*.

1. **Philosophy** — cols 2–11; the verified statement at section-title ×1.2 in navy with serif-italic accent on key phrases ("first principles", "engineering judgment"); mono eyebrow `HOW I THINK`. No panel — pure type on canvas.
2. **Process** — four steps as numbered rows (mono `orange` 01–04 + subsection titles + muted body), hairline separators; the ScrollTrigger sequence reveals steps in order (System 05). This is the page's one motion sequence.
3. **AI-assisted engineering** — two-column: statement prose (cols 3–7) + mono annotation column (cols 9–12, `surface` well): how AI is used (acceleration, prototyping, prompt engineering, REST/MCP integration) and where judgment stays human. Honest, non-hyped.
4. **Competitive programming** — cream row: mono label + lead-type sentence ("40+ problems across data structures, recursion, trees, queues, dynamic programming") + arrow link to LeetCode. Discipline, not badge.
5. **Toolkit** — `surface` well (cols 1–12), four grouped mono-tag columns (languages, frameworks, CS core, AI & tools). Appendix-like, quiet.

No skill bars, no percentages, no logo walls, no animated terminals.

---

## 12. About Layout

`canvas`, human and calm.

- **Intro (cols 1–7):** larger body (18px), short biography: Computer Engineering student, SVIT Vasad, 2024–2028; what he builds; experimentation; BuildEx ownership; hackathon leadership; interests (software systems, AI-enabled products, interactive web experiences).
- **Portrait reprise (cols 8–12):** a second, *different* portrait treatment — smaller square-ish editorial block (4:5) inside a `surface` well with an `orange` left rule. Never repeats the hero panel composition. Optional asset; if absent, the column carries mono captions instead (graceful degradation, no layout dependency).
- **FactsRow (12-col):** hairline-separated columns of mono label + navy value: `DEGREE — B.E. Computer Engineering` · `INSTITUTION — SVIT, Vasad` · `YEARS — 2024–2028` · `CGPA — 8.48/10` · `LEETCODE — 40+ problems`. **This is the single site occurrence of CGPA 8.48 and LeetCode 40+** — plain text, no counters/badges/animation (locked).
- Calm reveals only (System 05, minimal).

---

## 13. Contact Layout

- **Page:** full-bleed `orange-deep` band (the site's only full-orange surface — deliberate ending).
- **Headline:** "HAVE A PROBLEM WORTH BUILDING?" — Space Grotesk 500, clamp 2.5–4.5rem, cream; "worth building" in serif italic.
- **Primary action:** email — navy-900 chip/button with cream text + orange arrow (magnetic on desktop); copy-email micro-interaction (click → mono "COPIED" state, live-region announced; System 06).
- **Secondary:** mono link row: LinkedIn · GitHub · LeetCode (cream, underline on hover → `rule-on-orange`).
- **Home band** (§7.8) uses the identical anatomy at smaller scale.
- No form, no fields, no social icon grid.

---

## 14. Footer

- Full-bleed `navy-900`. Inner 12-col grid.
- Row 1: wordmark (orange square + cream name) · nav echo (mono labels) · email.
- Row 2: mono line — `© 2026 HUSAIN BARDANWALA` · `BHARUCH, INDIA` · socials (mono text links, not icon-only).
- Hairlines `rule-on-navy` between rows. Hover: links → `orange-on-navy-hi`.

---

## 15. Responsive Rules

| Breakpoint | Behavior |
|---|---|
| 375 | Single column; name ~3.25rem; hero stacked (identity → portrait); meta rows wrap; work rows = number+title+tags stacked; case-study margin column collapses into inline mono line; nav = overlay menu; section-space 64–80px; touch targets ≥44px |
| 768 | Tablet grid (8 col); split hero retained with narrower panel; facts row wraps to 2×2; case meta inline; surface wells keep 20px gutters |
| 1024 | 12-col grid engages; margin columns (cols 11–12) appear; nav overlay ends; hover states activate (motion rules: parallax 50%, no magnetic, simplified pins per plan §15) |
| 1280 | Full system: 12-col, margins 48px, hero panel to cols 8–12, magnetic CTA active, pins/parallax full |
| 1920 | Same 12-col discipline; hero panel bleeds to viewport right edge; type caps at clamp max; whitespace scales with section-space clamp |

**Golden rules:** mobile is not a collapsed desktop (portrait reorders below identity; margins become inline); no horizontal overflow (everything fluid, no fixed widths, no `100vw` misuse); color bands scale full-width at every breakpoint; type scales via `clamp()` only.

---

## 16. Motion Compatibility

The six locked systems map onto the visual system without new systems:

| System | Where the layout creates opportunity |
|---|---|
| **01 Hover** | Work rows (navy band + cream index), nav underlines, arrows, primary CTA magnetic (desktop only, ~6px), tags, decision rows, prev/next cells |
| **02 Parallax** | Hero portrait plane (≤24px), hero metadata row, philosophy sequence, one architecture diagram; tablet 50%, mobile off |
| **03 Brand Transition** | First visit only: wordmark → orange system line draws → identity → hero; the line resolves into the portrait panel's orange rule (System 03 end state) |
| **04 Spatial Motion** | CSS perspective on architecture diagram wells, staggered SVG planes, masked reveals (clip-path) for portrait panel and work band; no WebGL |
| **05 Entrance Reveals** | Name masked lines, section eyebrows, staggered work rows, process steps, diagram progressive construction; one-shot `once: true` |
| **06 Micro-interactions** | Scroll-progress hairline (orange), nav underline sweep, copy-email, mobile menu, tag states, external-link markers, prev/next arrows |

Reduced motion (locked): all of the above disable or simplify to opacity-only per `IMPLEMENTATION_PLAN.md` §14; layout and content remain fully functional. Motion is subordinate to hierarchy: intensity map (hero cinematic → work expressive → engineering controlled → about calm → contact minimal) is preserved.

---

## 17. Accessibility Considerations

- All color pairs above meet AA/AAA **with the computed ratios in §3.5**; orange text rules enforced by size.
- Focus: 2px `orange` outline + 2px offset on cream; `orange-on-navy` on navy surfaces; never removed; never styled per-hover only.
- `::selection` orange bg / cream text.
- Orange is never the sole indicator (always shape/underline/marker accompaniment).
- Portrait: meaningful `alt` (role description, not "Husain photo"), not decorative; caption in mono adds redundancy.
- Hero name is the single `h1`; case-study titles are `h1` on their pages.
- Navy and orange bands keep ≥AA for all text (verified).
- Contrast on hover states: hover fills are additive to backgrounds, never lowering text contrast below thresholds.
- Everything else follows `IMPLEMENTATION_PLAN.md` §17 (keyboard, menu, reduced motion, SVGs, touch targets).

---

## 18. Performance Considerations

- **One hero image** (portrait): WebP/AVIF, srcset 640/960/1280w, `fetchpriority="high"` (LCP candidate), explicit dimensions (zero CLS). Max ~250KB at 1280w.
- Flat color fills only — no gradients, no heavy filters; GPU-cheap.
- No WebGL; spatial depth via CSS transform/SVG only.
- Type: three fontsource families, variable weights, preload Space Grotesk only.
- Diagrams: inline SVG (no image requests).
- Budgets unchanged: LCP < 2.0s, CLS < 0.05, TBT < 150ms, initial JS < 250KB gzipped.
- Navy/orange bands are plain backgrounds — no paint cost beyond normal.

---

## 19. Visual Anti-Patterns (banned)

- Dark/gray dominant palette; neon yellow-green accent (superseded by owner revision).
- WebGL, Three.js, generic 3D heroes.
- Gradients as decoration; glassmorphism; glow; excessive shadows.
- Fake dashboards; stock images; fake product screenshots; fabricated project visuals.
- Generic card grids; skill bars; percentage charts; animated code terminals.
- Excessive rounded cards (≤6px only); giant decorative blobs.
- Excessive orange; excessive navy; visual clutter; template-like layouts.
- Circular avatars; LinkedIn-style profile cards; centered resume-heroes.
- Orange as sole indicator; orange small text on cream (violates §3.5).
- Animated counters for CGPA/LeetCode; skill "wow" animations.

---

## 20. Final Design Decisions (locked — implementation must follow)

1. **Palette:** canvas `#FAF6EC` · surface `#F1EBE0` · surface-2 `#EAE2D4` · navy-900 `#16243D` · navy-800 `#1E2E4C` · orange `#C4571F` · orange-deep `#A64518` · orange-ember `#9C3F1A` · orange-on-navy `#E07F3F` · orange-on-navy-hi `#EE9658` · text-muted `#4E5E78` · rules as specified in §3.1.
2. **Primarily light theme**, cream canvas dominant (~65–70%), navy structure (~20–25%), burnt orange signature (~5–8%).
3. **Hero composition:** asymmetric editorial split — typography left (cols 1–7), full-height navy portrait panel right (cols 8–12) with orange vertical system rule; portrait 3:4, bottom-cropped by viewport; mobile stacks identity first, portrait second (4:5).
4. **Portrait:** real future photograph, editorial crop, no fabrication, no circular mask, no filters beyond subtle warmth.
5. **Grid:** 12/8/4 columns, max-width 1200px, gutters 24/20/16px, 8px spacing rhythm, section-space clamp(96–160px)/clamp(64–80px).
6. **Type:** Space Grotesk (display/UI, 500 display), JetBrains Mono (documentation layer), Instrument Serif (italic accent only); scale per §4.
7. **Work presentation:** numbered editorial rows (navy band on home, cream index on `/work`), never cards.
8. **Case studies:** cream "technical document" with navy header block, margin metadata cols 11–12, DecisionRows, `surface` architecture wells, prev/next navy band.
9. **Color journey:** cream/navy split → cream → navy band → cream → cream → cream → orange-deep contact band → navy footer. The orange band is the **only** full-orange surface on the site.
10. **Nav:** fixed 72px cream header, mono uppercase links, orange active underline, orange scroll-progress hairline, full-screen cream overlay menu on mobile.
11. **CTA:** navy fill + cream text + orange arrow (primary); orange reserved for display emphasis/rules/numbers/selection/focus.
12. **Motion:** the six locked systems apply exactly as mapped in §16; orange system line terminates in the hero panel rule; reduced-motion behavior unchanged.
13. **Anti-patterns:** the §19 list is binding.
14. This document supersedes the color sections of `IMPLEMENTATION_PLAN.md` §3; all other plan/sitemap decisions remain authoritative.

---

## 21. Background System (locked — implemented 2026-08-11)

The canvas is never flat: it reads as a printed sheet held inside the grid frame. Zero JS, zero images, static CSS only — the whole system is 3 stacked layers painted on `body`.

### 21.1 Layers

| Layer | Where | What |
|---|---|---|
| 1 — Canvas color | `body` background | `canvas` `#FAF6EC` (lightened 2026-08-11 so layers 2–3 sit on a cleaner base) |
| 2 — Paper grain | `body::before` | Fixed, monochrome SVG `feTurbulence` (180px tile), `multiply` blend, `opacity: var(--surface-noise-opacity)` = 0.055. Darkens the canvas only — never content. |
| 3 — Structural sheet | `body::after` | Fixed hairline grid aligned to the frame: vertical edges + `--color-surface-grid` rows every 96px, `--color-surface-grid-strong` rows every 576px (12 × 48px module). |

Both pseudo-layers are `z-index: -1` with `pointer-events: none`, so they sit behind all content and never intercept interaction.

### 21.2 Sheet geometry (synced with `.grid-frame` padding)

| Breakpoint | Sheet width |
|---|---|
| Desktop ≥1024 | `min(100%, 1440px) − 2 × clamp(32px, 5vw, 48px)` |
| Tablet 768–1023 | `min(100%, 720px) − 48px` |
| Mobile ≤767 | `100% − 40px`, hairline opacity × 0.55 |

The sheet uses `%` (layout viewport) instead of `vw` because `100vw` includes the scrollbar width, which would offset the fixed sheet from the in-flow frame when a classic scrollbar is present. Keep `.grid-frame` padding and this table in lockstep — any future padding change must update `body::after` width in `src/styles/global.css`.

### 21.3 Tokens

Defined in `src/styles/tokens.css` (Tailwind `@theme`):

- `--color-surface-page` = canvas alias (page base; use `bg-surface-page` instead of `bg-canvas` for new sections)
- `--color-surface-page-subtle` `#F7F2E6` — one-step tonal shift for the opening band of a page (hero on home, opening of case-study/case pages), establishing the "sheet inside the frame" reading without any JS
- `--color-surface-grid` / `--color-surface-grid-strong` — hairline inks
- `--surface-noise-opacity` — grain strength

### 21.4 Rules

- Static CSS only. No canvases, no WebGL, no JS paint libraries.
- Sections that open a page: `bg-surface-page-subtle` (hero). All other sections stay `bg-surface-page` / `bg-canvas` and let the global layers do the work.
- Navy/orange sections deliberately **break** the sheet — they are dense ink, not paper; the sheet hairlines continue behind them but read as darkness.
- Reduced-motion: nothing to reduce (static layers).

### 21.5 Anti-patterns

- No grain overlay with `background-attachment: fixed` + a tiled PNG image asset (asset payload, no benefit over the SVG turbulence tile).
- No `box-shadow`-based grid lines, no opacity fades on scroll, no repaint-on-scroll hairline animations.
- No noise on top of content (`z-index: -1` is load-bearing — the grain must stay behind the type).
