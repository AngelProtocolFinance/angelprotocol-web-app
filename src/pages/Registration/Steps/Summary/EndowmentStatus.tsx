import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { getRegistrationState } from "pages/Registration/helpers";
import { useRegistrationQuery } from "services/aws/registration";
import Loader from "components/Loader";
import { appRoutes } from "constants/routes";
import { Button } from "../../common";

type Props = {
  isLoading: boolean;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

// NOTE: not handling `RegistrationStatus === "Active"` as the Dashboard is inaccessible when the Endowment is active
export default function EndowmentStatus({ isLoading, onSubmit }: Props) {
  const { application } = useRegistrationQuery();
  const {
    Registration: { RegistrationStatus: status },
  } = application;

  if (isLoading) {
    return <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-2" />;
  }

  const registrationState = getRegistrationState(application);

  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
        <p className="ml-3 mr-auto">Status of Your Endowment</p>
        {status === "Inactive" && (
          <Button
            className="w-40 h-10 btn-orange"
            onClick={onSubmit}
            disabled={!registrationState.getIsReadyForSubmit() || isLoading}
          >
            Submit
          </Button>
        )}
        {status === "Rejected" && (
          <>
            <p className="uppercase w-40 mr-2 text-red">Rejected</p>
            <Button
              className="w-40 h-10 btn-orange"
              onClick={onSubmit}
              disabled={!registrationState.getIsReadyForSubmit() || isLoading}
            >
              Resubmit
            </Button>
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
          to={`${appRoutes.profile}/${application.Metadata.EndowmentId}`}
          className="flex w-full justify-center font-heading uppercase font-bold text-sm text-blue underline hover:text-blue-l1"
        >
          Check out your new Endowment's profile page here
        </Link>
      )}
    </div>
  );
}
