import type { PathBeat } from "../../content/types";

/* ── Plate geometry ─────────────────────────────────────────────────────
   Vertical process flow (type-process.md) — central spine with three stages
   fanning out to evidence panels, plus a terminal NEXT panel.
   Each panel is tall enough for: title (2 lines) + note (2 lines) + chip,
   with generous padding. Spine ticks are spaced far enough apart that
   panels never collide.
   Sized for the full 12-column content cell (≈1160px at the 1200px frame). */
const VIEW_W = 1000;
const VIEW_H = 1120;
const SPINE_X = 280;
const PANEL_X = 310;
const PANEL_W = 640;
const PANEL_H = 190;       /* consistent height for every panel */
const TICK_Y = [100, 360, 620, 880];  /* 260px apart — no panel collision */

const COLOR = {
  ink: "#16243D",
  muted: "#4E5E78",
  orange: "#C4571F",
  orangeDeep: "#A64518",
  rule: "rgba(22, 36, 61, 0.16)",
} as const;

const MONO = "'JetBrains Mono Variable', monospace";
const DISPLAY = "'Space Grotesk Variable', sans-serif";

/** Deterministic line breaking so SVG text stays inside its panel. */
function wrap(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * 02 / THE PATH — vertical process flow (type-process).
 *
 * Desktop plate (xl+): central spine with three stages + terminal NEXT panel.
 * Below xl the same beats render as stacked rows (PathSection) — a 1000px
 * process flow cannot shrink to a phone without losing its type.
 *
 * Static on purpose: the plate enters with the section's FadeIn, so no
 * internal choreography competes with the reading order.
 */
export function PathDiagram({ beats }: { beats: PathBeat[] }) {
  const markerId = "path-process-next";

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="hidden h-auto w-full overflow-visible xl:block"
      role="img"
      aria-labelledby="path-diagram-title path-diagram-desc"
      focusable="false"
    >
      <title id="path-diagram-title">The path: 2024 to today — vertical process flow</title>
      <desc id="path-diagram-desc">
        Three sequential stages on a central spine, each with an evidence panel. The final NEXT step is the terminal panel with accent border.
      </desc>

      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M2 1.5 L8 5 L2 8.5 Z" fill={COLOR.orange} />
        </marker>
        <marker
          id="path-process-muted"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path d="M2 1.5 L8 5 L2 8.5 Z" fill={COLOR.muted} />
        </marker>
      </defs>

      {/* Central spine */}
      <path d={`M ${SPINE_X} 40 V ${TICK_Y[3]}`} fill="none" stroke={COLOR.rule} strokeWidth={1} />

      {/* Stage 1: 2024 START */}
      <g>
        <path d={`M ${SPINE_X} ${TICK_Y[0]} H ${PANEL_X}`} fill="none" stroke={COLOR.rule} strokeWidth={1} />
        <circle cx={SPINE_X} cy={TICK_Y[0]} r={6} fill={COLOR.orange} />
        <text x={SPINE_X - 10} y={TICK_Y[0] - 28} textAnchor="end" fontFamily={MONO} fontSize={9} fontWeight={500} letterSpacing="0.16em" fill={COLOR.orangeDeep}>
          {beats[0].stage}
        </text>
        <text x={SPINE_X - 10} y={TICK_Y[0] - 46} textAnchor="end" fontFamily={DISPLAY} fontSize={22} fontWeight={500} letterSpacing="-0.02em" fill={COLOR.ink}>
          {beats[0].year}
        </text>
        <rect x={PANEL_X} y={TICK_Y[0] - 24} width={PANEL_W} height={PANEL_H} rx={6} fill="#FFFFFF" stroke={COLOR.rule} strokeWidth={1} />
        {wrap(beats[0].title, 52).map((line, i) => (
          <text key={line} x={PANEL_X + 20} y={TICK_Y[0] + i * 24} fontFamily={DISPLAY} fontSize={15} fontWeight={500} fill={COLOR.ink}>
            {line}
          </text>
        ))}
        {wrap(beats[0].note, 68).map((line, i) => (
          <text key={line} x={PANEL_X + 20} y={TICK_Y[0] + 60 + i * 20} fontFamily={DISPLAY} fontSize={12} fill={COLOR.muted}>
            {line}
          </text>
        ))}
        <rect x={PANEL_X + 20} y={TICK_Y[0] + 112} width={110} height={22} rx={3} fill="rgba(196,87,31,.08)" stroke={COLOR.orange} strokeWidth={0.8} />
        <text x={PANEL_X + 75} y={TICK_Y[0] + 127} textAnchor="middle" fontFamily={MONO} fontSize={8} fontWeight={500} letterSpacing="0.14em" fill={COLOR.orangeDeep}>
          {beats[0].outcome}
        </text>
      </g>

      {/* Spine segment 1→2 */}
      <path d={`M ${SPINE_X} ${TICK_Y[0]} V ${TICK_Y[1]}`} fill="none" stroke={COLOR.rule} strokeWidth={1} />

      {/* Stage 2: 2026 BUILD */}
      <g>
        <path d={`M ${SPINE_X} ${TICK_Y[1]} H ${PANEL_X}`} fill="none" stroke={COLOR.rule} strokeWidth={1} />
        <circle cx={SPINE_X} cy={TICK_Y[1]} r={6} fill={COLOR.orange} />
        <text x={SPINE_X - 10} y={TICK_Y[1] - 28} textAnchor="end" fontFamily={MONO} fontSize={9} fontWeight={500} letterSpacing="0.16em" fill={COLOR.orangeDeep}>
          {beats[1].stage}
        </text>
        <text x={SPINE_X - 10} y={TICK_Y[1] - 46} textAnchor="end" fontFamily={DISPLAY} fontSize={22} fontWeight={500} letterSpacing="-0.02em" fill={COLOR.ink}>
          {beats[1].year}
        </text>
        <rect x={PANEL_X} y={TICK_Y[1] - 24} width={PANEL_W} height={PANEL_H} rx={6} fill="#FFFFFF" stroke={COLOR.rule} strokeWidth={1} />
        {wrap(beats[1].title, 52).map((line, i) => (
          <text key={line} x={PANEL_X + 20} y={TICK_Y[1] + i * 24} fontFamily={DISPLAY} fontSize={15} fontWeight={500} fill={COLOR.ink}>
            {line}
          </text>
        ))}
        {wrap(beats[1].note, 68).map((line, i) => (
          <text key={line} x={PANEL_X + 20} y={TICK_Y[1] + 60 + i * 20} fontFamily={DISPLAY} fontSize={12} fill={COLOR.muted}>
            {line}
          </text>
        ))}
        <rect x={PANEL_X + 20} y={TICK_Y[1] + 112} width={110} height={22} rx={3} fill="rgba(196,87,31,.08)" stroke={COLOR.orange} strokeWidth={0.8} />
        <text x={PANEL_X + 75} y={TICK_Y[1] + 127} textAnchor="middle" fontFamily={MONO} fontSize={8} fontWeight={500} letterSpacing="0.14em" fill={COLOR.orangeDeep}>
          {beats[1].outcome}
        </text>
      </g>

      {/* Spine segment 2→3 */}
      <path d={`M ${SPINE_X} ${TICK_Y[1]} V ${TICK_Y[2]}`} fill="none" stroke={COLOR.rule} strokeWidth={1} />

      {/* Stage 3: 2026 LEAD (focal — accent border) */}
      <g>
        <path d={`M ${SPINE_X} ${TICK_Y[2]} H ${PANEL_X}`} fill="none" stroke={COLOR.orange} strokeWidth={1.5} />
        <circle cx={SPINE_X} cy={TICK_Y[2]} r={6} fill={COLOR.orange} />
        <text x={SPINE_X - 10} y={TICK_Y[2] - 28} textAnchor="end" fontFamily={MONO} fontSize={9} fontWeight={500} letterSpacing="0.16em" fill={COLOR.orangeDeep}>
          {beats[2].stage}
        </text>
        <text x={SPINE_X - 10} y={TICK_Y[2] - 46} textAnchor="end" fontFamily={DISPLAY} fontSize={22} fontWeight={500} letterSpacing="-0.02em" fill={COLOR.ink}>
          {beats[2].year}
        </text>
        <rect x={PANEL_X} y={TICK_Y[2] - 24} width={PANEL_W} height={PANEL_H} rx={6} fill="#FFFFFF" stroke={COLOR.orange} strokeWidth={1.5} />
        {wrap(beats[2].title, 52).map((line, i) => (
          <text key={line} x={PANEL_X + 20} y={TICK_Y[2] + i * 24} fontFamily={DISPLAY} fontSize={15} fontWeight={500} fill={COLOR.ink}>
            {line}
          </text>
        ))}
        {wrap(beats[2].note, 68).map((line, i) => (
          <text key={line} x={PANEL_X + 20} y={TICK_Y[2] + 60 + i * 20} fontFamily={DISPLAY} fontSize={12} fill={COLOR.muted}>
            {line}
          </text>
        ))}
        <rect x={PANEL_X + 20} y={TICK_Y[2] + 112} width={110} height={22} rx={3} fill="rgba(196,87,31,.1)" stroke={COLOR.orange} strokeWidth={0.8} />
        <text x={PANEL_X + 75} y={TICK_Y[2] + 127} textAnchor="middle" fontFamily={MONO} fontSize={8} fontWeight={500} letterSpacing="0.14em" fill={COLOR.orangeDeep}>
          {beats[2].outcome}
        </text>
      </g>

      {/* Spine segment 3→NEXT (dashed accent) */}
      <path
        d={`M ${SPINE_X} ${TICK_Y[2]} V ${TICK_Y[3]}`}
        fill="none"
        stroke={COLOR.orange}
        strokeWidth={1.5}
        strokeDasharray="4 4"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
      />

      {/* Terminal Step: NEXT */}
      <g>
        <path d={`M ${SPINE_X} ${TICK_Y[3]} H ${PANEL_X}`} fill="none" stroke={COLOR.orange} strokeWidth={1.5} strokeDasharray="4 4" />
        <rect x={SPINE_X - 6} y={TICK_Y[3] - 6} width={12} height={12} rx={2} fill={COLOR.orange} />
        <text x={SPINE_X - 10} y={TICK_Y[3] - 28} textAnchor="end" fontFamily={MONO} fontSize={9} fontWeight={500} letterSpacing="0.16em" fill={COLOR.orangeDeep}>
          NEXT
        </text>
        <rect x={PANEL_X} y={TICK_Y[3] - 24} width={PANEL_W} height={PANEL_H} rx={6} fill="#FFFFFF" stroke={COLOR.orange} strokeWidth={2} />
        <text x={PANEL_X + 20} y={TICK_Y[3] + 26} fontFamily={DISPLAY} fontSize={16} fontWeight={500} fill={COLOR.ink}>
          Seeking software engineering internship
        </text>
        <text x={PANEL_X + 20} y={TICK_Y[3] + 54} fontFamily={DISPLAY} fontSize={12} fill={COLOR.muted}>
          Focus: full-stack and AI-enabled products
        </text>
        <text x={PANEL_X + 20} y={TICK_Y[3] + 74} fontFamily={DISPLAY} fontSize={12} fill={COLOR.muted}>
          Based in India
        </text>
        <text x={PANEL_X + 20} y={TICK_Y[3] + 110} fontFamily={MONO} fontSize={10} fontWeight={500} letterSpacing="0.1em" fill={COLOR.orange}>
          Start a conversation → /contact
        </text>
      </g>

      {/* Legend */}
      <g transform={`translate(50, ${VIEW_H - 52})`}>
        <line x1="0" y1="0" x2={VIEW_W - 100} y2="0" stroke={COLOR.rule} strokeWidth={0.8} />
        <g fontFamily={MONO} fontSize={8} fill={COLOR.muted}>
          <line x1="0" y1="18" x2="30" y2="18" stroke={COLOR.muted} strokeWidth={1} markerEnd="url(#path-process-muted)" />
          <text x="40" y="22">Standard transition</text>
          <line x1="200" y1="18" x2="230" y2="18" stroke={COLOR.orange} strokeWidth={1.5} strokeDasharray="4 4" markerEnd={`url(#${markerId})`} />
          <text x="240" y="22">Terminal transition</text>
          <rect x="420" y="13" width="16" height="16" rx="2" stroke={COLOR.muted} strokeWidth={0.8} fill="none" />
          <text x="450" y="22">Completed stage</text>
          <rect x="580" y="13" width="16" height="16" rx="2" stroke={COLOR.orange} strokeWidth={1.5} fill="none" />
          <text x="610" y="22">Current stage</text>
          <rect x="740" y="13" width="16" height="16" rx="2" stroke={COLOR.orange} strokeWidth={2} fill="none" />
          <text x="770" y="22">Terminal stage</text>
        </g>
      </g>
    </svg>
  );
}