import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormValues, OnDonation } from "../types";
import { appRoutes } from "constants/routes";

export default function Controls({
  classes = "",
  ...props
}: OnDonation & { classes?: string }) {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormValues>();

  return (
    <div className={`${classes} grid grid-cols-2 gap-5`}>
      <button
        className="btn-donate btn-outline-filled"
        onClick={props.onBack}
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
        to={`${appRoutes.marketplace}/${props.recipient.id}`}
        className="col-span-full btn-outline btn-donate"
      >
        Cancel
      </Link>
    </div>
  );
}
