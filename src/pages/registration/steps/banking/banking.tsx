import { Link, useLoaderData } from "@remix-run/react";
import BankDetails from "components/bank-details";
import ExtLink from "components/ext-link";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { steps } from "../../routes";
import type { RegStep5 } from "../../types";
import FormButtons from "./form-buttons";
import useSubmit from "./use-submit";

export default function Banking() {
  const { data } = useLoaderData() as RegStep5;
  const [isChanging, setIsChanging] = useState(false);
  const { submit, isLoading } = useSubmit();

  if (data.banking && !isChanging) {
    return (
      <div className="flex flex-col items-start max-sm:items-center">
        <h2 className="text-center sm:text-left text-xl mb-2">
          Banking details
        </h2>

        <p className="mt-6 mb-1">
          <span className="uppercase text-sm font-semibold">account id: </span>
          <span className="text-gray ">{data.banking.wise_recipient_id}</span>
        </p>
        <ExtLink
          href={data.banking.bank_statement.publicUrl}
          className="flex items-center gap-2 text-blue hover:text-blue-d1"
        >
          <SquareArrowOutUpRight />
          <span>Bank statement</span>
        </ExtLink>
        <button
          className="btn-red px-2 py-1 rounded-sm text-xs mt-2 mb-8"
          type="button"
          onClick={() => setIsChanging(true)}
        >
          change
        </button>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full mt-auto">
          <Link
            to={`../${steps.docs}`}
            className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
          >
            Back
          </Link>
          <Link
            to={`../${steps.summary}`}
            className="py-3 min-w-[8rem] btn-blue btn-reg"
          >
            Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start max-sm:items-center">
      {isChanging && (
        <button
          className="btn-blue px-2 py-1 rounded-sm text-xs mt-2 mb-4"
          type="button"
          onClick={() => setIsChanging(false)}
        >
          cancel
        </button>
      )}
      <h2 className="text-center sm:text-left text-xl mb-4">
        {isChanging ? "Update" : "Setup"} your banking details
      </h2>
      <BankDetails
        FormButtons={FormButtons}
        onSubmit={submit}
        isLoading={isLoading}
      />
    </div>
  );
}
