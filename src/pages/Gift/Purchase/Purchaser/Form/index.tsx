import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { DonateValues as DV } from "../types";
import { BtnPrim, BtnSec } from "components/gift";
import { setDetails } from "slices/gift";
import { appRoutes } from "constants/routes";
import Amount from "./Amount";
import AmountOptions from "./AmountOptions";
import Recipient from "./Recipient";

export default function Form() {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DV>();

  const dispatch = useDispatch();
  function submit(data: DV) {
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
      <Recipient classes="mb-8" />
      <Amount />
      <AmountOptions classes="mt-3" />

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
