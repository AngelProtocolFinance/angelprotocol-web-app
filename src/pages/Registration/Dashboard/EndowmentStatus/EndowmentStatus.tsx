import { MouseEventHandler } from "react";
import { getRegistrationState } from "pages/Registration/helpers";
import { useRegistrationQuery } from "services/aws/registration";
import Loader from "components/Loader";
import { maskAddress } from "helpers";
import { Button } from "../../common";
import EndowmentCreated from "./EndowmentCreated";

type Props = {
  isLoading: boolean;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

export default function EndowmentStatus({ isLoading, onSubmit }: Props) {
  const { charity } = useRegistrationQuery();
  const { Registration } = charity;

  if (isLoading) {
    return <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-2" />;
  }

  const registrationState = getRegistrationState(charity);

  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
        <p className="ml-3 mr-auto">Status of Your Endowment</p>
        {Registration.RegistrationStatus === "Inactive" && (
          <>
            <p className="uppercase text-green-500 w-40 mr-2">
              {Registration.RegistrationStatus}
            </p>
            <Button
              className="w-40 h-10 bg-angel-orange"
              onClick={onSubmit}
              disabled={!registrationState.getIsReadyForSubmit() || isLoading}
            >
              Submit
            </Button>
          </>
        )}
        {Registration.RegistrationStatus === "Under Review" && (
          <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-yellow-500">
            Under Review
          </p>
        )}
        {Registration.RegistrationStatus === "Active" && (
          <p className="flex items-center h-10 ml-14 mr-auto text-green-500 uppercase">
            Created: {maskAddress(charity.Metadata.JunoWallet)}
          </p>
        )}
      </div>
      {Registration.RegistrationStatus === "Active" && (
        <EndowmentCreated charityName={Registration.CharityName} />
      )}
    </div>
  );
}
