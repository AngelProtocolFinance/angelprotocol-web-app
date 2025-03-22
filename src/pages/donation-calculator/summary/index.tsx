import { HelpCircle, TrendingUp } from "lucide-react";
import { unmask } from "../dollar-mask";
import type { State } from "../types";
import { getBgAmount } from "./bg-amount";

interface Props {
  classes?: string;
  state: State;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function Summary({ classes = "", state }: Props) {
  const annualAmount = unmask(state.annualAmount);

  const ogProcessingFee =
    state.averageProcessingFee *
    //reduced by 80% if donor covers processing fees
    (state.donorCanCoverProcessingFees ? 0.2 : 1);
  const ogFee = annualAmount * (ogProcessingFee + state.platformFees);

  const bg = getBgAmount(state);

  return (
    <div className={`${classes} p-6 border border-gray-l3 rounded-lg bg-white`}>
      <h1 className="text-xl font-bold mb-4">Annual Impact Summary</h1>

      <div className="mb-6">
        <p className="text-gray">Current Online Donations</p>
        <p className="text-xl font-bold">{state.annualAmount}</p>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h2 className="text-xl font-bold mb-4">Donation Processing Impact</h2>

      <div className="grid grid-cols-2 bg-gray-l5 rounded-lg mb-6">
        <div className="p-5 border-r border-gray-l3">
          <p className="text-gray-500 mb-2">Current Amount Received</p>
          <p className="text-xl font-bold text-red">
            {usd.format(annualAmount - ogFee)}{" "}
            <span className="text-xl">(-{usd.format(ogFee)})</span>
          </p>
        </div>
        <div className="p-5">
          <p className="text-gray mb-2">With Better Giving</p>
          <p className="text-xl font-bold text-green">
            {usd.format(bg.donationAmount)}{" "}
            <span className="text-xl">
              (+{usd.format(bg.feeSavings + bg.additionalFromTypes)}){" "}
            </span>
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Donation Processing Impact Details
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-d1">Fee Savings:</p>
          <p className="font-semibold">{usd.format(bg.feeSavings)}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-gray-d1">
              Additional donations from expanded payment types:
            </p>
            <HelpCircle className="w-5 h-5 text-gray-l1" />
          </div>
          <p className="font-semibold">{usd.format(bg.additionalFromTypes)}</p>
        </div>

        <div className="flex justify-between items-center text-green font-medium">
          <p className="">Subtotal - Processing Impact:</p>
          <p className=" font-semibold">
            {usd.format(bg.feeSavings + bg.additionalFromTypes)}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-l3 my-6"></div>

      <h2 className="text-xl font-bold mb-4">First-Year Investment Impact</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <p className=" text-gray-d1">Savings Account Growth (4%):</p>
          <p className=" font-semibold">
            {usd.format(bg.yearOneSavingsGrowth)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className=" text-gray-d1">Sustainability Fund Growth (20%):</p>
          <p className=" font-semibold">
            {usd.format(bg.yearOneSustainabilityGrowth)}
          </p>
        </div>

        <div className="flex justify-between items-center text-[#A020F0] font-medium">
          <p className="">Subtotal - Investment Impact:</p>
          <p className=" font-semibold">
            {usd.format(
              bg.yearOneSavingsGrowth + bg.yearOneSustainabilityGrowth
            )}
          </p>
        </div>
      </div>

      <div className="bg-green-l5 p-6 rounded-lg flex items-center gap-4">
        <div className="text-green">
          <TrendingUp size={40} />
        </div>
        <div>
          <p className="text-xl font-bold uppercase">Total Annual Impact</p>
          <p className="text-lg font-bold text-green-d1">
            {usd.format(bg.totalAnnualImpact)}
          </p>
        </div>
      </div>
    </div>
  );
}
