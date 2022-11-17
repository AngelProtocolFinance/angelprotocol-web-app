import { Navigate, useLocation } from "react-router-dom";
import { InitReg } from "services/types";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { BtnPrim } from "components/registration";
import { handleMutationResult } from "helpers";
import { ButtonMailTo } from "./common";

export default function ConfirmEmail() {
  /** going to this page should only be thru Signup or Resume
   *  if thru URL, would have empty state, and thus be redirected to Signup
   */
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const [requestEmail, { isLoading }] = useRequestEmailMutation();
  const { handleError } = useErrorContext();

  if (!initReg) {
    return <Navigate to={".."} />;
  }

  const { email, reference } = initReg;

  return (
    <div className="padded-container grid content-start justify-items-center pt-28">
      <h1>Confirm your email address</h1>

      <span className="font-normal">
        We sent an email to {email}. Please confirm your email by clicking on
        the link in the message.
      </span>
      <BtnPrim
        onClick={async () => {
          handleMutationResult(
            await requestEmail({ uuid: reference, email }),
            handleError
          );
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
