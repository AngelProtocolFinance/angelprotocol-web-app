import { Link } from "react-router-dom";
import { FormValues as FV, Props } from "../types";
import { useRegState } from "pages/Registration/Steps/StepGuard";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { Field, Label } from "components/form";
import { FileDropzone, LoadText } from "components/registration";
import { steps } from "../../../../routes";
import { MB_LIMIT } from "../schema";
import useSubmit from "./useSubmit";

export default function Form(props: Props) {
  const { data } = useRegState<4>();
  const { submit, isSubmitting, isRedirecting } = useSubmit(props);

  return (
    <form className="w-full" onSubmit={submit}>
      <h4 className="text-center sm:text-left">Government issued ID</h4>
      <Label required className="mb-2 mt-1">
        Please provide passport, driver's license, or ID card.
      </Label>
      <FileDropzone<FV, "ProofOfIdentity">
        name="ProofOfIdentity"
        tooltip={fileTooltip}
      />

      <Field<FV>
        name="RegistrationNumber"
        label="Registration number"
        required
        classes={{ container: "mb-6 mt-10", label: "font-semibold" }}
        placeholder="e.g. xx-xxxxxxxxxx"
      />

      <Label className="mb-2 mt-10 font-semibold" required>
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
        classes={{ container: "mb-2 mt-10" }}
        placeholder="e.g. Nonprofit Organization"
      />

      <Field<FV, "textarea">
        type="textarea"
        name="ProjectDescription"
        label="Please provide a description of your organization's charitable activities as well as your charitable mission."
        required
        classes={{ container: "mb-6 mt-10" }}
        placeholder=""
      />

      {props.doc?.SignedFiscalSponsorshipAgreement ? (
        <ExtLink
          href={props.doc.SignedFiscalSponsorshipAgreement}
          className="text-sm text-blue hover:text-blue-l2 flex items-center gap-2"
        >
          <Icon type="ExternalLink" size={20} />
          <span>Signed Fiscal sponsorship agreement</span>
        </ExtLink>
      ) : null}

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isSubmitting}
          to={`../${steps.fsaInquiry}`}
          state={data.init}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isSubmitting || isRedirecting}
          type="submit"
          className="py-3 min-w-[8rem] btn-orange btn-reg"
        >
          <LoadText
            isLoading={isSubmitting || isRedirecting}
            text={isSubmitting ? "Submitting.." : "Redirecting.."}
          >
            {props.doc?.SignedFiscalSponsorshipAgreement ? "Continue" : "Sign"}
          </LoadText>
        </button>
      </div>
    </form>
  );
}

const fileTooltip = `Valid types are: PDF, JPG, PNG and WEBP. File should be less than ${MB_LIMIT}MB.`;
