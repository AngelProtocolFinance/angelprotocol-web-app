import ExtLink from "components/ExtLink";
import FileDropzone from "components/FileDropzone";
import LoadText from "components/LoadText";
import { Field, Label } from "components/form";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { steps } from "../../../../routes";
import { MB_LIMIT, VALID_MIME_TYPES } from "../schema";
import type { FormValues as FV, Props } from "../types";
import useSubmit from "./useSubmit";

export default function Form(props: Props) {
  const { submit, isSubmitting, isRedirecting } = useSubmit(props);

  return (
    <form className="w-full" onSubmit={submit}>
      <h4 className="text-center sm:text-left">Government issued ID</h4>
      <Label required className="mb-2 mt-1">
        Please provide passport, driver's license, or ID card.
      </Label>
      <FileDropzone<FV, "proof_of_identity">
        name="proof_of_identity"
        specs={{ mbLimit: MB_LIMIT, mimeTypes: VALID_MIME_TYPES }}
      />

      <Field<FV>
        name="registration_number"
        label="Registration number (numbers and letters only)"
        required
        classes={{ container: "mb-6 mt-10", label: "font-semibold" }}
        placeholder="e.g. xxxxxxxxxxxx"
      />

      <Label className="mb-2 mt-10 font-semibold" required>
        Proof of registration as a 501(c)(3) nonprofit or equivalent
      </Label>
      <FileDropzone<FV, "proof_of_reg">
        name="proof_of_reg"
        specs={{ mbLimit: MB_LIMIT, mimeTypes: VALID_MIME_TYPES }}
      />

      <Field<FV>
        name="legal_entity_type"
        label="What type of legal entity is your organization registered as? This can
        usually be found in your registration/organizing document"
        required
        classes={{ container: "mb-2 mt-10" }}
        placeholder="e.g. Nonprofit Organization"
      />

      <Field<FV, "textarea">
        type="textarea"
        name="project_description"
        label="Please provide a description of your organization's charitable activities as well as your charitable mission."
        required
        classes={{ container: "mb-6 mt-10" }}
        placeholder=""
      />

      {props.doc?.fsa_signed_doc_url ? (
        <ExtLink
          href={props.doc.fsa_signed_doc_url}
          className="text-sm text-blue hover:text-blue-l2 flex items-center gap-2"
        >
          <SquareArrowOutUpRight size={20} />
          <span>Signed Fiscal sponsorship agreement</span>
        </ExtLink>
      ) : null}

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={isSubmitting || isRedirecting}
          to={`../${steps.fsaInquiry}`}
          className="py-3 min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          disabled={isSubmitting || isRedirecting}
          type="submit"
          className="py-3 min-w-[8rem] btn-blue btn-reg"
        >
          <LoadText
            isLoading={isSubmitting || isRedirecting}
            text={isSubmitting ? "Submitting.." : "Redirecting.."}
          >
            {props.doc?.fsa_signed_doc_url ? "Continue" : "Sign"}
          </LoadText>
        </button>
      </div>
    </form>
  );
}
