import bg from "assets/images/bettergiving-logo-white.svg";
import Image from "components/image";
import { format } from "date-fns";
import { ImpactCard } from "./impact-card";

export function Page1() {
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
            <span className="font-semibold">$100,000</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Avg. Processing Fees</span>
            <span className="font-semibold">2.9%</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Platform Fees</span>
            <span className="font-semibold">2.0%</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Annual Platform Subscription</span>
            <span className="font-semibold">$1,200</span>
          </div>
          <div className="col-span-full flex items-center gap-x-4 font-heading text-lg">
            <span className="text-gray-d1 mr-8">Accepted Donation Types</span>
            <div className="flex gap-x-6 text-sm font-semibold">
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">Credit Card</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span className="text-nowrap">ACH (Bank Transfer)</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span className="text-nowrap">Digital Wallets</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span className="text-nowrap">Crypto</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span className="text-nowrap">Stocks</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span className="text-nowrap">DAF</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4 font-heading">
          <p className="text-gray-d1 text-lg">Current Amount Received</p>
          <p className="text-2xl font-semibold text-red">$93,900 (-$6,100)</p>
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
            <div className="flex gap-x-6 text-sm font-semibold">
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">Credit Card</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">ACH (Bank Transfer)</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">Digital Wallets</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">Crypto</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">Stocks</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span className="text-nowrap">DAF</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4 font-heading">
          <p className="text-gray-d1 text-lg">With Better Giving</p>
          <p className="text-2xl font-semibold text-green">
            $119,300 (+$24,200)
          </p>
        </div>
        <div className="text-right mx-8 p-6 bg-green-l5 font-heading">
          <p className="text-gray-d1 text-lg text-center">
            Total annual advantage
          </p>
          <p className="text-2xl text-center font-semibold text-green">
            +$24,200
          </p>
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
            ($119,300 with Better Giving × 10% = $11,930)
          </p>

          <p className="mt-4 mb-2">Allocation Between Accounts:</p>
          <ul className="list-disc pl-8">
            <li className="mb-2">
              <span className="font-semibold">50%</span> to High-Yield Savings
              Account (4% Annual Yield)
            </li>
            <li>
              <span className="font-semibold">50%</span> to Sustainability Fund
              (20% Average Annual Return)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-3 mt-8 px-8">
          <ImpactCard
            title="1 Year Savings & Investment Impact"
            totalGrowth="$1,564"
            balance="$13,494"
            savings={{
              invested: "$5,965",
              growth: "$243",
              balance: "$6,208",
            }}
            investment={{
              invested: "$5,965",
              growth: "$1,320",
              balance: "$7,285",
            }}
          />
          <ImpactCard
            title="5 Years Savings & Investment Impact"
            totalGrowth="$30,564"
            balance="$90,214"
            savings={{
              invested: "$29,825",
              growth: "$3,856",
              balance: "$33,681",
            }}
            investment={{
              invested: "$29,825",
              growth: "$26,708",
              balance: "$56,533",
            }}
          />
          <ImpactCard
            title="10 Years Savings & Investment Impact"
            totalGrowth="$165,682"
            balance="$284,982"
            savings={{
              invested: "$59,650",
              growth: "$15,169",
              balance: "$74,819",
            }}
            investment={{
              invested: "$59,650",
              growth: "$150,513",
              balance: "$210,163",
            }}
          />
        </div>
      </section>
    </div>
  );
}
