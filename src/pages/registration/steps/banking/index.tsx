import { NavLink, useLoaderData } from "@remix-run/react";
import { BankDetails } from "components/bank-details";
import ExtLink from "components/ext-link";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { steps } from "../../routes";
import FormButtons from "./form-buttons";
import useSubmit from "./use-submit";

import type { IReg } from "@better-giving/reg";
import { step_loader } from "../../data/step-loader";
import { next_step } from "../../routes";
import { update_action } from "../update-action";

export { ErrorBoundary } from "components/error";
export const loader = step_loader(5);
export const action = update_action(next_step[5]);

export default function Banking() {
  const reg = useLoaderData() as IReg;
  const [is_changing, set_is_changing] = useState(false);
  const { submit, isLoading } = useSubmit();

  if (reg.o_bank_id && !is_changing) {
    return (
      <div className="flex flex-col items-start max-sm:items-center">
        <h2 className="text-center sm:text-left text-xl mb-2">
          Banking details
        </h2>

        <p className="mt-6 mb-1">
          <span className="uppercase text-sm font-semibold">account id: </span>
          <span className="text-gray ">{reg.o_bank_id}</span>
        </p>
        <ExtLink
          href={reg.o_bank_statement}
          className="flex items-center gap-2 text-blue hover:text-blue-d1"
        >
          <SquareArrowOutUpRight size={16} />
          <span>Bank statement</span>
        </ExtLink>
        <button
          className="btn btn-red px-2 py-1 rounded-sm text-xs mt-2 mb-8"
          type="button"
          onClick={() => set_is_changing(true)}
        >
          change
        </button>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full mt-auto">
          <NavLink
            to={`../${steps.docs}`}
            className="py-3 min-w-[8rem] btn btn-outline text-sm"
          >
            Back
          </NavLink>
          <NavLink
            to={`../${steps.summary}`}
            className="py-3 min-w-[8rem] btn btn-blue text-sm"
          >
            Continue
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-sm:items-center">
      {is_changing && (
        <button
          className="btn btn-blue px-2 py-1 rounded-sm text-xs mt-2 mb-4"
          type="button"
          onClick={() => set_is_changing(false)}
        >
          cancel
        </button>
      )}
      <h2 className="text-center sm:text-left text-xl mb-4">
        {is_changing ? "Update" : "Setup"} your banking details
      </h2>
      <BankDetails
        verified
        FormButtons={FormButtons}
        onSubmit={submit}
        isLoading={isLoading}
      />
    </div>
  );
}
