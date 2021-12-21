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
  const { form_loading, form_error } = useGetter((state) => state.transaction);
  const { register, watch } = useFormContext<Values>();
  const { submitHandler, isSubmitting } = useDonateForm();
  const to = watch("to");

  return (
    <div className="">
      <div className="flex justify-center text-center text-white font-bold text-2xl mb-4">
        {to === "tca" && <h4>TCA Donation Portal</h4>}
        {to === "churchportal" && <h4>Church Donation Portal</h4>}
      </div>
      <form
        onSubmit={submitHandler}
        className="bg-white grid p-4 rounded-md w-full max-w-lg"
        autoComplete="off"
      >
        <Status />
        <Amount />
        <div className="flex gap-2 mb-6">
          <Currency currency={denoms.uusd} />
          <Currency currency={denoms.ether} withTooltip />
          <Currency currency={denoms.btc} withTooltip />
          <Currency currency={denoms.sol} withTooltip />
          <Currency currency={denoms.uatom} withTooltip />
        </div>
        <Breakdown />
        {to === "churchportal" && (
          <div className="w-full text-center my-2">
            <select
              className="w-full border border-gray-200 p-2"
              {...register("contractAddress")}
            >
              <option value="terra14qsv7t0vwuv2fjxa73ylv0thda5f6kytq8p47u">
                New Life Church
              </option>
              <option value="terra1uf9rzfr0ktr5d9ar4e46peh7f4sysxy5j4mvxc">
                Walk Church
              </option>
            </select>
          </div>
        )}
        {to !== "tca" && <Split />}
        <button
          disabled={isSubmitting || form_loading || !!form_error}
          className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
          type="submit"
        >
          {form_loading ? "estimating fee.." : "proceed"}
        </button>
      </form>
    </div>
  );
}
