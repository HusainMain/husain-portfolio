# MCP WORKFLOW — Husain Bardanwala Portfolio

**Source of truth hierarchy:** `DESIGN_SYSTEM.md` (visual design) → `SITE_MAP.md` (routes/IA) → `IMPLEMENTATION_PLAN.md` (technical architecture) → **this document** (MCP usage) → source code.
This document is an operational guide for using the connected MCP stack during implementation, debugging, and QA. Its purpose is to **prevent MCP misuse**.

Available MCPs: `agentation` · `context7` · `devtools` · `filesystem` · `mobbin` · `originui` · `playwright`

---

## 1. MCP Responsibility Matrix

| MCP | Primary Responsibility | Use When | Do Not Use For |
|---|---|---|---|
| context7 | Current documentation/API verification | Before using library APIs or version-sensitive features (Tailwind v4, React Router v7, GSAP/ScrollTrigger, useGSAP, Lenis, Motion, @fontsource) | File editing |
| filesystem | Repository/file operations | Creating, reading, modifying project files; repository inspection; architecture verification | Browser QA |
| playwright | Browser automation and functional/responsive testing | Routes, interactions, keyboard, viewport tests, screenshots, reduced-motion tests | Editing source |
| devtools | Runtime/performance inspection | Console, network, Lighthouse, performance traces, frame/jank analysis | Architecture decisions |
| agentation | Visual QA and annotations | Layout, spacing, hierarchy, visual defects, motion perception | Source-of-truth architecture |
| originui | UI/design research | Researching possible patterns only | Installing generic component systems |
| mobbin | Design research | When accessible and useful | Implementation dependency |

---

## 2. MCP Rules

### Context7

Use it **before** implementing:
- Tailwind v4 APIs (`@theme`, `@tailwindcss/vite`)
- React Router v7 APIs (library mode, `lazy`)
- GSAP / ScrollTrigger / `useGSAP`
- Lenis React integration (GSAP ticker sync)
- Motion (`motion/react`)
- @fontsource packages

Never rely on stale API assumptions when Context7 can verify them. Verify, then implement.

### Filesystem

Use it for:
- repository inspection
- file creation
- file modification
- file reads
- architecture verification

Filesystem is the **primary implementation file-operation MCP**.

### Playwright

Use it for:
- route smoke tests
- responsive testing
- interaction testing
- keyboard testing
- mobile menu testing
- reduced-motion testing
- link testing (broken-link scan)
- screenshot capture
- accessibility snapshots where appropriate

Required responsive widths: **375 · 768 · 1024 · 1280 · 1920**

### DevTools

Use it for:
- console errors
- failed requests
- network waterfalls
- Lighthouse
- performance traces
- frame/jank analysis
- runtime debugging
- post-deployment verification

Do not use DevTools findings to silently change locked architecture. Findings are inputs for fixes within the locked spec — conflicts are reported, not silently resolved.

### Agentation

Use it primarily during **visual QA** (Phase 8), and opportunistically during page development.

Workflow:
```text
Render
→ inspect
→ annotate
→ identify defect
→ fix
→ render again
→ verify annotation resolved
```

Use it for:
- spacing
- alignment
- hierarchy
- visual balance
- typography
- responsive presentation
- motion perception

### OriginUI

**Research only.**
- Do NOT install shadcn.
- Do NOT replace custom primitives.
- Do NOT introduce OriginUI's design language.
- Do NOT add generic components merely because they exist.

### Mobbin

**Research only.**
**Availability verified 2026-08-10: Mobbin MCP requires a paid plan and is unavailable.** Do not attempt retries during implementation; continue with the established design direction. If access changes, research use only — never an implementation dependency.

---

## 3. MCP Combination Workflows

### Library/API implementation
```text
Context7
→ Filesystem
→ DevTools
→ Playwright
```

### Visual implementation
```text
Filesystem
→ Playwright
→ Agentation
→ Filesystem
→ Playwright
```

### Performance investigation
```text
DevTools
→ Filesystem
→ Playwright
→ DevTools
```

### Accessibility validation
```text
Playwright
→ DevTools
→ Filesystem
```

### Final visual QA
```text
Playwright
→ Agentation
→ DevTools
→ Filesystem
→ Playwright
```

---

## 4. MCP Decision Rule

For every implementation/debugging task, determine:

1. What kind of task is this?
2. Which MCP owns that responsibility?
3. Does current library documentation need verification?
4. Does the result need browser validation?
5. Does it need visual validation?
6. Does it need performance validation?

**Do not call every MCP for every task.** Use the smallest relevant MCP set.

---

## 5. MCP Authority Rule

```text
IMPLEMENTATION_PLAN.md
        ↓
SITE_MAP.md
        ↓
MCP_WORKFLOW.md
        ↓
Source code
```

- The MCPs do not determine product architecture.
- They **execute, verify, research, or debug** against the locked specifications.
- If an MCP result conflicts with a locked architectural decision: **stop and report the conflict** rather than silently changing the architecture.

---

## 6. Phase-Specific MCP Usage

| Phase | MCPs | Notes |
|---|---|---|
| Phase 0 — Scaffold + tokens + routing + shell | Context7 + Filesystem | Verify Tailwind v4 / RR v7 / fontsource APIs before writing |
| Phase 1 — Primitives + typed content | Filesystem (+ Context7 when API verification needed) | Content diffed against resume; evidence policy applied |
| Phase 2 — Homepage | Filesystem + Playwright + DevTools | Basic entrance states only; viewport checks |
| Phase 3 — Case-study template + IdeaBridge | Filesystem + Playwright (+ Context7 for GSAP pin verification) | Diagram render + repo link verified |
| Phase 4 — Remaining case studies | Filesystem + Playwright | Template consistency across all four studies |
| Phase 5 — Engineering + About + Contact + 404 | Filesystem + Playwright | Full route walkthrough |
| Phase 6 — Full motion system | Context7 + Filesystem + DevTools + Playwright | Lenis/GSAP sync verified; frame traces; reduced-motion tests |
| Phase 7 — Accessibility + SEO + performance | Playwright + DevTools | Lighthouse ≥95 on a11y/SEO/perf; keyboard-only walkthrough |
| Phase 8 — Visual QA | Agentation + Playwright + DevTools | Annotation loop; responsive matrix; motion-scope audit |
| Phase 9 — Deployment | Playwright + DevTools | Live smoke test + post-deploy Lighthouse |

**OriginUI and Mobbin remain research-only throughout.**
