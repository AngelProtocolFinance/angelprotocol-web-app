import banner2 from "assets/images/banner-register-2.jpg";
import { app, site } from "constants/routes";
import { useCallback, useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useRequestEmailMutation } from "services/aws/registration";
import { removeUserData, updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import Button from "./Button";
import routes from "./routes";

const ConfirmEmail = () => {
  const history = useHistory();
  const dispatch = useSetter();
  const user = useGetter((state) => state.user);
  const location: any = useLocation();
  const is_sent = location.state?.is_sent;
  const [resendEmail, { isLoading }] = useRequestEmailMutation();

  const sendEmail = useCallback(
    async (emailType: string) => {
      if (!user.PK) {
        console.error("Invalid Data. Please ask the administrator about that.");
        return;
      }

      const response: any = await resendEmail({
        uuid: user.PK,
        type: emailType,
        body: user,
      });
      response.data
        ? console.info(response.data?.message)
        : console.error(response.error?.data.message);
    },
    [user, resendEmail]
  );

  const resendVerificationEmail = useCallback(
    () => sendEmail("verify-email"),
    [sendEmail]
  );

  const sendEmailNoticeToAPTeam = useCallback(
    () => sendEmail("help-verify-email"),
    [sendEmail]
  );

  const returnMain = useCallback(() => {
    dispatch(removeUserData());
    history.push("/");
  }, [dispatch, history]);

  useEffect(() => {
    if (!user.PK) {
      const newUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      dispatch(updateUserData(newUserData));
    }
  }, [user.PK, dispatch]);

  if (user.EmailVerified) {
    return <Redirect to={`${site.app}/${app.register}/${routes.status}`} />;
  }

  return (
    <div className="flex flex-col gap-4 font-bold">
      {is_sent ? (
        <>
          <img src={banner2} width="100%" className="rounded-xl" alt="" />
          <div className="text-4xl">
            <p>Hi {user.FirstName}!</p>
            <span>
              We're still waiting for you to confirm your email address.
            </span>
          </div>
        </>
      ) : (
        <div className="text-2xl">
          <p>Thank you for registering</p>
          <p className="mb-10">
            {user.FirstName}, {user.CharityName}!
          </p>
          <p>Your registration reference is</p>
          <p className="text-orange">{user.PK}</p>
        </div>
      )}
      <span className="font-normal">
        Please click on the link in the email and you'll be able to continue
        with the registration of {user.CharityName} on Angel.
      </span>
      <div className="flex flex-col gap-1 items-center mt-3">
        <Button
          onClick={resendVerificationEmail}
          classes="bg-orange w-64 h-12 text-sm"
          isLoading={isLoading}
        >
          Resend verification email
        </Button>
        <Button
          onClick={sendEmailNoticeToAPTeam}
          classes="bg-yellow-blue w-80 h-12 text-sm"
        >
          I'm having trouble with my email
        </Button>
        <Button onClick={returnMain} classes="bg-thin-blue w-48 h-12 text-sm">
          close
        </Button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
