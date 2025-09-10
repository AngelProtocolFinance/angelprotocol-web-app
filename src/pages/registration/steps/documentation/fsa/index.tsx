import type { IFsaDocs } from "@better-giving/reg";
import { Link, useFetcher, useNavigate } from "@remix-run/react";
import ExtLink from "components/ext-link";
import { FileDropzone } from "components/file-dropzone";
import { Field, Form as Frm, Label } from "components/form";
import { LoadText } from "components/load-text";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { steps } from "../../../routes";
import { type FV, type Props, fileSpec } from "./types";
import { use_rhf } from "./use-rhf";

export function FsaForm(props: Props) {
  const { poi, por, isDirty, handleSubmit, errors, register } = use_rhf(props);
  const is_uploading = poi.value === "loading" || por.value === "loading";

  const fetcher = useFetcher();
  const [is_redirecting, set_is_redirecting] = useState(false);
  const is_submitting = fetcher.state !== "idle";

  //use separate state to show redirection
  const navigate = useNavigate();

  const submit: SubmitHandler<FV> = async (fv) => {
    //signed agreement and user didn't change any documents
    if (!isDirty && props?.o_fsa_signed_doc_url) {
      return navigate(`../${steps.banking}`);
    }

    //existing url and user doesn't change any documents
    if (!isDirty && props?.o_fsa_signing_url) {
      set_is_redirecting(true);
      window.location.href = props.o_fsa_signing_url;
    }

    const docs: IFsaDocs = {
      o_registration_number: fv.o_registration_number,
      r_proof_of_identity: fv.proof_of_identity,
      o_proof_of_reg: fv.proof_of_reg,
      o_legal_entity_type: fv.o_legal_entity_type,
      o_project_description: fv.o_project_description,
    };

    fetcher.submit(docs, {
      encType: "application/json",
      method: "POST",
      action: "fsa",
    });
  };
  return (
    <Frm className="w-full" onSubmit={handleSubmit(submit)}>
      <h4 className="text-center sm:text-left">Government issued ID</h4>

      <FileDropzone
        className="mt-1"
        label={
          <Label required className="mb-2">
            Please provide passport, driver's license, or ID card.
          </Label>
        }
        value={poi.value}
        onChange={poi.onChange}
        specs={fileSpec}
        error={errors.proof_of_identity?.message}
      />

      <Field
        {...register("o_registration_number")}
        label="Registration number (numbers and letters only)"
        required
        classes={{ container: "mb-6 mt-10", label: "font-semibold" }}
        placeholder="e.g. xxxxxxxxxxxx"
        error={errors.o_registration_number?.message}
      />

      <FileDropzone
        className="mt-10"
        label={
          <Label className="mb-2 font-semibold" required>
            Proof of registration as a 501(c)(3) nonprofit or equivalent
          </Label>
        }
        value={por.value}
        onChange={por.onChange}
        specs={fileSpec}
        error={errors.proof_of_reg?.message}
      />

      <Field
        {...register("o_legal_entity_type")}
        label="What type of legal entity is your organization registered as? This can
        usually be found in your registration/organizing document"
        required
        classes={{ container: "mb-2 mt-10" }}
        placeholder="e.g. Nonprofit Organization"
        error={errors.o_legal_entity_type?.message}
      />

      <Field
        {...register("o_project_description")}
        type="textarea"
        label="Please provide a description of your organization's charitable activities as well as your charitable mission."
        required
        classes={{ container: "mb-6 mt-10" }}
        placeholder=""
        error={errors.o_project_description?.message}
      />

      {props?.o_fsa_signed_doc_url ? (
        <ExtLink
          href={props.o_fsa_signed_doc_url}
          className="text-sm text-blue hover:text-blue-l2 flex items-center gap-2"
        >
          <SquareArrowOutUpRight size={20} />
          <span>Signed Fiscal sponsorship agreement</span>
        </ExtLink>
      ) : null}

      <div className="grid grid-cols-2 sm:flex gap-2 mt-8">
        <Link
          aria-disabled={is_submitting || is_redirecting}
          to={`../${steps.fsa_inq}`}
          className="py-3 min-w-[8rem] btn-outline btn text-sm"
        >
          Back
        </Link>
        <button
          disabled={is_submitting || is_redirecting || is_uploading}
          type="submit"
          className="py-3 min-w-[8rem] btn btn-blue text-sm"
        >
          <LoadText
            isLoading={is_submitting || is_redirecting}
            text={is_submitting ? "Submitting.." : "Redirecting.."}
          >
            {props.o_fsa_signed_doc_url ? "Continue" : "Sign"}
          </LoadText>
        </button>
      </div>
    </Frm>
  );
}
