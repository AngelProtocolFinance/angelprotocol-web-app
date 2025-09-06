import type { IFsaDocs } from "@better-giving/reg";
import { fsa_docs_fv } from "@better-giving/reg/schema";
import { type FileSpec, fileOutput } from "components/file-dropzone";
import * as v from "valibot";

export interface Props extends Partial<IFsaDocs> {
  o_fsa_signed_doc_url?: string;
  o_fsa_signing_url?: string;
}

export const fileSpec: FileSpec = {
  mbLimit: 6,
  mimeTypes: ["image/jpeg", "image/png", "application/pdf", "image/webp"],
};

export const schema = v.object({
  ...fsa_docs_fv.entries,
  proof_of_identity: fileOutput({ required: true }),
  proof_of_reg: fileOutput({ required: true }),
});

export interface FV extends v.InferOutput<typeof schema> {}
