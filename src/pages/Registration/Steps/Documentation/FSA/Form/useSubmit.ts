import { useErrorContext } from "contexts/ErrorContext";
import { toWithState } from "helpers/state-params";
import { uploadFile } from "helpers/uploadFile";
import { useRegState } from "pages/Registration/Steps/StepGuard";
import { useState } from "react";
import { type SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFiscalSponsorshipAgreementSigningURLMutation } from "services/aws/registration";
import { steps } from "../../../../routes";
import type { FormValues, Props } from "../types";

export default function useSubmit({ doc }: Props) {
  const {
    data: { contact, init, org },
  } = useRegState<4>();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<FormValues>();

  //use separate state to show redirection
  const [isRedirecting, setRedirecting] = useState(false);

  const [generateSigningURL] =
    useFiscalSponsorshipAgreementSigningURLMutation();

  const { handleError, displayError } = useErrorContext();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (fv) => {
    try {
      //signed agreement and user didn't change any documents
      if (!isDirty && doc?.fsa_signed_doc_url) {
        return navigate(toWithState(`../${steps.banking}`, init));
      }

      //existing url and user doesn't change any documents
      if (!isDirty && doc?.fsa_signing_url) {
        setRedirecting(true);
        window.location.href = doc.fsa_signing_url;
      }

      const poi = await uploadFile(fv.proof_of_identity.files[0], "endow-reg");
      if (!poi) return displayError("Failed to upload proof of identity");

      const por = await uploadFile(fv.proof_of_reg.files[0], "endow-reg");
      if (!por) return displayError("Failed to upload proof of reg");

      const { url } = await generateSigningURL({
        id: init.id,
        email: init.registrant_id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        role:
          contact.org_role === "other"
            ? contact.other_role ?? ""
            : contact.org_role,
        docs: {
          org_name: contact.org_name,
          hq_country: org.hq_country,
          registration_number: fv.registration_number,
          proof_of_identity: poi,
          proof_of_reg: por,
          legal_entity_type: fv.legal_entity_type,
          project_description: fv.project_description,
        },
      }).unwrap();
      setRedirecting(true);
      window.location.href = url;
    } catch (err) {
      handleError(err, { context: "submitting documentation" });
    }
  };
  return {
    submit: handleSubmit(submit),
    isSubmitting,
    isRedirecting,
  };
}
