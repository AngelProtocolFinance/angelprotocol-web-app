import * as Slider from "@radix-ui/react-slider";
import { Info } from "lucide-react";
import { useState } from "react";

import { APP_NAME } from "constants/env";
import { Chart as ChartComponent } from "../common/chart";
import type { View } from "../types"; // Adjust the import path
import { Splits } from "./splits";

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
    <div
      className={`${classes} p-6 rounded-lg grid content-start bg-white @container`}
    >
      <h1 className="text-lg sm:text-xl font-bold mb-4 text-blue-d1">
        {yrs}-Year Financial Advantage
      </h1>

      <p className="text-sm text-gray-d1 mb-4">
        This chart shows the financial advantage of {APP_NAME} over time. Adjust
        the slider to see shorter or longer-term projections and their impact on
        your organization's finances.
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
      <Splits
        classes="justify-self-end"
        notGranted={v.notGranted}
        savings={v.savings}
        savingsRate={v.savingsRate}
        invested={v.invested}
        investedRate={v.investedRate}
      />
      <div className="h-96 w-full">
        <ChartComponent points={data} />
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
          This {yrs}-year projection demonstrates how {APP_NAME}'s integrated
          approach compounds over time. By Year {yrs}, your organization could
          accumulate significant additional funds through the combination of
          reduced processing fees, expanded donation types, and strategic
          investments.
        </p>
      </div>
    </div>
  );
}
