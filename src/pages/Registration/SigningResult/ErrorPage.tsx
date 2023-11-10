import { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorQueryParams } from "./types";
import { useFiscalSponsorshipAgreementSigningURLMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import routes from "../routes";

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
      handleError(err);
    }
  }

  const isRedirecting = submitText === redirectingText;
  return (
    <>
      {" "}
      <div className="bg-red rounded-full aspect-square grid place-items-center mb-4">
        <Icon type="Exclamation" size={30} className="text-white m-5" />
      </div>
      <h1 className="text-2xl uppercase text-center">Signing failed</h1>
      <p className="bg-red-l6 dark:bg-blue-d3 p-4 text-sm text-gray-d1 dark:text-gray font-work mt-4">
        {props.error}: {props.message}
      </p>
      <button
        type="button"
        disabled={isRedirecting}
        className="w-full max-w-[26.25rem] btn-red btn-reg mt-6"
        onClick={() => proceed(props.signerEid)}
      >
        {submitText}
      </button>
      <Link
        className="w-full max-w-[26.25rem] btn-outline-filled btn-reg mt-4"
        to={`${appRoutes.register}/${routes.resume}`}
        aria-disabled={isRedirecting}
      >
        Back
      </Link>
    </>
  );
}
