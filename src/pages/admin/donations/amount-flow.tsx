import type { Allocation } from "@better-giving/endowment";
import { humanize } from "helpers/decimal";
import {
  HandCoins,
  type LucideIcon,
  PiggyBankIcon,
  SproutIcon,
} from "lucide-react";

interface Props {
  total: number;
  font_size?: number; // Font size in pixels, defaults to 18
  allocation: Allocation;
}

interface Desc {
  Icon: LucideIcon;
  class: string;
  text: string;
}

type Acc = keyof Allocation;

type DescMap = { [acc in Acc]: Desc };
const desc_map: DescMap = {
  cash: { Icon: HandCoins, class: "shrink-0 stroke-gray-d1", text: "Grant" },
  liq: { Icon: PiggyBankIcon, class: "shrink-0 stroke-amber", text: "Savings" },
  lock: {
    Icon: SproutIcon,
    class: "shrink-0 stroke-green",
    text: "Investments",
  },
};

export function AmountFlow({ total, font_size = 14, allocation }: Props) {
  const branches = (Object.entries(allocation) as [Acc, number][])
    .filter(([, v]) => v > 0)
    .map(([k]) => ({
      ...desc_map[k],
      amount: total * (allocation[k] / 100),
    }));

  const base_spacing = 40;
  const spacing_multiplier = font_size / 18; // 18px is our base font size
  const branch_spacing = base_spacing * spacing_multiplier;
  const svg_height = Math.max(
    branches.length * branch_spacing,
    60 * spacing_multiplier
  );
  const icon_size = Math.max(16, font_size * 0.9); // Icon size scales with font

  // Calculate branch positions for consistent alignment between SVG and content
  const branch_positions = branches.map((_, index) => {
    const center_y = svg_height / 2;
    return branches.length === 1
      ? center_y
      : branch_spacing / 2 + index * branch_spacing;
  });

  return (
    <div className="flex items-center gap-2">
      {/* Curved Branching Arrow */}
      <div className="relative flex items-center">
        <svg
          width="100"
          height={svg_height}
          className="overflow-visible"
          viewBox={`0 0 100 ${svg_height}`}
        >
          {/* Main horizontal line */}
          <line
            x1="10"
            y1={svg_height / 2}
            x2="40"
            y2={svg_height / 2}
            stroke="var(--color-gray-l1)"
            strokeWidth="1"
          />

          {/* Curved branch lines with arrows */}
          {branch_positions.map((target_y, index) => {
            const center_y = svg_height / 2;
            const start_x = 40;
            const curve_end_x = 65; // End the curve here
            const end_x = 85; // Arrow pointer position

            // Create smooth S-curve using cubic Bézier, then add straight line
            const control1_x = start_x + 15;
            const control1_y = center_y;
            const control2_x = curve_end_x - 15;
            const control2_y = target_y;

            const path_data = `M ${start_x} ${center_y} C ${control1_x} ${control1_y} ${control2_x} ${control2_y} ${curve_end_x} ${target_y} L ${end_x} ${target_y}`;

            return (
              <g key={index}>
                {/* Smooth curved branch line with straight segment */}
                <path
                  d={path_data}
                  stroke="var(--color-gray-l1)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Arrow head */}
                <polygon
                  points={`${end_x},${target_y} ${end_x - 5},${target_y - 3} ${end_x - 5},${target_y + 3}`}
                  fill="var(--color-gray-l1)"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Branches content */}
      <div
        className="flex flex-col justify-between"
        style={{
          height: branches.length === 1 ? "auto" : `${svg_height}px`,
          paddingTop:
            branches.length === 1
              ? 0
              : `${svg_height / (branches.length * 2) - font_size / 2}px`,
          paddingBottom:
            branches.length === 1
              ? 0
              : `${svg_height / (branches.length * 2) - font_size / 2}px`,
        }}
      >
        {branches.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* Icon */}
            <item.Icon className={item.class} size={icon_size} />
            {/* Amount */}
            <div
              className="text-gray-l2 font-medium"
              style={{ fontSize: `${font_size}px` }}
            >
              ${humanize(item.amount)}
            </div>
            {/* Optional text */}
            {item.text && (
              <div
                className="text-gray"
                style={{ fontSize: `${font_size * 0.75}px` }}
              >
                - {item.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
