import { denoms } from "constants/currency";
import Currency from "./Currency";
import Amount from "./Amount";
import useDonateForm from "./useDonateForm";
import Breakdown from "./Breakdown";
import Status from "./Status";
import { useFormContext } from "react-hook-form";
import { Values } from "components/Donater/types";
import Split from "./Split";

export default function DonateForm() {
  const { watch } = useFormContext<Values>();
  const { submitHandler, isSubmitting } = useDonateForm();
  const loading = watch("loading");
  const error = watch("form_error");
  const to = watch("to");
  return (
    <form
      onSubmit={submitHandler}
      className="bg-white grid p-4 rounded-md w-96"
      autoComplete="off"
    >
      <Status />
      <Amount />
      <div className="flex gap-2 mb-3">
        <Currency currency={denoms.uusd} />
        <Currency currency={denoms.ether} withTooltip />
        <Currency currency={denoms.btc} withTooltip />
        <Currency currency={denoms.sol} withTooltip />
        <Currency currency={denoms.uatom} />
      </div>
      <Breakdown />
      {to !== "tca" && <Split />}
      <button
        disabled={isSubmitting || loading || !!error}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-sm text-white font-bold"
        type="submit"
      >
        {loading ? "estimating fee.." : "proceed"}
      </button>
    </form>
  );
}
