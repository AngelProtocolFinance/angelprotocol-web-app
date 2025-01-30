import { Link } from "@remix-run/react";
import type { FormButtonsProps } from "components/bank-details/types";
import LoadText from "components/load-text";
import { steps } from "../../routes";

export default function FormButtons(props: FormButtonsProps) {
  return <Submit {...props} />;
}

function Submit({ isSubmitting = false }) {
  return (
    <div className="grid gap-4 mt-8">
      <div className="grid grid-cols-2 sm:flex gap-2">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.docs}`}
          className="py-3 min-w-[8rem] btn btn-outline text-sm"
        >
          Back
        </Link>
        <button
          aria-disabled={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText isLoading={isSubmitting}>Submit</LoadText>
        </button>
      </div>
    </div>
  );
}
