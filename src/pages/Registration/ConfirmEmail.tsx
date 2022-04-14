import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import banner2 from "assets/images/banner-register-2.jpg";
import { useRequestEmailMutation } from "services/aws/registration";
import { loadLocalStorageUser, removeUserData } from "services/user/userSlice";
import { useSetModal } from "components/Modal/Modal";
import Popup, { PopupProps } from "components/Popup/Popup";
import { useGetter, useSetter } from "store/accessors";
import { app, site } from "constants/routes";
import { Button } from "./common";
import routes from "./routes";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const [resendEmail, { isLoading }] = useRequestEmailMutation();
  const { showModal } = useSetModal();

  const sendEmail = useCallback(
    async (emailType: string) => {
      if (!user.ContactPerson.PK) {
        console.error("Invalid Data. Please ask the administrator about that.");
        return;
      }

      const emailPayload = {
        CharityName: user.Registration.CharityName,
        Email: user.ContactPerson.Email,
        FirstName: user.ContactPerson.FirstName,
        LastName: user.ContactPerson.LastName,
        Role: user.ContactPerson.Role,
        PhoneNumber: user.ContactPerson.PhoneNumber,
      };
      const response: any = await resendEmail({
        uuid: user.ContactPerson.PK,
        type: emailType,
        body: emailPayload,
      });
      response.data
        ? showModal<PopupProps>(Popup, {
            message:
              "We have sent you another verification email. If you still don't receive anything, please get in touch with us.",
          })
        : showModal<PopupProps>(Popup, {
            message: response.error.data.message,
          });
    },
    [user, resendEmail, showModal]
  );

  const resendVerificationEmail = useCallback(
    () => sendEmail("verify-email"),
    [sendEmail]
  );

  // const sendEmailNoticeToAPTeam = useCallback(
  //   () => sendEmail("help-verify-email"),
  //   [sendEmail]
  // );

  const navigateToIndex = useCallback(() => {
    dispatch(removeUserData());
    navigate(app.index);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user.ContactPerson.PK) {
      dispatch(loadLocalStorageUser());
    }
  }, [user.ContactPerson.PK, dispatch]);

  useEffect(() => {
    if (user.ContactPerson.EmailVerified) {
      navigate(`${site.app}/${app.register}/${routes.dashboard}`);
    }
  }, [user.ContactPerson.EmailVerified, navigate]);

  return (
    <div className="flex flex-col gap-4 font-bold">
      {is_sent ? (
        <>
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
          <div className="text-4xl">
            <p>Hi {user.ContactPerson.FirstName}!</p>
            <span>
              We're still waiting for you to confirm your email address.
            </span>
          </div>
        </>
      ) : (
        <div className="text-2xl">
          <p>Thank you for registering</p>
          <p className="mb-10">
            {user.Registration.CharityName}, {user.ContactPerson.FirstName}!
          </p>
          <p>Your registration reference is</p>
          <p className="text-orange">{user.ContactPerson.PK}</p>
        </div>
      )}
      <span className="font-normal">
        Please click on the link in the email and you'll be able to continue
        with the registration of {user.Registration.CharityName} on Angel
        Protocol.
      </span>
      <div className="flex flex-col gap-1 items-center mt-3">
        <Button
          onClick={resendVerificationEmail}
          className="bg-orange w-64 h-12 text-sm"
          isLoading={isLoading}
        >
          Resend verification email
        </Button>
        <Button
          onClick={navigateToIndex}
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
