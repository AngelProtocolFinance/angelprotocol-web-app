import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormValues as FV } from "../types";
import { BtnPrim } from "components/BtnPrim";
import { BtnSec } from "components/gift";
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
        <BtnSec as="link" to={`${appRoutes.profile}/1`}>
          Cancel
        </BtnSec>
        <BtnPrim
          disabled={
            !isValid || (wasCompleted ? false : !isDirty) || isSubmitting
          }
          type="submit"
        >
          Continue
        </BtnPrim>
      </div>
    </form>
  );
}
