import { useState } from "react";
import { type State, context } from "./context";
import { Form1 } from "./form1";
import { Form2 } from "./form2";

export default function Page() {
  const state = useState<State>({
    annualAmount: "$ 100,000",
    averageProcessingFeePct: 2.9,
    platformFeesPct: 2,
    annualSubscriptionCost: "$ 1,200",
    donorCanCoverProcessingFees: true,
    donationTypes: ["credit-card"],
    donationsToSavingsPct: 10,
    savingsInvestedPct: 50,
  });
  console.log(state[0].annualAmount);
  return (
    <div className="xl:container px-5 mx-auto mt-4 py-8 grid grid-cols-2 content-start">
      <h1 className="text-3xl text-blue-d1 mb-4 text-center col-span-full">
        Donation Processing & Investment Calculator
      </h1>

      <context.Provider value={state}>
        <div>
          <Form1 classes="" />
          <Form2 classes="" />
        </div>
      </context.Provider>
    </div>
  );
}
