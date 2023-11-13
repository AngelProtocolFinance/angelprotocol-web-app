import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CompleteRegistration } from "./types";
import { useFiscalSponsorshipAgreementSigningURLMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";

const initialText = "Proceed to signing agreement";
const redirectingText = "Redirecting...";

export default function SignatureNotice({ classes = "" }) {
  const { handleError } = useErrorContext();
  const { state } = useLocation();
  const reg = state as CompleteRegistration | undefined;

  const [generateSigningURL] =
    useFiscalSponsorshipAgreementSigningURLMutation();

  //use standalone state, as mutation state ends before redirect
  const [submitText, setSubmitText] = useState(initialText);

  if (!reg) return <Navigate to={".."} />;

  async function proceed({
    init,
    contact,
    documentation,
  }: CompleteRegistration) {
    try {
      setSubmitText(redirectingText);

      if (documentation.fiscalSponsorshipAgreementSigningURL) {
        window.location.href =
          documentation.fiscalSponsorshipAgreementSigningURL;
        return;
      }

      const reference = init.reference;
      const { url } = await generateSigningURL({
        id: reference,
        email: init.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        role: contact.role === "other" ? contact.otherRole : contact.role,
        org: {
          name: contact.orgName,
          legalEntityType: documentation.legalEntityType,
          hq: documentation.hqCountry.name,
          projectDescription: documentation.projectDescription,
        },
      }).unwrap();

      window.location.href = url;
    } catch (err) {
      setSubmitText(initialText);
      handleError(err);
    }
  }

  return (
    <div
      className={
        classes + " grid padded-container max-w-lg justify-items-center"
      }
    >
      <h4 className="text-3xl mt-10 text-center">
        Thank you for registering your account!
      </h4>

      <p className="mt-6 text-lg">
        You're almost done, we just need to take one final step.
      </p>

      <p className="text-center mt-6">
        Better Giving serves as a granting organization, accepting donations on
        behalf of our partner nonprofits and granting them out after processing
        and converting. This requires our partner nonprofits to be able to
        accept US tax-deductible donations.
      </p>

      <p className="mt-6 text-center">
        Better Giving provides fiscal sponsorship services at market-leading
        cost for our partner organizations to enable this ability (2.9%). If you
        would like to proceed, please review and sign the fiscal sponsorship
        agreement:
      </p>

      <button
        type="button"
        disabled={submitText === redirectingText}
        className="w-full max-w-[26.25rem] btn-red btn-reg mt-6"
        onClick={() => proceed(reg)}
      >
        {submitText}
      </button>
    </div>
  );
}
