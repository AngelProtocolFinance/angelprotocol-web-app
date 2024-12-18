import { type FileSpec, fileOutput } from "components/FileDropzone";
import { alphanumeric } from "schemas/string";
import * as v from "valibot";

export const fileSpec: FileSpec = {
  mbLimit: 6,
  mimeTypes: ["image/jpeg", "image/png", "application/pdf", "image/webp"],
};

const requiredStr = v.pipe(v.string("required"), v.nonEmpty("required"));
export const schema = v.object({
  registration_number: v.pipe(
    requiredStr,
    v.regex(alphanumeric, "must only contain numbers and letters")
  ),
  proof_of_identity: fileOutput({ required: true }),
  proof_of_reg: fileOutput({ required: true }),
  legal_entity_type: requiredStr,
  project_description: v.pipe(
    requiredStr,
    v.maxLength(4000, ({ requirement: r }) => `maximum ${r} characters allowed`)
  ),
});

export interface FV extends v.InferOutput<typeof schema> {}
