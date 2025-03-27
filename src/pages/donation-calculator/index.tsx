import { laira } from "assets/laira/laira";
import Image from "components/image";
import { APP_NAME } from "constants/env";
import { useState } from "react";
import { Benefits } from "./benefits";
import { bgView } from "./bg-view";
import { Chart } from "./chart";
import { Docs } from "./docs";
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
        <h2 className="text-balance text-2xl sm:text-3xl text-blue-d1 mb-6 text-center col-span-2">
          Donation Processing Calculator
        </h2>

        <div className="grid sm:grid-cols-subgrid col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <Form1
            state={state}
            setState={setState}
            classes="sm:border-r border-gray-l3"
          />
          <Result1 {...view} classes="" />
        </div>

        <div className="max-sm:grid max-sm:justify-items-center max-sm:gap-y-2 sm:relative mt-14 col-span-2 justify-self-center">
          <Image
            src={laira.announce}
            width={80}
            className="sm:absolute sm:left-0 sm:-bottom-2 shrink-0"
          />
          <p className="text-balance max-w-2xl text-center text-lg">
            But wait! See how much more {APP_NAME}’s savings & investment
            services can support your long term future
          </p>
        </div>

        <h2 className="mt-8 text-balance text-2xl sm:text-3xl text-blue-d1 mb-6 text-center col-span-2">
          Savings & Investment Calculator
        </h2>

        <div className="grid sm:grid-cols-subgrid col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <Form2
            state={state}
            setState={setState}
            classes="sm:border-r border-gray-l3"
          />
          <Result2 {...view} classes="" />
        </div>
        <Chart {...view} classes="mt-6 sm:row-span-3 max-sm:col-span-2" />
        {/* <Table {...view} classes="mt-6 " /> */}
        <Benefits classes="mt-6 col-start-2 max-sm:col-span-2" />
        <Docs classes="mt-6 max-sm:col-span-2" />
      </div>
    </div>
  );
}
