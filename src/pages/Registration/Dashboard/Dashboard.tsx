import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { appRoutes } from "constants/routes";
import { ProgressIndicator } from "../common";
import useSendVerificationEmail from "../common/useSendVerificationEmail";
import { isRegistrationEditable } from "../helpers";
import routes from "../routes";
import EndowmentStatus from "./EndowmentStatus";
import Step from "./Step";
import useSubmit from "./useSubmit";

export default function Dashboard() {
  const { charity } = useRegistrationQuery();
  const { submit, isSubmitting } = useSubmit();
  const navigate = useNavigate();
  const { sendVerificationEmail, isLoading: isSendingEmail } =
    useSendVerificationEmail();
  const { handleError } = useErrorContext();

  const isLoading = isSubmitting || isSendingEmail;
  const isSubmitted = !isRegistrationEditable(charity);

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
    <div className="grid grid-rows-[auto_1fr] items-center h-full w-full">
      <ProgressIndicator />
      <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
        {isSubmitted && (
          <>
            <h3 className="text-3xl fond-bold">
              Thank you for submitting your application!
            </h3>
            <span>We will notify you by email once the review is complete</span>
            <div className="text-xl mb-10">
              <p>Your registration reference is:</p>
              <p className="text-orange">{charity.ContactPerson.PK}</p>
            </div>
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
                customStatus={`Level ${charity.Registration.Tier}`}
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
                onClick={() =>
                  navigate(`${appRoutes.register}/${routes.wallet}`)
                }
                disabled={isLoading}
              />
              <Step
                title="Email Verification"
                onClick={resendVerificationEmail}
                disabled={charity.ContactPerson.EmailVerified || isLoading}
                buttonLabel="Resend"
                isIncomplete={!charity.ContactPerson.EmailVerified}
              />
            </div>
          </>
        )}
        <EndowmentStatus
          isLoading={isLoading}
          onSubmit={() => submit(charity)}
        />
      </div>
    </div>
  );
}
