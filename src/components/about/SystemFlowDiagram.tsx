import type { SystemFlowStage } from "../../content/types";

/* ── Plate geometry ─────────────────────────────────────────────────────
   A portrait cycle sized for the About right spine (≤340px). A circular
   loop needs roughly triple this width to keep node labels legible, so the
   ring is unfolded into a vertical rail with one return path: the last
   stage feeds the first without shrinking the type. */
const VIEW_W = 340;
const STATION_TOP = 28;
const STATION_STEP = 62;
const SPINE_X = 58;
const RAIL_X = 24;
const CONTENT_X = 76;
const NAME_X = 101;
const RIGHT_X = 334;

const COLOR = {
  ink: "#16243D",
  muted: "#4E5E78",
  orange: "#C4571F",
  orangeDeep: "#A64518",
  rule: "rgba(22, 36, 61, 0.16)",
} as const;

const MONO = "'JetBrains Mono Variable', monospace";
const DISPLAY = "'Space Grotesk Variable', sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";

interface SystemFlowDiagramProps {
  stages: SystemFlowStage[];
}

/**
 * About right-spine system flow — decorative plate (aria-hidden).
 *
 * Five stages descend a hairline spine while a dashed orange return path
 * carries LEARN back to IDEA. The orange is reserved for the loop return and
 * the station ticks; stage names stay in the display face and the notes in
 * Instrument Serif italic, matching the prose accents next to it.
 *
 * Static on purpose: the whole plate enters with the About column's FadeIn,
 * so no internal choreography competes with the headline or body copy.
 */
export function SystemFlowDiagram({ stages }: SystemFlowDiagramProps) {
  const lastY = STATION_TOP + (stages.length - 1) * STATION_STEP;
  const height = lastY + 72;
  const markerId = "system-flow-return";

  /* LEARN → left margin → back into IDEA, with matched 12px corners. */
  const returnPath = [
    `M ${SPINE_X} ${lastY}`,
    `H ${RAIL_X + 12}`,
    `Q ${RAIL_X} ${lastY} ${RAIL_X} ${lastY - 12}`,
    `V ${STATION_TOP + 12}`,
    `Q ${RAIL_X} ${STATION_TOP} ${RAIL_X + 12} ${STATION_TOP}`,
    `H ${SPINE_X - 5}`,
  ].join(" ");

  return (
    <div aria-hidden="true" className="max-w-[340px]">
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-rule-on-cream" />
        <p className="text-mono-label text-muted">SYSTEM FLOW</p>
        <p className="ml-auto font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
          LOOP / {String(stages.length).padStart(2, "0")}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${height}`}
        className="mt-[22px] block h-auto w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
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
        </defs>

        {/* The return path reads as feedback, never as a second flow. */}
        <path
          d={returnPath}
          fill="none"
          stroke={COLOR.orange}
          strokeWidth={1}
          strokeDasharray="3 4"
          strokeLinecap="round"
          markerEnd={`url(#${markerId})`}
        />
        <path
          d={`M ${SPINE_X} ${STATION_TOP} V ${lastY}`}
          fill="none"
          stroke={COLOR.rule}
          strokeWidth={1}
        />

        {stages.map((stage, index) => {
          const y = STATION_TOP + index * STATION_STEP;
          return (
            <g key={stage.name}>
              <rect
                x={SPINE_X - 3}
                y={y - 3}
                width={6}
                height={6}
                fill={COLOR.orange}
              />
              <text
                x={CONTENT_X}
                y={y + 6}
                fontFamily={MONO}
                fontSize={10.5}
                fontWeight={500}
                letterSpacing="0.08em"
                fill={COLOR.orangeDeep}
              >
                {String(index + 1).padStart(2, "0")}
              </text>
              <text
                x={NAME_X}
                y={y + 6}
                fontFamily={DISPLAY}
                fontSize={17}
                fontWeight={500}
                letterSpacing="-0.01em"
                fill={COLOR.ink}
              >
                {stage.name}
              </text>
              <text
                x={RIGHT_X}
                y={y + 5}
                textAnchor="end"
                fontFamily={MONO}
                fontSize={11}
                fontWeight={500}
                letterSpacing="0.12em"
                fill={COLOR.muted}
              >
                {stage.output}
              </text>
              <text
                x={NAME_X}
                y={y + 26}
                fontFamily={SERIF}
                fontSize={16}
                fontStyle="italic"
                fill={COLOR.muted}
              >
                {stage.note}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-rule-on-cream pt-3.5">
        <p className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          SHIP → LEARN → REPEAT
        </p>
        <p className="ml-auto whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
          FROM IDEA TO SHIP
        </p>
      </div>
    </div>
  );
}
