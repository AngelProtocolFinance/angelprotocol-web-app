import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { appRoutes } from "constants/routes";
import useSendVerificationEmail from "../../common/useSendVerificationEmail";
import { isRegistrationEditable } from "../../helpers";
import routes from "../../routes";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const { application } = useRegistrationQuery();
  const { submit, isSubmitting } = useSubmit();
  const navigate = useNavigate();
  const { sendVerificationEmail, isLoading: isSendingEmail } =
    useSendVerificationEmail();
  const { handleError } = useErrorContext();

  const isLoading = isSubmitting || isSendingEmail;
  const isSubmitted = !isRegistrationEditable(application);

  const resendVerificationEmail = useCallback(async () => {
    try {
      await sendVerificationEmail(application.ContactPerson.PK, {
        OrganizationName: application.Registration.OrganizationName,
        Email: application.ContactPerson.Email,
        FirstName: application.ContactPerson.FirstName,
        LastName: application.ContactPerson.LastName,
        Role: application.ContactPerson.Role,
        PhoneNumber: application.ContactPerson.PhoneNumber,
      });
    } catch (error) {
      handleError(error);
    }
  }, [application, handleError, sendVerificationEmail]);

  return (
    <div className="flex flex-col gap-4 items-center h-full w-full">
      {isSubmitted && (
        <>
          <h3 className="text-3xl fond-bold">
            Thank you for submitting your application!
          </h3>
          <span>We will notify you by email once the review is complete</span>
        </>
      )}
      {!isSubmitted && (
        <>
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
              disabled={isLoading}
            />
            <Step
              title="Documentation"
              onClick={() =>
                navigate(`${appRoutes.register}/${routes.documentation}`)
              }
              disabled={isLoading}
              customStatus={`Level ${application.Registration.Tier}`}
            />
            <Step
              title="Additional Information"
              onClick={() =>
                navigate(
                  `${appRoutes.register}/${routes.additionalInformation}`
                )
              }
              disabled={isLoading}
            />
            <Step
              title="Wallet Address"
              onClick={() => navigate(`${appRoutes.register}/${routes.wallet}`)}
              disabled={isLoading}
            />
            <Step
              title="Email Verification"
              onClick={resendVerificationEmail}
              disabled={application.ContactPerson.EmailVerified || isLoading}
              buttonLabel="Resend"
              isIncomplete={!application.ContactPerson.EmailVerified}
            />
          </div>
        </>
      )}
      <EndowmentStatus
        isLoading={isLoading}
        onSubmit={() => submit(application)}
      />
    </div>
  );
}
