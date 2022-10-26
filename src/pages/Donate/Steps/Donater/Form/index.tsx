import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import AmountOptions from "./AmountOptions";

export default function Form() {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <Amount />
      <AmountOptions classes="mt-3" />
      <AdvancedOptions classes="mt-10" />

      <div className="grid grid-cols-2 gap-5 font-body mt-12">
        <button
          disabled={!isValid || !isDirty || isSubmitting}
          className="py-3 rounded border border-gray-l2 bg-orange-l5"
          type="submit"
        >
          Cancel
        </button>
        <button
          disabled={!isValid || !isDirty || isSubmitting}
          className="py-3 rounded btn-orange"
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
