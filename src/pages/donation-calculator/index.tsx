import { useState } from "react";
import { bgView } from "./bg-view";
import { Form1 } from "./form1";
import { Form2 } from "./form2";
import { Result1 } from "./result1";
import { Result2 } from "./result2";
import type { State } from "./types";

export default function Page() {
  const [state, setState] = useState<State>({
    annualAmount: "$ 100,000",
    processingFeeRate: 0.029,
    platformFeeRate: 0.02,
    annualSubscriptionCost: "$ 1,200",
    donorCanCoverProcessingFees: false,
    donationTypes: ["credit-card"],
    donationsToSavings: 0.1,
    savingsInvested: 0.5,
  });

  const view = bgView(state);

  return (
    <div className="bg-gray-l4 relative">
      <div className="xl:container px-5 mx-auto mt-4 py-8 grid sm:grid-cols-2 gap-x-4 content-start">
        <h1 className="text-balance text-2xl sm:text-3xl text-blue-d1 mb-4 sm:mb-10 text-center col-span-full">
          Donation Processing Calculator
        </h1>

        <div className="grid sm:grid-cols-subgrid col-span-2 bg-white p-4 rounded-lg shadow-md">
          <Form1
            state={state}
            setState={setState}
            classes="sm:border-r border-gray-l3"
          />
          <Result1 {...view} classes="" />
          {/* <Form2 state={state} setState={setState} classes="" /> */}
        </div>
        <div className="mt-4 grid sm:grid-cols-subgrid col-span-2 bg-white p-4 rounded-lg shadow-md">
          <Form2
            state={state}
            setState={setState}
            classes="sm:border-r border-gray-l3"
          />
          <Result2 {...view} classes="" />
        </div>
      </div>
    </div>
  );
}
