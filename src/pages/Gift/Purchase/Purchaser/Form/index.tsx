import TokenField from "components/TokenField";
import { appRoutes } from "constants/routes";
import { useController, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setDetails } from "slices/gift";
import type { FormValues as FV } from "../types";
import Recipient from "./Recipient";

export default function Form({ classes = "" }) {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
    control,
  } = useFormContext<FV>();

  const { field: token } = useController<FV, "token">({
    name: "token",
    control,
  });

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
      <TokenField
        token={token.value}
        onChange={token.onChange}
        ref={token.ref}
        chainId="80002"
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
          className="btn-blue btn-gift"
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
