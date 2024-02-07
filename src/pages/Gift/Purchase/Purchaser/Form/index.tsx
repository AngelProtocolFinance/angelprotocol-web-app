import TokenField from "components/TokenField";
import { appRoutes } from "constants/routes";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setDetails } from "slices/gift";
import { FormValues as FV } from "../types";
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
      <TokenField<FV, "token">
        name="token"
        selectedChainId="80001"
        label="Enter the donation amount:"
        classes={{ label: "text-lg", inputContainer: "dark:bg-blue-d6" }}
        withBalance
      />

      <Recipient classes="mt-8" />

      <div className="grid grid-cols-2 gap-5 mt-8 md:mt-12">
        <Link
          className="btn-outline btn-gift"
          to={`${appRoutes.marketplace}/1`}
        >
          Cancel
        </Link>
        <button
          className="btn-orange btn-gift"
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
