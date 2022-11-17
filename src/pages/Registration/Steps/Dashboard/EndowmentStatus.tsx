import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { RegistrationStatus } from "types/aws";
import { BtnPrim } from "components/registration";
import { appRoutes } from "constants/routes";

type Props = {
  isSubmitting: boolean;
  status: RegistrationStatus;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  endowId?: number;
};

// NOTE: not handling `RegistrationStatus === "Active"` as the Dashboard is inaccessible when the Endowment is active
export default function EndowmentStatus({
  onSubmit,
  status,
  endowId,
  isSubmitting,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
        <p className="ml-3 mr-auto">Status of Your Endowment</p>
        {status === "Inactive" && (
          <BtnPrim
            onClick={onSubmit}
            className="min-w-[8rem]"
            disabled={isSubmitting}
          >
            Submit
          </BtnPrim>
        )}
        {status === "Rejected" && (
          <>
            <p className="uppercase w-40 mr-2 text-red">Rejected</p>
            <BtnPrim onClick={onSubmit} disabled={isSubmitting}>
              Resubmit
            </BtnPrim>
          </>
        )}
        {status === "Under Review" && (
          <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-orange-l1">
            Under Review
          </p>
        )}
        {status === "Active" && (
          <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-green">
            Active
          </p>
        )}
      </div>
      {status === "Active" && (
        <Link
          to={`${appRoutes.profile}/${
            endowId! /** should be defined when status is Active */
          }`}
          className="flex w-full justify-center font-heading uppercase font-bold text-sm text-blue underline hover:text-blue-l1"
        >
          Check out your new Endowment's profile page here
        </Link>
      )}
    </div>
  );
}
