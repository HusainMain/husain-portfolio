import { useEffect, useRef } from "react";
import gsap from "gsap";
import type {
  ArchitectureDiagram,
  DiagramEdge,
  DiagramNode,
} from "../../content/types";
import { prefersReducedMotion } from "../../lib/motion";

/* ── Wide-variant layout constants ──────────────────────────────────── */
const NODE_W = 180;
const NODE_H = 48;
const PAD_X = 40;
const LAYER_GAP = 100;
const START_Y = 32;

/* ── Tall-variant layout constants (430px viewBox width) ────────────── */
const TALL_VB_W = 430;
const TALL_NODE_W = 124; // ≤ (430 − 2·24) / 3 so three-node rows never overlap
const TALL_NODE_H = 50;
const TALL_PAD_X = 24;
const TALL_ROW_GAP = 108;
const TALL_NODE_V_GAP = 14;
const TALL_START_Y = 30;

/* Route/label geometry tuning */
const LIFTS = [16, 24, 32]; // step sizes for over-the-top / under-the-bottom detours
const LABEL_W_CHAR = 7; // mono, ~10px
const LABEL_H = 16;

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Pt {
  x: number;
  y: number;
}

interface NodeRect extends Rect {
  node: DiagramNode;
}

interface DiagramLayout {
  width: number;
  height: number;
  padX: number;
  layers: { label: string; y: number }[];
  nodes: Map<string, NodeRect>;
  pills: Rect[];
}

function nodeXs(count: number, totalWidth: number, nodeW: number, padX: number): number[] {
  if (count <= 1) return [(totalWidth - nodeW) / 2];
  const usable = totalWidth - padX * 2 - nodeW;
  return Array.from(
    { length: count },
    (_, i) => padX + (i * usable) / (count - 1),
  );
}

function layerPills(layout: DiagramLayout): Rect[] {
  return layout.layers.map((layer) => ({
    x: layout.padX - 4,
    y: layer.y + 10,
    w: layer.label.length * 7.5 + 16,
    h: 18,
  }));
}

function calculateWideDimensions(diagram: ArchitectureDiagram): {
  width: number;
  height: number;
} {
  const maxNodesInLayer = Math.max(
    ...diagram.layers.map((layer) => layer.nodes.length),
  );
  const layerCount = diagram.layers.length;
  const minWidth = 560;
  const minHeight = 400;
  const width = Math.max(minWidth, PAD_X * 2 + maxNodesInLayer * NODE_W + (maxNodesInLayer - 1) * 60);
  const height = Math.max(minHeight, START_Y + layerCount * LAYER_GAP + 60);
  return { width, height };
}

function layoutWide(diagram: ArchitectureDiagram): DiagramLayout {
  const { width, height } = calculateWideDimensions(diagram);
  const nodes = new Map<string, NodeRect>();
  const layers = diagram.layers.map((layer, i) => {
    const y = START_Y + i * LAYER_GAP;
    const xs = nodeXs(layer.nodes.length, width, NODE_W, PAD_X);
    layer.nodes.forEach((node, j) => {
      nodes.set(node.id, { node, x: xs[j], y: y + 42, w: NODE_W, h: NODE_H });
    });
    return { label: layer.label, y };
  });
  const layout: DiagramLayout = { width, height, padX: PAD_X, layers, nodes, pills: [] };
  layout.pills = layerPills(layout);
  return layout;
}

/**
 * Multi-column tall layout: each layer places its nodes side-by-side
 * horizontally (up to 3 per row) within the 430px viewBox, mirroring the
 * wide layout strategy but for a narrow viewport. Node width is capped so
 * three sibling nodes never overlap.
 */
function layoutTall(diagram: ArchitectureDiagram): DiagramLayout {
  const nodes = new Map<string, NodeRect>();
  const layers: { label: string; y: number }[] = [];
  let y = TALL_START_Y;

  for (const layer of diagram.layers) {
    layers.push({ label: layer.label, y });

    const perRow = Math.min(layer.nodes.length, 3);
    const rowCount = Math.ceil(layer.nodes.length / perRow);

    for (let row = 0; row < rowCount; row++) {
      const rowNodes = layer.nodes.slice(row * perRow, row * perRow + perRow);
      const xs = nodeXs(rowNodes.length, TALL_VB_W, TALL_NODE_W, TALL_PAD_X);
      const rowY = y + 36 + row * (TALL_NODE_H + TALL_NODE_V_GAP);
      rowNodes.forEach((node, col) => {
        nodes.set(node.id, {
          node,
          x: xs[col],
          y: rowY,
          w: TALL_NODE_W,
          h: TALL_NODE_H,
        });
      });
    }

    y += 36 + rowCount * TALL_NODE_H + (rowCount - 1) * TALL_NODE_V_GAP + 28;
  }

  const height = Math.max(400, y + TALL_ROW_GAP - 72);
  const layout: DiagramLayout = {
    width: TALL_VB_W,
    height,
    padX: TALL_PAD_X,
    layers,
    nodes,
    pills: [],
  };
  layout.pills = layerPills(layout);
  return layout;
}

/* ── Geometry helpers ───────────────────────────────────────────────── */

function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/** Cohen–Sutherland: does segment (x1,y1)-(x2,y2) pass through rect? */
function segmentHitsRect(x1: number, y1: number, x2: number, y2: number, rect: Rect): boolean {
  const rx1 = rect.x + 0.5;
  const ry1 = rect.y + 0.5;
  const rx2 = rect.x + rect.w - 0.5;
  const ry2 = rect.y + rect.h - 0.5;
  const code = (x: number, y: number) =>
    (x < rx1 ? 1 : 0) | (x > rx2 ? 2 : 0) | (y < ry1 ? 4 : 0) | (y > ry2 ? 8 : 0);
  let c1 = code(x1, y1);
  let c2 = code(x2, y2);
  for (let i = 0; i < 8; i++) {
    if ((c1 | c2) === 0) return true;
    if (c1 & c2) return false;
    const c = c1 || c2;
    let x = 0;
    let y = 0;
    if (c & 8) {
      y = ry2;
      x = x1 + ((x2 - x1) * (ry2 - y1)) / (y2 - y1);
    } else if (c & 4) {
      y = ry1;
      x = x1 + ((x2 - x1) * (ry1 - y1)) / (y2 - y1);
    } else if (c & 2) {
      x = rx2;
      y = y1 + ((y2 - y1) * (rx2 - x1)) / (x2 - x1);
    } else {
      x = rx1;
      y = y1 + ((y2 - y1) * (rx1 - x1)) / (x2 - x1);
    }
    if (c === c1) {
      x1 = x;
      y1 = y;
      c1 = code(x1, y1);
    } else {
      x2 = x;
      y2 = y;
      c2 = code(x2, y2);
    }
  }
  return false;
}

function polylineHits(pts: Pt[], obstacles: Rect[]): boolean {
  for (let i = 0; i < pts.length - 1; i++) {
    for (const ob of obstacles) {
      if (segmentHitsRect(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y, ob)) {
        return true;
      }
    }
  }
  return false;
}

function polylineLength(pts: Pt[]): number {
  let len = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    len += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
  }
  return len;
}

function pointAtLength(pts: Pt[], target: number): Pt {
  let travelled = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const segLen = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    if (travelled + segLen >= target || i === pts.length - 2) {
      const t = segLen === 0 ? 0 : (target - travelled) / segLen;
      return {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * t,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * t,
      };
    }
    travelled += segLen;
  }
  return pts[pts.length - 1];
}

/** Midpoint of the longest segment — the best spot to hang an edge label. */
function labelAnchor(pts: Pt[]): Pt {
  if (pts.length < 3) return pointAtLength(pts, polylineLength(pts) / 2);
  let bestI = 0;
  let bestLen = -1;
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    if (len > bestLen) {
      bestLen = len;
      bestI = i;
    }
  }
  return {
    x: (pts[bestI].x + pts[bestI + 1].x) / 2,
    y: (pts[bestI].y + pts[bestI + 1].y) / 2,
  };
}

/** Straight anchor-to-anchor edge (the previous line geometry). */
function straightEdge(from: NodeRect, to: NodeRect): Pt[] {
  const source = { x: from.x + from.w / 2, y: from.y + from.h / 2 };
  const target = { x: to.x + to.w / 2, y: to.y + to.h / 2 };
  if (from.y === to.y) {
    return [
      { x: from.x + (source.x < target.x ? from.w : 0), y: source.y },
      { x: to.x + (source.x < target.x ? 0 : to.w), y: target.y },
    ];
  }
  if (from.y + from.h <= to.y) {
    return [{ x: source.x, y: from.y + from.h }, { x: target.x, y: to.y }];
  }
  return [{ x: source.x, y: from.y }, { x: target.x, y: to.y + to.h }];
}

/**
 * Orthogonal detour routing. If the straight line between two nodes passes
 * through another node (e.g. ideabridge's AI services crossing the shared
 * module, or buildex's events → data crossing the blueprint), route around it
 * with elbow bends through the empty gutters between layers and to the sides
 * of the diagram. The first collision-free candidate wins.
 */
function routeEdge(from: NodeRect, to: NodeRect, obstacles: Rect[], vbW: number): Pt[] | null {
  const srcCx = from.x + from.w / 2;
  const tgtCx = to.x + to.w / 2;
  const srcTop = from.y;
  const srcBottom = from.y + from.h;
  const tgtTop = to.y;
  const tgtBottom = to.y + to.h;

  const rightEdge = Math.max(...obstacles.map((o) => o.x + o.w));
  const leftEdge = Math.min(...obstacles.map((o) => o.x));
  const gutterR = Math.min(rightEdge + 10, vbW - 4);
  const gutterL = Math.max(leftEdge - 10, 4);

  const candidates: Pt[][] = [];

  // R_E — drop to the mid-gap between the layers, cross, drop into target.
  const yMid = (srcBottom + tgtTop) / 2;
  candidates.push([
    { x: srcCx, y: srcBottom },
    { x: srcCx, y: yMid },
    { x: tgtCx, y: yMid },
    { x: tgtCx, y: tgtTop },
  ]);

  // R_F — rise over the row, cross, drop into target.
  for (const lift of LIFTS) {
    candidates.push([
      { x: srcCx, y: srcTop },
      { x: srcCx, y: srcTop - lift },
      { x: tgtCx, y: srcTop - lift },
      { x: tgtCx, y: tgtTop },
    ]);
  }

  // R_C / R_D — drop below the row, run to a side gutter, drop, cross back.
  for (const drop of LIFTS) {
    candidates.push([
      { x: srcCx, y: srcBottom },
      { x: srcCx, y: srcBottom + drop },
      { x: gutterR, y: srcBottom + drop },
      { x: gutterR, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop },
    ]);
    candidates.push([
      { x: srcCx, y: srcBottom },
      { x: srcCx, y: srcBottom + drop },
      { x: gutterL, y: srcBottom + drop },
      { x: gutterL, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop },
    ]);
  }

  // R_A / R_B — rise over the row, run to a side gutter, drop, cross back.
  for (const lift of LIFTS) {
    candidates.push([
      { x: srcCx, y: srcTop },
      { x: srcCx, y: srcTop - lift },
      { x: gutterR, y: srcTop - lift },
      { x: gutterR, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop },
    ]);
    candidates.push([
      { x: srcCx, y: srcTop },
      { x: srcCx, y: srcTop - lift },
      { x: gutterL, y: srcTop - lift },
      { x: gutterL, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop - 8 },
      { x: tgtCx, y: tgtTop },
    ]);
  }

  // Upward flow (target above source): rise to the mid-gap, cross, rise into
  // the target's bottom edge.
  if (tgtBottom <= srcTop) {
    const yUp = (srcTop + tgtBottom) / 2;
    candidates.push([
      { x: srcCx, y: srcTop },
      { x: srcCx, y: yUp },
      { x: tgtCx, y: yUp },
      { x: tgtCx, y: tgtBottom },
    ]);
    for (const drop of LIFTS) {
      candidates.push([
        { x: srcCx, y: srcBottom },
        { x: srcCx, y: srcBottom + drop },
        { x: tgtCx, y: srcBottom + drop },
        { x: tgtCx, y: tgtBottom },
      ]);
    }
  }

  for (const candidate of candidates) {
    if (!polylineHits(candidate, obstacles)) return candidate;
  }
  return null;
}

/**
 * Place an edge-label pill near the anchor so it never overlaps a node (or a
 * layer-label pill) and never escapes the viewBox. All nodes — including the
 * edge's own endpoints — are obstacles: the pill must not cover the boxes it
 * connects.
 */
function placeLabel(
  anchor: Pt,
  w: number,
  obstacles: Rect[],
  vbW: number,
  vbH: number,
): Pt {
  const clampX = (x: number) => Math.min(Math.max(x, 8), vbW - w - 8);
  const clampY = (y: number) => Math.min(Math.max(y, 8), vbH - LABEL_H - 8);
  const dx = w / 2 + 10;
  const offsets: ReadonlyArray<readonly [number, number]> = [
    [0, 0],
    [0, -16], [0, -32], [0, -48], [0, -64], [0, -80], [0, -96],
    [0, 16], [0, 32], [0, 48], [0, 64], [0, 80], [0, 96],
    [dx, 0], [-dx, 0],
    [dx, -16], [-dx, -16], [dx, 16], [-dx, 16],
    [dx, -32], [-dx, -32], [dx, 32], [-dx, 32],
    [dx, -48], [-dx, -48], [dx, 48], [-dx, 48],
  ];
  for (const [ox, oy] of offsets) {
    const x = clampX(anchor.x - w / 2 + ox);
    const y = clampY(anchor.y - LABEL_H / 2 + oy);
    if (!obstacles.some((ob) => rectsOverlap({ x, y, w, h: LABEL_H }, ob))) {
      return { x, y };
    }
  }
  return {
    x: clampX(anchor.x - w / 2),
    y: clampY(anchor.y - LABEL_H / 2),
  };
}

function nodeCenter(rect: NodeRect): { x: number; y: number } {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

function renderLayerLabels(layout: DiagramLayout) {
  return layout.layers.map((layer) => (
    <g key={layer.label} data-phase="layer">
      <line
        x1={layout.padX}
        y1={layer.y + 24}
        x2={layout.width - layout.padX}
        y2={layer.y + 24}
        stroke="rgba(22, 36, 61, 0.08)"
        strokeWidth={1}
      />
      <rect
        x={layout.padX - 4}
        y={layer.y + 10}
        width={layer.label.length * 7.5 + 16}
        height={18}
        fill="#FAF6EC"
      />
      <text
        x={layout.padX}
        y={layer.y + 23}
        fontSize={11}
        fontWeight={600}
        letterSpacing="0.08em"
        fill="#C4571F"
        fontFamily="'JetBrains Mono Variable', monospace"
      >
        {layer.label}
      </text>
    </g>
  ));
}

/** Clamp an overly long string to a node's width via SVG textLength. */
function fitText(text: string, fontSize: number, maxWidth: number, mono: boolean) {
  const width = text.length * fontSize * (mono ? 0.6 : 0.52);
  if (width <= maxWidth) return {};
  return { textLength: maxWidth, lengthAdjust: "spacingAndGlyphs" as const };
}

function renderNodes(layout: DiagramLayout, variant: "wide" | "tall") {
  const labelSize = variant === "tall" ? 11 : 14;
  const subSize = variant === "tall" ? 9 : 11;
  const avail = layout.nodes.size
    ? [...layout.nodes.values()][0].w - 10
    : NODE_W - 10;

  return [...layout.nodes.values()].map((rect) => {
    const center = nodeCenter(rect);
    return (
      <g key={rect.node.id} className="diagram-node" data-phase="node">
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx={6}
          fill={rect.node.accent ? "#FDF8EE" : "#FFFFFF"}
          stroke={rect.node.accent ? "#C4571F" : "rgba(22, 36, 61, 0.22)"}
          strokeWidth={rect.node.accent ? 1.5 : 1}
        />
        {rect.node.accent && (
          <circle
            cx={rect.x + 14}
            cy={rect.y + 16}
            r={3}
            fill="#C4571F"
          />
        )}
        <text
          x={rect.node.accent ? center.x + 4 : center.x}
          y={rect.y + (rect.node.sub ? 22 : 28)}
          textAnchor="middle"
          fontSize={labelSize}
          fontWeight={600}
          fill="#16243D"
          fontFamily="'Space Grotesk Variable', sans-serif"
          {...fitText(rect.node.label, labelSize, avail, false)}
        >
          {rect.node.label}
        </text>
        {rect.node.sub && (
          <text
            x={center.x}
            y={rect.y + 38}
            textAnchor="middle"
            fontSize={subSize}
            fill="#4E5E78"
            fontFamily="'JetBrains Mono Variable', monospace"
            letterSpacing="0.02em"
            {...fitText(rect.node.sub, subSize, avail, true)}
          >
            {rect.node.sub}
          </text>
        )}
      </g>
    );
  });
}

function renderEdges(
  layout: DiagramLayout,
  edges: DiagramEdge[],
  markerSuffix: "w" | "t",
) {
  return edges.map((edge) => {
    const from = layout.nodes.get(edge.from);
    const to = layout.nodes.get(edge.to);
    if (!from || !to) return null;

    const obstacles = [
      ...[...layout.nodes.values()]
        .filter((rect) => rect.node.id !== edge.from && rect.node.id !== edge.to)
        .map(({ x, y, w, h }) => ({ x, y, w, h })),
      ...layout.pills,
    ];
    const labelObstacles = [
      ...[...layout.nodes.values()].map(({ x, y, w, h }) => ({ x, y, w, h })),
      ...layout.pills,
    ];

    const straight = straightEdge(from, to);
    const pts = polylineHits(straight, obstacles)
      ? (routeEdge(from, to, obstacles, layout.width) ?? straight)
      : straight;

    const d = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");

    let labelPos: Rect | null = null;
    if (edge.label) {
      const pillW = edge.label.length * LABEL_W_CHAR + 12;
      const anchor = labelAnchor(pts);
      const pos = placeLabel(anchor, pillW, labelObstacles, layout.width, layout.height);
      labelPos = { x: pos.x, y: pos.y, w: pillW, h: LABEL_H };
    }

    const arrowId = edge.dashed
      ? `arch-arrow-dashed-${markerSuffix}`
      : `arch-arrow-${markerSuffix}`;

    return (
      <g key={`${edge.from}-${edge.to}`} data-phase="edge">
        <path
          d={d}
          fill="none"
          stroke={edge.dashed ? "#C4571F" : "rgba(22, 36, 61, 0.35)"}
          strokeWidth={1.5}
          strokeDasharray={edge.dashed ? "4 4" : undefined}
          markerEnd={`url(#${arrowId})`}
        />
        {labelPos && (
          <g data-phase="label">
            <rect
              x={labelPos.x}
              y={labelPos.y}
              width={labelPos.w}
              height={labelPos.h}
              rx={3}
              fill="#FAF6EC"
              stroke="rgba(22, 36, 61, 0.1)"
              strokeWidth={0.5}
            />
            <text
              x={labelPos.x + labelPos.w / 2}
              y={labelPos.y + 11}
              textAnchor="middle"
              fontSize={10}
              fontWeight={500}
              fill={edge.dashed ? "#C4571F" : "#4E5E78"}
              fontFamily="'JetBrains Mono Variable', monospace"
            >
              {edge.label}
            </text>
          </g>
        )}
      </g>
    );
  });
}

/** Shared SVG <defs> for arrowhead markers, keyed by suffix to avoid duplicate IDs. */
function DiagramMarkers({ suffix }: { suffix: "w" | "t" }) {
  return (
    <defs>
      <marker
        id={`arch-arrow-${suffix}`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(22, 36, 61, 0.6)" />
      </marker>
      <marker
        id={`arch-arrow-dashed-${suffix}`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C4571F" />
      </marker>
    </defs>
  );
}

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagram;
}

/**
 * Data-driven inline SVG system diagram (DESIGN_SYSTEM.md §10).
 * Phase 6 progressive construction — on entry the container fades in, then
 * layer regions, nodes, connectors (stroke draw-in), and finally edge labels,
 * in the conceptual order STRUCTURE → RELATIONSHIPS → INFORMATION. One-shot
 * ScrollTrigger; reduced-motion users see the static diagram; the reveal is
 * scoped per variant (wide / tall) via matchMedia so the hidden variant never
 * animates.
 */
export function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapperRef.current;
    if (!root || prefersReducedMotion()) return;

    const build = (svgSelector: string) => {
      const svg = root.querySelector<SVGSVGElement>(svgSelector);
      if (!svg) return;
      const layers = svg.querySelectorAll<SVGGElement>('[data-phase="layer"]');
      const nodes = svg.querySelectorAll<SVGGElement>('[data-phase="node"]');
      const edges = svg.querySelectorAll<SVGPathElement>('[data-phase="edge"] > path');
      const labels = svg.querySelectorAll<SVGGElement>('[data-phase="label"]');
      const edgeLengths = Array.from(edges, (path) => path.getTotalLength());

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: svg, start: "top 82%", once: true },
      });

      tl.fromTo(svg, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0)
        .fromTo(
          layers,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
          0.12,
        )
        .fromTo(
          nodes,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
          "-=0.25",
        )
        .fromTo(
          edges,
          {
            strokeDasharray: (i: number) => `${edgeLengths[i]} ${edgeLengths[i]}`,
            strokeDashoffset: (i: number) => edgeLengths[i],
          },
          { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut", stagger: 0.04 },
          "-=0.15",
        )
        .add(() => {
          edges.forEach((path) =>
            gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset" }),
          );
        }, "+=0.35")
        .fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.24, stagger: 0.04 }, "-=0.25")
        .add(() => {
          nodes.forEach((node) => gsap.set(node, { clearProps: "transform,opacity" }));
        }, "+=0.05");
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => build(".diagram-wide"));
    mm.add("(max-width: 767.98px)", () => build(".diagram-tall"));
    return () => mm.revert();
  }, []);

  const wide = layoutWide(diagram);
  const tall = layoutTall(diagram);

  // Stable, slug-friendly ID derived from the diagram title.
  const diagramId = diagram.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 40);
  const wideDescId = `arch-desc-w-${diagramId}`;
  const tallDescId = `arch-desc-t-${diagramId}`;

  return (
    <div ref={wrapperRef}>
      {/* ── Wide variant (≥768px) ───────────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${wide.width} ${wide.height}`}
        className="diagram-svg diagram-wide hidden md:block"
        role="img"
        aria-labelledby={wideDescId}
      >
        <title>{diagram.title}</title>
        <desc id={wideDescId}>{diagram.desc}</desc>
        <DiagramMarkers suffix="w" />
        {renderEdges(wide, diagram.edges, "w")}
        {renderLayerLabels(wide)}
        {renderNodes(wide, "wide")}
      </svg>

      {/* ── Tall variant (<768px) ───────────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${tall.width} ${tall.height}`}
        className="diagram-svg diagram-tall md:hidden"
        role="img"
        aria-labelledby={tallDescId}
      >
        <title>{diagram.title}</title>
        <desc id={tallDescId}>{diagram.desc}</desc>
        <DiagramMarkers suffix="t" />
        {renderEdges(tall, diagram.edges, "t")}
        {renderLayerLabels(tall)}
        {renderNodes(tall, "tall")}
      </svg>
    </div>
  );
}