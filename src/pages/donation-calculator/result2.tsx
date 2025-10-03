import laira_coin from "assets/laira/laira-coin.webp";
import { Image } from "components/image";
import { to_usd } from "helpers/to-usd";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { View } from "./types";
import { Usd } from "./usd";

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
          <p className=" font-semibold">{to_usd(y1.liq)}</p>
        </div>

        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray">
            Sustainability Fund Growth (20%):
          </p>
          <p className=" font-semibold">{to_usd(y1.lock)}</p>
        </div>
      </div>

      <div
        className={`${y1.total > 0 ? "bg-green-l5" : y1.total < 0 ? "bg-red-l5" : "bg-gray-l4"} p-4 @md:p-6 rounded-lg @md:flex items-center gap-4`}
      >
        {y1.total > 0 ? (
          <TrendingUp size={40} className="size-8 sm:size-10 text-green" />
        ) : y1.total < 0 ? (
          <TrendingDown size={40} className="size-8 sm:size-10 text-red" />
        ) : null}
        <div>
          <p className="sm:text-lg font-bold text-balance">
            Annual Savings & Investment Impact
          </p>
          <Usd classes="text-lg font-bold">{y1.total}</Usd>
        </div>
        {y1.total > 0 && (
          <Image
            src={laira_coin}
            width={70}
            className="@max-md:hidden ml-auto"
          />
        )}
      </div>
    </div>
  );
}
