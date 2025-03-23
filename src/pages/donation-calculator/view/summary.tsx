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
    <div className={`${classes} p-6 border border-gray-l3 rounded-lg bg-white`}>
      <h2 className="text-xl font-bold mb-4">Annual Impact Summary</h2>

      <div className="mb-6">
        <p className="text-gray">Current Online Donations</p>
        <p className="text-xl font-bold">{toUsd(v.amount)}</p>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h2 className="text-xl font-bold mb-4">Donation Processing Impact</h2>

      <div className="grid grid-cols-2 bg-gray-l5 rounded-lg mb-6">
        <div className="p-5 border-r border-gray-l3">
          <p className="text-gray-500 mb-2">Current Amount Received</p>
          <p className="text-xl font-bold text-red">
            {toUsd(v.ogNet)}{" "}
            <span className="text-xl">(-{toUsd(v.ogFees)})</span>
          </p>
        </div>
        <div className="p-5">
          <p className="text-gray mb-2">With Better Giving</p>
          <p className="text-xl font-bold text-green">
            {toUsd(v.bgNet)}{" "}
            <span className="text-xl">(+{toUsd(v.diff)}) </span>
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Donation Processing Impact Details
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-d1">Fee Savings:</p>
          <p className="font-semibold">{toUsd(v.diff - v.ogMissed)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-d1">
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

        <div className="flex justify-between items-center text-green font-medium">
          <p className="">Subtotal - Processing Impact:</p>
          <p className=" font-semibold">{toUsd(v.diff)}</p>
        </div>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h2 className="text-xl font-bold mb-4">First-Year Investment Impact</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <p className=" text-gray-d1">Savings Account Growth (4%):</p>
          <p className=" font-semibold">{toUsd(y1.liq)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className=" text-gray-d1">Sustainability Fund Growth (20%):</p>
          <p className=" font-semibold">{toUsd(y1.lock)}</p>
        </div>

        <div className="flex justify-between items-center text-[#A020F0] font-medium">
          <p className="">Subtotal - Investment Impact:</p>
          <p className=" font-semibold">{toUsd(y1.total)}</p>
        </div>
      </div>

      <div className="bg-green-l5 p-6 rounded-lg flex items-center gap-4">
        <div className="text-green">
          <TrendingUp size={40} />
        </div>
        <div>
          <p className="text-xl font-bold uppercase">Total Annual Impact</p>
          <p className="text-lg font-bold text-green-d1">
            {toUsd(y1.total + v.diff)}
          </p>
        </div>
      </div>
    </div>
  );
}
