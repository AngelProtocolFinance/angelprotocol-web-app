import type { IFsaSignerDocs } from "@better-giving/reg";
import { project_description_max_length } from "@better-giving/reg/schema";
import { $req } from "@better-giving/schemas";
import { type FileSpec, fileOutput } from "components/file-dropzone";
import { alphanumeric } from "schemas/string";
import * as v from "valibot";

export interface Props extends Partial<IFsaSignerDocs> {
  o_fsa_signed_doc_url?: string;
  o_fsa_signing_url?: string;
}

export const fileSpec: FileSpec = {
  mbLimit: 6,
  mimeTypes: ["image/jpeg", "image/png", "application/pdf", "image/webp"],
};

export const schema = v.object({
  registration_number: v.pipe(
    $req,
    v.regex(alphanumeric, "must only contain numbers and letters")
  ),
  proof_of_identity: fileOutput({ required: true }),
  proof_of_reg: fileOutput({ required: true }),
  legal_entity_type: $req,
  project_description: v.pipe(
    $req,
    v.maxLength(
      project_description_max_length,
      ({ requirement: r }) => `maximum ${r} characters allowed`
    )
  ),
});

export interface FV extends v.InferOutput<typeof schema> {}
