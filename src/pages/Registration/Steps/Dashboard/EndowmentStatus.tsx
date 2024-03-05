import Icon from "components/Icon";
import LoadText from "components/LoadText";
import { steps } from "pages/Registration/routes";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { RegistrationStatus } from "types/aws";
import { useRegState } from "../StepGuard";

type Props = {
  isSubmitting: boolean;
  status: Exclude<RegistrationStatus, "Active">;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  endowId?: number;
  classes?: string;
};

export default function EndowmentStatus({
  onSubmit,
  status,
  isSubmitting,
  classes = "",
}: Props) {
  const { data } = useRegState<3>();

  switch (status) {
    case "Rejected":
      return (
        <div className={`max-sm:grid text-red dark:text-red-l3 ${classes}`}>
          <p className="mb-6 max-sm:grid justify-items-center gap-2">
            <Icon
              type="Info"
              className="inline relative bottom-px mr-2"
              size={20}
            />
            <span className="max-sm:text-center">
              Your nonprofit's application has been rejected.
            </span>
          </p>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="min-w-[8rem] btn-orange btn-reg"
          >
            <LoadText isLoading={isSubmitting}>Resubmit</LoadText>
          </button>
        </div>
      );

    case "Under Review":
      return (
        <div
          className={`max-sm:grid justify-items-center gap-2 text-navy-l1 dark:text-navy-l2 ${classes}`}
        >
          <Icon
            type="HourglassSplit"
            className="relative bottom-px inline mr-2"
          />
          <span className="max-sm:text-center">
            Your application has been submitted for review
          </span>
        </div>
      );

    default:
      return (
        <div className={`grid grid-cols-2 sm:flex gap-2 ${classes}`}>
          <Link
            aria-disabled={isSubmitting}
            to={`../${steps.banking}`}
            state={data.init}
            className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
          >
            Back
          </Link>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="py-3 min-w-[8rem] btn-orange btn-reg"
          >
            <LoadText isLoading={isSubmitting}>Continue</LoadText>
          </button>
        </div>
      );
  }
}
