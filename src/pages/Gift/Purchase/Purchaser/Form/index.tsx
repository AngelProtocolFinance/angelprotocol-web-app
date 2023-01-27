import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormValues as FV } from "../types";
import { setDetails } from "slices/gift";
import { appRoutes } from "constants/routes";
import Amount from "./Amount";
import AmountOptions from "./AmountOptions";
import Recipient from "./Recipient";

export default function Form({ classes = "" }) {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<FV>();

  const dispatch = useDispatch();
  function submit(data: FV) {
    dispatch(setDetails(data));
    reset();
  }

  const wasCompleted = !!getValues("token.amount");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`grid rounded-md w-full ${classes}`}
      autoComplete="off"
    >
      <Amount />
      <AmountOptions classes="mt-3" />
      <Recipient classes="mt-8" />

      <div className="grid grid-cols-2 gap-5 font-body mt-8 md:mt-12">
        <Link
          className="btn btn-outline btn-gift-sec"
          to={`${appRoutes.profile}/1`}
        >
          Cancel
        </Link>
        <button
          className="btn btn-orange btn-gift"
          disabled={
            !isValid || (wasCompleted ? false : !isDirty) || isSubmitting
          }
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
