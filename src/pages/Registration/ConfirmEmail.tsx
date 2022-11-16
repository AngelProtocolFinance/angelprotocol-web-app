import { Navigate, useLocation } from "react-router-dom";
import { InitReg } from "services/aws/registration/types";
import banner2 from "assets/images/banner-register-2.jpg";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { BtnPrim } from "components/registration";
import { handleMutationResult } from "helpers";
import { Button, ButtonMailTo } from "./common";
import routes from "./routes";

export default function ConfirmEmail() {
  /** going to this page should only be thru Signup or Resume
   *  if thru URL, would have empty state, and thus be redirected to Signup
   */
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const [requestEmail, { isLoading }] = useRequestEmailMutation();
  const { handleError } = useErrorContext();

  const sendEmail = async ({
    email,
    reference,
  }: Pick<InitReg, "email" | "reference">) => {
    handleMutationResult(
      await requestEmail({ uuid: reference, email }),
      (data) => {
        console.log(data);
      },
      (error) => {
        handleError(error);
      }
    );
  };

  if (!initReg) {
    return <Navigate to={routes.index} />;
  }

  const { email } = initReg;

  return (
    <div className="padded-container grid content-start justify-items-center pt-28">
      <h1>Confirm your email address</h1>

      <span className="font-normal">
        We sent an email to {email}. Please confirm your email by clicking on
        the link in the message.
      </span>
      <BtnPrim
        onClick={() => {
          sendEmail(initReg);
        }}
        disabled={isLoading}
      >
        Resend verification email
      </BtnPrim>
      <ButtonMailTo
        label="Having trouble receiving our emails?"
        mailTo="support@angelprotocol.io"
        subject="Charity Registration: Trouble with receiving confirmation email"
      />
    </div>
  );
}
