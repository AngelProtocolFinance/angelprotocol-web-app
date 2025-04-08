import bg from "assets/images/bettergiving-logo-white.webp";
import Image from "components/image";
import { format } from "date-fns";

export function Page1() {
  return (
    <div className="w-full aspect-[297/210]">
      <div className="bg-blue p-6">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div>
            <h1 className="text-white text-4xl font-bold leading-tight">
              YOUR NONPROFIT'S FINANCIAL
              <br />
              ADVANTAGE WITH BETTER GIVING
            </h1>
            <p className="text-white mt-2">
              Donation Processing & Investment Impact Calculator
            </p>
            <p className="text-white text-sm">
              Generated on {format(new Date(), "PP")}
            </p>
          </div>
          <Image
            src={bg}
            alt="Better Giving Logo"
            width={300}
            height={60}
            className="object-contain self-start"
          />
        </div>
      </div>

      <section className="mt-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-3xl font-semibold">
            YOUR CURRENT ONLINE DONATIONS
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>

        <div className="grid grid-cols-2 content-start gap-x-4 px-12 mt-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-d1">Annual Online Donations</span>
            <span className="font-semibold">$100,000</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-d1">Avg. Processing Fees</span>
            <span className="font-semibold">2.9%</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-d1">Platform Fees</span>
            <span className="font-semibold">2.0%</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-d1">Annual Platform Subscription</span>
            <span className="font-semibold">$1,200</span>
          </div>
          <div className="col-span-full flex items-center gap-x-4">
            <span className="text-gray-d1 mr-8">Accepted Donation Types</span>
            <div className="flex gap-x-6">
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" checked readOnly />
                <span>Credit Card</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span>ACH (Bank Transfer)</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span>Digital Wallets</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span>Crypto</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span>Stocks</span>
              </div>
              <div className="flex items-center gap-x-1">
                <input className="size-3" type="checkbox" readOnly />
                <span>DAF</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4">
          <p className="text-gray-d1">Current Amount Received</p>
          <p className="text-2xl font-semibold text-red">$93,900 (-$6,100)</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-blue text-xl font-semibold border-b-2 border-blue pb-2 mb-6">
          ANNUAL DONATION PROCESSING IMPACT WITH BETTER GIVING
        </h2>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-d1">Fee Savings</span>
              <span className="font-semibold text-green">+$2,900</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-d1">
                Added Donations from New Payment Types
              </span>
              <span className="font-semibold text-green">+$18,500</span>
            </div>
            <div>
              <span className="text-gray-d1">Accepted Donation Types</span>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>Credit Card</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>ACH (Bank Transfer)</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>Digital Wallets</span>
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>Crypto</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>Stocks</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>DAF</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-d1">
                Platform Subscription Savings
              </span>
              <span className="font-semibold text-green">+$1,200</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-d1">Donor-Fee Coverage</span>
              <span className="font-semibold text-green">+$1,600</span>
            </div>
            <div className="mt-12 text-right">
              <p className="text-gray-d1">With Better Giving</p>
              <p className="text-2xl font-semibold text-green">
                $119,300 (+$24,200)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-l5 p-6 rounded-lg mt-8">
          <div className="flex items-center">
            <div className="text-green text-4xl mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 20h.01"></path>
                <path d="M7 20v-4"></path>
                <path d="M12 20v-8"></path>
                <path d="M17 20V8"></path>
                <path d="M22 4v16"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Total Annual Advantage</h3>
              <p className="text-3xl font-bold text-green">$24,200</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-blue text-xl font-semibold border-b-2 border-blue pb-2 mb-6">
          LONG-TERM FINANCIAL GROWTH (ESTIMATED PREDICTIONS)
        </h2>
        <p className="text-gray-d1 mb-4">
          How Strategic Saving and Allocation Through Better Giving Could Grow
          Your Nonprofit's Resources
        </p>

        <div className="mb-6">
          <p className="mb-2">
            <span className="text-gray-d1">
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

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-green-l5 p-4 rounded-lg">
            <h3 className="text-center font-semibold mb-2">
              1 Year Savings & Investment Impact
            </h3>
            <p className="text-center text-green text-2xl font-bold">$1,564</p>

            <div className="mt-4 text-sm">
              <div className="mb-3">
                <p className="font-semibold">Savings Account (4%)</p>
                <div className="flex justify-between">
                  <span>Invested:</span>
                  <span>$5,965</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Growth:</span>
                  <span>$243</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Balance:</span>
                  <span>$6,208</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="font-semibold">Investment Account (20%)</p>
                <div className="flex justify-between">
                  <span>Invested:</span>
                  <span>$5,965</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Growth:</span>
                  <span>$1,320</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Balance:</span>
                  <span>$7,285</span>
                </div>
              </div>

              <div className="flex justify-between text-green font-semibold">
                <span>Total Growth:</span>
                <span>$1,564</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-l3">
              <p className="text-center font-semibold">1 Year Balance</p>
              <p className="text-center text-green text-xl font-bold">
                $13,494
              </p>
            </div>
          </div>

          <div className="bg-green-l5 p-4 rounded-lg">
            <h3 className="text-center font-semibold mb-2">
              5 Years Savings & Investment Impact
            </h3>
            <p className="text-center text-green text-2xl font-bold">$30,564</p>

            <div className="mt-4 text-sm">
              <div className="mb-3">
                <p className="font-semibold">Savings Account (4%)</p>
                <div className="flex justify-between">
                  <span>Invested:</span>
                  <span>$29,825</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Growth:</span>
                  <span>$3,856</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Balance:</span>
                  <span>$33,681</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="font-semibold">Investment Account (20%)</p>
                <div className="flex justify-between">
                  <span>Invested:</span>
                  <span>$29,825</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Growth:</span>
                  <span>$26,708</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Balance:</span>
                  <span>$56,533</span>
                </div>
              </div>

              <div className="flex justify-between text-green font-semibold">
                <span>Total Growth:</span>
                <span>$30,564</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-l3">
              <p className="text-center font-semibold">5 Year Balance</p>
              <p className="text-center text-green text-xl font-bold">
                $90,214
              </p>
            </div>
          </div>

          <div className="bg-green-l5 p-4 rounded-lg">
            <h3 className="text-center font-semibold mb-2">
              10 Years Savings & Investment Impact
            </h3>
            <p className="text-center text-green text-2xl font-bold">
              $165,682
            </p>

            <div className="mt-4 text-sm">
              <div className="mb-3">
                <p className="font-semibold">Savings Account (4%)</p>
                <div className="flex justify-between">
                  <span>Invested:</span>
                  <span>$59,650</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Growth:</span>
                  <span>$15,169</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Balance:</span>
                  <span>$74,819</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="font-semibold">Investment Account (20%)</p>
                <div className="flex justify-between">
                  <span>Invested:</span>
                  <span>$59,650</span>
                </div>
                <div className="flex justify-between text-green">
                  <span>Growth:</span>
                  <span>$150,513</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Balance:</span>
                  <span>$210,163</span>
                </div>
              </div>

              <div className="flex justify-between text-green font-semibold">
                <span>Total Growth:</span>
                <span>$165,682</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-l3">
              <p className="text-center font-semibold">10 Year Balance</p>
              <p className="text-center text-green text-xl font-bold">
                $284,982
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
