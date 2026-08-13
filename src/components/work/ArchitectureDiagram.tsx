import { useEffect, useRef } from "react";
import gsap from "gsap";
import type {
  ArchitectureDiagram,
  DiagramEdge,
  DiagramNode,
} from "../../content/types";
import { prefersReducedMotion } from "../../lib/motion";

const NODE_W = 180;
const NODE_H = 48;
const PAD_X = 40;
const LAYER_GAP = 100;
const START_Y = 32;

// Tall-variant layout constants (430px viewBox width)
const TALL_VB_W = 430;
const TALL_NODE_W = 140;
const TALL_NODE_H = 50;
const TALL_PAD_X = 28;
const TALL_ROW_GAP = 108;
const TALL_NODE_V_GAP = 14;  // vertical gap between sibling nodes within a layer (for layers with >3 nodes that must wrap)
const TALL_START_Y = 30;

interface NodeRect {
  node: DiagramNode;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DiagramLayout {
  width: number;
  height: number;
  layers: { label: string; y: number }[];
  nodes: Map<string, NodeRect>;
}

function nodeXs(count: number, totalWidth: number, nodeW: number, padX: number): number[] {
  if (count <= 1) return [(totalWidth - nodeW) / 2];
  const usable = totalWidth - padX * 2 - nodeW;
  return Array.from(
    { length: count },
    (_, i) => padX + (i * usable) / (count - 1),
  );
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
  return { width, height, layers, nodes };
}

/**
 * Multi-column tall layout: each layer places its nodes side-by-side
 * horizontally (up to 3 per row) within the 430px viewBox, mirroring the
 * wide layout strategy but for a narrow viewport. This ensures fan-out
 * edges (e.g. auth → admin/teacher/student) are visually distinct.
 */
function layoutTall(diagram: ArchitectureDiagram): DiagramLayout {
  const nodes = new Map<string, NodeRect>();
  const layers: { label: string; y: number }[] = [];
  let y = TALL_START_Y;

  for (const layer of diagram.layers) {
    layers.push({ label: layer.label, y });

    // Split layer nodes into rows of ≤3 so they always fit horizontally.
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

    // Advance y past this layer's rows.
    y += 36 + rowCount * TALL_NODE_H + (rowCount - 1) * TALL_NODE_V_GAP + 28;
  }

  const height = Math.max(400, y + TALL_ROW_GAP - 72);
  return { width: TALL_VB_W, height, layers, nodes };
}

function nodeCenter(rect: NodeRect): { x: number; y: number } {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

function renderLayerLabels(layout: DiagramLayout) {
  return layout.layers.map((layer) => (
    <g key={layer.label} data-phase="layer">
      <line
        x1={PAD_X}
        y1={layer.y + 24}
        x2={layout.width - PAD_X}
        y2={layer.y + 24}
        stroke="rgba(22, 36, 61, 0.08)"
        strokeWidth={1}
      />
      <rect
        x={PAD_X - 4}
        y={layer.y + 10}
        width={layer.label.length * 7.5 + 16}
        height={18}
        fill="#FAF6EC"
      />
      <text
        x={PAD_X}
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

function renderNodes(layout: DiagramLayout, variant: "wide" | "tall") {
  const labelSize = variant === "tall" ? 13 : 14;
  const subSize   = variant === "tall" ? 10 : 11;

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
  variant: "wide" | "tall",
  markerSuffix: "w" | "t",
) {
  return edges.map((edge) => {
    const from = layout.nodes.get(edge.from);
    const to = layout.nodes.get(edge.to);
    if (!from || !to) return null;
    const source = nodeCenter(from);
    const target = nodeCenter(to);
    let sx: number;
    let sy: number;
    let tx: number;
    let ty: number;

    if (from.y === to.y) {
      sx = from.x + (source.x < target.x ? from.w : 0);
      sy = source.y;
      tx = to.x + (source.x < target.x ? 0 : to.w);
      ty = target.y;
    } else if (from.y + from.h <= to.y) {
      sx = source.x;
      sy = from.y + from.h;
      tx = target.x;
      ty = to.y;
    } else {
      sx = source.x;
      sy = from.y;
      tx = target.x;
      ty = to.y + to.h;
    }

    const mx = (sx + tx) / 2;
    const my = (sy + ty) / 2;

    // Clamp label Y so the pill stays outside both source and target node rects.
    const rawLabelY = my - 9;
    const minY = sy + 6;
    const maxY = ty - 22;
    const labelY = Math.min(Math.max(rawLabelY, minY), Math.max(minY, maxY));

    let labelX: number;
    let labelAnchor: "middle" | "start" = "middle";
    let labelBgX = mx;
    let labelBgW = edge.label ? edge.label.length * 7 + 12 : 0;

    if (variant === "tall") {
      labelAnchor = "start";
      labelX = Math.max(mx + 18, 230);
      labelBgX = labelX - 4;
    } else {
      labelX = mx;
      labelBgX = mx - labelBgW / 2;
    }

    const arrowId = edge.dashed
      ? `arch-arrow-dashed-${markerSuffix}`
      : `arch-arrow-${markerSuffix}`;

    return (
      <g key={`${edge.from}-${edge.to}`} data-phase="edge">
        <line
          x1={sx}
          y1={sy}
          x2={tx}
          y2={ty}
          stroke={edge.dashed ? "#C4571F" : "rgba(22, 36, 61, 0.35)"}
          strokeWidth={1.5}
          strokeDasharray={edge.dashed ? "4 4" : undefined}
          markerEnd={`url(#${arrowId})`}
        />
        {edge.label && (
          <g data-phase="label">
            <rect
              x={labelBgX}
              y={labelY}
              width={labelBgW}
              height={16}
              rx={3}
              fill="#FAF6EC"
              stroke="rgba(22, 36, 61, 0.1)"
              strokeWidth={0.5}
            />
            <text
              x={labelX + (variant === "tall" ? labelBgW / 2 - 4 : 0)}
              y={labelY + 11}
              textAnchor={labelAnchor}
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
      const edges = svg.querySelectorAll<SVGLineElement>('[data-phase="edge"] > line');
      const labels = svg.querySelectorAll<SVGGElement>('[data-phase="label"]');
      const edgeLengths = Array.from(edges, (line) => line.getTotalLength());

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
          edges.forEach((line) =>
            gsap.set(line, { clearProps: "strokeDasharray,strokeDashoffset" }),
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
        {renderEdges(wide, diagram.edges, "wide", "w")}
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
        {renderEdges(tall, diagram.edges, "tall", "t")}
        {renderLayerLabels(tall)}
        {renderNodes(tall, "tall")}
      </svg>
    </div>
  );
}
