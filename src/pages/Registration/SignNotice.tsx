import { Navigate, useLocation } from "react-router-dom";
import { CompleteRegistration } from "./types";
import { DoneWallet, RegistrationUpdate } from "types/aws";
import {
  useFiscalSponsorshipAgreementMutation,
  useUpdateRegMutation,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useGetter } from "store/accessors";

export default function SignatureNotice({ classes = "" }) {
  const { handleError } = useErrorContext();
  const { state } = useLocation();
  const reg = state as CompleteRegistration | undefined;

  const savedRegistration = useGetter(
    (state) =>
      //sign-notice is always shown after submitting wallet
      state.aws.queries[`reg("${reg?.init.reference}")`]?.data as DoneWallet
  );
  const [generateSigningURL, { isLoading: isGeneratingSigningURL }] =
    useFiscalSponsorshipAgreementMutation();
  const [updateRegistration, { isLoading: isSavingSigningURL }] =
    useUpdateRegMutation();

  if (!reg || !savedRegistration) {
    return <Navigate to={".."} />;
  }

  return (
    <div className={classes}>
      <h4>Thank you for registering your account!</h4>

      <p>You're almost done, we just need to take one final step.</p>

      <p>
        Angel Giving serves as a granting organization, accepting donations on
        behalf of our partner nonprofits and granting them out after processing
        and converting. This requires our partner nonprofits to be able to
        accept US tax-deductible donations.
      </p>

      <p>
        Angel Giving provides fiscal sponsorship services at market-leading cost
        for our partner organizations to enable this ability (2.9%). If you
        would like to proceed, please review and sign the fiscal sponsorship
        agreement:
      </p>

      <button
        type="button"
        className="btn-orange mt-4"
        onClick={async () => {
          try {
            //get url
            const { Website, ProofOfIdentity, ProofOfRegistration } =
              savedRegistration.Registration;
            const reference = reg.init.reference;
            const { url } = await generateSigningURL({
              id: reference,
              email: reg.init.email,
              name: reg.contact.firstName + " " + reg.contact.lastName,
            }).unwrap();
            //save URL in db
            await updateRegistration({
              type: "documentation",
              reference,
              //include required fields to hint documentation update
              Website,
              ProofOfIdentity,
              ProofOfRegistration,
              //
              FiscalSponsorshipAgreementSigningURL: url,
            } as RegistrationUpdate).unwrap();

            //redirect to signing URL
            window.location.href = url;
          } catch (err) {
            handleError(err);
          }
        }}
      >
        {isGeneratingSigningURL || isSavingSigningURL
          ? "Redirecting..."
          : "Sign Fiscal Sponsorship Agreement"}
      </button>
    </div>
  );
}
