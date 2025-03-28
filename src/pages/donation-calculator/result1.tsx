import { laira } from "assets/laira/laira";
import Image from "components/image";
import { Arrow, Content, Tooltip } from "components/tooltip";
import { toUsd } from "helpers/to-usd";
import { CircleHelpIcon, TrendingDown, TrendingUp } from "lucide-react";
import type { View } from "./bg-view";
import { Usd } from "./usd";

interface Props extends View {
  classes?: string;
}

export function Result1({ classes = "", ...v }: Props) {
  return (
    <div className={`${classes} @container p-6`}>
      <h3 className="text-lg sm:text-xl font-bold mb-4">
        Annual Impact Summary
      </h3>

      <div className="mb-6">
        <p className="text-gray">Current Online Donations</p>
        <p className="text-lg sm:text-xl font-bold">{toUsd(v.amount)}</p>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h3 className="text-lg sm:text-xl font-bold mb-4">
        Donation Processing Impact
      </h3>

      <div className="grid @md:grid-cols-2 @md:bg-gray-l5 rounded-lg mb-6 divide-gray-l3 divide-y @md:divide-x @md:divide-y-0">
        <div className="@md:p-5 pb-2">
          <p className="max-sm:text-sm text-gray mb-2">
            Current Amount Received
          </p>
          <p className="text-lg sm:text-xl font-bold">
            <Usd relative={v.amount}>{v.ogNet}</Usd>{" "}
            <Usd parens classes="text-lg sm:text-xl">
              {-v.ogDeductions}
            </Usd>
          </p>
        </div>
        <div className="@md:p-5 pt-2">
          <p className="max-sm:text-sm text-gray mb-2">With Better Giving</p>
          <p className="text-lg sm:text-xl font-bold">
            <Usd relative={v.ogNet}>{v.bgNet}</Usd>{" "}
            <Usd sign parens classes="text-lg sm:text-xl">
              {v.advantage}
            </Usd>
          </p>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-4 text-balance">
        Donation Processing Impact Details
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray-d1">Fee Savings:</p>
          <Usd sign classes="font-semibold">
            {v.feeSavings}
          </Usd>
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
                  Better Giving enables all these payment methods. This assumes
                  that 50% of donors will choose not to donate if their
                  preferred payment type is unavailable
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

          <Usd sign classes="font-semibold">
            {v.ogMissedFromDonTypes}
          </Usd>
        </div>
        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray-d1">Subscription cost</p>
          <Usd sign classes="font-semibold">
            {v.ogSubsCost}
          </Usd>
        </div>
        <div className="flex gap-x-4 @max-md:flex-col justify-between @md:items-center">
          <p className="max-sm:text-sm text-gray-d1">
            Donor can cover processing fees
          </p>
          <Usd sign classes="font-semibold">
            {v.ogMissedFromDonorCoverage}
          </Usd>
        </div>
      </div>

      <div
        className={`${v.advantage > 0 ? "bg-green-l5" : v.advantage < 0 ? "bg-red-l5" : "bg-gray-l4"} p-4 @md:p-6 rounded-lg @md:flex items-center gap-4`}
      >
        {v.advantage > 0 ? (
          <TrendingUp size={40} className="size-8 sm:size-10 text-green" />
        ) : v.advantage < 0 ? (
          <TrendingDown size={40} className="size-8 sm:size-10 text-red" />
        ) : null}
        <div>
          <p className="sm:text-xl font-bold uppercase">Total Annual Impact</p>
          <Usd classes="text-lg font-bold">{v.advantage}</Usd>
        </div>
        {v.advantage > 0 && (
          <Image
            src={laira.coin}
            width={70}
            className="@max-md:hidden ml-auto"
          />
        )}
      </div>
    </div>
  );
}
