import { useRegistrationState } from "services/aws/registration";
import { Button } from "../common";
import EndowmentStatus from "./EndowmentStatus";
import ProgressIndicator from "./ProgressIndicator";
import Steps from "./Steps";
import getRegistrationState from "./getRegistrationState";
import useActivate from "./useActivate";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const { data } = useRegistrationState("");
  const charity = data!; //charity is available as checked by guard
  const { submit, isSubmitting } = useSubmit();
  const { activate, isSubmitting: isActivateSubmitting } = useActivate();

  const isDataSubmitted =
    charity.Registration.RegistrationStatus !== "Inactive";
  const state = getRegistrationState(charity);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <Steps
        disabled={isDataSubmitted || isSubmitting}
        registrationState={state}
      />
      {isDataSubmitted ? (
        <EndowmentStatus
          charity={charity}
          isLoading={isActivateSubmitting}
          onActivate={() => activate(charity.ContactPerson.PK)}
        />
      ) : (
        <Button
          className="w-full md:w-2/3 h-10 mt-5 bg-yellow-blue"
          onClick={() => submit(charity)}
          disabled={!state.getIsReadyForSubmit() || isSubmitting}
        >
          Submit for review
        </Button>
      )}
    </div>
  );
}
