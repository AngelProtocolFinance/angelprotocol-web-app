import type { FsaPayload } from "@better-giving/registration/fsa";
import { toFileName } from "helpers/uploadFile";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useFetcher, useLoaderData, useNavigate } from "react-router";
import { steps } from "../../../../routes";
import type { RegStep4 } from "../../../../types";
import type { FV } from "../schema";
import type { Props } from "../types";

export default function useSubmit({
  doc,
  isDirty,
}: Props & { isDirty: boolean }) {
  const {
    data: { contact, init, org },
  } = useLoaderData() as RegStep4;

  const fetcher = useFetcher();

  //use separate state to show redirection
  const [isRedirecting, setRedirecting] = useState(false);

  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    //signed agreement and user didn't change any documents
    if (!isDirty && doc?.fsa_signed_doc_url) {
      return navigate(`../${steps.banking}`);
    }

    //existing url and user doesn't change any documents
    if (!isDirty && doc?.fsa_signing_url) {
      setRedirecting(true);
      window.location.href = doc.fsa_signing_url;
    }

    const signer: FsaPayload["signer"] = {
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
        proof_of_identity: {
          publicUrl: fv.proof_of_identity,
          name: toFileName(fv.proof_of_identity) ?? "proof of identity",
        },
        proof_of_reg: {
          publicUrl: fv.proof_of_reg,
          name: toFileName(fv.proof_of_reg) ?? "proof of registration",
        },
        legal_entity_type: fv.legal_entity_type,
        project_description: fv.project_description,
      },
    };

    fetcher.submit(signer, {
      encType: "application/json",
      method: "POST",
      action: "fsa",
    });
  };

  return {
    isSubmitting: fetcher.state !== "idle",
    submit,
    isRedirecting,
  };
}
