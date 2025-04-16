import bg from "assets/images/bettergiving-logo-white.svg";
import Image from "components/image";
import { format } from "date-fns";
import { toUsd } from "helpers/to-usd";
import { methodsArr } from "types/donation-calculator";
import type { View } from "../../types";
import { Usd } from "../../usd";
import { DonationMethods } from "./donation-methods";
import { ImpactCard } from "./impact-card";

export const methods: { [id: string]: string } = {
  "credit-card": "Credit Card",
  ach: "ACH (Bank Transfer)",
  "digital-wallets": "Digital Wallets",
  crypto: "Crypto",
  stocks: "Stocks",
  daf: "DAF",
};

interface Props {
  v: View;
}
export function Page1({ v }: Props) {
  return (
    <div className="w-full">
      <div className="bg-blue p-6">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div>
            <h1 className="text-white text-4xl font-bold">
              YOUR NONPROFIT'S FINANCIAL
              <br />
              ADVANTAGE WITH BETTER GIVING
            </h1>
            <p className="text-white text-lg mt-2">
              Donation Processing & Investment Impact Calculator
            </p>
            <p className="text-white">
              Generated on {format(new Date(), "PP")}
            </p>
          </div>
          <Image
            src={bg}
            alt="Better Giving Logo"
            width={280}
            height={95.8}
            className="object-contain self-start relative top-4"
          />
        </div>
      </div>

      <section className="mt-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-2xl font-semibold">
            YOUR CURRENT ONLINE DONATIONS
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>

        <div className="grid grid-cols-2 content-start gap-x-4 px-8 mt-6">
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Annual Online Donations</span>
            <span className="font-semibold">{toUsd(v.amount)}</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Avg. Processing Fees</span>
            <span className="font-semibold">
              {(v.ogProcessingFeeRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Platform Fees</span>
            <span className="font-semibold">
              {(v.ogPlatformFeeRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Annual Platform Subscription</span>
            <span className="font-semibold">{toUsd(v.ogSubsCost)}</span>
          </div>
          <div className="col-span-full flex items-center gap-x-4 font-heading text-lg">
            <span className="text-gray-d1 mr-8">Accepted Donation Types</span>
            <DonationMethods activeMethods={v.ogDonMethods} />
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4 font-heading">
          <p className="text-gray-d1 text-lg">Current Amount Received</p>
          <div className="text-2xl font-semibold">
            <Usd relative={v.amount}>{v.ogNet}</Usd>{" "}
            <Usd parens classes="text-lg sm:text-xl">
              {-v.ogDeductions}
            </Usd>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-2xl font-semibold">
            ANNUAL DONATION PROCESSING IMPACT WITH BETTER GIVING
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>

        <div className="grid grid-cols-2 content-start gap-x-4 px-8 mt-6">
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Fee Savings</span>
            <span className="font-semibold text-green">+$2,900</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">
              Added Donations from New Payment Types
            </span>
            <span className="font-semibold text-green">+$18,500</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Platform Subscription Savings</span>
            <span className="font-semibold text-green">+$1,200</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Donor-Fee Coverage</span>
            <span className="font-semibold text-green">+$1,600</span>
          </div>
          <div className="col-span-full flex items-center gap-x-4 font-heading text-lg">
            <span className="text-gray-d1 mr-8">Accepted Donation Types</span>
            <DonationMethods activeMethods={methodsArr} />
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4 font-heading">
          <p className="text-gray-d1 text-lg">With Better Giving</p>
          <p className="text-2xl font-semibold ">
            <Usd relative={v.ogNet}>{v.bgNet}</Usd>{" "}
            <Usd sign parens classes="text-lg sm:text-xl">
              {v.advantage}
            </Usd>
          </p>
        </div>
        <div className="text-right mx-8 p-6 bg-green-l5 font-heading">
          <p className="text-gray-d1 text-lg text-center">
            Total annual advantage
          </p>
          <Usd sign classes="text-2xl block text-center font-semibold">
            {v.advantage}
          </Usd>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-2xl font-semibold">
            LONG-TERM FINANCIAL GROWTH (ESTIMATED PREDICTIONS)
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>
        <p className="text-gray-d1 mt-2 mb-4 px-6 text-lg font-semibold">
          How Strategic Saving and Allocation Through Better Giving Could Grow
          Your Nonprofit's Resources
        </p>

        <div className="mb-6 px-8">
          <p className="mb-2">
            <span className="text-gray-d1 text-lg">
              Savings & Investment Allocation:
            </span>
            <span className="font-semibold"> 10%</span> of Annual Donations
            Allocated to Savings/Investments
          </p>
          <p className="text-sm text-gray">
            ({toUsd(v.amount)} with Better Giving ×{" "}
            {(v.notGrantedRate * 100).toFixed(2)}% = {toUsd(v.notGranted)})
          </p>

          <p className="mt-4 mb-2">Allocation Between Accounts:</p>
          <ul className="list-disc pl-8">
            <li className="mb-2">
              <span className="font-semibold">
                {(v.savingsRate * 100).toFixed(2)}%
              </span>{" "}
              to High-Yield Savings Account (4% Annual Yield)
            </li>
            <li>
              <span className="font-semibold">
                {(v.investedRate * 100).toFixed(2)}%
              </span>{" "}
              to Sustainability Fund (20% Average Annual Return)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-3 mt-8 px-8">
          <ImpactCard
            title="1 Year Savings & Investment Impact"
            {...v.projection[0]}
          />
          <ImpactCard
            title="5 Years Savings & Investment Impact"
            {...v.projection[4]}
          />
          <ImpactCard
            title="10 Years Savings & Investment Impact"
            {...v.projection[9]}
          />
        </div>
      </section>
    </div>
  );
}
