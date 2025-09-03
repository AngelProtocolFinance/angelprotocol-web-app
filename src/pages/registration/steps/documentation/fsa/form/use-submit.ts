import type { IFsaSignerDocs } from "@better-giving/reg";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { steps } from "../../../../routes";
import type { FV } from "../schema";
import type { Props } from "../types";

export default function useSubmit({
  doc,
  isDirty,
}: Props & { isDirty: boolean }) {
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

    const docs: IFsaSignerDocs = {
      registration_number: fv.registration_number,
      $r_proof_of_identity: fv.proof_of_identity,
      $o_proof_of_reg: fv.proof_of_reg,
      $o_legal_entity_type: fv.legal_entity_type,
      $o_project_description: fv.project_description,
    };

    fetcher.submit(docs, {
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
