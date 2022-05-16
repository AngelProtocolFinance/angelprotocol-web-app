import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { useRequestEmailMutation } from "services/aws/registration";
import { useModalContext } from "contexts/ModalContext/ModalContext";
import Popup from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import { Button } from "./common";
import { FORM_ERROR } from "./constants";
import { removeCharity } from "./store";
import useHandleError from "./useHandleError";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const dispatch = useSetter();
  const charity = useGetter((state) => state.charity);
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const handleError = useHandleError();
  const { showModal } = useModalContext();

  const sendEmail = useCallback(
    async (emailType: string) => {
      if (!charity.ContactPerson.PK) {
        return handleError(
          "Invalid Data. Please ask the administrator about that."
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
    },
    [charity, handleError, resendEmail, showModal]
  );

  const handleClose = () => {
    dispatch(removeCharity());
    navigate(appRoutes.index);
  };

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
        <p className="mt-5 font-normal italic underline">
          <a href="#new-form">Having trouble receiving our emails?</a>
        </p>
      </div>
    </div>
  );
}
