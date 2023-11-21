import { Link } from "react-router-dom";
import { LoadText } from "components/registration";
import { steps } from "../../routes";
import { useRegState } from "../StepGuard";

type Props = {
  disabled: boolean;
  isSubmitting: boolean;
  refreshRequired: boolean;
};

export default function FormButtons({ refreshRequired, ...rest }: Props) {
  return refreshRequired ? <Refresh {...rest} /> : <Submit {...rest} />;
}

function Refresh({ disabled, isSubmitting }: Omit<Props, "refreshRequired">) {
  const { data } = useRegState<5>();
  return (
    <>
      <span>
        After you fill the form, we may need additional information to be able
        to submit your bank details for validation. Please fill the form and
        click the "Check requirements" button below.
      </span>
      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
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
    </>
  );
}

function Submit({ isSubmitting }: { isSubmitting: boolean }) {
  const { data } = useRegState<5>();
  return (
    <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
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
  );
}
