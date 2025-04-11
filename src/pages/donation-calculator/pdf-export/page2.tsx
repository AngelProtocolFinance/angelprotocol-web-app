import { Info } from "lucide-react";
import { Splits } from "../chart/splits";
import { Chart } from "../common/chart";

import type { View } from "../types";

const views = [
  {
    key: 5,
    label: "Short-Term Impact (5-Year View)",
  },
  {
    key: 10,
    label: "Momentum Building (10-Year View)",
  },
  {
    key: 15,
    label: "Strategic Growth Horizon (15-Year View)",
  },
  {
    key: 20,
    label: "Long-Term Transformation (20-Year View)",
  },
];

export function Page2({ v }: { v: View }) {
  return (
    <div className="w-full pt-8">
      <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
        <h2 className="text-blue text-2xl font-semibold uppercase">
          Total 5 - 10 - 15 - 20 years financial advantage
        </h2>
        <div className="h-0.5 bg-blue" />
        <p className="text-blue text-2xl font-semibold uppercase">
          (Estimated Predictions)
        </p>
      </div>
      <p className="text-xl px-6 font-bold text-gray-d1 mt-4">
        Compound Growth = Exponential Impact
      </p>
      <div className="grid grid-cols-2 px-8 gap-16 mt-8">
        {views.map((view) => {
          const data = v.projection.slice(0, view.key).map((x, i) => {
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
            <div key={view.key}>
              <div className="mb-4 flex items-center gap-x-2 rounded-l-full p-2 bg-blue-l4">
                <div className="size-4 p-4 relative text-sm rounded-full bg-blue text-white font-heading font-bold">
                  <span className="absolute absolute-center">{view.key}</span>
                </div>
                <span>{view.label}</span>
              </div>
              <Splits
                classes="justify-self-end"
                notGranted={v.notGranted}
                savings={v.savings}
                savingsRate={v.savingsRate}
                invested={v.invested}
                investedRate={v.investedRate}
              />
              <div className="h-80 w-full">
                <Chart points={data} tools={false} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-8 flex justify-center gap-x-8 mt-6">
        <p className="flex gap-x-1 items-center">
          <span className="block size-3 rounded-full bg-green-l4 border border-green"></span>
          <span className="text-green">Donation Processing Savings</span>
        </p>
        <p className="flex gap-x-1 items-center">
          <span className="block size-3 rounded-full bg-amber-l1 border border-amber"></span>
          <span className="text-amber-l1">Savings Returns</span>
        </p>
        <p className="flex gap-x-1 items-center">
          <span className="block size-3 rounded-full bg-blue-l1 border border-blue"></span>
          <span className="text-blue-l1">Investment Returns</span>
        </p>
        <p className="flex gap-x-1 items-center">
          <span className="block size-3 rounded-full bg-blue"></span>
          <span className="text-blue">Total Financial Advantage</span>
        </p>
      </div>
      <div className="mt-6 text-gray-d1 flex items-center px-8">
        <Info width={16} className="shrink-0 mr-2 text-amber" />
        <span>
          Investment yields based on average annual returns over past 5 years
          (4% for Savings Account, 20% for Sustainability Fund)
        </span>
      </div>

      <div className="px-8">
        <div className="mt-4 p-4 bg-blue-l5 rounded-lg">
          <h3 className="text-lg font-medium text-blue-d3 mb-2">
            The Power of Compound Growth
          </h3>
          <p className="text-blue-d2">
            These projections demonstrates how Better Giving's integrated
            approach compounds over time. our organization could accumulate
            significant additional funds through the combination of reduced
            processing fees, expanded donation types, and strategic investments.
          </p>
        </div>
      </div>
    </div>
  );
}
