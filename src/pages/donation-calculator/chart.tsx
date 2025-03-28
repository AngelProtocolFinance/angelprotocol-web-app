import * as Slider from "@radix-ui/react-slider";
import { toUsd } from "helpers/to-usd";
import { Info } from "lucide-react";
import { useState } from "react";
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
import type { View } from "./bg-view"; // Adjust the import path

interface Props extends View {
  classes?: string;
}

export function Chart({ classes = "", ...v }: Props) {
  const [yrs, setYears] = useState(5);

  // Generate chart data based on projection years

  const data = v.projection.slice(0, yrs).map((x, i) => {
    const y = i + 1;
    return {
      year: `Year ${y}`,
      amount: v.amount,
      liq: x.liq,
      savings: v.advantage * y,
      lock: x.lock,
      total: v.advantage * y + x.total,
    };
  });

  return (
    <div className={`${classes} p-6 rounded-lg bg-white`}>
      <h1 className="text-lg sm:text-xl font-bold mb-4 text-blue-d1">
        5-Year Financial Advantage
      </h1>

      <p className="text-sm text-gray-d1 mb-4">
        This chart shows the financial advantage of Better Giving over time.
        Adjust the slider to see shorter or longer-term projections and their
        impact on your organization's finances.
      </p>

      <div className="mb-8 px-2">
        <div className="flex justify-between mb-2 text-sm text-gray-d2">
          <span>Short-term (more detail)</span>
          <span>Long-term (exponential growth)</span>
        </div>

        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={[yrs]}
          onValueChange={([x]) => setYears(x)}
          max={20}
          min={5}
          step={5}
          aria-label="Years"
        >
          <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-l4">
            <Slider.Range className="absolute h-full bg-blue-d1" />
          </Slider.Track>
          <Slider.Thumb className="block size-4 rounded-full border-2 border-blue bg-white shadow-md focus:outline-none focus-visible:ring focus-visible:ring-blue focus-visible:ring-opacity-75" />
        </Slider.Root>

        <div className="flex justify-between mt-1 text-sm text-gray-d1">
          <span>5 years</span>
          <span>10 years</span>
          <span>15 years</span>
          <span>20 years</span>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <Tooltip
              wrapperStyle={{ fontSize: 13 }}
              formatter={(value: any, name: any) => {
                const labels: Record<string, string> = {
                  amount: "Annual Donations (Reference)",
                  liq: "Current Investment Growth",
                  savings: "Donation Processing Savings",
                  lock: "Better Giving Investment Returns",
                  total: "Total Financial Advantage",
                };

                return [toUsd(Number(value)), labels[name] || String(name)];
              }}
            />
            <Legend
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ fontSize: 13 }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              name="Annual Donations (Reference)"
              stroke="var(--color-amber-d1)"
              strokeDasharray="5 5"
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="liq"
              stackId="1"
              name="Current Investment Growth"
              fill="var(--color-gray-l1)"
              stroke="var(--color-gray)"
            />
            <Area
              type="monotone"
              dataKey="savings"
              stackId="1"
              name="Donation Processing Savings"
              fill="var(--color-green-l3)"
              stroke="var(--color-green-d1)"
            />
            <Area
              type="monotone"
              dataKey="lock"
              stackId="1"
              name="Better Giving Investment Returns"
              fill="var(--color-blue-l3)"
              stroke="var(--color-blue-d1)"
            />
            <Area
              type="monotone"
              dataKey="total"
              name="Total Financial Advantage"
              strokeWidth={2}
              stroke="var(--color-blue-l1)"
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-d1 flex items-center">
        <Info width={16} className="shrink-0 mr-2 text-amber" />
        <span>
          Investment yields based on average annual returns over past 5 years
          (4% for Savings Account, 20% for Sustainability Fund)
        </span>
      </div>

      <div className="mt-4 p-4 bg-blue-l5 rounded-lg">
        <h3 className="font-medium text-blue-d3 mb-2">
          The Power of Compound Growth
        </h3>
        <p className="text-sm text-blue-d2">
          This {yrs}-year projection demonstrates how Better Giving's integrated
          approach compounds over time. By Year {yrs}, your organization could
          accumulate significant additional funds through the combination of
          reduced processing fees, expanded donation types, and strategic
          investments.
        </p>
      </div>
    </div>
  );
}
