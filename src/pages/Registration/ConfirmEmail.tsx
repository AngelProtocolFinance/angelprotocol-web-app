import { Navigate, useLocation } from "react-router-dom";
import { InitReg } from "./types";
import { useRequestEmailMutation } from "services/aws/registration";
import Popup from "components/Popup";
import useErrorHandler from "hooks/useErrorHandler";

export default function ConfirmEmail({ classes = "" }: { classes?: string }) {
  /** going to this page should only be thru Signup or Resume
   *  if thru URL, would have empty state, and thus be redirected to Signup
   */
  const { state } = useLocation();
  const initReg = state as InitReg | undefined; //from non "/steps" navigations

  const [requestEmail, { isLoading }] = useRequestEmailMutation();
  const { handleError, showModal } = useErrorHandler("ConfirmEmail.tsx");

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
      <button
        className="w-full max-w-[26.25rem] mb-4 btn-orange btn-donate"
        onClick={async () => {
          requestEmail({ uuid: reference, email })
            .then(() =>
              showModal(Popup, { message: "Email verification sent!" })
            )
            .catch(handleError);
        }}
        disabled={isLoading}
      >
        Resend verification email
      </button>

      <h3 className="font-bold mb-2 text-center">
        Having trouble receiving our confirmation emails?
      </h3>
      <p className="text-center text-white/75 mb-8 w-full text-lg">
        Contact us at: support@angelprotocol.io
      </p>
    </div>
  );
}
