import { valibotResolver } from "@hookform/resolvers/valibot";
import ExtLink from "components/ExtLink";
import { FileDropzone } from "components/FileDropzone";
import LoadText from "components/LoadText";
import { NativeField as Field, Form as Frm, Label } from "components/form";
import { SquareArrowOutUpRight } from "lucide-react";
import { useController, useForm } from "react-hook-form";
import { Link } from "react-router";
import { steps } from "../../../../routes";
import { type FV, fileSpec, schema } from "../schema";
import type { Props } from "../types";
import useSubmit from "./useSubmit";

export default function Form(props: Props) {
  const init: FV = {
    proof_of_identity: props.doc?.proof_of_identity.publicUrl ?? "",
    registration_number: props.doc?.registration_number ?? "",
    proof_of_reg: props.doc?.proof_of_reg.publicUrl ?? "",
    legal_entity_type: props.doc?.legal_entity_type ?? "",
    project_description: props.doc?.project_description ?? "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    register,
  } = useForm<FV>({
    resolver: valibotResolver(schema),
    defaultValues: init,
  });

  const { field: poi } = useController({ control, name: "proof_of_identity" });
  const { field: por } = useController({ control, name: "proof_of_reg" });

  const isUploading = poi.value === "loading" || por.value === "loading";

  const { submit, isRedirecting, isSubmitting } = useSubmit({
    ...props,
    isDirty,
  });

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
        bucket="endow-reg"
        value={poi.value}
        onChange={poi.onChange}
        specs={fileSpec}
        error={errors.proof_of_identity?.message}
      />

      <Field
        {...register("registration_number")}
        label="Registration number (numbers and letters only)"
        required
        classes={{ container: "mb-6 mt-10", label: "font-semibold" }}
        placeholder="e.g. xxxxxxxxxxxx"
        error={errors.registration_number?.message}
      />

      <FileDropzone
        className="mt-10"
        label={
          <Label className="mb-2 font-semibold" required>
            Proof of registration as a 501(c)(3) nonprofit or equivalent
          </Label>
        }
        bucket="endow-reg"
        value={por.value}
        onChange={por.onChange}
        specs={fileSpec}
        error={errors.proof_of_reg?.message}
      />

      <Field
        {...register("legal_entity_type")}
        label="What type of legal entity is your organization registered as? This can
        usually be found in your registration/organizing document"
        required
        classes={{ container: "mb-2 mt-10" }}
        placeholder="e.g. Nonprofit Organization"
        error={errors.legal_entity_type?.message}
      />

      <Field
        {...register("project_description")}
        type="textarea"
        label="Please provide a description of your organization's charitable activities as well as your charitable mission."
        required
        classes={{ container: "mb-6 mt-10" }}
        placeholder=""
        error={errors.project_description?.message}
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
          disabled={isSubmitting || isRedirecting || isUploading}
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
    </Frm>
  );
}
