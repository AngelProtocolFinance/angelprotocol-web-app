import { denoms } from "constants/currency";
import Currency from "./Currency";
import Amount from "./Amount";
import useDonateForm from "./useDonateForm";
import Breakdown from "./Breakdown";
import Status from "./Status";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import Split from "./Split";
import { useGetter } from "store/accessors";

export default function DonateForm() {
  const { form_loading, form_error } = useGetter((state) => state.donation);
  const { watch } = useFormContext<Values>();
  const { submitHandler, isSubmitting } = useDonateForm();
  const to = watch("to");
  return (
    <form
      onSubmit={submitHandler}
      className="bg-white grid p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <div className="flex gap-2 mb-6">
        <Currency currency={denoms.uusd} />
        <Currency currency={denoms.ether} />
        <Currency currency={denoms.btc} />
        <Currency currency={denoms.sol} />
        <Currency currency={denoms.uatom} />
      </div>
      <Breakdown />
      {to !== "tca" && <Split />}
      <button
        disabled={isSubmitting || form_loading || !!form_error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {form_loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
