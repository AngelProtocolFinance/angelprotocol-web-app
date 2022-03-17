import banner2 from "assets/images/banner-register-2.jpg";
import { app } from "constants/routes";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRequestEmailMutation } from "services/aws/registration";
import { removeUserData, updateUserData } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";
import { Button } from "./common";
import routes, { registerRootPath } from "./routes";

export default function ConfirmEmail() {
  const navigate = useNavigate();
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

  const navigateToIndex = useCallback(() => {
    dispatch(removeUserData());
    navigate(app.index);
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user.PK) {
      const newUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      dispatch(updateUserData(newUserData));
    }
  }, [user.PK, dispatch]);

  useEffect(() => {
    if (user.EmailVerified) {
      navigate(`${registerRootPath}/${routes.dashboard}`);
    }
  }, [user?.EmailVerified, navigate]);

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
          className="bg-orange w-64 h-12 text-sm"
          isLoading={isLoading}
        >
          Resend verification email
        </Button>
        <Button
          onClick={sendEmailNoticeToAPTeam}
          className="bg-yellow-blue w-80 h-12 text-sm"
        >
          I'm having trouble with my email
        </Button>
        <Button
          onClick={navigateToIndex}
          className="bg-thin-blue w-48 h-12 text-sm"
        >
          close
        </Button>
      </div>
    </div>
  );
}
