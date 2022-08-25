import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import {
  useRegistrationState,
  useRequestEmailMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { UnexpectedStateError } from "errors/errors";
import { Button, ButtonMailTo } from "./common";
import { FORM_ERROR } from "./constants";
import routes from "./routes";

export default function ConfirmEmail() {
  const { data: charity } = useRegistrationState("");
  const navigate = useNavigate();
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  const sendEmail = useCallback(
    async (emailType: string) => {
      try {
        if (!charity) {
          throw new UnexpectedStateError("Charity data is null");
        }

        if (!charity.ContactPerson.PK) {
          throw new UnexpectedStateError(
            "Invalid Data - primary key is null. Please ask the administrator about that."
          );
        }

        const emailPayload = {
          CharityName: charity.Registration.CharityName,
          Email: charity.ContactPerson.Email,
          FirstName: charity.ContactPerson.FirstName,
          LastName: charity.ContactPerson.LastName,
          Role: charity.ContactPerson.Role,
          PhoneNumber: charity.ContactPerson.PhoneNumber,
        };
        const result = await resendEmail({
          uuid: charity.ContactPerson.PK,
          type: emailType,
          body: emailPayload,
        });

        if ("error" in result) {
          handleError(result.error, FORM_ERROR);
        } else {
          showModal(Popup, {
            message:
              "We have sent you another verification email. If you still don't receive anything, please get in touch with us at support@angelprotocol.io",
          });
        }
      } catch (error) {
        handleError(error);
      }
    },
    [charity, handleError, resendEmail, showModal]
  );

  const handleClose = () => {
    navigate(routes.index);
  };

  if (!charity) {
    handleError(new UnexpectedStateError("Charity data is null"));
    return null;
  }

  return (
    <div className="flex flex-col gap-4 font-bold">
      {is_sent ? (
        <>
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
          <div className="text-4xl">
            <p>Hi {charity.ContactPerson.FirstName}!</p>
            <span>
              We're still waiting for you to confirm your email address.
            </span>
          </div>
        </>
      ) : (
        <div className="text-2xl">
          <p>Thank you for registering</p>
          <p className="mb-10">
            {charity.Registration.CharityName},{" "}
            {charity.ContactPerson.FirstName}!
          </p>
          <p>Your registration reference is</p>
          <p className="text-orange">{charity.ContactPerson.PK}</p>
        </div>
      )}
      <span className="font-normal">
        Please click on the link in the email and you'll be able to continue
        with the registration of {charity.Registration.CharityName} on Angel
        Protocol.
      </span>
      <div className="flex flex-col gap-1 items-center mt-3">
        <Button
          onClick={() => sendEmail("verify-email")}
          className="bg-orange w-64 h-12 text-sm"
          isLoading={isLoading}
        >
          Resend verification email
        </Button>
        <Button
          onClick={handleClose}
          className="bg-thin-blue w-48 h-12 text-sm"
        >
          close
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
