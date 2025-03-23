import { Arrow, Content, Tooltip } from "components/tooltip";
import { toUsd } from "helpers/to-usd";
import { CircleHelpIcon, TrendingUp } from "lucide-react";
import type { View } from "./bg-view";

interface Props extends View {
  classes?: string;
}

export function Summary({ classes = "", ...v }: Props) {
  const y1 = v.projection[0];
  return (
    <div className={`${classes} p-6 shadow-sm rounded-lg bg-white @container`}>
      <h2 className="text-lg sm:text-xl font-bold mb-4">
        Annual Impact Summary
      </h2>

      <div className="mb-6">
        <p className="text-gray">Current Online Donations</p>
        <p className="text-lg sm:text-xl font-bold">{toUsd(v.amount)}</p>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h2 className="text-lg sm:text-xl font-bold mb-4">
        Donation Processing Impact
      </h2>

      <div className="grid @md:grid-cols-2 @md:bg-gray-l5 rounded-lg mb-6 divide-gray-l3 divide-y @md:divide-x @md:divide-y-0">
        <div className="@md:p-5 pb-2">
          <p className="max-sm:text-sm text-gray mb-2">
            Current Amount Received
          </p>
          <p className="text-lg sm:text-xl font-bold text-red">
            {toUsd(v.ogNet)}{" "}
            <span className="text-lg sm:text-xl">(-{toUsd(v.ogFees)})</span>
          </p>
        </div>
        <div className="@md:p-5 pt-2">
          <p className="max-sm:text-sm text-gray mb-2">With Better Giving</p>
          <p className="text-lg sm:text-xl font-bold text-green">
            {toUsd(v.bgNet)}{" "}
            <span className="text-lg sm:text-xl">(+{toUsd(v.diff)}) </span>
          </p>
        </div>
      </div>

      <h2 className="text-lg sm:text-xl font-bold mb-4 text-balance">
        Donation Processing Impact Details
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray-d1">Fee Savings:</p>
          <p className="font-semibold">{toUsd(v.diff - v.ogMissed)}</p>
        </div>

        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray-d1 text-balance">
            Additional donations from expanded payment types:
            <Tooltip
              tip={
                <Content className="max-w-xs text-center bg-gray-d4 p-4 text-gray-l4 text-xs shadow-lg rounded-lg">
                  Based on industry data, each payment type represents a portion
                  of potential donations: Credit Card (63%), Bank/ACH (10%),
                  Digital Wallets (7%), DAF (12%), Stocks (6%), Crypto (2%).
                  Better Giving enables all these payment methods.
                  <Arrow />
                </Content>
              }
            >
              <CircleHelpIcon
                size={14}
                className="relative inline bottom-px ml-1"
              />
            </Tooltip>
          </p>

          <p className="font-semibold">{toUsd(v.ogMissed)}</p>
        </div>

        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center text-green font-medium">
          <p className="max-sm:text-sm">Subtotal - Processing Impact:</p>
          <p className=" font-semibold">{toUsd(v.diff)}</p>
        </div>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h2 className="text-lg sm:text-xl font-bold mb-4">
        First-Year Investment Impact
      </h2>

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
          <p className="max-sm:text-sm text-gray">
            Subtotal - Investment Impact:
          </p>
          <p className=" font-semibold">{toUsd(y1.total)}</p>
        </div>
      </div>

      <div className="bg-green-l5 p-4 @md:p-6 rounded-lg @md:flex items-center gap-4">
        <div className="text-green">
          <TrendingUp size={40} className="size-8 sm:size-10" />
        </div>
        <div>
          <p className="sm:text-xl font-bold uppercase">Total Annual Impact</p>
          <p className="text-lg font-bold text-green-d1">
            {toUsd(y1.total + v.diff)}
          </p>
        </div>
      </div>
    </div>
  );
}
