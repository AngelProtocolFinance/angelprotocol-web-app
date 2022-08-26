import { useNavigate } from "react-router-dom";
import { useRegistrationState } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";
import EndowmentStatus from "./EndowmentStatus";
// import ProgressIndicator from "./ProgressIndicator";
import Step from "./Step";
import getRegistrationState from "./getRegistrationState";
import useActivate from "./useActivate";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const { charity } = useRegistrationState();
  const { submit, isSubmitting } = useSubmit();
  const { activate, isSubmitting: isActivateSubmitting } = useActivate();
  const navigate = useNavigate();

  const isDataSubmitted =
    charity.Registration.RegistrationStatus !== "Inactive";

  const registrationState = getRegistrationState(charity);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h3 className="text-3xl font-bold">Necessary Information</h3>
      <span>
        Please complete all the following steps to be able to create your
        endowment
      </span>
      <div className="w-full md:w-2/3 flex flex-col items-center gap-4">
        <Step
          title="Contact Details"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.contactDetails}`)
          }
          disabled={isDataSubmitted || isSubmitting}
          completed
        />
        <Step
          title="Documentation"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.documentation}`)
          }
          disabled={isDataSubmitted || isSubmitting}
          completed={registrationState.stepTwo.completed}
          statusComplete={
            registrationState.stepThree.completed &&
            `Level ${registrationState.stepThree.tier}`
          }
        />
        <Step
          title="Additional Information"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.additionalInformation}`)
          }
          disabled={isDataSubmitted || isSubmitting}
          completed={registrationState.stepThree.completed}
        />
        <Step
          title="Wallet Address"
          onClick={() => navigate(`${appRoutes.register}/${routes.wallet}`)}
          disabled={isDataSubmitted || isSubmitting}
          completed={registrationState.stepFour.completed}
        />
      </div>
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
          disabled={!registrationState.getIsReadyForSubmit() || isSubmitting}
        >
          Submit for review
        </Button>
      )}
    </div>
  );
}
