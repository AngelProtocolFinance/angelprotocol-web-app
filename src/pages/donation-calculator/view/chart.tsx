import * as Slider from "@radix-ui/react-slider";
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
import { unmask } from "../dollar-mask"; // Add this import
import type { State } from "../types";
import { bgView, formatCurrency } from "./bg-view"; // Adjust the import path

interface Props extends State {
  classes?: string;
}

export function Chart({ classes = "", ...state }: Props) {
  const [projectionYears, setProjectionYears] = useState(5);

  // Calculate results using getBgAmount
  const v = bgView(state, projectionYears);

  // Simplified inputs for demonstration
  const inputs = {
    annualDonations: unmask(state.annualAmount),
    currentlySavesInvests: true,
  };

  // Function to calculate current investment growth
  const calculateCurrentInvestmentGrowth = (years: number): number => {
    const baseAmount = 5000;
    const growthRate = 0.02;
    return baseAmount * years * (1 + growthRate * years);
  };

  // Generate chart data based on projection years
  const generateChartData = () => {
    const baseData = [
      {
        year: "Year 1",
        annualDonations: inputs.annualDonations,
        currentSavings: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(1)
          : 0,
        donationSavings: v.feeSavings + v.additionalFromTypes,
        investmentGrowth: v.y1Growth.combined,
        total: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(1) +
            (v.feeSavings + v.additionalFromTypes) +
            v.y1Growth.combined
          : v.feeSavings + v.additionalFromTypes + v.y1Growth.combined,
      },
      {
        year: "Year 3",
        annualDonations: inputs.annualDonations,
        currentSavings: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(3)
          : 0,
        donationSavings: (v.feeSavings + v.additionalFromTypes) * 3,
        investmentGrowth: v.y3Growth.combined,
        total: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(3) +
            (v.feeSavings + v.additionalFromTypes) * 3 +
            v.y3Growth.combined
          : (v.feeSavings + v.additionalFromTypes) * 3 + v.y3Growth.combined,
      },
      {
        year: "Year 5",
        annualDonations: inputs.annualDonations,
        currentSavings: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(5)
          : 0,
        donationSavings: (v.feeSavings + v.additionalFromTypes) * 5,
        investmentGrowth: v.y5Growth.combined,
        total: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(5) +
            (v.feeSavings + v.additionalFromTypes) * 5 +
            v.y5Growth.combined
          : (v.feeSavings + v.additionalFromTypes) * 5 + v.y5Growth.combined,
      },
    ];

    if (projectionYears >= 10 && v.y10Growth) {
      baseData.push({
        year: "Year 10",
        annualDonations: inputs.annualDonations,
        currentSavings: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(10)
          : 0,
        donationSavings: (v.feeSavings + v.additionalFromTypes) * 10,
        investmentGrowth: v.y10Growth.combined,
        total: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(10) +
            (v.feeSavings + v.additionalFromTypes) * 10 +
            v.y10Growth.combined
          : (v.feeSavings + v.additionalFromTypes) * 10 + v.y10Growth.combined,
      });
    }

    if (projectionYears >= 15 && v.y15Growth) {
      baseData.push({
        year: "Year 15",
        annualDonations: inputs.annualDonations,
        currentSavings: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(15)
          : 0,
        donationSavings: (v.feeSavings + v.additionalFromTypes) * 15,
        investmentGrowth: v.y15Growth.combined,
        total: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(15) +
            (v.feeSavings + v.additionalFromTypes) * 15 +
            v.y15Growth.combined
          : (v.feeSavings + v.additionalFromTypes) * 15 + v.y15Growth.combined,
      });
    }

    if (projectionYears >= 20 && v.y20Growth) {
      baseData.push({
        year: "Year 20",
        annualDonations: inputs.annualDonations,
        currentSavings: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(20)
          : 0,
        donationSavings: (v.feeSavings + v.additionalFromTypes) * 20,
        investmentGrowth: v.y20Growth.combined,
        total: inputs.currentlySavesInvests
          ? calculateCurrentInvestmentGrowth(20) +
            (v.feeSavings + v.additionalFromTypes) * 20 +
            v.y20Growth.combined
          : (v.feeSavings + v.additionalFromTypes) * 20 + v.y20Growth.combined,
      });
    }

    return baseData;
  };

  return (
    <div className={`${classes} p-6 border border-gray-l3 rounded-lg bg-white`}>
      <h1 className="text-xl font-bold mb-4">Annual Impact Summary</h1>

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
          value={[projectionYears]}
          onValueChange={(value) => setProjectionYears(value[0])}
          max={20}
          min={5}
          step={5}
          aria-label="Years"
        >
          <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-l4">
            <Slider.Range className="absolute h-full bg-blue-d1" />
          </Slider.Track>
          <Slider.Thumb className="block size-4 rounded-full border-2 border-white bg-white shadow-md focus:outline-none focus-visible:ring focus-visible:ring-blue focus-visible:ring-opacity-75" />
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
          <AreaChart
            data={generateChartData()}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
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
                  annualDonations: "Annual Donations (Reference)",
                  currentSavings: "Current Investment Growth",
                  donationSavings: "Donation Processing Savings",
                  investmentGrowth: "Better Giving Investment Returns",
                  total: "Total Financial Advantage",
                };

                return [
                  formatCurrency(Number(value)),
                  labels[name] || String(name),
                ];
              }}
            />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Area
              type="monotone"
              dataKey="annualDonations"
              name="Annual Donations (Reference)"
              stroke="var(--color-gray-d1)"
              strokeDasharray="5 5"
              fill="none"
            />
            {inputs.currentlySavesInvests && (
              <Area
                type="monotone"
                dataKey="currentSavings"
                stackId="1"
                name="Current Investment Growth"
                fill="var(--color-gray-l1)"
                stroke="var(--color-gray-d1)"
              />
            )}
            <Area
              type="monotone"
              dataKey="donationSavings"
              stackId="1"
              name="Donation Processing Savings"
              fill="var(--color-green-l3)"
              stroke="var(--color-green-d1)"
            />
            <Area
              type="monotone"
              dataKey="investmentGrowth"
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
          This {projectionYears}-year projection demonstrates how Better
          Giving's integrated approach compounds over time. By Year{" "}
          {projectionYears}, your organization could accumulate significant
          additional funds through the combination of reduced processing fees,
          expanded donation types, and strategic investments.
        </p>
      </div>
    </div>
  );
}
