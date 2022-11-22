import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { RegistrationStatus } from "types/aws";
import { steps } from "pages/Registration/routes";
import Icon from "components/Icon";
import { BtnPrim, BtnSec } from "components/registration";
import { adminRoutes, appRoutes } from "constants/routes";
import { useRegState } from "../StepGuard";

type Props = {
  isSubmitting: boolean;
  status: RegistrationStatus;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  endowId?: number;
  classes?: string;
};

export default function EndowmentStatus({
  onSubmit,
  status,
  endowId,
  isSubmitting,
  classes = "",
}: Props) {
  const { data } = useRegState<4>();

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
              Your endowment application has been rejected.
            </span>
          </p>
          <BtnPrim
            onClick={onSubmit}
            disabled={isSubmitting}
            className="min-w-[8rem]"
          >
            Resubmit
          </BtnPrim>
        </div>
      );

    case "Active":
      return (
        <div className={`max-sm:grid justify-items-center gap-2 ${classes}`}>
          <Icon
            type="Check"
            className="inline relative bottom-px text-green dark:text-green-l2 mr-2"
            size={18}
          />
          <span className="text-green dark:text-green-l2">
            Your endowment has been created.
          </span>
          <Link
            className="text-xs inline-block uppercase underline text-blue-l1 dark:text-blue-l2 ml-2"
            to={`${appRoutes.admin}/${endowId!}/${adminRoutes.edit_profile}`}
          >
            edit profile
          </Link>
        </div>
      );

    case "Under Review":
      return (
        <div
          className={`max-sm:grid justify-items-center gap-2 text-gray-d1 dark:text-gray ${classes}`}
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
          <BtnSec
            aria-disabled={isSubmitting}
            as="link"
            to={`../${steps.wallet}`}
            state={data.init}
            className="py-3 min-w-[8rem] text-center"
          >
            Back
          </BtnSec>
          <BtnPrim
            disabled={isSubmitting}
            onClick={onSubmit}
            className="py-3 min-w-[8rem] text-center"
          >
            Continue
          </BtnPrim>
        </div>
      );
  }
}
