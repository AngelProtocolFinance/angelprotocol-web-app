import { useGetter } from "store/accessors";
import { Button } from "../common";
import EndowmentStatus from "./EndowmentStatus";
import ProgressIndicator from "./ProgressIndicator";
import Steps from "./Steps";
import getRegistrationState from "./getRegistrationState";
import useActivate from "./useActivate";

export default function Dashboard() {
  const charity = useGetter((state) => state.charity);
  const isSubmitting = false;
  const { activate, isSubmitting: isActivateSubmitting } = useActivate();

  const state = getRegistrationState(charity);

  const isDataSubmitted =
    charity.Registration.RegistrationStatus !== "Inactive";

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ProgressIndicator />
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
          onClick={() => {
            alert("create charity proposal");
          }}
          disabled={!state.getIsReadyForSubmit() || isSubmitting}
        >
          Submit for review
        </Button>
      )}
    </div>
  );
}
