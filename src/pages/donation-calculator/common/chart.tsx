import { toUsd } from "helpers/to-usd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Point {
  year: string;
  amount: number;
  liq: number;
  savings: number;
  lock: number;
  total: number;
}
interface Props {
  tools?: boolean;
  points: Point[];
}
export function Chart({ points, tools = true }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={points}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} dy={4} />
        <YAxis
          dx={4}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            if (value >= 1000000) {
              return `$${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
              return `$${(value / 1000).toFixed(0)}K`;
            }
            return `$${value}`;
          }}
        />
        {tools && (
          <Tooltip
            wrapperStyle={{ fontSize: 13 }}
            formatter={(value: any, name: any) => {
              const labels: Record<string, string> = {
                liq: "Savings Returns",
                savings: "Donation Processing Savings",
                lock: "Investment Returns",
                total: "Total Financial Advantage",
              };

              return [toUsd(Number(value)), labels[name] || String(name)];
            }}
          />
        )}
        {tools && (
          <Legend
            iconSize={10}
            iconType="circle"
            wrapperStyle={{ fontSize: 13 }}
          />
        )}

        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="savings"
          stackId="1"
          name="Donation Processing Savings"
          fill="#a7f3d0"
          stroke="#059669"
        />
        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="liq"
          stackId="1"
          name="Savings Returns"
          fill="#fbbf24"
          stroke="#f59e0b"
        />
        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="lock"
          stackId="1"
          name="Investment Returns"
          fill="#54a5dc"
          stroke="#2d89c8"
        />
        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="total"
          name="Total Financial Advantage"
          strokeWidth={2}
          stroke="#1e6dab"
          fill="none"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
