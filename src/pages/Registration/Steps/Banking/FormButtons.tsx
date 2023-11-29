import { Link } from "react-router-dom";
import { LoadText } from "components/registration";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

type Props = {
  alreadySubmitted?: boolean;
  disabled: boolean;
  isSubmitting: boolean;
  newRequirementsAdded: boolean;
  refreshRequired: boolean;
};

export default function FormButtons(props: Props) {
  const { alreadySubmitted, refreshRequired, ...rest } = props;

  if (alreadySubmitted) {
    return <AlreadySubmitted />;
  }

  if (refreshRequired) {
    return <Refresh {...rest} />;
  }

  return <Submit {...rest} />;
}

function AlreadySubmitted() {
  const { data } = useRegState<5>();
  return (
    <div className="grid grid-cols-2 sm:flex gap-2">
      <Link
        to={`../${steps.docs}`}
        state={data.init}
        className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
      >
        Back
      </Link>
      <Link
        to={`../${steps.summary}`}
        state={data.init}
        className="py-3 min-w-[8rem] btn-orange btn-reg"
      >
        Continue
      </Link>
    </div>
  );
}

function Refresh({
  disabled,
  isSubmitting,
}: Omit<Props, "alreadySubmitted" | "refreshRequired">) {
  const { data } = useRegState<5>();
  return (
    <div className="grid gap-4 mt-8">
      <i className="text-xs sm:text-sm">
        After you fill the form, we may need additional information to be able
        to submit your bank details for validation. Please fill the form and
        click the "Check requirements" button below.
      </i>
      <div className="grid grid-cols-2 sm:flex gap-2">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.docs}`}
          state={data.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          aria-disabled={disabled || isSubmitting}
          disabled={disabled || isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText isLoading={isSubmitting} text="Checking...">
            Check Requirements
          </LoadText>
        </button>
      </div>
    </div>
  );
}

function Submit({
  isSubmitting,
  newRequirementsAdded,
}: Pick<Props, "isSubmitting" | "newRequirementsAdded">) {
  const { data } = useRegState<5>();
  return (
    <div className="grid gap-4 mt-8">
      <i className="text-xs sm:text-sm">
        {newRequirementsAdded
          ? "Please check the form again and fill in all the newly added fields."
          : "All requirements are met! Please click continue."}
      </i>
      <div className="grid grid-cols-2 sm:flex gap-2">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.docs}`}
          state={data.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          aria-disabled={isSubmitting}
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    </div>
  );
}
