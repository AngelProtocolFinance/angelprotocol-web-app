import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues, OnDonation } from "../types";
import { useSetter } from "store/accessors";
import { setStep } from "slices/donation";
import { appRoutes } from "constant/routes";

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
    recipient: { id: endowId },
  } = state;

  return (
    <div className={`${classes} grid grid-cols-2 gap-5`}>
      <button
        className="btn-donate btn-outline-filled"
        onClick={() => {
          //kyc is always after donate form
          dispatch(setStep("donate-form"));
        }}
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
        to={appRoutes.marketplace + `/${endowId}`}
        className="col-span-full btn-outline btn-donate"
      >
        Cancel
      </Link>
    </div>
  );
}
