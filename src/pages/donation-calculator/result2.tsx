import { toUsd } from "helpers/to-usd";
import { TrendingUp } from "lucide-react";
import type { View } from "./bg-view";

interface Props extends View {
  classes?: string;
}

export function Result2({ classes = "", ...v }: Props) {
  const y1 = v.projection[0];
  return (
    <div className={`${classes} @container p-6`}>
      <h3 className="text-lg sm:text-xl font-bold mb-4">
        First-Year Investment Impact
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray">
            Savings Account Growth (4%):
          </p>
          <p className=" font-semibold">{toUsd(y1.liq)}</p>
        </div>

        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray">
            Sustainability Fund Growth (20%):
          </p>
          <p className=" font-semibold">{toUsd(y1.lock)}</p>
        </div>

        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center text-[#A020F0] font-medium">
          <p className="max-sm:text-sm">Subtotal - Investment Impact:</p>
          <p className=" font-semibold">{toUsd(y1.total)}</p>
        </div>
      </div>

      <div className="bg-green-l5 p-4 @md:p-6 rounded-lg @md:flex items-center gap-4">
        <div className="text-green">
          <TrendingUp size={40} className="size-8 sm:size-10" />
        </div>
        <div>
          <p className="sm:text-xl font-bold uppercase">Total Annual Impact</p>
          <p className="text-lg font-bold text-green-d1">{toUsd(y1.total)}</p>
        </div>
      </div>
    </div>
  );
}
