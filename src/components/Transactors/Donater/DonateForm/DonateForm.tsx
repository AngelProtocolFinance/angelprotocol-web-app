// import { denoms } from "constants/currency";
// import Currency from "./Currency";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Transactors/Donater/types";
import { useGetter } from "store/accessors";
import Status from "../../Status";
import Amount from "./Amount";
import useDonateForm from "./useDonateForm";
import Breakdown from "./Breakdown";
import Split from "./Split";
import { useState } from "react";

export default function DonateForm() {
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { watch } = useFormContext<Values>();
  const { submitHandler, isSubmitting } = useDonateForm();
  const [showSplit, setShowSplit] = useState(false);
  const to = watch("to");

  const toggleAdvancedOptions = () => setShowSplit(!showSplit);

  return (
    <form
      onSubmit={() => {
        console.log("submit");
        submitHandler();
      }}
      className="bg-white grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <div className="flex gap-2 mb-6">
        {/*<Currency currency={denoms.uusd} />
        <Currency currency={denoms.ether} withTooltip />
        <Currency currency={denoms.btc} withTooltip />
        <Currency currency={denoms.sol} withTooltip />
        <Currency currency={denoms.uatom} withTooltip />*/}
      </div>
      <Breakdown />
      {to !== "tca" && showSplit && (
        <>
          <Split />
          <span className="inline-block text-grey-accent font-normal text-sm mt-1 mb-2 pl-2 mx-2">
            Note: Donations into the endowment provide sustainable financial
            runaway and allow your gift to give forever
          </span>
        </>
      )}
      <div className="flex flex-row gap-2">
        {to !== "tca" && (
          <span
            onClick={toggleAdvancedOptions}
            className="w-full bg-transparent p-1 rounded-md mt-2 capitalize text-md text-grey-accent font-semibold hover:text-angel-grey cursor-pointer"
          >
            {showSplit ? "Hide options" : "Advanced Options"}
          </span>
        )}
        <button
          disabled={isSubmitting || form_loading || !!form_error}
          className="w-full bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
          type="submit"
        >
          {form_loading ? "estimating fee.." : "proceed"}
        </button>
      </div>
    </form>
  );
}
