import { useState } from "react";
import { Form1 } from "./form1";
import { Form2 } from "./form2";
import { Summary } from "./summary";
import type { State } from "./types";

export default function Page() {
  const [state, setState] = useState<State>({
    annualAmount: "$ 100,000",
    averageProcessingFee: 0.029,
    platformFees: 0.02,
    annualSubscriptionCost: "$ 1,200",
    donorCanCoverProcessingFees: true,
    donationTypes: ["credit-card"],
    donationsToSavings: 0.1,
    savingsInvested: 0.5,
  });
  return (
    <div className="xl:container px-5 mx-auto mt-4 py-8 grid grid-cols-2 gap-x-4 content-start">
      <h1 className="text-3xl text-blue-d1 mb-12 text-center col-span-full">
        Donation Processing & Investment Calculator
      </h1>

      <div>
        <Form1 state={state} setState={setState} classes="" />
        <Form2 state={state} setState={setState} classes="" />
      </div>
      <Summary state={state} />
    </div>
  );
}
