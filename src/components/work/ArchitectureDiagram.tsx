import type {
  ArchitectureDiagram,
  DiagramEdge,
  DiagramNode,
} from "../../content/types";

const NODE_W = 170;
const NODE_H = 44;
const PAD_X = 40;

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

function nodeXs(count: number, totalWidth: number): number[] {
  if (count <= 1) return [(totalWidth - NODE_W) / 2];
  const usable = totalWidth - PAD_X * 2 - NODE_W;
  return Array.from(
    { length: count },
    (_, i) => PAD_X + (i * usable) / (count - 1),
  );
}

function layoutWide(diagram: ArchitectureDiagram): DiagramLayout {
  const width = 960;
  const height = 640;
  const bandH = 96;
  const startY = 28;
  const nodes = new Map<string, NodeRect>();
  const layers = diagram.layers.map((layer, i) => {
    const y = startY + i * bandH;
    const xs = nodeXs(layer.nodes.length, width);
    layer.nodes.forEach((node, j) => {
      nodes.set(node.id, { node, x: xs[j], y: y + 40, w: NODE_W, h: NODE_H });
    });
    return { label: layer.label, y };
  });
  return { width, height, layers, nodes };
}

function layoutTall(diagram: ArchitectureDiagram): DiagramLayout {
  const width = 420;
  const height = 1060;
  const nodeW = 380;
  const nodeH = 44;
  const gap = 14;
  const padTop = 24;
  const layers: { label: string; y: number }[] = [];
  const nodes = new Map<string, NodeRect>();
  let y = padTop;
  for (const layer of diagram.layers) {
    layers.push({ label: layer.label, y });
    const x = (width - nodeW) / 2;
    layer.nodes.forEach((node, j) => {
      nodes.set(node.id, {
        node,
        x,
        y: y + 36 + j * (nodeH + gap),
        w: nodeW,
        h: nodeH,
      });
    });
    y += 36 + layer.nodes.length * nodeH + (layer.nodes.length - 1) * gap + 24;
  }
  return { width, height, layers, nodes };
}

function nodeCenter(rect: NodeRect): { x: number; y: number } {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

function renderLayerLabels(layout: DiagramLayout) {
  return layout.layers.map((layer) => (
    <text
      key={layer.label}
      x={PAD_X}
      y={layer.y + 18}
      fontSize={11}
      letterSpacing="0.1em"
      fill="#4E5E78"
      fontFamily="'JetBrains Mono Variable', monospace"
    >
      {layer.label}
    </text>
  ));
}

function renderNodes(layout: DiagramLayout) {
  return [...layout.nodes.values()].map((rect) => {
    const center = nodeCenter(rect);
    return (
      <g key={rect.node.id}>
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx={4}
          fill={rect.node.accent ? "#F1EBE0" : "#FAF6EC"}
          stroke={rect.node.accent ? "#C4571F" : "rgba(22, 36, 61, 0.24)"}
          strokeWidth={rect.node.accent ? 1.5 : 1}
        />
        <text
          x={center.x}
          y={rect.y + 22}
          textAnchor="middle"
          fontSize={15}
          fontWeight={500}
          fill="#16243D"
          fontFamily="'Space Grotesk Variable', sans-serif"
        >
          {rect.node.label}
        </text>
        {rect.node.sub && (
          <text
            x={center.x}
            y={rect.y + 36}
            textAnchor="middle"
            fontSize={11}
            fill="#4E5E78"
            fontFamily="'JetBrains Mono Variable', monospace"
            letterSpacing="0.04em"
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
    const my = (sy + ty) / 2 - 8;
    return (
      <g key={`${edge.from}-${edge.to}`}>
        <line
          x1={sx}
          y1={sy}
          x2={tx}
          y2={ty}
          stroke="rgba(22, 36, 61, 0.28)"
          strokeWidth={1.5}
          strokeDasharray={edge.dashed ? "4 4" : undefined}
        />
        {edge.label && (
          <text
            x={variant === "tall" ? Math.max(mx + 18, 224) : mx}
            y={my + 4}
            textAnchor={variant === "tall" ? "start" : "middle"}
            fontSize={11}
            fill="#4E5E78"
            fontFamily="'JetBrains Mono Variable', monospace"
          >
            {edge.label}
          </text>
        )}
      </g>
    );
  });
}

interface ArchitectureDiagramProps {
  diagram: ArchitectureDiagram;
}

/** Data-driven inline SVG system diagram (DESIGN_SYSTEM.md §10). */
export function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  const wide = layoutWide(diagram);
  const tall = layoutTall(diagram);
  const descId = `arch-desc-${diagram.title.length}`;
  return (
    <>
      <svg
        viewBox={`0 0 ${wide.width} ${wide.height}`}
        className="diagram-svg hidden md:block"
        role="img"
        aria-labelledby={descId}
      >
        <title>{diagram.title}</title>
        <desc id={descId}>{diagram.desc}</desc>
        {renderEdges(wide, diagram.edges, "wide")}
        {renderLayerLabels(wide)}
        {renderNodes(wide)}
      </svg>
      <svg
        viewBox={`0 0 ${tall.width} ${tall.height}`}
        className="diagram-svg md:hidden"
        aria-hidden="true"
      >
        {renderEdges(tall, diagram.edges, "tall")}
        {renderLayerLabels(tall)}
        {renderNodes(tall)}
      </svg>
    </>
  );
}
