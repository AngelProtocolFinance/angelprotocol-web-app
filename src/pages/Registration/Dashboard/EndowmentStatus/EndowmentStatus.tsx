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

export default function EndowmentStatus(props: Props) {
  const { charity } = useRegistrationQuery();
  const { RegistrationStatus, CharityName } = charity.Registration;
  const { JunoWallet } = charity.Metadata;

  if (props.isLoading) {
    return <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-2" />;
  }

  const registrationState = getRegistrationState(charity);

  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
        <p className="ml-3 mr-auto">Status of Your Endowment</p>
        {RegistrationStatus === "Under Review" && (
          <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-yellow-500">
            Under Review
          </p>
        )}
        {RegistrationStatus === "Inactive" && (
          <>
            <p className="uppercase text-green-500 w-40">
              {RegistrationStatus}
            </p>
            <Button
              className="w-full md:w-2/3 h-10 mt-5 btn-primary"
              onClick={props.onSubmit}
              disabled={
                !registrationState.getIsReadyForSubmit() || props.isLoading
              }
            >
              Submit for review
            </Button>
          </>
        )}
        {RegistrationStatus === "Active" && (
          <p className="flex items-center h-10 ml-14 mr-auto text-green-500 uppercase">
            Created: {maskAddress(JunoWallet)}
          </p>
        )}
      </div>
      {RegistrationStatus === "Active" && (
        <EndowmentCreated charityName={CharityName} />
      )}
    </div>
  );
}
