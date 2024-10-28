import { appRoutes } from "constants/routes";
import { regRoutes } from "constants/routes";
import { useErrorContext } from "contexts/ErrorContext";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFiscalSponsorshipAgreementSigningURLMutation } from "services/aws/registration";
import type { ErrorQueryParams } from "./types";

const initialText = "Retry";
const redirectingText = "Redirecting...";

export default function ErrorPage(props: ErrorQueryParams) {
  const { handleError } = useErrorContext();
  const [generateSigningURL] =
    useFiscalSponsorshipAgreementSigningURLMutation();

  //use standalone state, as mutation state ends before redirect
  const [submitText, setSubmitText] = useState(initialText);

  async function proceed(signerEID: string) {
    try {
      setSubmitText(redirectingText);
      const { url } = await generateSigningURL(signerEID).unwrap();
      window.location.href = url;
    } catch (err) {
      setSubmitText(initialText);
      handleError(err, { context: "generating signing url" });
    }
  }

  const isRedirecting = submitText === redirectingText;
  return (
    <>
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4">
        <CircleAlert size={30} className="text-white m-5" />
      </div>
      <h1 className="text-2xl uppercase text-center">Signing failed</h1>
      <p className="bg-blue-l5 dark:bg-blue-d6 p-4 text-sm text-navy-l1 dark:text-navy-l2 mt-4">
        {props.error}: {props.message}
      </p>
      <button
        type="button"
        disabled={isRedirecting}
        className="w-full max-w-[26.25rem] btn-blue btn-reg mt-6"
        onClick={() => proceed(props.signerEid)}
      >
        {submitText}
      </button>
      <Link
        className="w-full max-w-[26.25rem] btn-outline-filled btn-reg mt-4"
        to={`${appRoutes.register}/${regRoutes.resume}`}
        aria-disabled={isRedirecting}
      >
        Back
      </Link>
    </>
  );
}
