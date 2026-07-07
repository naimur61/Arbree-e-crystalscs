"use client";

interface Node {
  id: string;
  label: string;
  type: "supplier" | "service" | "function" | "outcome";
  color: string;
}

interface Link {
  source: string;
  target: string;
  critical?: boolean;
}

interface EcosystemGraphProps {
  nodes: Node[];
  links: Link[];
  activeTab: "suppliers" | "services" | "functions";
}

const VW = 1100;
const VH = 520;
const COL_X = { left: 150, middle: 550, right: 950 };
const NODE_HALF_W = 95;
const TOP_PAD = 70;
const BOTTOM_PAD = 70;

// Convert a hex color like #10b981 into an rgba string with given alpha
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getColumnPositions(ids: Node[], x: number) {
  const positions: Record<string, { x: number; y: number }> = {};
  const usable = VH - TOP_PAD - BOTTOM_PAD;
  ids.forEach((node, i) => {
    const y =
      ids.length > 1 ? TOP_PAD + (usable / (ids.length - 1)) * i : VH / 2;
    positions[node.id] = { x, y };
  });
  return positions;
}

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

export function EcosystemGraph({ nodes, links }: EcosystemGraphProps) {
  const leftNodes = nodes.filter((n) => n.type === "supplier");
  const middleNodes = nodes.filter(
    (n) => n.type === "service" || n.type === "function",
  );
  const rightNodes = nodes.filter((n) => n.type === "outcome");

  const positions: Record<string, { x: number; y: number }> = {
    ...getColumnPositions(leftNodes, COL_X.left),
    ...getColumnPositions(middleNodes, COL_X.middle),
    ...getColumnPositions(rightNodes, COL_X.right),
  };

  // Decorative faint background curves connecting every left node to every
  // right node, purely for the "connected web" texture seen in the design.
  const decorativeCurves: { d: string; key: string }[] = [];
  leftNodes.forEach((l) => {
    rightNodes.forEach((r) => {
      const p1 = positions[l.id];
      const p2 = positions[r.id];
      if (!p1 || !p2) return;
      decorativeCurves.push({
        key: `deco-${l.id}-${r.id}`,
        d: curvePath(p1.x + NODE_HALF_W, p1.y, p2.x - NODE_HALF_W, p2.y),
      });
    });
  });

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6 overflow-x-auto">
      <div className="relative" style={{ width: VW, height: VH, minWidth: VW }}>
        {/* Curves layer */}
        <svg
          className="absolute inset-0"
          width={VW}
          height={VH}
          viewBox={`0 0 ${VW} ${VH}`}
        >
          {/* Faint decorative background lines */}
          <g>
            {decorativeCurves.map((c) => (
              <path
                key={c.key}
                d={c.d}
                fill="none"
                stroke="#d1d5db"
                strokeWidth={1.5}
                strokeDasharray="5,6"
                opacity={0.4}
                style={{ transition: "d 0.5s ease" }}
              />
            ))}
          </g>

          {/* Real, colored connections for the active tab */}
          <g>
            {links.map((link, idx) => {
              const sourcePos = positions[link.source];
              const targetPos = positions[link.target];
              const sourceNode = nodes.find((n) => n.id === link.source);
              if (!sourcePos || !targetPos) return null;

              const d = curvePath(
                sourcePos.x + NODE_HALF_W,
                sourcePos.y,
                targetPos.x - NODE_HALF_W,
                targetPos.y,
              );

              return (
                <path
                  key={`link-${idx}`}
                  d={d}
                  fill="none"
                  stroke={
                    link.critical ? "#ef4444" : sourceNode?.color || "#9ca3af"
                  }
                  strokeWidth={link.critical ? 3 : 2.5}
                  opacity={link.critical ? 0.95 : 0.6}
                  style={{
                    transition:
                      "d 0.5s ease, stroke 0.4s ease, opacity 0.4s ease",
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Node pills layer */}
        <div className="absolute inset-0">
          {nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;

            return (
              <div
                key={node.id}
                className="absolute flex items-center gap-2 px-4 py-2.5 rounded-full shadow-sm whitespace-nowrap font-semibold text-sm"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                  width: NODE_HALF_W * 2,
                  justifyContent: "flex-start",
                  backgroundColor: hexToRgba(node.color, 0.12),
                  border: `1px solid ${hexToRgba(node.color, 0.35)}`,
                  color: node.color,
                  transition:
                    "left 0.5s ease, top 0.5s ease, background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease",
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: node.color,
                    transition: "background-color 0.4s ease",
                  }}
                />
                <span className="truncate">{node.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
