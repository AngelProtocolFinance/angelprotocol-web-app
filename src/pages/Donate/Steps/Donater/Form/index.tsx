import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DonateValues } from "../types";
import TokenField from "components/TokenField/TokenField";
import { useGetter } from "store/accessors";
import { setDetails } from "slices/donation";
import { appRoutes } from "constants/routes";
import AdvancedOptions from "./AdvancedOptions";

export default function Form() {
  const {
    reset,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, isSubmitting },
  } = useFormContext<DonateValues>();

  const endowId = useGetter((state) => state.donation.recipient?.id);
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
      <TokenField<DonateValues, "token">
        name="token"
        tokens={getValues("tokens")}
        withGiftcard
        label="Enter the donation amount:"
      />
      <AdvancedOptions classes="mt-10" />

      <div className="grid grid-cols-2 gap-5 font-body mt-8 md:mt-12">
        <Link
          className="btn-outline-filled btn-donate"
          to={`${appRoutes.profile}/${endowId}`}
        >
          Cancel
        </Link>
        <button
          className="btn-orange btn-donate"
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
