import { useNavigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { appRoutes } from "constants/routes";
import { Button } from "../common";
import routes from "../routes";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
// import ProgressIndicator from "./ProgressIndicator";
import getRegistrationState from "./getRegistrationState";
import useActivate from "./useActivate";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const { charity } = useRegistrationQuery();
  const { submit, isSubmitting } = useSubmit();
  const { activate, isSubmitting: isActivateSubmitting } = useActivate();
  const navigate = useNavigate();

  const isDataSubmitted =
    charity.Registration.RegistrationStatus !== "Inactive";

  const isStepDisabled = isDataSubmitted || isSubmitting;

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
          disabled={isStepDisabled}
          completed={registrationState.contactDetails.isComplete}
        />
        <Step
          title="Documentation"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.documentation}`)
          }
          disabled={isStepDisabled}
          completed={registrationState.documentation.isComplete}
          statusComplete={
            registrationState.documentation.isComplete &&
            `Level ${charity.Registration.Tier}`
          }
        />
        <Step
          title="Additional Information"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.additionalInformation}`)
          }
          disabled={isStepDisabled}
          completed={registrationState.additionalInformation.isComplete}
        />
        <Step
          title="Wallet Address"
          onClick={() => navigate(`${appRoutes.register}/${routes.wallet}`)}
          disabled={isStepDisabled}
          completed={registrationState.walletRegistration.isComplete}
        />
        <Step
          title="Email Verification"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.confirmEmail}`)
          }
          disabled={charity.ContactPerson.EmailVerified || isStepDisabled}
          completed={registrationState.emailVerification.isComplete}
          completedButtonLabel="Resend"
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
