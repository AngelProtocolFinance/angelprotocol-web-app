import type { FormButtonsProps } from "components/BankDetails/types";
import LoadText from "components/LoadText";
import { toState } from "helpers/state-params";
import { Link } from "react-router-dom";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

export default function FormButtons(props: FormButtonsProps) {
  return <Submit {...props} />;
}

function Submit({ isSubmitting = false }) {
  const { data } = useRegState<5>();
  return (
    <div className="grid gap-4 mt-8">
      <div className="grid grid-cols-2 sm:flex gap-2">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.docs}?_s=${toState(data.init)}`}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          aria-disabled={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Submit</LoadText>
        </button>
      </div>
    </div>
  );
}
