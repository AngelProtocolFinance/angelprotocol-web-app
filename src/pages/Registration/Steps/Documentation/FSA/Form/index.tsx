import { Link } from "react-router-dom";
import { FormValues as FV, Props } from "../types";
import { useRegState } from "pages/Registration/Steps/StepGuard";
import ExtLink from "components/ExtLink";
import { Field, Label } from "components/form";
import { FileDropzone, LoadText } from "components/registration";
import { steps } from "../../../../routes";
import { MB_LIMIT } from "../schema";
import useSubmit from "./useSubmit";

export default function Form(props: Props) {
  const { data } = useRegState<4>();
  const { submit, isSubmitting } = useSubmit(props);

  return (
    <form className="w-full" onSubmit={submit}>
      <h2 className="text-center sm:text-left text-xl mb-2">Documentation</h2>

      <Separator classes="my-8" />

      <h4 className="text-center sm:text-left text-lg mt-8">
        Government issued ID
      </h4>
      <Label required className="mb-2 mt-1">
        Please provide passport, driver's license, or ID card.
      </Label>
      <FileDropzone<FV, "ProofOfIdentity">
        name="ProofOfIdentity"
        tooltip={fileTooltip}
      />

      <h2 className="text-center sm:text-left text-lg mt-8">
        Organizational Details
      </h2>

      <Field<FV>
        name="RegistrationNumber"
        label="Registration number"
        required
        classes={{ container: "mb-6 mt-1" }}
        placeholder="e.g. xx-xxxxxxxxxx"
      />

      <Label className="mb-2" required>
        Proof of registration as a 501(C)(3) nonprofit or equivalent
      </Label>
      <FileDropzone<FV, "ProofOfRegistration">
        name="ProofOfRegistration"
        tooltip={fileTooltip}
      />

      <Field<FV>
        name="LegalEntityType"
        label="What type of legal entity is your organization registered as? This can
        usually be found in your registration/organizing document"
        required
        classes={{ container: "mb-2 mt-6" }}
        placeholder="e.g. Nonprofit Organization"
      />

      <Field<FV, "textarea">
        type="textarea"
        name="ProjectDescription"
        label="Please provide a description of your organization's charitable activities as well as your charitable mission."
        required
        classes={{ container: "mb-6 mt-4" }}
        placeholder=""
      />

      <Separator classes="my-8" />

      {!props.doc?.SignedFiscalSponsorshipAgreement ? (
        <>
          <p className="text-center mt-6">
            Angel Giving serves as a granting organization, accepting donations
            on behalf of our partner nonprofits and granting them out after
            processing and converting. This requires our partner nonprofits to
            be able to accept US tax-deductible donations.
          </p>

          <p className="mt-6 text-center">
            Angel Giving provides fiscal sponsorship services at market-leading
            cost for our partner organizations to enable this ability (2.9%). If
            you would like to proceed, please review and sign the fiscal
            sponsorship agreement:
          </p>
        </>
      ) : (
        <ExtLink href={props.doc.SignedFiscalSponsorshipAgreement}>
          ^^ Signed Fiscal sponsorship agreement
        </ExtLink>
      )}

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.orgDetails}`}
          state={data.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText isLoading={isSubmitting}>
            {props.doc?.SignedFiscalSponsorshipAgreement ? "Sign" : "Continue"}
          </LoadText>
        </button>
      </div>
    </form>
  );
}

const Separator = ({ classes = "" }: { classes?: string }) => (
  <div className={`${classes} h-px w-full bg-gray-l3 dark:bg-bluegray`} />
);

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;
