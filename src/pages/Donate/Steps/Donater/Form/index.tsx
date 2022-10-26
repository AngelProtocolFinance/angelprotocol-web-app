import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import { setDetails } from "slices/donation";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "./AdvancedOptions";
import Amount from "./Amount";
import AmountOptions from "./AmountOptions";

export default function Form() {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();

  const dispatch = useDispatch();
  function submit(data: DonateValues) {
    dispatch(setDetails(data));
    reset();
  }

  const wasCompleted = !!getValues("token.amount");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid rounded-md w-full"
      autoComplete="off"
    >
      <Amount />
      <AmountOptions classes="mt-3" />
      <AdvancedOptions classes="mt-10" />

      <div className="grid grid-cols-2 gap-5 font-body mt-12">
        <Link
          to={`${appRoutes.profile}/1`}
          className="py-3 rounded border border-gray-l2 dark:border-bluegray-d1 bg-orange-l5 dark:bg-blue-d5 text-center hover:bg-orange-l4"
          type="submit"
        >
          Cancel
        </Link>
        <button
          disabled={
            !isValid || (wasCompleted ? false : !isDirty) || isSubmitting
          }
          className="py-3 rounded btn-orange normal-case"
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
