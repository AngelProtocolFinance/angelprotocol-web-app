import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { useRegistrationQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { UnexpectedStateError } from "errors/errors";
import { appRoutes } from "constants/routes";
import { Button, ButtonMailTo } from "./common";
import useSendVerificationEmail from "./common/useSendVerificationEmail";
import { GENERIC_ERROR_MESSAGE } from "./constants";
import routes from "./routes";

export default function ConfirmEmail() {
  const { charity } = useRegistrationQuery();
  const navigate = useNavigate();
  const { sendVerificationEmail, isLoading } = useSendVerificationEmail();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  const sendEmail = useCallback(async () => {
    try {
      if (!charity.ContactPerson.PK) {
        throw new UnexpectedStateError("Primary key is null");
      }

      const emailPayload = {
        Name: charity.Registration.Name,
        Email: charity.ContactPerson.Email,
        FirstName: charity.ContactPerson.FirstName,
        LastName: charity.ContactPerson.LastName,
        Role: charity.ContactPerson.Role,
        PhoneNumber: charity.ContactPerson.PhoneNumber,
      };

      await sendVerificationEmail(charity.ContactPerson.PK, emailPayload);

      showModal(Popup, {
        message:
          "We have sent you another verification email. If you still don't receive anything, please get in touch with us at support@angelprotocol.io",
      });
    } catch (error) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [charity, handleError, sendVerificationEmail, showModal]);

  // if wallet registration step is already complete, then this was just data update,
  // so user can be navigated to the dashboard
  const onContinueClick = () => {
    const route = charity.Metadata.JunoWallet
      ? routes.dashboard
      : routes.documentation;
    navigate(`${appRoutes.register}/${route}`);
  };

  return (
    <div className="flex flex-col gap-4 font-bold">
      {!charity.ContactPerson.EmailVerified ? (
        <>
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
          <div className="text-4xl">
            <p>Hi {charity.ContactPerson.FirstName}!</p>
            <span>We're waiting for you to confirm your email address.</span>
          </div>
          <span className="font-normal">
            You can continue to the next registration step, but please note that
            you will need to verify your email by clicking on the link in the
            email we've sent you, before the final application submission, in
            order to be able to register {charity.Registration.Name} on Angel
            Protocol.
          </span>
        </>
      ) : (
        <div className="text-2xl">
          <p>Thank you for registering</p>
          <p className="mb-10">
            {charity.Registration.Name}, {charity.ContactPerson.FirstName}!
          </p>
        </div>
      )}
      <div className="text-2xl">
        <p>Your registration reference is</p>
        <p className="text-orange">{charity.ContactPerson.PK}</p>
      </div>
      <div className="flex flex-col gap-1 items-center mt-3">
        {!charity.ContactPerson.EmailVerified && (
          <Button
            onClick={sendEmail}
            className="btn-outline-secondary w-64 h-12 text-sm"
            isLoading={isLoading}
          >
            Resend verification email
          </Button>
        )}
        <Button
          onClick={onContinueClick}
          className="btn-primary w-48 h-12 text-sm"
          disabled={isLoading}
        >
          continue
        </Button>
        <ButtonMailTo
          label="Having trouble receiving our emails?"
          mailTo="support@angelprotocol.io"
          subject="Charity Registration: Trouble with receiving confirmation email"
        />
      </div>
    </div>
  );
}
