import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues, OnDonation } from "../types";
import { useSetter } from "store/accessors";
import { setStep } from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Controls({
  classes = "",
  ...props
}: OnDonation & { classes?: string }) {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  const dispatch = useSetter();
  const { state } = props;
  const {
    step,
    recipient: { id: endowId },
  } = state;

  function goBack() {
    dispatch(setStep(step - 1));
  }

  return (
    <div className={`${classes} grid grid-cols-2 gap-5`}>
      <button
        className="btn-donate btn-outline-filled"
        onClick={goBack}
        type="button"
      >
        Back
      </button>

      <button
        className="btn-orange btn-donate"
        disabled={isSubmitting}
        type="submit"
      >
        Continue
      </button>

      <Link
        to={appRoutes.profile + `/${endowId}`}
        className="col-span-full btn-outline btn-donate"
      >
        Cancel
      </Link>
    </div>
  );
}
