import {
  type Submission,
  isRejected,
} from "@better-giving/registration/models";
import LoadText from "components/LoadText";
import { CircleAlert, Hourglass } from "lucide-react";
import { steps } from "pages/Registration/routes";
import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useRegState } from "../StepGuard";

type Props = {
  isSubmitting: boolean;
  status?: Exclude<Submission, { endowment_id: any }>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  classes?: string;
};

export default function EndowmentStatus({
  onSubmit,
  status,
  isSubmitting,
  classes = "",
}: Props) {
  const { data } = useRegState<3>();

  if (!status) {
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
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </div>
    );
  }

  if (isRejected(status)) {
    return (
      <div
        className={`max-sm:grid text-red dark:text-red-l3 ${classes} content-start`}
      >
        <p className="mb-6 max-sm:grid justify-items-center gap-2">
          <CircleAlert className="inline relative bottom-px mr-2" size={20} />
          <span className="max-sm:text-center">
            Your nonprofit's application has been rejected.
          </span>
        </p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Resubmit</LoadText>
        </button>
      </div>
    );
  }

  if (status === "in-review") {
    return (
      <div
        className={`max-sm:grid justify-items-center gap-2 text-navy-l1 dark:text-navy-l2 ${classes}`}
      >
        <Hourglass className="relative bottom-px inline mr-2" size={18} />
        <span className="max-sm:text-center">
          Your application has been submitted for review
        </span>
      </div>
    );
  }
}
