import { Navigate, useLocation } from "react-router-dom";
import { InitReg } from "./types";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import { BtnPrim } from "components/registration";
import { handleMutationResult } from "helpers";
import { ButtonMailTo } from "./common";

export default function ConfirmEmail({ classes = "" }: { classes?: string }) {
  /** going to this page should only be thru Signup or Resume
   *  if thru URL, would have empty state, and thus be redirected to Signup
   */
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const [requestEmail, { isLoading }] = useRequestEmailMutation();
  const { handleError } = useErrorContext();
  const { showModal } = useModalContext();

  if (!initReg) {
    return <Navigate to={".."} />;
  }

  const { email, reference } = initReg;

  return (
    <div
      className={`max-w-lg grid content-start justify-items-center ${classes}`}
    >
      <h1 className="text-[2rem] font-bold mb-2 text-center">
        Confirm your email address
      </h1>

      <p className="text-center text-white/75 mb-8 w-full text-lg">
        We sent an email to <span className="font-semibold">{email}</span>.
        Please confirm your email by clicking on the link in the message.
      </p>
      <BtnPrim
        className="w-full max-w-[26.25rem] mb-4"
        onClick={async () => {
          handleMutationResult(
            await requestEmail({ uuid: reference, email }),
            handleError,
            () => {
              showModal(Popup, { message: "Email verification sent!" });
            }
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
