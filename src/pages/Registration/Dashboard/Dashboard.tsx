import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { appRoutes } from "constants/routes";
import { Button, ProgressIndicator } from "../common";
import useSendVerificationEmail from "../common/useSendVerificationEmail";
import { getRegistrationState, isRegistrationEditable } from "../helpers";
import routes from "../routes";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import useActivate from "./useActivate";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const { charity } = useRegistrationQuery();
  const { submit, isSubmitting } = useSubmit();
  const { activate, isSubmitting: isActivateSubmitting } = useActivate();
  const navigate = useNavigate();
  const { sendVerificationEmail, isLoading: isSendingEmail } =
    useSendVerificationEmail();
  const { handleError } = useErrorContext();

  const isDataSubmitted = !isRegistrationEditable(charity);

  const isLoading = isSubmitting || isSendingEmail || isActivateSubmitting;

  const isStepDisabled = isDataSubmitted || isLoading;

  const registrationState = getRegistrationState(charity);

  const resendVerificationEmail = useCallback(async () => {
    try {
      await sendVerificationEmail(charity.ContactPerson.PK, {
        CharityName: charity.Registration.CharityName,
        Email: charity.ContactPerson.Email,
        FirstName: charity.ContactPerson.FirstName,
        LastName: charity.ContactPerson.LastName,
        Role: charity.ContactPerson.Role,
        PhoneNumber: charity.ContactPerson.PhoneNumber,
      });
    } catch (error) {
      handleError(error);
    }
  }, [charity, handleError, sendVerificationEmail]);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ProgressIndicator />
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
        />
        <Step
          title="Documentation"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.documentation}`)
          }
          disabled={isStepDisabled}
          customStatus={`Level ${charity.Registration.Tier}`}
        />
        <Step
          title="Additional Information"
          onClick={() =>
            navigate(`${appRoutes.register}/${routes.additionalInformation}`)
          }
          disabled={isStepDisabled}
        />
        <Step
          title="Wallet Address"
          onClick={() => navigate(`${appRoutes.register}/${routes.wallet}`)}
          disabled={isStepDisabled}
        />
        <Step
          title="Email Verification"
          onClick={resendVerificationEmail}
          disabled={charity.ContactPerson.EmailVerified || isStepDisabled}
          buttonLabel="Resend"
          isIncomplete={!charity.ContactPerson.EmailVerified}
        />
      </div>
      {isDataSubmitted ? (
        <EndowmentStatus
          charity={charity}
          isLoading={isLoading}
          onActivate={() => activate(charity.ContactPerson.PK)}
        />
      ) : (
        <Button
          className="w-full md:w-2/3 h-10 mt-5 btn-primary"
          onClick={() => submit(charity)}
          disabled={!registrationState.getIsReadyForSubmit() || isSubmitting}
          isLoading={isLoading}
        >
          Submit for review
        </Button>
      )}
    </div>
  );
}
