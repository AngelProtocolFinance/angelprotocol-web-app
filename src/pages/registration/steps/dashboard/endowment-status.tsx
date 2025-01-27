import {
  type Submission,
  isRejected,
} from "@better-giving/registration/models";
import { Link, useFetcher } from "@remix-run/react";
import LoadText from "components/load-text";
import { CircleAlert, Hourglass } from "lucide-react";
import { steps } from "pages/registration/routes";

type Props = {
  status?: Exclude<Submission, { endowment_id: any }>;
  classes?: string;
};

export default function EndowmentStatus({ status, classes = "" }: Props) {
  const fetcher = useFetcher({ key: "reg-sub" });
  const isSubmitting = fetcher.state !== "idle";
  if (!status) {
    return (
      <fetcher.Form
        method="POST"
        className={`grid grid-cols-2 sm:flex gap-2 ${classes}`}
      >
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.banking}`}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </button>
      </fetcher.Form>
    );
  }

  if (isRejected(status)) {
    return (
      <fetcher.Form
        method="POST"
        className={`max-sm:grid text-red dark:text-red-l3 ${classes} content-start`}
      >
        <p className="mb-6 max-sm:grid justify-items-center gap-2">
          <CircleAlert className="inline relative bottom-px mr-2" size={20} />
          <span className="max-sm:text-center">
            Your nonprofit's application has been rejected.
          </span>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText isLoading={isSubmitting}>Resubmit</LoadText>
        </button>
      </fetcher.Form>
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
